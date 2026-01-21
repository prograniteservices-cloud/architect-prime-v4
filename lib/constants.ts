import { ColorPreset, Vibe } from '@/types';

export const colorPresets: ColorPreset[] = [
  { name: 'Electric Violet', hex: '#8B5CF6', gradient: 'from-violet-500 via-purple-500 to-indigo-600' },
  { name: 'Neon Cyan', hex: '#06B6D4', gradient: 'from-cyan-400 via-blue-500 to-indigo-500' },
  { name: 'Sunset Orange', hex: '#F97316', gradient: 'from-orange-500 via-red-500 to-rose-600' },
  { name: 'Forest Green', hex: '#10B981', gradient: 'from-emerald-500 via-green-500 to-teal-600' },
  { name: 'Rose Gold', hex: '#EC4899', gradient: 'from-pink-500 via-rose-500 to-red-500' },
  { name: 'Midnight Blue', hex: '#6366F1', gradient: 'from-indigo-500 via-blue-600 to-violet-700' },
  { name: 'Solar Yellow', hex: '#EAB308', gradient: 'from-yellow-500 via-amber-500 to-orange-500' },
  { name: 'Coral Pink', hex: '#F43F5E', gradient: 'from-rose-500 via-pink-600 to-fuchsia-600' },
  { name: 'Arctic Blue', hex: '#0EA5E9', gradient: 'from-sky-400 via-blue-500 to-cyan-600' },
  { name: 'Emerald Teal', hex: '#14B8A6', gradient: 'from-teal-500 via-emerald-500 to-green-600' },
];

export const vibeOptions: { value: Vibe; label: string; description: string }[] = [
  { value: 'modern-minimal', label: 'Modern & Minimal', description: 'Clean, sleek, with generous white space' },
  { value: 'bold-playful', label: 'Bold & Playful', description: 'Vibrant colors, creative, energetic' },
  { value: 'corporate-professional', label: 'Corporate & Professional', description: 'Polished, trustworthy, business-focused' },
  { value: 'futuristic-cyberpunk', label: 'Futuristic & Cyberpunk', description: 'Dark, neon, tech-forward' },
  { value: 'warm-natural', label: 'Warm & Natural', description: 'Organic, earthy, approachable' },
  { value: 'dark-moody', label: 'Dark & Moody', description: 'Sophisticated, dramatic, intense' },
  { value: 'retro-vintage', label: 'Retro & Vintage', description: 'Nostalgic, classic, timeless' },
  { value: 'luxury-premium', label: 'Luxury & Premium', description: 'Elegant, exclusive, high-end' },
];

export const typographyOptions = [
  { value: 'inter', label: 'Clean/Sans-serif (Inter)', description: 'Modern, readable, neutral' },
  { value: 'geist', label: 'Geist', description: 'Clean, tech-focused, modern' },
  { value: 'cabinet-grotesk', label: 'Condensed/Bold (Cabinet Grotesk)', description: 'Bold, impactful, unique' },
  { value: 'playfair', label: 'Elegant/Serif (Playfair)', description: 'Sophisticated, editorial, premium' },
  { value: 'jetbrains', label: 'Tech/Mono (JetBrains Mono)', description: 'Technical, precise, developer-focused' },
];

export const brandVoiceOptions = [
  { value: 'professional', label: 'Professional', description: 'Formal, trustworthy, authoritative' },
  { value: 'friendly', label: 'Friendly', description: 'Approachable, warm, conversational' },
  { value: 'quirky', label: 'Quirky', description: 'Playful, unique, memorable' },
  { value: 'authoritative', label: 'Authoritative', description: 'Expert, confident, direct' },
  { value: 'casual', label: 'Casual', description: 'Relaxed, informal, relatable' },
  { value: 'technical', label: 'Technical', description: 'Precise, detailed, jargon-friendly' },
];

export const categoryOptions = [
  { value: 'landing-page', label: 'Landing Page / Marketing Site' },
  { value: 'web-app-saas', label: 'Web App / SaaS' },
  { value: 'internal-tool', label: 'Internal Tool' },
  { value: 'ecommerce', label: 'E-commerce Store' },
  { value: 'portfolio', label: 'Portfolio / Showcase' },
  { value: 'blog-app', label: 'Blog + App Hybrid' },
  { value: 'marketplace', label: 'Marketplace' },
  { value: 'dashboard', label: 'Dashboard / Analytics' },
  { value: 'other', label: 'Other' },
];

export const authTypeOptions = [
  { value: 'none', label: 'None (Public access)' },
  { value: 'email-password', label: 'Email + Password' },
  { value: 'magic-link', label: 'Magic Link (email-based)' },
  { value: 'oauth', label: 'OAuth (Google, GitHub, etc.)' },
  { value: 'social-login', label: 'Social Media Login' },
];

