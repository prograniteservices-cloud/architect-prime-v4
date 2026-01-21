import type { FormData, Suggestion } from '@/types';

export function generateSuggestions(formData: FormData): Suggestion[] {
  const suggestions: Suggestion[] = [];

  // Category-based suggestions
  if (formData.category === 'ecommerce') {
    if (!formData.fileUploads || !formData.fileUploads.includes('product-images')) {
      suggestions.push({
        field: 'fileUploads',
        value: 'Product Images',
        confidence: 0.95,
        reason: 'E-commerce stores require product image uploads',
      });
    }

    if (!formData.paymentIntegration) {
      suggestions.push({
        field: 'paymentIntegration',
        value: 'stripe',
        confidence: 0.98,
        reason: 'E-commerce stores need payment processing',
      });
    }

    if (!formData.keyUiComponents || !formData.keyUiComponents.includes('pricing-tables')) {
      suggestions.push({
        field: 'keyUiComponents',
        value: 'pricing-tables',
        confidence: 0.90,
        reason: 'Product listings benefit from pricing tables',
      });
    }
  }

  if (formData.category === 'web-app-saas') {
    if (!formData.realtimeFeatures || !formData.realtimeFeatures.includes('live-updates')) {
      suggestions.push({
        field: 'realtimeFeatures',
        value: 'live-updates',
        confidence: 0.75,
        reason: 'SaaS apps often benefit from real-time updates',
      });
    }

    if (!formData.analyticsIntegration) {
      suggestions.push({
        field: 'analyticsIntegration',
        value: 'posthog',
        confidence: 0.85,
        reason: 'SaaS products need user behavior analytics',
      });
    }

    if (formData.teamStructure === 'team-workspaces' && !formData.realtimeFeatures?.includes('collaborative-editing')) {
      suggestions.push({
        field: 'realtimeFeatures',
        value: 'collaborative-editing',
        confidence: 0.70,
        reason: 'Team workspaces benefit from collaborative editing',
      });
    }
  }

  if (formData.category === 'landing-page') {
    if (!formData.keyUiComponents || !formData.keyUiComponents.includes('newsletter')) {
      suggestions.push({
        field: 'keyUiComponents',
        value: 'newsletter',
        confidence: 0.82,
        reason: 'Landing pages often benefit from email capture',
      });
    }

    if (!formData.animationPreferences || !formData.animationPreferences.includes('scroll-animations')) {
      suggestions.push({
        field: 'animationPreferences',
        value: 'scroll-animations',
        confidence: 0.78,
        reason: 'Scroll animations improve engagement on landing pages',
      });
    }

    if (!formData.seoRequirements || !formData.seoRequirements.includes('structured-data')) {
      suggestions.push({
        field: 'seoRequirements',
        value: 'structured-data',
        confidence: 0.85,
        reason: 'Landing pages benefit from structured data for SEO',
      });
    }
  }

  if (formData.category === 'dashboard') {
    if (formData.navigationStructure !== 'sidebar') {
      suggestions.push({
        field: 'navigationStructure',
        value: 'sidebar',
        confidence: 0.88,
        reason: 'Dashboards typically use sidebar navigation',
      });
    }

    if (!formData.keyUiComponents || !formData.keyUiComponents.includes('search')) {
      suggestions.push({
        field: 'keyUiComponents',
        value: 'search',
        confidence: 0.80,
        reason: 'Dashboards benefit from search functionality',
      });
    }
  }

  // Monetization-based suggestions
  if (formData.monetization === 'subscription' || formData.monetization === 'freemium') {
    if (!formData.paymentIntegration) {
      suggestions.push({
        field: 'paymentIntegration',
        value: 'stripe',
        confidence: 0.98,
        reason: 'Subscription models require payment processing',
      });
    }

    if (!formData.keyUiComponents || !formData.keyUiComponents.includes('pricing-tables')) {
      suggestions.push({
        field: 'keyUiComponents',
        value: 'pricing-tables',
        confidence: 0.92,
        reason: 'Subscription apps need pricing tables',
      });
    }
  }

  // Authentication suggestions
  if (formData.authType === 'email-password' && formData.userDataStorage) {
    if (!formData.securityRequirements || !formData.securityRequirements.includes('encryption')) {
      suggestions.push({
        field: 'securityRequirements',
        value: 'encryption',
        confidence: 0.90,
        reason: 'Apps with user data should implement encryption',
      });
    }

    if (!formData.securityRequirements || !formData.securityRequirements.includes('auth')) {
      suggestions.push({
        field: 'securityRequirements',
        value: 'auth',
        confidence: 0.95,
        reason: 'Secure authentication is required for user accounts',
      });
    }
  }

  // Team-based suggestions
  if (formData.teamStructure === 'team-workspaces' || formData.teamStructure === 'organization-hierarchy') {
    if (!formData.userDataStorage) {
      suggestions.push({
        field: 'userDataStorage',
        value: 'true',
        confidence: 0.85,
        reason: 'Team structures require user data storage',
      });
    }

    if (!formData.databasePreference) {
      suggestions.push({
        field: 'databasePreference',
        value: 'supabase',
        confidence: 0.80,
        reason: 'Team apps need a database for user and team data',
      });
    }
  }

  // SEO suggestions
  if (
    formData.category === 'landing-page' ||
    formData.category === 'ecommerce' ||
    formData.category === 'portfolio'
  ) {
    if (!formData.seoRequirements || !formData.seoRequirements.includes('meta-tags')) {
      suggestions.push({
        field: 'seoRequirements',
        value: 'meta-tags',
        confidence: 0.95,
        reason: 'Public-facing sites require meta tags for SEO',
      });
    }

    if (!formData.seoRequirements || !formData.seoRequirements.includes('sitemap')) {
      suggestions.push({
        field: 'seoRequirements',
        value: 'sitemap',
        confidence: 0.85,
        reason: 'Sitemaps help search engines index your site',
      });
    }
  }

  // Real-time suggestions
  if (formData.category === 'web-app-saas' || formData.category === 'dashboard') {
    if (!formData.realtimeFeatures || formData.realtimeFeatures.length === 0) {
      suggestions.push({
        field: 'realtimeFeatures',
        value: 'notifications',
        confidence: 0.65,
        reason: 'Consider adding notifications for better user engagement',
      });
    }
  }

  // Performance suggestions
  if (!formData.performanceGoals || !formData.performanceGoals.includes('lighthouse-95')) {
    suggestions.push({
      field: 'performanceGoals',
      value: 'lighthouse-95',
      confidence: 0.75,
      reason: 'Aiming for Lighthouse 95+ ensures good performance',
    });
  }

  // Accessibility suggestions
  if (!formData.accessibilityRequirements || !formData.accessibilityRequirements.includes('keyboard-nav')) {
    suggestions.push({
      field: 'accessibilityRequirements',
      value: 'keyboard-nav',
      confidence: 0.90,
      reason: 'Keyboard navigation improves accessibility for all users',
    });
  }

  // Return sorted by confidence
  return suggestions.sort((a, b) => b.confidence - a.confidence).slice(0, 10);
}

