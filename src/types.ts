export type Currency = 'INR' | 'USD' | 'EUR';

export interface TierDeliverable {
  title: string;
  detail?: string;
}

export interface SprintTier {
  id: 'ai' | 'security' | 'iot';
  name: string;
  tagline: string;
  iconName: string;
  badge: string;
  badgeColor: string;
  accentColor: string;
  description: string;
  pricing: {
    INR: { total: number; deposit: number; display: string; depositDisplay: string };
    USD: { total: number; deposit: number; display: string; depositDisplay: string };
    EUR: { total: number; deposit: number; display: string; depositDisplay: string };
  };
  deliverables: string[];
  techStack: string[];
  sampleRepoStructure: string[];
  idealFor: string;
}

export interface IntakeFormData {
  name: string;
  email: string;
  company: string;
  role: string;
  projectDetails: string;
  targetOutcome: string;
  existingStack: string;
  preferredChannel: 'slack' | 'whatsapp' | 'email' | 'discord';
  targetKickoffDate: string;
}

export interface PaymentDetails {
  method: 'card' | 'upi' | 'wire';
  cardNumber: string;
  cardExpiry: string;
  cardCvc: string;
  cardName: string;
  upiId?: string;
  transactionRef?: string;
  agreedToTerms: boolean;
  agreedToNda: boolean;
}

export interface CaseStudy {
  id: string;
  trackId: 'ai' | 'security' | 'iot';
  clientType: string;
  problem: string;
  solution: string;
  results: string[];
  timeframe: string;
  tech: string[];
}
