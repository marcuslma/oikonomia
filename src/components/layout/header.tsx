'use client';

import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';

export function Header() {
  const { data: session } = useSession();

  return (
    <header className="border-b bg-background">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <Link className="font-bold text-2xl text-primary" href="/">
          Oikonomia
        </Link>

        <nav className="flex items-center space-x-4">
          {session ? (
            <>
              <span className="text-muted-foreground text-sm">
                {session.user?.name}
              </span>
              <Button onClick={() => signOut()} variant="outline">
                Sair
              </Button>
            </>
          ) : (
            <Link href="/auth/signin">
              <Button>Entrar</Button>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
