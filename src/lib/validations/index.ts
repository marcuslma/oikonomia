import { z } from 'zod';

export const createTransactionSchema = z.object({
  amount: z.number().positive('Valor deve ser positivo'),
  description: z.string().min(1, 'Descrição é obrigatória'),
  categoryId: z.string().uuid('Categoria inválida'),
  creditCardId: z.string().uuid('Cartão inválido'),
  installments: z.number().min(1).max(24).default(1),
  date: z.date().default(() => new Date()),
});

export const createBudgetSchema = z.object({
  month: z.number().min(1).max(12),
  year: z.number().min(2024),
  income: z.number().positive('Renda deve ser positiva'),
  fixedExpenses: z.number().positive('Gastos fixos devem ser positivos'),
  categories: z.array(
    z.object({
      name: z.string().min(1),
      planned: z.number().positive(),
      type: z.enum(['ESSENTIAL', 'LIFESTYLE', 'EMERGENCY']),
    })
  ),
});

export const createCreditCardSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  limit: z.number().positive('Limite deve ser positivo'),
  dueDay: z.number().min(1).max(31),
});

export type CreateTransactionInput = z.infer<typeof createTransactionSchema>;
export type CreateBudgetInput = z.infer<typeof createBudgetSchema>;
export type CreateCreditCardInput = z.infer<typeof createCreditCardSchema>;
