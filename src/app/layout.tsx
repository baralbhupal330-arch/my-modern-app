import './globals.css';
import { AuthSessionProvider } from '@/components/SessionProvider';

export const metadata = {
  title: 'E-Commerce App',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthSessionProvider>
          {children}
        </AuthSessionProvider>
      </body>
    </html>
  );
}
