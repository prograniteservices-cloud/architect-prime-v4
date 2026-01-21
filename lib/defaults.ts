import { FormData } from '@/types';
import { colorPresets } from './constants';

export const defaultFormData: FormData = {
  // Section 1: Project Vision
  appName: '',
  tagline: '',
  elevatorPitch: '',
  problemSolved: '',
  competitiveAdvantage: '',
  targetAudience: '',
  competitors: '',
  difficulty: 'advanced',

  // Section 2: Branding
  primaryColor: colorPresets[0].hex,
  accentColors: [],
  designVibe: [],
  typography: 'inter',
  logoAssets: '',
  brandVoice: 'professional',
  backgroundStyle: 'gradient',

  // Section 3: Product Type
  category: 'web-app-saas',
  authType: 'email-password',
  oauthProviders: [],
  authProvider: 'clerk',
  teamStructure: 'multi-user-shared',
  scalability: 'beta',
  expectedGrowth: '',

  // Section 4: Features
  primaryFeatures: '',
  secondaryFeatures: '',
  userFlows: '',
  monetization: 'freemium',
  pricingTiers: '',
  featurePriority: '',

  // Section 5: Backend
  userDataStorage: false,
  databasePreference: '',
  fileUploads: [],
  storageSolution: '',
  realtimeFeatures: [],
  realtimeSolution: '',
  calendarIntegration: '',
  paymentIntegration: '',
  emailNotifications: [],
  externalApis: '',
  apiRateLimiting: '',
  dataRetention: '',
  securityRequirements: [],

  // Section 6: Pages
  mustHavePages: '',
  navigationStructure: 'top-nav',
  heroHeadline: '',
  heroSubheadline: '',
  heroCta: '',
  heroImageStyle: 'gradient',
  keyUiComponents: [],
  seoRequirements: [],
  socialMediaIntegration: [],

  // Section 7: Design
  inspirations: '',
  mobileDesktop: 'mobile-first',
  animationPreferences: ['micro-interactions'],
  loadingPreference: 'skeletons',
  accessibilityRequirements: ['wcag-aa', 'keyboard-nav'],
  performanceGoals: ['instant'],
  imageOptimization: ['next-image', 'lazy-load'],

  // Section 8: Tech Stack
  additionalTechPreferences: '',
  avoidTech: '',
  databasePreference: '',
  cms: '',
  deploymentTarget: 'vercel',
  cicdRequirements: [],
  environmentVariables: '',
  testingStrategy: [],
  errorTracking: '',
  analyticsIntegration: '',

  // Section 9: Additional
  existingRepo: '',
  technicalConstraints: '',
  thirdPartyLibraries: '',
  knownLimitations: '',
  successMetrics: '',
  teamSize: '',
  budgetConstraints: '',
  timeline: '',
  maintenance: '',
};
