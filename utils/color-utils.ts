export function getContrastText(color: string): string {
  let r = 0,
    g = 0,
    b = 0;

  const rgbMatch = color.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
  if (rgbMatch) {
    r = Number(rgbMatch[1]);
    g = Number(rgbMatch[2]);
    b = Number(rgbMatch[3]);
  } else {
    const hex = color.replace('#', '');
    const hexMatch = hex.match(/^([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);
    if (hexMatch) {
      r = parseInt(hexMatch[1], 16);
      g = parseInt(hexMatch[2], 16);
      b = parseInt(hexMatch[3], 16);
    } else {
      return 'ffffff';
    }
  }

  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.55 ? '1a1a1a' : 'ffffff';
}
