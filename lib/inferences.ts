import type { FormData, Suggestion } from '@/types';
import { databaseOptions, storageOptions, realtimeOptions, authProviderOptions } from './constants';

export function inferDatabase(formData: FormData): string {
  const { userDataStorage, realtimeFeatures, scalability } = formData;

  if (!userDataStorage) return 'None required';

  const hasRealtime = realtimeFeatures && realtimeFeatures.length > 0;

  if (hasRealtime) {
    return 'Supabase (PostgreSQL with Realtime support)';
  }

  if (scalability === 'enterprise') {
    return 'PostgreSQL with connection pooling';
  }

  if (scalability === 'production') {
    return 'PostgreSQL or MongoDB Atlas';
  }

  return 'Supabase (PostgreSQL) or Firebase Firestore';
}

export function inferAuthStrategy(formData: FormData): string {
  const { authType, authProvider, scalability, teamStructure } = formData;

  if (authType === 'none') return 'No authentication required';

  if (authType === 'magic') {
    return `Supabase Auth with Magic Links`;
  }

  if (authType === 'oauth' || authType === 'social-login') {
    const provider = authProviderOptions.find((p) => p.value === authProvider);
    const providerName = provider?.label || authProvider;
    return `${providerName} with OAuth providers (Google, GitHub, etc.)`;
  }

  if (authType === 'email-password') {
    if (scalability === 'enterprise') {
      return 'Auth0 Enterprise or Clerk Enterprise';
    }

    if (teamStructure === 'organization-hierarchy') {
      return 'Clerk with organization support';
    }

    return 'Clerk or Supabase Auth with email/password';
  }

  return 'NextAuth.js with email/password';
}

export function inferStorage(formData: FormData): string {
  const { fileUploads } = formData;

  if (!fileUploads || fileUploads.length === 0) {
    return 'Not required';
  }

  const hasVideo = fileUploads.some((f) => f.toLowerCase().includes('video'));
  const hasImages = fileUploads.some((f) => f.toLowerCase().includes('image'));

  if (hasVideo) {
    return 'AWS S3 or Cloudinary (with video optimization)';
  }

  if (hasImages) {
    return 'Cloudinary or Supabase Storage (with image optimization)';
  }

  return 'Supabase Storage or AWS S3';
}

export function inferRealtime(formData: FormData): string {
  const { realtimeFeatures } = formData;

  if (!realtimeFeatures || realtimeFeatures.length === 0) {
    return 'Not required';
  }

  const hasChat = realtimeFeatures.some((f) =>
    f.toLowerCase().includes('chat')
  );
  const hasCollaboration = realtimeFeatures.some((f) =>
    f.toLowerCase().includes('collaboration') || f.toLowerCase().includes('real-time')
  );
  const hasNotifications = realtimeFeatures.some((f) =>
    f.toLowerCase().includes('notification')
  );

  if (hasChat || hasCollaboration) {
    return 'Supabase Realtime';
  }

  if (hasNotifications) {
    return 'Novu for notifications or Pusher for real-time updates';
  }

  return 'Supabase Realtime';
}

export function inferPayments(formData: FormData): string {
  const { paymentIntegration, monetization } = formData;

  if (!paymentIntegration) {
    if (monetization === 'free' || monetization === 'ads') {
      return 'Not required';
    }
    return 'Stripe (recommended) or Paddle';
  }

  return paymentIntegration;
}

export function inferEmailNotifications(formData: FormData): string {
  const { emailNotifications } = formData;

  if (!emailNotifications || emailNotifications.length === 0) {
    return 'Not required';
  }

  return 'Resend or SendGrid';
}

export function inferCalendarIntegration(formData: FormData): string {
  const { calendarIntegration } = formData;

  if (!calendarIntegration) {
    return 'Not required';
  }

  return `Cal.com API or Google Calendar API`;
}

export function generateSuggestions(formData: FormData): Suggestion[] {
  const suggestions: Suggestion[] = [];

  // Category-based suggestions
  if (formData.category === 'ecommerce') {
    suggestions.push({
      field: 'integrations',
      value: 'Stripe Payments',
      confidence: 0.95,
      reason: 'E-commerce stores typically need payment processing',
    });

    suggestions.push({
      field: 'backend',
      value: 'File Uploads: Product Images',
      confidence: 0.92,
      reason: 'E-commerce requires product image uploads',
    });
  }

  if (formData.category === 'web-app-saas') {
    suggestions.push({
      field: 'authentication',
      value: 'Team-based workspaces',
      confidence: 0.88,
      reason: 'Most SaaS apps benefit from team collaboration features',
    });

    suggestions.push({
      field: 'analytics',
      value: 'User Analytics',
      confidence: 0.85,
      reason: 'SaaS products require user behavior analytics',
    });
  }

  // Monetization-based suggestions
  if (formData.monetization === 'subscription' || formData.monetization === 'freemium') {
    suggestions.push({
      field: 'integrations',
      value: 'Stripe Subscription Billing',
      confidence: 0.98,
      reason: 'Subscription model requires recurring billing',
    });
  }

  // Real-time features suggestion
  if (formData.teamStructure === 'team-workspaces' && !formData.realtimeFeatures?.includes('live-updates')) {
    suggestions.push({
      field: 'realtime',
      value: 'Live Updates',
      confidence: 0.75,
      reason: 'Team workspaces benefit from real-time collaboration',
    });
  }

  // Security suggestions for user data
  if (formData.userDataStorage) {
    suggestions.push({
      field: 'security',
      value: 'GDPR Compliance',
      confidence: 0.70,
      reason: 'Apps storing user data should consider GDPR compliance',
    });

    if (formData.authType !== 'none') {
      suggestions.push({
        field: 'security',
        value: 'Secure Authentication (OAuth 2.0)',
        confidence: 0.90,
        reason: 'User authentication requires secure protocols',
      });
    }
  }

  // SEO suggestions for public-facing apps
  if (
    formData.category === 'landing-page' ||
    formData.category === 'ecommerce' ||
    formData.category === 'portfolio'
  ) {
    if (!formData.seoRequirements?.includes('structured-data')) {
      suggestions.push({
        field: 'seo',
        value: 'Structured Data (Schema.org)',
        confidence: 0.82,
        reason: 'Public-facing sites benefit from structured data for search engines',
      });
    }
  }

  return suggestions;
}

export function makeInferences(formData: FormData) {
  return {
    database: inferDatabase(formData),
    auth: inferAuthStrategy(formData),
    storage: inferStorage(formData),
    realtime: inferRealtime(formData),
    payments: inferPayments(formData),
    email: inferEmailNotifications(formData),
    calendar: inferCalendarIntegration(formData),
    suggestions: generateSuggestions(formData),
  };
}
