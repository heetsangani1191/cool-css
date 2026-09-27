import { ElementStyles, StudioElement, CssVariable, Breakpoint } from '@/types/css-studio';

// Convert JS camelCase property names to CSS kebab-case
export function camelToKebab(str: string): string {
  return str.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
}

// Convert style object to CSS declarations
export function stylesToCssRules(styles: ElementStyles, indent = '  '): string[] {
  const rules: string[] = [];

  if (styles.display) rules.push(`${indent}display: ${styles.display};`);
  if (styles.flexDirection) rules.push(`${indent}flex-direction: ${styles.flexDirection};`);
  if (styles.flexWrap) rules.push(`${indent}flex-wrap: ${styles.flexWrap};`);
  if (styles.justifyContent) rules.push(`${indent}justify-content: ${styles.justifyContent};`);
  if (styles.alignItems) rules.push(`${indent}align-items: ${styles.alignItems};`);
  if (styles.alignContent) rules.push(`${indent}align-content: ${styles.alignContent};`);
  if (styles.alignSelf) rules.push(`${indent}align-self: ${styles.alignSelf};`);
  if (styles.gap) rules.push(`${indent}gap: ${styles.gap};`);
  if (styles.rowGap) rules.push(`${indent}row-gap: ${styles.rowGap};`);
  if (styles.columnGap) rules.push(`${indent}column-gap: ${styles.columnGap};`);
  if (styles.flexGrow !== undefined) rules.push(`${indent}flex-grow: ${styles.flexGrow};`);
  if (styles.flexShrink !== undefined) rules.push(`${indent}flex-shrink: ${styles.flexShrink};`);
  if (styles.flexBasis) rules.push(`${indent}flex-basis: ${styles.flexBasis};`);

  if (styles.gridTemplateColumns) rules.push(`${indent}grid-template-columns: ${styles.gridTemplateColumns};`);
  if (styles.gridTemplateRows) rules.push(`${indent}grid-template-rows: ${styles.gridTemplateRows};`);
  if (styles.gridColumn) rules.push(`${indent}grid-column: ${styles.gridColumn};`);
  if (styles.gridRow) rules.push(`${indent}grid-row: ${styles.gridRow};`);

  if (styles.position) rules.push(`${indent}position: ${styles.position};`);
  if (styles.top) rules.push(`${indent}top: ${styles.top};`);
  if (styles.right) rules.push(`${indent}right: ${styles.right};`);
  if (styles.bottom) rules.push(`${indent}bottom: ${styles.bottom};`);
  if (styles.left) rules.push(`${indent}left: ${styles.left};`);
  if (styles.zIndex !== undefined && styles.zIndex !== '') rules.push(`${indent}z-index: ${styles.zIndex};`);
  if (styles.overflow) rules.push(`${indent}overflow: ${styles.overflow};`);
  if (styles.overflowX) rules.push(`${indent}overflow-x: ${styles.overflowX};`);
  if (styles.overflowY) rules.push(`${indent}overflow-y: ${styles.overflowY};`);

  if (styles.margin) rules.push(`${indent}margin: ${styles.margin};`);
  if (styles.marginTop) rules.push(`${indent}margin-top: ${styles.marginTop};`);
  if (styles.marginRight) rules.push(`${indent}margin-right: ${styles.marginRight};`);
  if (styles.marginBottom) rules.push(`${indent}margin-bottom: ${styles.marginBottom};`);
  if (styles.marginLeft) rules.push(`${indent}margin-left: ${styles.marginLeft};`);

  if (styles.padding) rules.push(`${indent}padding: ${styles.padding};`);
  if (styles.paddingTop) rules.push(`${indent}padding-top: ${styles.paddingTop};`);
  if (styles.paddingRight) rules.push(`${indent}padding-right: ${styles.paddingRight};`);
  if (styles.paddingBottom) rules.push(`${indent}padding-bottom: ${styles.paddingBottom};`);
  if (styles.paddingLeft) rules.push(`${indent}padding-left: ${styles.paddingLeft};`);

  if (styles.width) rules.push(`${indent}width: ${styles.width};`);
  if (styles.height) rules.push(`${indent}height: ${styles.height};`);
  if (styles.minWidth) rules.push(`${indent}min-width: ${styles.minWidth};`);
  if (styles.maxWidth) rules.push(`${indent}max-width: ${styles.maxWidth};`);
  if (styles.minHeight) rules.push(`${indent}min-height: ${styles.minHeight};`);
  if (styles.maxHeight) rules.push(`${indent}max-height: ${styles.maxHeight};`);

  if (styles.fontFamily) rules.push(`${indent}font-family: ${styles.fontFamily};`);
  if (styles.fontSize) rules.push(`${indent}font-size: ${styles.fontSize};`);
  if (styles.fontWeight) rules.push(`${indent}font-weight: ${styles.fontWeight};`);
  if (styles.lineHeight) rules.push(`${indent}line-height: ${styles.lineHeight};`);
  if (styles.letterSpacing) rules.push(`${indent}letter-spacing: ${styles.letterSpacing};`);
  if (styles.textAlign) rules.push(`${indent}text-align: ${styles.textAlign};`);
  if (styles.textTransform) rules.push(`${indent}text-transform: ${styles.textTransform};`);
  if (styles.textDecoration) rules.push(`${indent}text-decoration: ${styles.textDecoration};`);
  if (styles.color) rules.push(`${indent}color: ${styles.color};`);
  if (styles.whiteSpace) rules.push(`${indent}white-space: ${styles.whiteSpace};`);
  if (styles.wordBreak) rules.push(`${indent}word-break: ${styles.wordBreak};`);

  // Background
  if (styles.gradientType && styles.gradientType !== 'none' && styles.gradientStops && styles.gradientStops.length >= 2) {
    const stopsStr = styles.gradientStops
      .sort((a, b) => a.position - b.position)
      .map((s) => `${s.color} ${s.position}%`)
      .join(', ');
    if (styles.gradientType === 'linear') {
      rules.push(`${indent}background: linear-gradient(${styles.gradientAngle ?? 90}deg, ${stopsStr});`);
    } else if (styles.gradientType === 'radial') {
      rules.push(`${indent}background: radial-gradient(circle, ${stopsStr});`);
    } else if (styles.gradientType === 'conic') {
      rules.push(`${indent}background: conic-gradient(from ${styles.gradientAngle ?? 0}deg, ${stopsStr});`);
    }
  } else if (styles.backgroundColor) {
    rules.push(`${indent}background-color: ${styles.backgroundColor};`);
  }

  if (styles.backgroundImage) rules.push(`${indent}background-image: url('${styles.backgroundImage}');`);
  if (styles.backgroundSize) rules.push(`${indent}background-size: ${styles.backgroundSize};`);
  if (styles.backgroundPosition) rules.push(`${indent}background-position: ${styles.backgroundPosition};`);
  if (styles.backgroundRepeat) rules.push(`${indent}background-repeat: ${styles.backgroundRepeat};`);

  // Border
  if (styles.borderWidth || styles.borderStyle || styles.borderColor) {
    rules.push(`${indent}border: ${styles.borderWidth || '1px'} ${styles.borderStyle || 'solid'} ${styles.borderColor || '#000000'};`);
  }
  if (styles.borderRadius) {
    rules.push(`${indent}border-radius: ${styles.borderRadius};`);
  } else {
    if (styles.borderTopLeftRadius) rules.push(`${indent}border-top-left-radius: ${styles.borderTopLeftRadius};`);
    if (styles.borderTopRightRadius) rules.push(`${indent}border-top-right-radius: ${styles.borderTopRightRadius};`);
    if (styles.borderBottomRightRadius) rules.push(`${indent}border-bottom-right-radius: ${styles.borderBottomRightRadius};`);
    if (styles.borderBottomLeftRadius) rules.push(`${indent}border-bottom-left-radius: ${styles.borderBottomLeftRadius};`);
  }
  if (styles.outline) rules.push(`${indent}outline: ${styles.outline};`);

  // Shadows
  if (styles.boxShadows && styles.boxShadows.length > 0) {
    const shadowStrs = styles.boxShadows.map((s) => `${s.inset ? 'inset ' : ''}${s.x}px ${s.y}px ${s.blur}px ${s.spread}px ${s.color}`);
    rules.push(`${indent}box-shadow: ${shadowStrs.join(', ')};`);
  }
  if (styles.textShadow) rules.push(`${indent}text-shadow: ${styles.textShadow};`);
  if (styles.opacity !== undefined && styles.opacity !== 1) rules.push(`${indent}opacity: ${styles.opacity};`);
  if (styles.filter) rules.push(`${indent}filter: ${styles.filter};`);
  if (styles.backdropFilter) rules.push(`${indent}backdrop-filter: ${styles.backdropFilter};`);

  // Transforms
  const transforms: string[] = [];
  if (styles.translateX || styles.translateY) transforms.push(`translate(${styles.translateX || 0}px, ${styles.translateY || 0}px)`);
  if (styles.scaleX !== undefined || styles.scaleY !== undefined) transforms.push(`scale(${styles.scaleX ?? 1}, ${styles.scaleY ?? 1})`);
  if (styles.rotate) transforms.push(`rotate(${styles.rotate}deg)`);
  if (styles.skewX || styles.skewY) transforms.push(`skew(${styles.skewX || 0}deg, ${styles.skewY || 0}deg)`);

  if (transforms.length > 0) {
    rules.push(`${indent}transform: ${transforms.join(' ')};`);
  }

  // Animation
  if (styles.animation && styles.animation.name) {
    const a = styles.animation;
    rules.push(`${indent}animation: ${a.name} ${a.duration}s ${a.timingFunction} ${a.delay}s ${a.iterationCount} ${a.direction} ${a.fillMode};`);
  }

  if (styles.customCss) {
    styles.customCss.split(';').forEach((line) => {
      const trimmed = line.trim();
      if (trimmed) rules.push(`${indent}${trimmed};`);
    });
  }

  return rules;
}

