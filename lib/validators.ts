import * as z from 'zod';

export const userSchema = z.object({
  email: z.string().email('Email invalide'),
  password: z.string().min(6, 'Le mot de passe doit contenir au moins 6 caractères'),
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Numéro de téléphone invalide'),
  profession: z.string().optional()
});

export const loanSchema = z.object({
  amount: z.number().min(1000, 'Le montant minimum est de 1000'),
  duration: z.number().min(1, 'La durée minimum est de 1 mois'),
  interestRate: z.number().min(0, 'Le taux d\'intérêt ne peut pas être négatif'),
  purpose: z.string().min(10, 'Veuillez détailler l\'objectif du prêt'),
  documents: z.array(z.string()).optional()
});

export const savingsSchema = z.object({
  targetAmount: z.number().min(1000, 'L\'objectif minimum est de 1000'),
  currentAmount: z.number().default(0),
  frequency: z.enum(['daily', 'weekly', 'monthly']),
  contribution: z.number().min(100, 'La contribution minimum est de 100'),
  title: z.string().min(3, 'Donnez un titre à votre objectif d\'épargne')
});

export const tontineSchema = z.object({
  groupName: z.string().min(3, 'Le nom du groupe doit contenir au moins 3 caractères'),
  contribution: z.number().min(1000, 'La contribution minimum est de 1000'),
  frequency: z.enum(['daily', 'weekly', 'monthly']),
  members: z.array(z.string()).min(2, 'Une tontine doit avoir au moins 2 membres'),
  startDate: z.date(),
  endDate: z.date()
});
