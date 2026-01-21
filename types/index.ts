export type DifficultyLevel = 'beginner' | 'advanced' | 'expert';

export type Theme = 'dark' | 'light' | 'system';

export type BackgroundStyle = 'gradient' | 'solid' | 'pattern' | 'animated';

export type ExportFormat = 'markdown' | 'json' | 'plaintext' | 'html';

export type Vibe = 
  | 'modern-minimal'
  | 'bold-playful'
  | 'corporate-professional'
  | 'futuristic-cyberpunk'
  | 'warm-natural'
  | 'dark-moody'
  | 'retro-vintage'
  | 'luxury-premium';

export type ProductCategory = 
  | 'landing-page'
  | 'web-app-saas'
  | 'internal-tool'
  | 'ecommerce'
  | 'portfolio'
  | 'blog-app'
  | 'marketplace'
  | 'dashboard'
  | 'other';

export type AuthType = 
  | 'none'
  | 'email-password'
  | 'magic-link'
  | 'oauth'
  | 'social-login';

export type AuthProvider = 'clerk' | 'supabase' | 'auth0' | 'nextauth' | 'custom';

export type TeamStructure = 
  | 'single-user'
  | 'multi-user-shared'
  | 'team-workspaces'
  | 'organization-hierarchy';

export type Scalability = 
  | 'mvp'
  | 'beta'
  | 'production'
  | 'enterprise';

export type MonetizationModel = 
  | 'free'
  | 'freemium'
  | 'subscription'
  | 'one-time'
  | 'usage-based'
  | 'ads';

export type MobileDesktop = 'mobile-first' | 'desktop-first';

export type DeploymentTarget = 'vercel' | 'netlify' | 'aws' | 'self-hosted';

export type LoadingPreference = 'skeletons' | 'spinners' | 'progressive';

export type FeaturePriority = 'must-have' | 'should-have' | 'nice-to-have';

export interface ColorPreset {
  name: string;
  hex: string;
  gradient: string;
}

export interface Template {
  id: string;
  name: string;
  description: string;
  category: ProductCategory;
  icon: string;
  prefillData: Partial<FormData>;
}

export interface FormData {
  // Section 1: Project Vision
  appName: string;
  tagline: string;
  elevatorPitch: string;
  problemSolved: string;
  competitiveAdvantage: string;
  targetAudience: string;
  competitors: string;
  difficulty: DifficultyLevel;

  // Section 2: Branding
  primaryColor: string;
  accentColors: string[];
  designVibe: Vibe[];
  typography: string;
  logoAssets: string;
  brandVoice: string;
  backgroundStyle: BackgroundStyle;

  // Section 3: Product Type
  category: ProductCategory;
  authType: AuthType;
  oauthProviders: string[];
  authProvider: AuthProvider;
  teamStructure: TeamStructure;
  scalability: Scalability;
  expectedGrowth: string;

  // Section 4: Features
  primaryFeatures: string;
  secondaryFeatures: string;
  userFlows: string;
  monetization: MonetizationModel;
  pricingTiers: string;
  featurePriority: string;

  // Section 5: Backend
  userDataStorage: boolean;
  databasePreference: string;
  fileUploads: string[];
  storageSolution: string;
  realtimeFeatures: string[];
  realtimeSolution: string;
  calendarIntegration: string;
  paymentIntegration: string;
  emailNotifications: string[];
  externalApis: string;
  apiRateLimiting: string;
  dataRetention: string;
  securityRequirements: string[];

  // Section 6: Pages
  mustHavePages: string;
  navigationStructure: string;
  heroHeadline: string;
  heroSubheadline: string;
  heroCta: string;
  heroImageStyle: string;
  keyUiComponents: string[];
  seoRequirements: string[];
  socialMediaIntegration: string[];

  // Section 7: Design
  inspirations: string;
  mobileDesktop: MobileDesktop;
  animationPreferences: string[];
  loadingPreference: LoadingPreference;
  accessibilityRequirements: string[];
  performanceGoals: string[];
  imageOptimization: string[];

  // Section 8: Tech Stack
  additionalTechPreferences: string;
  avoidTech: string;
  databasePreference: string;
  cms: string;
  deploymentTarget: DeploymentTarget;
  cicdRequirements: string[];
  environmentVariables: string;
  testingStrategy: string[];
  errorTracking: string;
  analyticsIntegration: string;

  // Section 9: Additional
  existingRepo: string;
  technicalConstraints: string;
  thirdPartyLibraries: string;
  knownLimitations: string;
  successMetrics: string;
  teamSize: string;
  budgetConstraints: string;
  timeline: string;
  maintenance: string;
}

export interface AppState {
  formData: FormData;
  formDataHistory: FormData[];
  historyIndex: number;
  currentStep: number;
  totalSteps: number;
  isComplete: boolean;
  milestones: Milestone[];
  primaryColor: string;
  theme: Theme;
  backgroundStyle: BackgroundStyle;
  difficulty: DifficultyLevel;
  template: Template | null;
  autosaveEnabled: boolean;
  lastSavedAt: Date | null;
  voiceEnabled: boolean;
  previewMode: boolean;
  previewSection: string | null;
  focusMode: boolean;
  zenMode: boolean;
  highContrast: boolean;
  analyticsEnabled: boolean;
}

export interface Milestone {
  id: string;
  percentage: number;
  title: string;
  achieved: boolean;
  achievedAt?: Date;
}

export interface Suggestion {
  field: string;
  value: string;
  confidence: number;
  reason: string;
}

export interface CostEstimate {
  monthly: number;
  breakdown: {
    hosting: number;
    database: number;
    storage: number;
    email: number;
    other: number;
  };
}

export interface TimeEstimate {
  mvp: string;
  production: string;
  breakdown: {
    design: string;
    frontend: string;
    backend: string;
    testing: string;
    deployment: string;
  };
}

export interface RiskAssessment {
  level: 'low' | 'medium' | 'high';
  issues: {
    type: string;
    description: string;
    severity: 'low' | 'medium' | 'high';
    mitigation?: string;
  }[];
}

export interface SeoScore {
  score: number;
  grade: string;
  issues: {
    type: string;
    description: string;
    impact: 'low' | 'medium' | 'high';
  }[];
}

export interface KeyboardShortcut {
  keys: string;
  description: string;
  category: 'navigation' | 'actions' | 'settings' | 'export';
}

export interface Command {
  id: string;
  label: string;
  shortcut: string;
  action: () => void;
  category: 'navigation' | 'actions' | 'settings' | 'export' | 'help';
}

export interface ExportOptions {
  format: ExportFormat;
  filename: string;
  includeMetadata: boolean;
  includeTimestamp: boolean;
  includeDifficulty: boolean;
}
