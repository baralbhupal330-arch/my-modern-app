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
          message: 'Password validation failed',
        },
        { status: 400 }
      );
    }

    // TODO: Check if user already exists in database
    // TODO: Hash password and save to database
    // For now, return mock response
    const hashedPassword = await hashPassword(password);
    console.log('User would be created with hashed password');

    return NextResponse.json(
      {
        success: true,
        message: 'User registered successfully',
        user: {
          id: 'mock-id',
          email,
          name,
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