// Generate CSS for a single element including pseudo classes and media queries
export function generateElementCss(element: StudioElement, allElements: StudioElement[]): string {
  const className = `.${element.name.toLowerCase().replace(/[^a-z0-9_-]/g, '-')}`;
  let cssText = '';

  // Keyframes if animation exists
  const anim = element.styles.desktop?.animation;
  if (anim && anim.keyframes && anim.keyframes.length > 0) {
    cssText += `@keyframes ${anim.name} {\n`;
    anim.keyframes.forEach((step) => {
      cssText += `  ${step.percentage}% {\n`;
      if (step.transform) cssText += `    transform: ${step.transform};\n`;
      if (step.opacity !== undefined) cssText += `    opacity: ${step.opacity};\n`;
      if (step.backgroundColor) cssText += `    background-color: ${step.backgroundColor};\n`;
      if (step.filter) cssText += `    filter: ${step.filter};\n`;
      cssText += `  }\n`;
    });
    cssText += `}\n\n`;
  }

  // Desktop Base CSS
  const desktopRules = stylesToCssRules(element.styles.desktop || {});
  if (desktopRules.length > 0) {
    cssText += `${className} {\n${desktopRules.join('\n')}\n}\n\n`;
  }

  // Hover CSS
  if (element.hoverStyles) {
    const hoverRules = stylesToCssRules(element.hoverStyles);
    if (hoverRules.length > 0) {
      cssText += `${className}:hover {\n${hoverRules.join('\n')}\n}\n\n`;
    }
  }

  // Active CSS
  if (element.activeStyles) {
    const activeRules = stylesToCssRules(element.activeStyles);
    if (activeRules.length > 0) {
      cssText += `${className}:active {\n${activeRules.join('\n')}\n}\n\n`;
    }
  }

  // Focus CSS
  if (element.focusStyles) {
    const focusRules = stylesToCssRules(element.focusStyles);
    if (focusRules.length > 0) {
      cssText += `${className}:focus {\n${focusRules.join('\n')}\n}\n\n`;
    }
  }

  // Media Queries (Laptop, Tablet, Mobile)
  const breakpoints: { name: Breakpoint; media: string }[] = [
    { name: 'laptop', media: '@media (max-width: 1199px)' },
    { name: 'tablet', media: '@media (max-width: 991px)' },
    { name: 'mobile', media: '@media (max-width: 767px)' },
  ];

  breakpoints.forEach(({ name, media }) => {
    const bStyles = element.styles[name];
    if (bStyles) {
      const bRules = stylesToCssRules(bStyles);
      if (bRules.length > 0) {
        cssText += `${media} {\n  ${className} {\n  ${bRules.join('\n  ')}\n  }\n}\n\n`;
      }
    }
  });

  return cssText;
}

