import { StudioProject, StudioElement } from '@/types/css-studio';

export const DEFAULT_ROOT_ELEMENT: StudioElement = {
  id: 'root-canvas',
  name: 'Canvas Container',
  type: 'container',
  parentId: null,
  children: ['default-button-1'],
  styles: {
    desktop: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px',
      gap: '24px',
      minHeight: '400px',
      width: '100%',
      backgroundColor: '#0f172a',
      borderRadius: '16px',
    },
    laptop: {},
    tablet: {},
    mobile: {
      padding: '20px',
    },
  },
};

export const DEFAULT_INITIAL_BUTTON: StudioElement = {
  id: 'default-button-1',
  name: 'Primary Button',
  type: 'button',
  parentId: 'root-canvas',
  children: [],
  content: 'Click Me ✨',
  styles: {
    desktop: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '12px 28px',
      fontSize: '16px',
      fontWeight: '600',
      color: '#ffffff',
      backgroundColor: '#3b82f6',
      borderWidth: '0px',
      borderRadius: '10px',
      boxShadows: [
        {
          id: 's1',
          x: 0,
          y: 4,
          blur: 14,
          spread: 0,
          color: 'rgba(59, 130, 246, 0.4)',
          inset: false,
        },
      ],
    },
    laptop: {},
    tablet: {},
    mobile: {
      width: '100%',
    },
  },
  hoverStyles: {
    backgroundColor: '#2563eb',
    translateY: -2,
    boxShadows: [
      {
        id: 's2',
        x: 0,
        y: 8,
        blur: 20,
        spread: 0,
        color: 'rgba(59, 130, 246, 0.6)',
        inset: false,
      },
    ],
  },
  activeStyles: {
    translateY: 1,
    scaleX: 0.98,
    scaleY: 0.98,
  },
};

export const DEFAULT_PROJECT: StudioProject = {
  id: 'project-default',
  name: 'My Studio Design',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  elements: [DEFAULT_ROOT_ELEMENT, DEFAULT_INITIAL_BUTTON],
  rootElementId: 'root-canvas',
  cssVariables: [
    { id: 'v1', name: '--primary-color', value: '#3b82f6' },
    { id: 'v2', name: '--primary-hover', value: '#2563eb' },
    { id: 'v3', name: '--bg-dark', value: '#0f172a' },
    { id: 'v4', name: '--radius-main', value: '10px' },
  ],
  useVariables: false,
};

export const COMPONENT_PRESETS: { name: string; category: string; element: Omit<StudioElement, 'id' | 'parentId'> }[] = [
  // Buttons
  {
    name: '3D Gradient Button',
    category: 'Buttons',
    element: {
      name: '3D Button',
      type: 'button',
      content: 'Elevate Design 🚀',
      presetTag: '3d-button',
      styles: {
        desktop: {
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '14px 32px',
          fontSize: '16px',
          fontWeight: '700',
          color: '#ffffff',
          gradientType: 'linear',
          gradientAngle: 135,
          gradientStops: [
            { id: 'g1', color: '#8b5cf6', position: 0 },
            { id: 'g2', color: '#ec4899', position: 100 },
          ],
          borderRadius: '12px',
          boxShadows: [
            { id: 'b1', x: 0, y: 8, blur: 0, spread: 0, color: '#6d28d9', inset: false },
            { id: 'b2', x: 0, y: 12, blur: 24, spread: 0, color: 'rgba(236, 72, 153, 0.4)', inset: false },
          ],
        },
        laptop: {},
        tablet: {},
        mobile: {},
      },
      hoverStyles: {
        translateY: -2,
      },
      activeStyles: {
        translateY: 4,
        boxShadows: [{ id: 'b1', x: 0, y: 2, blur: 0, spread: 0, color: '#6d28d9', inset: false }],
      },
    },
  },

  // Glassmorphism Card
  {
    name: 'Glassmorphism Card',
    category: 'Cards',
    element: {
      name: 'Glass Card',
      type: 'card',
      content: 'Glassmorphism UI Container',
      presetTag: 'glassmorphism',
      styles: {
        desktop: {
          display: 'flex',
          flexDirection: 'column',
          padding: '32px',
          width: '320px',
          borderRadius: '20px',
          backgroundColor: 'rgba(255, 255, 255, 0.08)',
          backdropFilter: 'blur(16px)',
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: 'rgba(255, 255, 255, 0.2)',
          boxShadows: [
            { id: 'gc1', x: 0, y: 20, blur: 40, spread: 0, color: 'rgba(0, 0, 0, 0.37)', inset: false },
            { id: 'gc2', x: 0, y: 0, blur: 0, spread: 1, color: 'rgba(255, 255, 255, 0.1)', inset: true },
          ],
          color: '#ffffff',
        },
        laptop: {},
        tablet: {},
        mobile: {
          width: '100%',
        },
      },
    },
  },

  // Neumorphism Card
  {
    name: 'Neumorphism Soft Card',
    category: 'Cards',
    element: {
      name: 'Neumorphism Card',
      type: 'card',
      content: 'Soft UI Neumorphism Box',
      presetTag: 'neumorphism',
      styles: {
        desktop: {
          display: 'flex',
          flexDirection: 'column',
          padding: '32px',
          width: '300px',
          borderRadius: '24px',
          backgroundColor: '#e0e5ec',
          color: '#2d3748',
          boxShadows: [
            { id: 'neu1', x: 9, y: 9, blur: 16, spread: 0, color: '#a3b1c6', inset: false },
            { id: 'neu2', x: -9, y: -9, blur: 16, spread: 0, color: '#ffffff', inset: false },
          ],
        },
        laptop: {},
        tablet: {},
        mobile: {},
      },
    },
  },

  // Glowing Animated Card
  {
    name: 'Glowing Neon Border Card',
    category: 'Cards',
    element: {
      name: 'Neon Glowing Card',
      type: 'card',
      content: 'Cyberpunk Neon Cyber Box',
      presetTag: 'neon',
      styles: {
        desktop: {
          display: 'flex',
          flexDirection: 'column',
          padding: '28px',
          width: '320px',
          borderRadius: '16px',
          backgroundColor: '#090d16',
          color: '#00f0ff',
          borderWidth: '2px',
          borderStyle: 'solid',
          borderColor: '#00f0ff',
          boxShadows: [
            { id: 'neon1', x: 0, y: 0, blur: 20, spread: 2, color: 'rgba(0, 240, 255, 0.6)', inset: false },
            { id: 'neon2', x: 0, y: 0, blur: 10, spread: 1, color: '#00f0ff', inset: true },
          ],
        },
        laptop: {},
        tablet: {},
        mobile: {},
      },
      hoverStyles: {
        boxShadows: [
          { id: 'neon1', x: 0, y: 0, blur: 35, spread: 4, color: 'rgba(0, 240, 255, 0.9)', inset: false },
        ],
      },
    },
  },
];
