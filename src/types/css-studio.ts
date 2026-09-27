export type ElementType =
  | 'button'
  | 'card'
  | 'input'
  | 'text'
  | 'image'
  | 'badge'
  | 'avatar'
  | 'navbar'
  | 'modal'
  | 'dropdown'
  | 'checkbox'
  | 'toggle'
  | 'container'
  | 'section'
  | 'row'
  | 'column'
  | 'heading'
  | 'paragraph'
  | 'hero'
  | 'features'
  | 'pricing'
  | 'testimonial'
  | 'footer'
  | 'accordion'
  | 'tabs'
  | 'form'
  | 'textarea'
  | 'select'
  | 'custom';

export type Breakpoint = 'desktop' | 'laptop' | 'tablet' | 'mobile';

export interface StudioPage {
  id: string;
  name: string;
  slug: string;
  rootElementId: string;
  elements: StudioElement[];
}

export interface GradientStop {
  id: string;
  color: string;
  position: number; // 0 to 100%
}

export interface BoxShadow {
  id: string;
  x: number;
  y: number;
  blur: number;
  spread: number;
  color: string;
  inset: boolean;
}

export interface KeyframeStep {
  percentage: number; // 0 to 100
  transform?: string;
  opacity?: number;
  backgroundColor?: string;
  filter?: string;
}

export interface AnimationConfig {
  name: string;
  duration: number; // in seconds
  delay: number; // in seconds
  timingFunction: string;
  iterationCount: string; // 'infinite' or number string
  direction: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse';
  fillMode: 'none' | 'forwards' | 'backwards' | 'both';
  playState: 'running' | 'paused';
  keyframes?: KeyframeStep[];
}

export interface ElementStyles {
  // Display & Flex/Grid
  display?: string;
  flexDirection?: string;
  flexWrap?: string;
  justifyContent?: string;
  alignItems?: string;
  alignContent?: string;
  alignSelf?: string;
  gap?: string;
  rowGap?: string;
  columnGap?: string;
  flexGrow?: number;
  flexShrink?: number;
  flexBasis?: string;
  gridTemplateColumns?: string;
  gridTemplateRows?: string;
  gridColumn?: string;
  gridRow?: string;

  // Position & Layout
  position?: string;
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
  zIndex?: number | string;
  overflow?: string;
  overflowX?: string;
  overflowY?: string;

  // Spacing & Sizing
  margin?: string;
  marginTop?: string;
  marginRight?: string;
  marginBottom?: string;
  marginLeft?: string;
  padding?: string;
  paddingTop?: string;
  paddingRight?: string;
  paddingBottom?: string;
  paddingLeft?: string;
  width?: string;
  height?: string;
  minWidth?: string;
  maxWidth?: string;
  minHeight?: string;
  maxHeight?: string;

  // Typography
  fontFamily?: string;
  fontSize?: string;
  fontWeight?: string;
  lineHeight?: string;
  letterSpacing?: string;
  textAlign?: string;
  textTransform?: string;
  textDecoration?: string;
  color?: string;
  whiteSpace?: string;
  wordBreak?: string;

  // Background
  backgroundColor?: string;
  gradientType?: 'none' | 'linear' | 'radial' | 'conic';
  gradientAngle?: number;
  gradientStops?: GradientStop[];
  backgroundImage?: string;
  backgroundSize?: string;
  backgroundPosition?: string;
  backgroundRepeat?: string;

  // Border & Corners
  borderWidth?: string;
  borderStyle?: string;
  borderColor?: string;
  borderRadius?: string;
  borderTopLeftRadius?: string;
  borderTopRightRadius?: string;
  borderBottomRightRadius?: string;
  borderBottomLeftRadius?: string;
  outline?: string;

  // Effects & Shadows
  boxShadows?: BoxShadow[];
  textShadow?: string;
  opacity?: number;
  filter?: string;
  backdropFilter?: string;

  // Transform
  translateX?: number;
  translateY?: number;
  scaleX?: number;
  scaleY?: number;
  rotate?: number;
  skewX?: number;
  skewY?: number;

  // Animation
  animation?: AnimationConfig;

  // Custom Raw CSS
  customCss?: string;
}

export interface StudioElement {
  id: string;
  name: string;
  type: ElementType;
  parentId?: string | null;
  children?: string[]; // Child element IDs
  content?: string; // Text content or inner HTML if simple text element
  src?: string; // Image or Avatar URL
  styles: Record<Breakpoint, ElementStyles>; // Styles per breakpoint
  hoverStyles?: ElementStyles;
  activeStyles?: ElementStyles;
  focusStyles?: ElementStyles;
  locked?: boolean;
  hidden?: boolean;
  presetTag?: string; // e.g. 'glassmorphism', 'neumorphism', '3d-button'
}

export interface CssVariable {
  id: string;
  name: string; // e.g. --primary-color
  value: string; // e.g. #2563eb
}

export interface StudioProject {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  elements: StudioElement[];
  rootElementId: string;
  cssVariables: CssVariable[];
  useVariables: boolean;
  pages?: StudioPage[];
  activePageId?: string;
}

export interface CssChallenge {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;
  targetStyles: Partial<ElementStyles>;
  targetHtml: string;
  previewImage?: string;
}
