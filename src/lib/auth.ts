// Placeholder implementations - replace with bcryptjs when database is set up
export async function hashPassword(password: string): Promise<string> {
  // TODO: Replace with bcryptjs for production
  return Buffer.from(password).toString('base64');
}

export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  // TODO: Replace with bcryptjs for production
  return Buffer.from(password).toString('base64') === hashedPassword;
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validatePassword(password: string): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (password.length < 8) {
    errors.push('Password must be at least 8 characters');
  }
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
