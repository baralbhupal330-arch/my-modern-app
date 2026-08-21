'use client';

import { signOut } from 'next-auth/react';
import { Button } from './Button';

export function LogoutButton() {
  return (
    <Button
      onClick={() => signOut({ redirectTo: '/' })}
      variant="secondary"
    >
      Sign Out
    </Button>
  );
}
