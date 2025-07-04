'use client';

import { getProviders, signIn } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function SignInPage() {
  const [providers, setProviders] = useState<any>(null);

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };
    setUpProviders();
  }, []);

  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-center text-2xl">Entrar</CardTitle>
        <CardDescription className="text-center">
          Faça login para acessar sua conta
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        {providers &&
          Object.values(providers).map((provider: any) => (
            <Button
              className="w-full"
              key={provider.name}
              onClick={() => signIn(provider.id)}
              variant="outline"
            >
              Entrar com {provider.name}
            </Button>
          ))}
      </CardContent>
    </Card>
  );
}