// Generate Full Project CSS Output
export function generateFullProjectCss(elements: StudioElement[], variables: CssVariable[], useVariables: boolean): string {
  let output = '/* Generated by CSS Studio - Visual CSS Playground */\n\n';

  if (useVariables && variables.length > 0) {
    output += ':root {\n';
    variables.forEach((v) => {
      output += `  ${v.name}: ${v.value};\n`;
    });
    output += '}\n\n';
  }

  elements.forEach((el) => {
    output += generateElementCss(el, elements);
  });

  return output.trim();
}

// Simple CSS Minifier
export function minifyCss(css: string): string {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\s+/g, ' ')
    .replace(/\s*([{}:;,])\s*/g, '$1')
    .replace(/;\}/g, '}')
    .trim();
}

// Generate HTML structure for an element and its children
export function generateElementHtml(element: StudioElement, allElements: StudioElement[], level = 0): string {
  const indent = '  '.repeat(level);
  const className = element.name.toLowerCase().replace(/[^a-z0-9_-]/g, '-');
  const children = (element.children || [])
    .map((childId) => allElements.find((el) => el.id === childId))
    .filter((el): el is StudioElement => !!el);

  let tag = 'div';
  if (element.type === 'button') tag = 'button';
  else if (element.type === 'section' || element.type === 'hero' || element.type === 'features' || element.type === 'pricing' || element.type === 'testimonial') tag = 'section';
  else if (element.type === 'footer') tag = 'footer';
  else if (element.type === 'heading') tag = 'h2';
  else if (element.type === 'paragraph') tag = 'p';
  else if (element.type === 'form') tag = 'form';
  else if (element.type === 'input') return `${indent}<input type="text" class="${className}" placeholder="${element.content || 'Type here...'}" />\n`;
  else if (element.type === 'textarea') return `${indent}<textarea class="${className}" placeholder="${element.content || 'Enter message...'}"></textarea>\n`;
  else if (element.type === 'image') return `${indent}<img class="${className}" src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80" alt="Preview Image" />\n`;
  else if (element.type === 'badge') tag = 'span';
  else if (element.type === 'navbar') tag = 'nav';

  let inner = '';
  if (element.content && children.length === 0) {
    inner = element.content;
  } else if (children.length > 0) {
    inner = '\n' + children.map((c) => generateElementHtml(c, allElements, level + 1)).join('') + indent;
  }

  return `${indent}<${tag} class="${className}">${inner}</${tag}>\n`;
}

// Generate Tailwind CSS equivalent preview (approximated for code toggle tab)
export function stylesToTailwind(styles: ElementStyles): string {
  const classes: string[] = [];
  if (styles.display === 'flex') classes.push('flex');
  if (styles.display === 'grid') classes.push('grid');
  if (styles.flexDirection === 'column') classes.push('flex-col');
  if (styles.justifyContent === 'center') classes.push('justify-center');
  if (styles.alignItems === 'center') classes.push('items-center');
  if (styles.padding) classes.push('p-4');
  if (styles.margin) classes.push('m-2');
  if (styles.borderRadius) classes.push('rounded-lg');
  if (styles.backgroundColor) classes.push(`bg-[${styles.backgroundColor}]`);
  if (styles.color) classes.push(`text-[${styles.color}]`);
  if (styles.boxShadows && styles.boxShadows.length > 0) classes.push('shadow-lg');
  return classes.join(' ') || 'p-4 rounded-md bg-blue-600 text-white';
}
