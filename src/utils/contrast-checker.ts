export function calculateContrastRatio(hexColor1: string, hexColor2: string): number {
  const getLuminance = (hex: string) => {
    let rgb = hex.replace('#', '');
    if (rgb.length === 3) {
      rgb = rgb.split('').map((c) => c + c).join('');
    }
    const r = parseInt(rgb.substring(0, 2), 16) / 255;
    const g = parseInt(rgb.substring(2, 4), 16) / 255;
    const b = parseInt(rgb.substring(4, 6), 16) / 255;

    const a = [r, g, b].map((v) => {
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
  };

  try {
    const l1 = getLuminance(hexColor1);
    const l2 = getLuminance(hexColor2);
    const brightest = Math.max(l1, l2);
    const darkest = Math.min(l1, l2);
    return (brightest + 0.05) / (darkest + 0.05);
  } catch (e) {
    return 4.5;
  }
}

export function getContrastRating(ratio: number): { passAA: boolean; passAAA: boolean; label: string } {
  const passAA = ratio >= 4.5;
  const passAAA = ratio >= 7;
  let label = 'Fail';
  if (passAAA) label = '✓ AAA Pass (Great contrast)';
  else if (passAA) label = '✓ AA Pass (Good contrast)';
  else label = '⚠ Poor Contrast';

  return { passAA, passAAA, label };
}
