'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/dashboard');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="h-32 w-32 animate-spin rounded-full border-primary border-b-2" />
          <p className="mt-4 text-muted-foreground">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/50">
      <div className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text font-bold text-5xl text-transparent">
            Oikonomia
          </h1>
          <p className="mb-8 text-muted-foreground text-xl">
            Controle financeiro preventivo para quem usa cartão de crédito
          </p>
          <p className="mx-auto mb-12 max-w-2xl text-lg">
            Planeje seus gastos, controle parcelamentos e evite surpresas na
            fatura. Oikonomia oferece visibilidade em tempo real dos seus gastos
            e projeções futuras.
          </p>

          <div className="mb-16 flex flex-col justify-center gap-4 sm:flex-row">
            <Link href="/auth/signin">
              <Button className="w-full sm:w-auto" size="lg">
                Começar Agora
              </Button>
            </Link>
            <Button className="w-full sm:w-auto" size="lg" variant="outline">
              Saiba Mais
            </Button>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            <div className="rounded-lg border bg-card p-6">
              <h3 className="mb-3 font-semibold text-lg">
                Planejamento Preventivo
              </h3>
              <p className="text-muted-foreground">
                Crie orçamentos mensais e acompanhe seus gastos antes que vire
                problema
              </p>
            </div>
            <div className="rounded-lg border bg-card p-6">
              <h3 className="mb-3 font-semibold text-lg">
                Controle de Parcelamentos
              </h3>
              <p className="text-muted-foreground">
                Visualize todos os parcelamentos ativos e projete o
                comprometimento futuro
              </p>
            </div>
            <div className="rounded-lg border bg-card p-6">
              <h3 className="mb-3 font-semibold text-lg">Múltiplos Cartões</h3>
              <p className="text-muted-foreground">
                Gerencie múltiplos cartões de crédito com limites e alertas
                personalizados
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
