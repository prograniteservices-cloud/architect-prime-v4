import type { FormData, CostEstimate } from '@/types';

export function estimateCost(formData: FormData): CostEstimate {
  const breakdown = {
    hosting: 0,
    database: 0,
    storage: 0,
    email: 0,
    other: 0,
  };

  // Hosting cost based on deployment target and scalability
  if (formData.deploymentTarget === 'vercel') {
    breakdown.hosting = formData.scalability === 'mvp' ? 0 : 20;
  } else if (formData.deploymentTarget === 'netlify') {
    breakdown.hosting = formData.scalability === 'mvp' ? 0 : 19;
  } else if (formData.deploymentTarget === 'aws') {
    breakdown.hosting = 50;
  } else if (formData.deploymentTarget === 'self-hosted') {
    breakdown.hosting = 30; // Assuming VPS
  }

  // Database cost
  if (formData.userDataStorage) {
    if (formData.databasePreference === 'supabase' || formData.databasePreference === 'firebase') {
      breakdown.database = formData.scalability === 'mvp' ? 0 : 25;
    } else if (formData.databasePreference === 'postgresql' || formData.databasePreference === 'planetscale') {
      breakdown.database = 15;
    } else if (formData.databasePreference === 'mongodb') {
      breakdown.database = 57;
    }
  }

  // Storage cost
  if (formData.fileUploads && formData.fileUploads.length > 0) {
    if (formData.storageSolution === 'cloudinary') {
      breakdown.storage = 89;
    } else if (formData.storageSolution === 's3') {
      breakdown.storage = 20;
    } else if (formData.storageSolution === 'supabase-storage' || formData.storageSolution === 'firebase-storage') {
      breakdown.storage = 5;
    }
  }

  // Email cost
  if (formData.emailNotifications && formData.emailNotifications.length > 0) {
    if (formData.emailNotifications.includes('resend')) {
      breakdown.email = 20;
    } else if (formData.emailNotifications.includes('sendgrid')) {
      breakdown.email = 15;
    } else if (formData.emailNotifications.includes('ses')) {
      breakdown.email = 10;
    } else if (formData.emailNotifications.includes('novu')) {
      breakdown.email = 50;
    }
  }

  // Real-time cost
  if (formData.realtimeFeatures && formData.realtimeFeatures.length > 0) {
    if (formData.realtimeSolution === 'pusher') {
      breakdown.other += 50;
    } else if (formData.realtimeSolution === 'supabase-realtime' || formData.realtimeSolution === 'firebase-realtime') {
      breakdown.other += 0;
    } else if (formData.realtimeSolution === 'socket.io') {
      breakdown.other += 30; // Assuming custom server
    }
  }

  // Payment processing fee (percentage based)
  if (formData.paymentIntegration) {
    // Payment processors charge per transaction, not monthly
    // We'll add a base cost for the service
    breakdown.other += 0;
  }

  // Analytics cost
  if (formData.analyticsIntegration === 'posthog' || formData.analyticsIntegration === 'mixpanel') {
    breakdown.other += 0; // Free tier available
  } else if (formData.analyticsIntegration === 'amplitude') {
    breakdown.other += 49;
  } else if (formData.analyticsIntegration === 'ga4') {
    breakdown.other += 0; // Free
  }

  // Error tracking
  if (formData.errorTracking === 'sentry') {
    breakdown.other += 26;
  } else if (formData.errorTracking === 'logrocket') {
    breakdown.other += 99;
  }

  const monthly = Object.values(breakdown).reduce((sum, cost) => sum + cost, 0);

  return {
    monthly,
    breakdown,
  };
}

export function getCostTier(monthlyCost: number): { tier: string; description: string } {
  if (monthlyCost === 0) {
    return {
      tier: 'Free',
      description: 'All services can be run on free tiers',
    };
  } else if (monthlyCost < 50) {
    return {
      tier: 'Low',
      description: 'Affordable, suitable for MVP',
    };
  } else if (monthlyCost < 150) {
    return {
      tier: 'Medium',
      description: 'Moderate costs, good for beta',
    };
  } else if (monthlyCost < 300) {
    return {
      tier: 'High',
      description: 'Significant investment, production-ready',
    };
  } else {
    return {
      tier: 'Enterprise',
      description: 'Enterprise-level costs',
    };
  }
}

export function getCostBreakdownItems(breakdown: CostEstimate['breakdown']): Array<{ name: string; cost: number; zeroCostAlternative?: string }> {
  return [
    {
      name: 'Hosting',
      cost: breakdown.hosting,
      zeroCostAlternative: breakdown.hosting === 0 ? undefined : 'Vercel/Netlify free tier',
    },
    {
      name: 'Database',
      cost: breakdown.database,
      zeroCostAlternative: breakdown.database === 0 ? undefined : 'Supabase/Firebase free tier',
    },
    {
      name: 'Storage',
      cost: breakdown.storage,
      zeroCostAlternative: breakdown.storage === 0 ? undefined : 'Supabase Storage free tier',
    },
    {
      name: 'Email/Notifications',
      cost: breakdown.email,
      zeroCostAlternative: breakdown.email === 0 ? undefined : 'Resend/Postmark free tier',
    },
    {
      name: 'Other Services',
      cost: breakdown.other,
      zeroCostAlternative: breakdown.other === 0 ? undefined : 'Open source alternatives',
    },
  ];
}
