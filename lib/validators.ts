import { z } from 'zod';

// Section 1: Project Vision
export const section1Schema = z.object({
  appName: z.string().min(2, 'App name must be at least 2 characters'),
  tagline: z.string().min(5, 'Tagline must be at least 5 characters'),
  elevatorPitch: z.string().min(20, 'Elevator pitch must be at least 20 characters'),
  problemSolved: z.string().min(10, 'Problem solved must be at least 10 characters'),
  competitiveAdvantage: z.string().min(10, 'Competitive advantage must be at least 10 characters'),
  targetAudience: z.string().min(10, 'Target audience must be at least 10 characters'),
  competitors: z.string().optional(),
  difficulty: z.enum(['beginner', 'advanced', 'expert']),
});

// Section 2: Branding
export const section2Schema = z.object({
  primaryColor: z.string().min(7, 'Select a primary color'),
  accentColors: z.array(z.string()).max(3, 'Maximum 3 accent colors'),
  designVibe: z.array(z.string()).min(1, 'Select at least one design vibe'),
  typography: z.string().min(1, 'Select typography preference'),
  logoAssets: z.string().optional(),
  brandVoice: z.string().min(1, 'Select brand voice'),
  backgroundStyle: z.string().min(1, 'Select background style'),
});

// Section 3: Product Type
export const section3Schema = z.object({
  category: z.string().min(1, 'Select product category'),
  authType: z.string().min(1, 'Select authentication type'),
  oauthProviders: z.array(z.string()).optional(),
  authProvider: z.string().optional(),
  teamStructure: z.string().min(1, 'Select team structure'),
  scalability: z.string().min(1, 'Select scalability requirements'),
  expectedGrowth: z.string().optional(),
}).refine(
  (data) => {
    if (data.authType === 'oauth' || data.authType === 'social-login') {
      return data.authProvider && data.authProvider.length > 0;
    }
    return true;
  },
  {
    message: 'Auth provider is required for OAuth/social login',
    path: ['authProvider'],
  }
);

// Section 4: Features
export const section4Schema = z.object({
  primaryFeatures: z.string().min(20, 'Primary features must be at least 20 characters'),
  secondaryFeatures: z.string().optional(),
  userFlows: z.string().min(20, 'User flows must be at least 20 characters'),
  monetization: z.string().min(1, 'Select monetization model'),
  pricingTiers: z.string().optional(),
  featurePriority: z.string().optional(),
});

// Section 5: Backend
export const section5Schema = z.object({
  userDataStorage: z.boolean(),
  databasePreference: z.string().optional(),
  fileUploads: z.array(z.string()).optional(),
  storageSolution: z.string().optional(),
  realtimeFeatures: z.array(z.string()).optional(),
  realtimeSolution: z.string().optional(),
  calendarIntegration: z.string().optional(),
  paymentIntegration: z.string().optional(),
  emailNotifications: z.array(z.string()).optional(),
  externalApis: z.string().optional(),
  apiRateLimiting: z.string().optional(),
  dataRetention: z.string().optional(),
  securityRequirements: z.array(z.string()).optional(),
}).refine(
  (data) => {
    if (data.userDataStorage && !data.databasePreference) {
      return false;
    }
    return true;
  },
  {
    message: 'Database preference is required when storing user data',
    path: ['databasePreference'],
  }
).refine(
  (data) => {
    if (data.fileUploads && data.fileUploads.length > 0 && !data.storageSolution) {
      return false;
    }
    return true;
  },
  {
    message: 'Storage solution is required when enabling file uploads',
    path: ['storageSolution'],
  }
).refine(
  (data) => {
    if (data.realtimeFeatures && data.realtimeFeatures.length > 0 && !data.realtimeSolution) {
      return false;
    }
    return true;
  },
  {
    message: 'Real-time solution is required when enabling real-time features',
    path: ['realtimeSolution'],
  }
);

// Section 6: Pages
export const section6Schema = z.object({
  mustHavePages: z.string().min(10, 'Must have pages must be at least 10 characters'),
  navigationStructure: z.string().min(1, 'Select navigation structure'),
  heroHeadline: z.string().min(5, 'Hero headline must be at least 5 characters'),
  heroSubheadline: z.string().optional(),
  heroCta: z.string().optional(),
  heroImageStyle: z.string().min(1, 'Select hero image style'),
  keyUiComponents: z.array(z.string()).optional(),
  seoRequirements: z.array(z.string()).optional(),
  socialMediaIntegration: z.array(z.string()).optional(),
});

// Section 7: Design
export const section7Schema = z.object({
  inspirations: z.string().optional(),
  mobileDesktop: z.string().min(1, 'Select mobile or desktop first'),
  animationPreferences: z.array(z.string()).optional(),
  loadingPreference: z.string().min(1, 'Select loading preference'),
  accessibilityRequirements: z.array(z.string()).optional(),
  performanceGoals: z.array(z.string()).optional(),
  imageOptimization: z.array(z.string()).optional(),
});

// Section 8: Tech Stack
export const section8Schema = z.object({
  additionalTechPreferences: z.string().optional(),
  avoidTech: z.string().optional(),
  databasePreference: z.string().optional(),
  cms: z.string().optional(),
  deploymentTarget: z.string().min(1, 'Select deployment target'),
  cicdRequirements: z.array(z.string()).optional(),
  environmentVariables: z.string().optional(),
  testingStrategy: z.array(z.string()).optional(),
  errorTracking: z.string().optional(),
  analyticsIntegration: z.string().optional(),
});

// Section 9: Additional
export const section9Schema = z.object({
  existingRepo: z.string().optional(),
  technicalConstraints: z.string().optional(),
  thirdPartyLibraries: z.string().optional(),
  knownLimitations: z.string().optional(),
  successMetrics: z.string().optional(),
  teamSize: z.string().optional(),
  budgetConstraints: z.string().optional(),
  timeline: z.string().optional(),
  maintenance: z.string().optional(),
});

// Combined schema (for entire form)
export const formDataSchema = z.object({
  ...section1Schema.shape,
  ...section2Schema.shape,
  ...section3Schema.shape,
  ...section4Schema.shape,
  ...section5Schema.shape,
  ...section6Schema.shape,
  ...section7Schema.shape,
  ...section8Schema.shape,
  ...section9Schema.shape,
});

// Type inference
export type Section1FormData = z.infer<typeof section1Schema>;
export type Section2FormData = z.infer<typeof section2Schema>;
export type Section3FormData = z.infer<typeof section3Schema>;
export type Section4FormData = z.infer<typeof section4Schema>;
export type Section5FormData = z.infer<typeof section5Schema>;
export type Section6FormData = z.infer<typeof section6Schema>;
export type Section7FormData = z.infer<typeof section7Schema>;
export type Section8FormData = z.infer<typeof section8Schema>;
export type Section9FormData = z.infer<typeof section9Schema>;
export type FormDataType = z.infer<typeof formDataSchema>;
