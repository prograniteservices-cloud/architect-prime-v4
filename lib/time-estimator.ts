import type { FormData, TimeEstimate } from '@/types';

export function estimateTime(formData: FormData): TimeEstimate {
  const complexity = calculateComplexity(formData);
  
  const mvp = calculateMVPTime(complexity);
  const production = calculateProductionTime(mvp);

  return {
    mvp: formatTime(mvp),
    production: formatTime(production),
    breakdown: {
      design: formatTime(mvp * 0.2),
      frontend: formatTime(mvp * 0.35),
      backend: formatTime(mvp * 0.3),
      testing: formatTime(mvp * 0.1),
      deployment: formatTime(mvp * 0.05),
    },
  };
}

function calculateComplexity(formData: FormData): number {
  let complexity = 1; // Base complexity

  // Category complexity
  const categoryComplexity: Record<FormData['category'], number> = {
    'landing-page': 0.5,
    'portfolio': 0.6,
    'internal-tool': 0.8,
    'dashboard': 1.0,
    'web-app-saas': 1.2,
    'ecommerce': 1.5,
    'blog-app': 1.1,
    'marketplace': 1.8,
    'other': 1.0,
  };

  complexity *= categoryComplexity[formData.category] || 1.0;

  // Authentication complexity
  if (formData.authType === 'none') {
    complexity *= 0.7;
  } else if (formData.authType === 'email-password') {
    complexity *= 1.0;
  } else if (formData.authType === 'magic-link') {
    complexity *= 1.1;
  } else if (formData.authType === 'oauth') {
    complexity *= 1.2;
  } else if (formData.authType === 'social-login') {
    complexity *= 1.3;
  }

  // Team structure complexity
  if (formData.teamStructure === 'single-user') {
    complexity *= 0.8;
  } else if (formData.teamStructure === 'multi-user-shared') {
    complexity *= 1.0;
  } else if (formData.teamStructure === 'team-workspaces') {
    complexity *= 1.3;
  } else if (formData.teamStructure === 'organization-hierarchy') {
    complexity *= 1.5;
  }

  // Database complexity
  if (formData.userDataStorage) {
    complexity *= 1.2;
  }

  // File uploads complexity
  if (formData.fileUploads && formData.fileUploads.length > 0) {
    complexity *= 1.15;
  }

  // Real-time complexity
  if (formData.realtimeFeatures && formData.realtimeFeatures.length > 0) {
    complexity *= 1.2;
  }

  // Payments complexity
  if (formData.paymentIntegration) {
    complexity *= 1.3;
  }

  // Email/notifications complexity
  if (formData.emailNotifications && formData.emailNotifications.length > 0) {
    complexity *= 1.1;
  }

  // Calendar integration complexity
  if (formData.calendarIntegration) {
    complexity *= 1.15;
  }

  // UI components complexity
  const uiComplexity = formData.keyUiComponents?.length || 0;
  complexity *= 1 + (uiComplexity * 0.03);

  // Animation complexity
  if (formData.animationPreferences && formData.animationPreferences.length > 2) {
    complexity *= 1.1;
  }

  // Testing complexity
  if (formData.testingStrategy && formData.testingStrategy.length > 0) {
    complexity *= 1.15;
  }

  // CI/CD complexity
  if (formData.cicdRequirements && formData.cicdRequirements.length > 0) {
    complexity *= 1.1;
  }

  return complexity;
}

function calculateMVPTime(complexity: number): number {
  const baseWeeks = 4; // Base 4 weeks for MVP
  return Math.round(baseWeeks * complexity);
}

function calculateProductionTime(mvpWeeks: number): number {
  // Production typically takes 2-3x MVP time
  return Math.round(mvpWeeks * 2.5);
}

function formatTime(weeks: number): string {
  if (weeks < 1) {
    const days = Math.round(weeks * 5);
    return `${days} day${days !== 1 ? 's' : ''}`;
  } else if (weeks < 4) {
    return `${weeks} week${weeks !== 1 ? 's' : ''}`;
  } else if (weeks < 52) {
    const months = Math.round(weeks / 4);
    return `${months} month${months !== 1 ? 's' : ''}`;
  } else {
    const years = (weeks / 52).toFixed(1);
    return `${years} year${parseFloat(years) !== 1 ? 's' : ''}`;
  }
}

export function getTimeTier(weeks: number): { tier: string; description: string } {
  if (weeks < 2) {
    return {
      tier: 'Quick Start',
      description: 'Can be built in 1-2 weeks',
    };
  } else if (weeks < 6) {
    return {
      tier: 'MVP',
      description: 'Typical MVP timeline',
    };
  } else if (weeks < 12) {
    return {
      tier: 'Beta',
      description: 'Good for beta release',
    };
  } else if (weeks < 26) {
    return {
      tier: 'Production',
      description: 'Full production build',
    };
  } else {
    return {
      tier: 'Enterprise',
      description: 'Complex, long-term project',
    };
  }
}

export function getTimelineBreakdown(breakdown: TimeEstimate['breakdown']): Array<{ phase: string; time: string; percentage: number }> {
  const total = Object.values(breakdown).reduce((sum, time) => sum + parseTime(time), 0);

  return [
    {
      phase: 'Design & Planning',
      time: breakdown.design,
      percentage: Math.round((parseTime(breakdown.design) / total) * 100),
    },
    {
      phase: 'Frontend Development',
      time: breakdown.frontend,
      percentage: Math.round((parseTime(breakdown.frontend) / total) * 100),
    },
    {
      phase: 'Backend Development',
      time: breakdown.backend,
      percentage: Math.round((parseTime(breakdown.backend) / total) * 100),
    },
    {
      phase: 'Testing & QA',
      time: breakdown.testing,
      percentage: Math.round((parseTime(breakdown.testing) / total) * 100),
    },
    {
      phase: 'Deployment & Launch',
      time: breakdown.deployment,
      percentage: Math.round((parseTime(breakdown.deployment) / total) * 100),
    },
  ];
}

function parseTime(timeStr: string): number {
  const match = timeStr.match(/(\d+)\s*(day|week|month|year)/i);
  if (!match) return 0;

  const value = parseInt(match[1], 10);
  const unit = match[2].toLowerCase();

  switch (unit) {
    case 'day':
    case 'days':
      return value / 5; // 5 days per week
    case 'week':
    case 'weeks':
      return value;
    case 'month':
    case 'months':
      return value * 4;
    case 'year':
    case 'years':
      return value * 52;
    default:
      return value;
  }
}

export function getRecommendedTeamSize(formData: FormData): string {
  const complexity = calculateComplexity(formData);

  if (complexity < 0.8) {
    return '1 developer (part-time)';
  } else if (complexity < 1.2) {
    return '1-2 developers';
  } else if (complexity < 1.8) {
    return '2-3 developers + 1 designer';
  } else {
    return '3-5 developers + 1-2 designers + 1 PM';
  }
}

export function getRecommendedTimeline(formData: FormData): Array<{ milestone: string; time: string }> {
  const time = estimateTime(formData);
  const mvpWeeks = parseTime(time.mvp);
  const productionWeeks = parseTime(time.production);

  return [
    {
      milestone: 'Design & Planning',
      time: formatTime(mvpWeeks * 0.2),
    },
    {
      milestone: 'MVP Development',
      time: formatTime(mvpWeeks * 0.8),
    },
    {
      milestone: 'Testing & Refinement',
      time: formatTime(productionWeeks * 0.3),
    },
    {
      milestone: 'Production Build',
      time: formatTime(productionWeeks * 0.7),
    },
  ];
}
