# Architect Prime V3 (AP3)

A premium, AI-powered prompt builder designed to help founders and creators create detailed, high-quality prompts for AI coding agents.

## Features

### Core Functionality
- **Step-by-step questionnaire**: 9 comprehensive sections covering all aspects of app development
- **Template system**: 5 pre-built templates (SaaS MVP, E-commerce, Landing Page, Dashboard, Portfolio)
- **Smart inferences**: AI-powered suggestions for database, auth, storage, and more
- **Prompt generation**: Creates detailed, professional prompts optimized for AI coding agents

### UI/UX
- **Premium design**: Glassmorphism cards, smooth animations, micro-interactions
- **Dark mode by default**: Light/dark theme toggle with system preference
- **Progress tracking**: Visual progress bar, step indicators, milestones
- **Responsive design**: Mobile-first approach, perfect on all devices

### Advanced Features
- **Autosave**: LocalStorage + IndexedDB for offline support
- **Undo/Redo**: Full history management
- **Keyboard shortcuts**: Cmd/Ctrl + K for command palette, shortcuts for all actions
- **Voice input**: Web Speech API integration (opt-in)
- **Preview mode**: Real-time preview of generated prompt
- **Export options**: Multiple formats (Markdown, JSON, Plain Text, HTML)
- **Desktop save**: File System Access API to save all formats to desktop folder

### Insights
- **Cost estimation**: Monthly hosting/service cost breakdown
- **Time estimation**: MVP and production timeline estimates
- **Risk assessment**: Identify potential technical risks
- **SEO analysis**: Score and recommendations for SEO optimization
- **Smart suggestions**: AI-powered suggestions based on your selections

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS v4
- **Components**: shadcn/ui + Radix UI primitives
- **Animations**: Framer Motion
- **Forms**: react-hook-form + zod
- **State**: Zustand
- **Syntax Highlighting**: Shiki
- **Icons**: Lucide React

## Getting Started

### Prerequisites
- Node.js 20+ 
- npm or yarn or pnpm

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# Analytics (PostHog)
NEXT_PUBLIC_POSTHOG_KEY=your_posthog_key_here

# Optional: Analytics configuration
NEXT_PUBLIC_ANALYTICS_ENABLED=true
```

## Project Structure

```
architect-prime-v3/
├── app/                    # Next.js app directory
│   ├── layout.tsx          # Root layout with theme provider
│   ├── page.tsx            # Main application page
│   └── globals.css         # Global styles and theme variables
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── questionnaire/     # Questionnaire-related components
│   ├── progress/          # Progress tracking components
│   ├── theme/            # Theme-related components
│   ├── preview/           # Preview components
│   └── output/           # Output/export components
├── lib/                  # Utility libraries
│   ├── store.ts          # Zustand state management
│   ├── prompt-generator.ts # Prompt generation logic
│   ├── validators.ts      # Zod schemas
│   ├── inferences.ts     # Smart inference logic
│   ├── export-helpers.ts # Export functions
│   ├── autosave.ts       # Autosave logic
│   ├── keyboard-shortcuts.ts # Shortcuts definitions
│   ├── suggestions.ts    # AI suggestions engine
│   ├── cost-estimator.ts # Cost calculations
│   ├── time-estimator.ts # Timeline calculations
│   ├── risk-assessment.ts # Risk analysis
│   ├── seo-analyzer.ts  # SEO scoring
│   ├── analytics.ts      # PostHog integration
│   └── voice-input.ts    # Web Speech API
├── types/               # TypeScript definitions
├── templates/           # Pre-built templates
└── public/             # Static assets
```

## Questionnaire Sections

1. **Get Started**: Choose a template or start from scratch
2. **Project Vision & Identity**: App name, tagline, problem, audience, etc.
3. **Branding & Aesthetic**: Colors, typography, design vibe, brand voice
4. **Product Type & Scope**: Category, authentication, team structure, scalability
5. **Core Features & User Journey**: Features, user flows, monetization
6. **Backend Infrastructure**: Database, storage, real-time, integrations
7. **Pages & Navigation**: Pages, navigation structure, hero section, UI components
8. **Design Preferences**: Inspirations, mobile/desktop first, animations, accessibility
9. **Technical Stack & Deployment**: Framework, additional tech, deployment target
10. **Additional Context**: Constraints, libraries, timeline, metrics

## Usage

1. Open the application in your browser
2. Choose a template or start from scratch
3. Complete the questionnaire sections step by step
4. Generate your detailed AI prompt
5. Copy, download, or save to your desktop

### Keyboard Shortcuts

- `Cmd/Ctrl + K`: Open command palette
- `Cmd/Ctrl + S`: Save progress
- `Cmd/Ctrl + P`: Toggle preview
- `Cmd/Ctrl + /`: Show keyboard shortcuts
- `Cmd/Ctrl + Z`: Undo
- `Cmd/Ctrl + Shift + Z`: Redo
- `Arrow Left/Right`: Navigate sections
- `Escape`: Close modals/dialogs

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Credits

Built with ❤️ using Next.js, Tailwind CSS, shadcn/ui, and modern web technologies.

---

**Architect Prime V3** - Transform your ideas into production-ready apps with the power of AI.
