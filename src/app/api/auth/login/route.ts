import { NextRequest, NextResponse } from 'next/server';
import { verifyPassword, validateEmail } from '@/lib/auth';
import { LoginPayload, AuthResponse } from '@/types/auth';

export async function POST(req: NextRequest): Promise<NextResponse<AuthResponse>> {
  try {
    const body = await req.json() as LoginPayload;
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Email and password required' },
        { status: 400 }
      );
    }

    if (!validateEmail(email)) {
      return NextResponse.json(
        { success: false, message: 'Invalid email format' },
        { status: 400 }
      );
    }

    // TODO: Query database to find user by email
    // TODO: Verify password
    // For now, return mock response
    console.log('Login attempt for:', email);

    return NextResponse.json(
      {
        success: true,
        message: 'Login successful',
        user: {
          id: 'mock-id',
          email,
          name: 'Mock User',
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
