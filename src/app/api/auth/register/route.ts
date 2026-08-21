import { NextRequest, NextResponse } from 'next/server';
import { hashPassword, validateEmail, validatePassword } from '@/lib/auth';
import { RegisterPayload, AuthResponse } from '@/types/auth';

export async function POST(req: NextRequest): Promise<NextResponse<AuthResponse>> {
  try {
    const body = await req.json() as RegisterPayload;
    const { email, password, name } = body;

    if (!email || !password || !name) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (!validateEmail(email)) {
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

    // Import Prisma here to defer connection until runtime
    const { prisma } = await import('@/lib/db');

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { success: false, message: 'Email already registered' },
        { status: 400 }
      );
    }

    // Hash password and create user
    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        email,
        name,
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
    console.error('Registration error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