export const authProviderOptions = [
  { value: 'clerk', label: 'Clerk (Recommended)', description: 'User authentication, fast setup' },
  { value: 'supabase', label: 'Supabase Auth', description: 'Open-source, includes database' },
  { value: 'auth0', label: 'Auth0', description: 'Enterprise-grade, comprehensive' },
  { value: 'nextauth', label: 'NextAuth.js', description: 'Custom, flexible, open-source' },
  { value: 'custom', label: 'Custom Implementation', description: 'Full control, more work' },
];

export const teamStructureOptions = [
  { value: 'single-user', label: 'Single User' },
  { value: 'multi-user-shared', label: 'Multi-user with shared data' },
  { value: 'team-workspaces', label: 'Team-based workspaces' },
  { value: 'organization-hierarchy', label: 'Organization hierarchy' },
];

export const scalabilityOptions = [
  { value: 'mvp', label: 'MVP/Prototype (1-10 users)' },
  { value: 'beta', label: 'Beta (10-100 users)' },
  { value: 'production', label: 'Production (100-1000 users)' },
  { value: 'enterprise', label: 'Enterprise (1000+ users)' },
];

export const monetizationOptions = [
  { value: 'free', label: 'Free (No monetization)' },
  { value: 'freemium', label: 'Freemium (Free + Paid tiers)' },
  { value: 'subscription', label: 'Subscription (Monthly/Yearly)' },
  { value: 'one-time', label: 'One-time Purchase' },
  { value: 'usage-based', label: 'Usage-based Pricing' },
  { value: 'ads', label: 'Advertisement-supported' },
];

export const databaseOptions = [
  { value: 'supabase', label: 'Supabase (PostgreSQL + Realtime)' },
  { value: 'postgresql', label: 'PostgreSQL (Self-hosted)' },
  { value: 'firebase', label: 'Firebase Firestore' },
  { value: 'mongodb', label: 'MongoDB Atlas' },
  { value: 'planetscale', label: 'PlanetScale (MySQL serverless)' },
  { value: 'prisma', label: 'Prisma ORM (with PostgreSQL/MySQL)' },
];

export const storageOptions = [
  { value: 's3', label: 'AWS S3' },
  { value: 'cloudinary', label: 'Cloudinary' },
  { value: 'supabase-storage', label: 'Supabase Storage' },
  { value: 'firebase-storage', label: 'Firebase Storage' },
];

export const realtimeOptions = [
  { value: 'supabase-realtime', label: 'Supabase Realtime' },
  { value: 'pusher', label: 'Pusher' },
  { value: 'socket.io', label: 'Socket.io' },
  { value: 'firebase-realtime', label: 'Firebase Realtime Database' },
];

export const calendarOptions = [
  { value: 'cal-api', label: 'Cal.com API' },
  { value: 'google-calendar', label: 'Google Calendar API' },
  { value: 'custom-db', label: 'Custom Database Logic' },
];

export const emailOptions = [
  { value: 'resend', label: 'Resend' },
  { value: 'sendgrid', label: 'SendGrid' },
  { value: 'novu', label: 'Novu (Multi-channel)' },
  { value: 'ses', label: 'Amazon SES' },
];

export const paymentOptions = [
  { value: 'stripe', label: 'Stripe' },
  { value: 'paypal', label: 'PayPal' },
  { value: 'paddle', label: 'Paddle' },
];

export const navigationStructureOptions = [
  { value: 'top-nav', label: 'Top Navigation Bar' },
  { value: 'sidebar', label: 'Sidebar Navigation' },
  { value: 'bottom-nav', label: 'Bottom Navigation (Mobile)' },
  { value: 'hamburger', label: 'Hamburger Menu' },
  { value: 'mixed', label: 'Mixed (Desktop: Sidebar, Mobile: Bottom Nav)' },
];

export const heroImageStyleOptions = [
  { value: 'illustration', label: 'Illustration' },
  { value: 'screenshot', label: 'Screenshot / Mockup' },
  { value: 'gradient', label: 'Gradient / Abstract' },
  { value: '3d', label: '3D Graphics' },
  { value: 'photo', label: 'Photography' },
  { value: 'video', label: 'Video Background' },
];

export const deploymentOptions = [
  { value: 'vercel', label: 'Vercel (Recommended)', description: 'Optimized for Next.js, fast deployments' },
  { value: 'netlify', label: 'Netlify', description: 'Great for static sites, free tier' },
  { value: 'aws', label: 'AWS / Cloud Provider', description: 'Full control, scalable' },
  { value: 'self-hosted', label: 'Self-hosted (Docker)', description: 'Maximum control, requires maintenance' },
];

export const loadingPreferenceOptions = [
  { value: 'skeletons', label: 'Skeletons (Skeleton Loading)' },
  { value: 'spinners', label: 'Spinners (Traditional Loading)' },
  { value: 'progressive', label: 'Progressive (Content Loads Gradually)' },
];

