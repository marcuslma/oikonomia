import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-bold text-3xl">Dashboard</h1>
        <p className="text-muted-foreground">
          Visão geral dos seus gastos e orçamento
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="font-medium text-sm">
              Saldo Disponível
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl">R$ 2.500,00</div>
            <p className="text-muted-foreground text-xs">+12% do mês passado</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="font-medium text-sm">Gasto Mensal</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl">R$ 1.200,00</div>
            <p className="text-muted-foreground text-xs">+8% do mês passado</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="font-medium text-sm">
              Maior Categoria
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl">Alimentação</div>
            <p className="text-muted-foreground text-xs">R$ 450,00 este mês</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="font-medium text-sm">
              Próximo Vencimento
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl">15 Jul</div>
            <p className="text-muted-foreground text-xs">
              Cartão Visa - R$ 800,00
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Gastos por Categoria</CardTitle>
            <CardDescription>
              Distribuição dos gastos do mês atual
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center text-muted-foreground">
              Gráfico será implementado em breve
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Evolução Mensal</CardTitle>
            <CardDescription>Comparativo dos últimos 6 meses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center text-muted-foreground">
              Gráfico será implementado em breve
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
