import { NextRequest, NextResponse } from 'next/server';
import { hashPassword, validateEmail, validatePassword } from '@/lib/auth';
import { RegisterPayload, AuthResponse } from '@/types/auth';

export async function POST(req: NextRequest): Promise<NextResponse<AuthResponse>> {
  try {
    const body = await req.json() as RegisterPayload;
    const sanitizedEmail = body.email?.trim().toLowerCase() || '';
    const sanitizedName = body.name?.trim() || '';
    const password = body.password || '';

    if (!sanitizedEmail || !password || !sanitizedName) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (!validateEmail(sanitizedEmail)) {
      return NextResponse.json(
        { success: false, message: 'Invalid email format' },
        { status: 400 }
      );
    }

    const passwordValidation = validatePassword(password);
    if (!passwordValidation.valid) {
      return NextResponse.json(
        {
          success: false,
          message: passwordValidation.errors[0] || 'Password validation failed',
        },
        { status: 400 }
      );
    }

    const { prisma } = await import('@/lib/db');

    const existingUser = await prisma.user.findUnique({
      where: { email: sanitizedEmail },
    });

    if (existingUser) {
      return NextResponse.json(
        { success: false, message: 'Email already registered' },
        { status: 400 }
      );
    }

    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        email: sanitizedEmail,
        name: sanitizedName,
        password: hashedPassword,
        role: 'USER',
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'User registered successfully',
        user: {
          id: user.id,
          email: user.email,
          name: user.name || '',
        },
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof Error) {
      console.error('Registration error:', error.message);
    }
    return NextResponse.json(
      { success: false, message: 'Registration failed. Please try again.' },
      { status: 500 }
    );
  }
}
