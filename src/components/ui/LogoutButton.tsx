'use client';

import { signOut } from 'next-auth/react';
import { Button } from './Button';

export function LogoutButton() {
  return (
    <Button
      onClick={() => signOut({ redirect: true })}
      variant="secondary"
    >
      Sign Out
    </Button>
  );
}