// Autocomplete suggestions for integrations
export function getAutocompleteSuggestions(field: string, query: string): string[] {
  const suggestions: Record<string, string[]> = {
    integrations: [
      'stripe',
      'stripe payments',
      'stripe subscriptions',
      'paypal',
      'google analytics',
      'google calendar',
      'slack',
      'github',
      'sendgrid',
      'resend',
      'aws s3',
      'cloudinary',
      'twilio',
      'pusher',
      'mixpanel',
      'amplitude',
      'segment',
      'posthog',
      'sentry',
      'logrocket',
    ],
    features: [
      'user authentication',
      'user registration',
      'user profiles',
      'dashboard',
      'admin panel',
      'real-time notifications',
      'file upload',
      'search functionality',
      'pagination',
      'filters',
      'sorting',
      'export to csv',
      'export to pdf',
      'calendar integration',
      'email notifications',
      'push notifications',
      'social login',
      'two-factor authentication',
      'multi-language support',
      'dark mode',
      'responsive design',
    ],
    apis: [
      'openai api',
      'anthropic api',
      'stripe api',
      'google maps api',
      'google calendar api',
      'github api',
      'twitter api',
      'facebook api',
      'sendgrid api',
      'aws sdk',
      'twilio api',
      'pusher channels',
      'firebase auth',
      'supabase client',
    ],
  };

  const fieldSuggestions = suggestions[field] || [];
  const queryLower = query.toLowerCase();

  return fieldSuggestions
    .filter((s) => s.toLowerCase().includes(queryLower))
    .slice(0, 8);
}