export const mobileDesktopOptions = [
  { value: 'mobile-first', label: 'Mobile-First' },
  { value: 'desktop-first', label: 'Desktop-First' },
];

export const backgroundStyleOptions = [
  { value: 'gradient', label: 'Gradient' },
  { value: 'solid', label: 'Solid Color' },
  { value: 'pattern', label: 'Pattern / Texture' },
  { value: 'animated', label: 'Animated / Moving' },
];

export const featureOptions = [
  { value: 'pricing-tables', label: 'Pricing Tables' },
  { value: 'feature-grids', label: 'Feature Grids' },
  { value: 'testimonials', label: 'Testimonials Carousel' },
  { value: 'faq-accordion', label: 'FAQ Accordion' },
  { value: 'newsletter', label: 'Newsletter Signup' },
  { value: 'dark-mode-toggle', label: 'Dark Mode Toggle' },
  { value: 'command-palette', label: 'Command Palette (Cmd+K)' },
  { value: 'search', label: 'Search Functionality' },
  { value: 'user-settings', label: 'User Settings Panel' },
  { value: 'notifications', label: 'Notification Center' },
  { value: 'onboarding', label: 'Onboarding Flow' },
  { value: 'team-invite', label: 'Team Invitation System' },
];

export const animationOptions = [
  { value: 'micro-interactions', label: 'Micro-interactions (Hover, Focus)' },
  { value: 'page-transitions', label: 'Page Transitions' },
  { value: 'scroll-animations', label: 'Scroll Animations' },
  { value: 'hero-animations', label: 'Hero Section Animations' },
  { value: 'none', label: 'No Animations (Reduced Motion)' },
];

export const accessibilityOptions = [
  { value: 'wcag-aa', label: 'WCAG AA Compliance' },
  { value: 'keyboard-nav', label: 'Full Keyboard Navigation' },
  { value: 'screen-reader', label: 'Screen Reader Support' },
  { value: 'high-contrast', label: 'High Contrast Mode' },
  { value: 'reduced-motion', label: 'Reduced Motion Support' },
];

export const performanceOptions = [
  { value: 'instant', label: 'Must Feel Instant' },
  { value: 'lighthouse-95', label: 'Lighthouse Score 95+' },
  { value: 'seo-optimized', label: 'SEO Optimized' },
  { value: 'fast-loading', label: 'Fast Loading (Under 2s)' },
];

export const seoOptions = [
  { value: 'meta-tags', label: 'Meta Tags (Title, Description)' },
  { value: 'sitemap', label: 'XML Sitemap' },
  { value: 'robots-txt', label: 'robots.txt' },
  { value: 'structured-data', label: 'Structured Data (Schema.org)' },
  { value: 'og-tags', label: 'Open Graph Tags (Social Media)' },
];

export const socialMediaOptions = [
  { value: 'twitter', label: 'Twitter / X' },
  { value: 'linkedin', label: 'LinkedIn' },
  { value: 'facebook', label: 'Facebook' },
  { value: 'instagram', label: 'Instagram' },
  { value: 'share-buttons', label: 'Social Share Buttons' },
];

export const testingOptions = [
  { value: 'unit', label: 'Unit Tests' },
  { value: 'integration', label: 'Integration Tests' },
  { value: 'e2e', label: 'End-to-End Tests (Playwright/Cypress)' },
  { value: 'visual', label: 'Visual Regression Tests' },
];

export const errorTrackingOptions = [
  { value: 'sentry', label: 'Sentry' },
  { value: 'logrocket', label: 'LogRocket' },
  { value: 'custom', label: 'Custom Error Logging' },
];

export const analyticsOptions = [
  { value: 'posthog', label: 'PostHog' },
  { value: 'mixpanel', label: 'Mixpanel' },
  { value: 'amplitude', label: 'Amplitude' },
  { value: 'ga4', label: 'Google Analytics 4' },
];

export const cicdOptions = [
  { value: 'github-actions', label: 'GitHub Actions' },
  { value: 'vercel-ci', label: 'Vercel CI/CD' },
  { value: 'jenkins', label: 'Jenkins' },
];

export const securityOptions = [
  { value: 'gdpr', label: 'GDPR Compliance' },
  { value: 'hipaa', label: 'HIPAA Compliance' },
  { value: 'soc2', label: 'SOC 2 Compliance' },
  { value: 'encryption', label: 'Data Encryption (At Rest & In Transit)' },
  { value: 'auth', label: 'Secure Authentication' },
];

export const imageOptimizationOptions = [
  { value: 'next-image', label: 'Next.js Image Component' },
  { value: 'webp', label: 'WebP Format' },
  { value: 'lazy-load', label: 'Lazy Loading' },
  { value: 'responsive', label: 'Responsive Images' },
];

export const totalSteps = 10; // Template selector + 9 sections
