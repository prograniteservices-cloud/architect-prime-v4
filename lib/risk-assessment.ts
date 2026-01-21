import type { FormData, RiskAssessment } from '@/types';

export function assessRisks(formData: FormData): RiskAssessment {
  const issues: RiskAssessment['issues'] = [];

  // Assess category risks
  assessCategoryRisks(formData, issues);

  // Assess authentication risks
  assessAuthRisks(formData, issues);

  // Assess backend risks
  assessBackendRisks(formData, issues);

  // Assess scalability risks
  assessScalabilityRisks(formData, issues);

  // Assess security risks
  assessSecurityRisks(formData, issues);

  // Assess integration risks
  assessIntegrationRisks(formData, issues);

  // Assess timeline/feature creep risks
  assessTimelineRisks(formData, issues);

  // Calculate overall risk level
  const level = calculateOverallRisk(issues);

  return {
    level,
    issues: issues.sort((a, b) => {
      const severityOrder = { high: 0, medium: 1, low: 2 };
      return severityOrder[a.severity] - severityOrder[b.severity];
    }),
  };
}

function assessCategoryRisks(formData: FormData, issues: RiskAssessment['issues']): void {
  if (formData.category === 'ecommerce') {
    if (!formData.paymentIntegration) {
      issues.push({
        type: 'Missing Integration',
        description: 'E-commerce without payment processing',
        severity: 'high',
        mitigation: 'Add Stripe or PayPal integration',
      });
    }

    if (!formData.fileUploads || formData.fileUploads.length === 0) {
      issues.push({
        type: 'Missing Feature',
        description: 'E-commerce without product image uploads',
        severity: 'medium',
        mitigation: 'Add file upload functionality for products',
      });
    }
  }

  if (formData.category === 'web-app-saas') {
    if (!formData.monetization || formData.monetization === 'free') {
      issues.push({
        type: 'Business Model',
        description: 'SaaS without monetization strategy',
        severity: 'medium',
        mitigation: 'Consider freemium or subscription model',
      });
    }

    if (!formData.databasePreference && formData.userDataStorage) {
      issues.push({
        type: 'Architecture',
        description: 'User data storage without specified database',
        severity: 'high',
        mitigation: 'Select a database solution',
      });
    }
  }

  if (formData.category === 'marketplace') {
    if (formData.teamStructure !== 'multi-user-shared') {
      issues.push({
        type: 'Architecture',
        description: 'Marketplace typically requires multi-user support',
        severity: 'medium',
        mitigation: 'Enable multi-user with shared data',
      });
    }

    if (!formData.realtimeFeatures || formData.realtimeFeatures.length === 0) {
      issues.push({
        type: 'User Experience',
        description: 'Marketplace benefits from real-time updates',
        severity: 'low',
        mitigation: 'Consider adding live updates for listings',
      });
    }
  }
}

function assessAuthRisks(formData: FormData, issues: RiskAssessment['issues']): void {
  if (formData.authType === 'email-password') {
    if (!formData.securityRequirements || !formData.securityRequirements.includes('encryption')) {
      issues.push({
        type: 'Security',
        description: 'Email/password without encryption',
        severity: 'high',
        mitigation: 'Add encryption for sensitive data',
      });
    }
  }

  if (formData.authType === 'oauth' && (!formData.oauthProviders || formData.oauthProviders.length === 0)) {
    issues.push({
      type: 'Configuration',
      description: 'OAuth selected but no providers specified',
      severity: 'medium',
      mitigation: 'Select OAuth providers (Google, GitHub, etc.)',
    });
  }

  if (formData.authType === 'magic-link' && !formData.authProvider) {
    issues.push({
      type: 'Configuration',
      description: 'Magic link without auth provider',
      severity: 'high',
      mitigation: 'Select Supabase or other auth provider',
    });
  }
}

function assessBackendRisks(formData: FormData, issues: RiskAssessment['issues']): void {
  if (formData.userDataStorage && !formData.databasePreference) {
    issues.push({
      type: 'Architecture',
      description: 'User data storage without database',
      severity: 'high',
      mitigation: 'Select a database solution',
    });
  }

  if (formData.fileUploads && formData.fileUploads.length > 0 && !formData.storageSolution) {
    issues.push({
      type: 'Architecture',
      description: 'File uploads without storage solution',
      severity: 'high',
      mitigation: 'Select a storage service (S3, Cloudinary, etc.)',
    });
  }

  if (formData.realtimeFeatures && formData.realtimeFeatures.length > 0 && !formData.realtimeSolution) {
    issues.push({
      type: 'Architecture',
      description: 'Real-time features without solution',
      severity: 'medium',
      mitigation: 'Select Supabase Realtime, Pusher, etc.',
    });
  }

  if (formData.paymentIntegration && formData.monetization === 'free') {
    issues.push({
      type: 'Business Logic',
      description: 'Payment integration with free model',
      severity: 'low',
      mitigation: 'Review monetization strategy',
    });
  }
}

