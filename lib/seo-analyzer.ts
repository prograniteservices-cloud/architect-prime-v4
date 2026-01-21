import type { FormData, SeoScore } from '@/types';

export function analyzeSeo(formData: FormData): SeoScore {
  const issues: SeoScore['issues'] = [];
  let score = 100;

  // Analyze meta tags
  if (!formData.seoRequirements || !formData.seoRequirements.includes('meta-tags')) {
    issues.push({
      type: 'Meta Tags',
      description: 'Meta tags missing (title, description)',
      impact: 'high',
    });
    score -= 15;
  }

  // Analyze sitemap
  if (!formData.seoRequirements || !formData.seoRequirements.includes('sitemap')) {
    issues.push({
      type: 'Sitemap',
      description: 'XML sitemap missing',
      impact: 'medium',
    });
    score -= 10;
  }

  // Analyze robots.txt
  if (!formData.seoRequirements || !formData.seoRequirements.includes('robots-txt')) {
    issues.push({
      type: 'Robots.txt',
      description: 'robots.txt missing',
      impact: 'low',
    });
    score -= 5;
  }

  // Analyze structured data
  if (!formData.seoRequirements || !formData.seoRequirements.includes('structured-data')) {
    issues.push({
      type: 'Structured Data',
      description: 'Schema.org structured data missing',
      impact: 'medium',
    });
    score -= 10;
  }

  // Analyze Open Graph tags
  if (!formData.seoRequirements || !formData.seoRequirements.includes('og-tags')) {
    issues.push({
      type: 'Open Graph',
      description: 'Open Graph tags missing (social sharing)',
      impact: 'medium',
    });
    score -= 10;
  }

  // Analyze performance
  if (!formData.performanceGoals || !formData.performanceGoals.includes('lighthouse-95')) {
    issues.push({
      type: 'Performance',
      description: 'Lighthouse 95+ target not set',
      impact: 'medium',
    });
    score -= 10;
  }

  if (!formData.performanceGoals || !formData.performanceGoals.includes('seo-optimized')) {
    issues.push({
      type: 'Performance',
      description: 'SEO optimization not explicitly requested',
      impact: 'low',
    });
    score -= 5;
  }

  // Analyze image optimization
  if (!formData.imageOptimization || !formData.imageOptimization.includes('webp')) {
    issues.push({
      type: 'Image Optimization',
      description: 'WebP format not specified',
      impact: 'low',
    });
    score -= 5;
  }

  // Analyze accessibility (affects SEO)
  if (!formData.accessibilityRequirements || !formData.accessibilityRequirements.includes('wcag-aa')) {
    issues.push({
      type: 'Accessibility',
      description: 'WCAG AA compliance not specified',
      impact: 'low',
    });
    score -= 5;
  }

  // Analyze hero section
  if (!formData.heroHeadline || formData.heroHeadline.length < 10) {
    issues.push({
      type: 'Content',
      description: 'Hero headline too short or missing',
      impact: 'high',
    });
    score -= 10;
  }

  if (!formData.heroHeadline || formData.heroHeadline.length > 100) {
    issues.push({
      type: 'Content',
      description: 'Hero headline too long',
      impact: 'low',
    });
    score -= 5;
  }

  // Analyze app name for SEO
  if (!formData.appName || formData.appName.length < 2) {
    issues.push({
      type: 'Content',
      description: 'App name too short',
      impact: 'high',
    });
    score -= 10;
  }

  if (!formData.appName || formData.appName.length > 50) {
    issues.push({
      type: 'Content',
      description: 'App name too long for SEO',
      impact: 'medium',
    });
    score -= 5;
  }

  // Analyze tagline
  if (!formData.tagline || formData.tagline.length < 10) {
    issues.push({
      type: 'Content',
      description: 'Tagline too short for SEO',
      impact: 'medium',
    });
    score -= 5;
  }

  if (!formData.tagline || formData.tagline.length > 150) {
    issues.push({
      type: 'Content',
      description: 'Tagline too long for SEO (ideal: 50-150 chars)',
      impact: 'low',
    });
    score -= 5;
  }

  // Analyze category-specific SEO needs
  if (formData.category === 'ecommerce') {
    if (!formData.keyUiComponents || !formData.keyUiComponents.includes('search')) {
      issues.push({
        type: 'User Experience',
        description: 'E-commerce sites benefit from search functionality',
        impact: 'medium',
      });
      score -= 5;
    }
  }

  if (formData.category === 'portfolio') {
    if (!formData.socialMediaIntegration || formData.socialMediaIntegration.length === 0) {
      issues.push({
        type: 'Social Signals',
        description: 'Portfolios benefit from social media integration',
        impact: 'low',
      });
      score -= 5;
    }
  }

  // Ensure score doesn't go below 0
  score = Math.max(0, score);

  return {
    score,
    grade: calculateGrade(score),
    issues: issues.sort((a, b) => {
      const impactOrder = { high: 0, medium: 1, low: 2 };
      return impactOrder[a.impact] - impactOrder[b.impact];
    }),
  };
}

function calculateGrade(score: number): string {
  if (score >= 90) return 'A';
  if (score >= 80) return 'B';
  if (score >= 70) return 'C';
  if (score >= 60) return 'D';
  return 'F';
}

