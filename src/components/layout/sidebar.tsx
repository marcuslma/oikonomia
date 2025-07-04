'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const sidebarItems = [
  {
    title: 'Dashboard',
    href: '/dashboard',
  },
  {
    title: 'Orçamento',
    href: '/budget',
  },
  {
    title: 'Transações',
    href: '/transactions',
  },
  {
    title: 'Cartões',
    href: '/credit-cards',
  },
  {
    title: 'Relatórios',
    href: '/reports',
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="min-h-screen w-64 border-r bg-muted/40">
      <div className="p-6">
        <nav className="space-y-2">
          {sidebarItems.map((item) => (
            <Link
              className={cn(
                'block rounded-md px-3 py-2 font-medium text-sm transition-colors',
                pathname === item.href
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              )}
              href={item.href}
              key={item.href}
            >
              {item.title}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