function assessScalabilityRisks(formData: FormData, issues: RiskAssessment['issues']): void {
  if (formData.scalability === 'enterprise') {
    if (formData.databasePreference === 'firebase' || formData.databasePreference === 'mongodb') {
      issues.push({
        type: 'Scalability',
        description: 'NoSQL databases may not suit enterprise scale',
        severity: 'medium',
        mitigation: 'Consider PostgreSQL for complex relationships',
      });
    }

    if (!formData.securityRequirements || !formData.securityRequirements.includes('encryption')) {
      issues.push({
        type: 'Security',
        description: 'Enterprise scale requires encryption',
        severity: 'high',
        mitigation: 'Add encryption for data at rest and in transit',
      });
    }
  }

  if (formData.teamStructure === 'organization-hierarchy' && formData.scalability === 'mvp') {
    issues.push({
      type: 'Architecture',
      description: 'Organization hierarchy may be complex for MVP',
      severity: 'low',
      mitigation: 'Consider simplifying team structure initially',
    });
  }
}

function assessSecurityRisks(formData: FormData, issues: RiskAssessment['issues']): void {
  if (formData.userDataStorage) {
    if (!formData.securityRequirements || formData.securityRequirements.length === 0) {
      issues.push({
        type: 'Security',
        description: 'User data storage without security measures',
        severity: 'high',
        mitigation: 'Add authentication, encryption, and access controls',
      });
    }

    if (!formData.securityRequirements?.includes('encryption')) {
      issues.push({
        type: 'Security',
        description: 'User data without encryption',
        severity: 'high',
        mitigation: 'Implement encryption for sensitive data',
      });
    }

    if (formData.authType !== 'none' && !formData.securityRequirements?.includes('auth')) {
      issues.push({
        type: 'Security',
        description: 'Authentication without security best practices',
        severity: 'medium',
        mitigation: 'Implement OAuth 2.0 and proper session management',
      });
    }
  }

  if (formData.paymentIntegration && !formData.securityRequirements?.includes('encryption')) {
    issues.push({
      type: 'Security',
      description: 'Payment processing without encryption',
      severity: 'high',
      mitigation: 'Ensure PCI DSS compliance with payment provider',
    });
  }
}

function assessIntegrationRisks(formData: FormData, issues: RiskAssessment['issues']): void {
  if (formData.externalApis && formData.externalApis.length > 2000) {
    issues.push({
      type: 'Complexity',
      description: 'Many external APIs increase complexity',
      severity: 'medium',
      mitigation: 'Prioritize essential APIs, consider API aggregators',
    });
  }

  if (formData.calendarIntegration && formData.paymentIntegration) {
    issues.push({
      type: 'Complexity',
      description: 'Multiple integrations increase development time',
      severity: 'low',
      mitigation: 'Phase integrations, prioritize core features',
    });
  }
}

function assessTimelineRisks(formData: FormData, issues: RiskAssessment['issues']): void {
  const featureCount = formData.primaryFeatures.split('\n').filter(f => f.trim()).length;
  const secondaryFeatureCount = formData.secondaryFeatures.split('\n').filter(f => f.trim()).length;
  const totalFeatures = featureCount + secondaryFeatureCount;

  if (totalFeatures > 15 && formData.scalability === 'mvp') {
    issues.push({
      type: 'Scope',
      description: 'Many features for MVP',
      severity: 'medium',
      mitigation: 'Consider phased approach, prioritize core features',
    });
  }

  if (formData.testingStrategy && formData.testingStrategy.length > 3) {
    issues.push({
      type: 'Timeline',
      description: 'Comprehensive testing increases development time',
      severity: 'low',
      mitigation: 'Focus on critical testing for MVP',
    });
  }

  if (formData.monetization === 'subscription' && !formData.pricingTiers) {
    issues.push({
      type: 'Business Logic',
      description: 'Subscription model without pricing tiers',
      severity: 'medium',
      mitigation: 'Define pricing structure and tiers',
    });
  }
}

function calculateOverallRisk(issues: RiskAssessment['issues']): 'low' | 'medium' | 'high' {
  const highRisks = issues.filter(i => i.severity === 'high').length;
  const mediumRisks = issues.filter(i => i.severity === 'medium').length;

  if (highRisks >= 3 || (highRisks >= 2 && mediumRisks >= 3)) {
    return 'high';
  } else if (highRisks >= 1 || mediumRisks >= 2) {
    return 'medium';
  } else {
    return 'low';
  }
}

export function getRiskMitigationTips(formData: FormData): string[] {
  const tips: string[] = [];

  if (formData.userDataStorage && !formData.securityRequirements?.includes('encryption')) {
    tips.push('Implement end-to-end encryption for user data');
  }

  if (formData.category === 'ecommerce' && !formData.paymentIntegration) {
    tips.push('Integrate Stripe for secure payment processing');
  }

  if (formData.scalability === 'enterprise' && formData.databasePreference === 'firebase') {
    tips.push('Consider PostgreSQL or Supabase for enterprise-scale data');
  }

  if (formData.teamStructure === 'team-workspaces' && !formData.realtimeFeatures?.includes('collaborative-editing')) {
    tips.push('Add collaborative editing features for better team experience');
  }

  if (formData.category === 'web-app-saas' && !formData.monetization || formData.monetization === 'free') {
    tips.push('Define a monetization strategy (freemium, subscription, etc.)');
  }

  if (formData.authType === 'none' && formData.userDataStorage) {
    tips.push('Consider adding authentication for better security and user management');
  }

  if (formData.fileUploads && formData.fileUploads.length > 0 && !formData.storageSolution) {
    tips.push('Choose a cloud storage provider (AWS S3, Cloudinary, Supabase Storage)');
  }

  return tips;
}
