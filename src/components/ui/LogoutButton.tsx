'use client';

import { signOut } from 'next-auth/react';
import { Button } from './Button';

export function LogoutButton() {
  const handleLogout = async () => {
    await signOut({ callbackUrl: '/' });
  };

  return (
    <Button
      onClick={handleLogout}
      variant="secondary"
    >
      Sign Out
    </Button>
  );
}
