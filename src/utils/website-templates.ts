import { StudioElement } from '@/types/css-studio';

export interface WebsiteSectionTemplate {
  id: string;
  name: string;
  category: 'Hero' | 'Navbar' | 'Features' | 'Pricing' | 'Testimonials' | 'Footer' | 'Form';
  elements: Omit<StudioElement, 'id' | 'parentId'>[];
}

export const WEBSITE_SECTION_TEMPLATES: WebsiteSectionTemplate[] = [
  // Modern Hero Section Template
  {
    id: 'sec-hero-1',
    name: 'Modern Startup Hero',
    category: 'Hero',
    elements: [
      {
        name: 'Hero Section',
        type: 'hero',
        content: '',
        styles: {
          desktop: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '80px 32px',
            backgroundColor: '#090d16',
            borderRadius: '24px',
            gap: '20px',
            textAlign: 'center',
            width: '100%',
          },
          laptop: {},
          tablet: {},
          mobile: { padding: '40px 16px' },
        },
      },
    ],
  },
  // Features Grid Section
  {
    id: 'sec-features-1',
    name: '3-Card Feature Grid',
    category: 'Features',
    elements: [
      {
        name: 'Features Section',
        type: 'features',
        content: '',
        styles: {
          desktop: {
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '24px',
            padding: '60px 32px',
            backgroundColor: '#0f172a',
            borderRadius: '24px',
            width: '100%',
          },
          laptop: {},
          tablet: { gridTemplateColumns: 'repeat(2, 1fr)' },
          mobile: { gridTemplateColumns: '1fr' },
        },
      },
    ],
  },
  // Pricing Section Template
  {
    id: 'sec-pricing-1',
    name: 'Pro Pricing Tier',
    category: 'Pricing',
    elements: [
      {
        name: 'Pricing Card',
        type: 'pricing',
        content: 'Pro Tier - $29/mo',
        styles: {
          desktop: {
            display: 'flex',
            flexDirection: 'column',
            padding: '40px',
            borderRadius: '20px',
            backgroundColor: '#1e293b',
            color: '#ffffff',
            borderWidth: '2px',
            borderStyle: 'solid',
            borderColor: '#3b82f6',
            boxShadows: [{ id: 'p1', x: 0, y: 10, blur: 30, spread: 0, color: 'rgba(59, 130, 246, 0.3)', inset: false }],
          },
          laptop: {},
          tablet: {},
          mobile: {},
        },
      },
    ],
  },
];