export function getSeoRecommendations(formData: FormData): Array<{ priority: 'high' | 'medium' | 'low'; recommendation: string }> {
  const recommendations: Array<{ priority: 'high' | 'medium' | 'low'; recommendation: string }> = [];

  // High priority recommendations
  if (!formData.seoRequirements?.includes('meta-tags')) {
    recommendations.push({
      priority: 'high',
      recommendation: 'Add meta tags (title, description, keywords)',
    });
  }

  if (!formData.seoRequirements?.includes('structured-data')) {
    recommendations.push({
      priority: 'high',
      recommendation: 'Implement Schema.org structured data for rich snippets',
    });
  }

  if (!formData.seoRequirements?.includes('og-tags')) {
    recommendations.push({
      priority: 'high',
      recommendation: 'Add Open Graph tags for better social sharing',
    });
  }

  // Medium priority recommendations
  if (!formData.seoRequirements?.includes('sitemap')) {
    recommendations.push({
      priority: 'medium',
      recommendation: 'Create XML sitemap and submit to Google Search Console',
    });
  }

  if (!formData.seoRequirements?.includes('robots-txt')) {
    recommendations.push({
      priority: 'medium',
      recommendation: 'Add robots.txt to control crawler access',
    });
  }

  if (!formData.performanceGoals?.includes('lighthouse-95')) {
    recommendations.push({
      priority: 'medium',
      recommendation: 'Optimize for Lighthouse score 95+ (Core Web Vitals)',
    });
  }

  // Low priority recommendations
  if (!formData.imageOptimization?.includes('webp')) {
    recommendations.push({
      priority: 'low',
      recommendation: 'Use WebP format for better image compression',
    });
  }

  if (!formData.imageOptimization?.includes('next-image')) {
    recommendations.push({
      priority: 'low',
      recommendation: 'Use Next.js Image component for automatic optimization',
    });
  }

  if (!formData.accessibilityRequirements?.includes('wcag-aa')) {
    recommendations.push({
      priority: 'low',
      recommendation: 'Ensure WCAG AA compliance for better SEO ranking',
    });
  }

  return recommendations;
}

export function getSeoTips(formData: FormData): string[] {
  const tips: string[] = [];

  tips.push('Write descriptive, unique meta titles (50-60 characters)');
  tips.push('Create compelling meta descriptions (150-160 characters)');
  tips.push('Use semantic HTML (header, nav, main, article, footer)');
  tips.push('Optimize images with alt text and proper dimensions');
  tips.push('Use descriptive URLs (e.g., /products/blue-widgets)');
  tips.push('Create descriptive, keyword-rich headings (H1, H2, etc.)');
  tips.push('Add internal links to related content');
  tips.push('Ensure mobile-friendly design (responsive)');
  tips.push('Improve page load speed (under 2.5 seconds)');
  tips.push('Add canonical URLs to prevent duplicate content');

  if (formData.category === 'ecommerce') {
    tips.push('Add product reviews for user-generated content');
    tips.push('Implement breadcrumb navigation');
    tips.push('Add schema markup for products (price, availability, reviews)');
  }

  if (formData.category === 'blog-app') {
    tips.push('Add author bios and bylines');
    tips.push('Implement publish date and last modified dates');
    tips.push('Add article schema for better search results');
  }

  if (formData.category === 'portfolio') {
    tips.push('Add project descriptions with keywords');
    tips.push('Include case studies with results');
    tips.push('Add testimonials for social proof');
  }

  return tips;
}

export function getSeoChecklist(formData: FormData): Array<{ checked: boolean; item: string; category: string }> {
  return [
    {
      checked: !!formData.seoRequirements?.includes('meta-tags'),
      item: 'Meta tags (title, description)',
      category: 'Basic',
    },
    {
      checked: !!formData.seoRequirements?.includes('og-tags'),
      item: 'Open Graph tags',
      category: 'Basic',
    },
    {
      checked: !!formData.seoRequirements?.includes('sitemap'),
      item: 'XML sitemap',
      category: 'Technical',
    },
    {
      checked: !!formData.seoRequirements?.includes('robots-txt'),
      item: 'robots.txt',
      category: 'Technical',
    },
    {
      checked: !!formData.seoRequirements?.includes('structured-data'),
      item: 'Schema.org structured data',
      category: 'Advanced',
    },
    {
      checked: !!formData.performanceGoals?.includes('lighthouse-95'),
      item: 'Lighthouse 95+ score',
      category: 'Performance',
    },
    {
      checked: !!formData.imageOptimization?.includes('webp'),
      item: 'WebP image format',
      category: 'Performance',
    },
    {
      checked: !!formData.imageOptimization?.includes('next-image'),
      item: 'Next.js Image component',
      category: 'Performance',
    },
    {
      checked: !!formData.accessibilityRequirements?.includes('wcag-aa'),
      item: 'WCAG AA compliance',
      category: 'Accessibility',
    },
    {
      checked: !!formData.accessibilityRequirements?.includes('keyboard-nav'),
      item: 'Keyboard navigation',
      category: 'Accessibility',
    },
  ];
}
