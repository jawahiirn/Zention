export type ColorTag = string;

export interface ColorDefinition {
  color: string;
  id: string;
  tags: ColorTag[];
}

/**
 * Flat array of handpicked color definitions.
 *
 * Each entry can be tagged for multiple use cases (CREATE_WORKSPACE, CREATE_TAG, etc.).
 * Filter by tag to get the color set for a specific feature.
 *
 * Add new entries + new tags as new features emerge.
 */
export const COLOR_PALETTE: readonly ColorDefinition[] = [
  // ================================
  // Grey scale (UI surfaces, borders)
  // ================================
  { id: 'grey-25', color: 'rgb(252, 252, 252)', tags: ['UI', 'GREY'] },
  { id: 'grey-50', color: 'rgb(252, 252, 252)', tags: ['UI', 'GREY'] },
  { id: 'grey-100', color: 'rgb(249, 249, 249)', tags: ['UI', 'GREY'] },
  { id: 'grey-200', color: 'rgb(240, 240, 240)', tags: ['UI', 'GREY'] },
  { id: 'grey-300', color: 'rgb(232, 232, 232)', tags: ['UI', 'GREY'] },
  { id: 'grey-400', color: 'rgb(224, 224, 224)', tags: ['UI', 'GREY'] },
  { id: 'grey-500', color: 'rgb(217, 217, 217)', tags: ['UI', 'GREY'] },
  { id: 'grey-600', color: 'rgb(206, 206, 206)', tags: ['UI', 'GREY'] },
  { id: 'grey-700', color: 'rgb(187, 187, 187)', tags: ['UI', 'GREY'] },
  { id: 'grey-800', color: 'rgb(141, 141, 141)', tags: ['UI', 'GREY'] },
  { id: 'grey-900', color: 'rgb(131, 131, 131)', tags: ['UI', 'GREY'] },
  { id: 'grey-1000', color: 'rgb(100, 100, 100)', tags: ['UI', 'GREY'] },
  { id: 'grey-1100', color: 'rgb(32, 32, 32)', tags: ['UI', 'GREY'] },

  // ================================
  // Brand colors (800 – 1000)
  // ================================
  // Purple
  { id: 'purple-800', color: 'rgb(96, 73, 231)', tags: ['CREATE_WORKSPACE', 'CREATE_TAG'] },
  { id: 'purple-900', color: 'rgb(85, 62, 208)', tags: ['CREATE_WORKSPACE', 'CREATE_TAG'] },
  { id: 'purple-1000', color: 'rgb(90, 67, 214)', tags: ['CREATE_WORKSPACE', 'CREATE_TAG'] },
  // Neon blue
  { id: 'neon-blue-800', color: 'rgb(62, 99, 221)', tags: ['CREATE_WORKSPACE', 'CREATE_TAG'] },
  { id: 'neon-blue-900', color: 'rgb(58, 92, 204)', tags: ['CREATE_WORKSPACE', 'CREATE_TAG'] },
  { id: 'neon-blue-1000', color: 'rgb(52, 81, 178)', tags: ['CREATE_WORKSPACE', 'CREATE_TAG'] },
  // Azure blue
  { id: 'azure-blue-800', color: 'rgb(0, 145, 255)', tags: ['CREATE_WORKSPACE', 'CREATE_TAG'] },
  { id: 'azure-blue-900', color: 'rgb(8, 128, 234)', tags: ['CREATE_WORKSPACE', 'CREATE_TAG'] },
  { id: 'azure-blue-1000', color: 'rgb(11, 104, 203)', tags: ['CREATE_WORKSPACE', 'CREATE_TAG'] },
  // Teal
  { id: 'teal-800', color: 'rgb(18, 165, 148)', tags: ['CREATE_WORKSPACE', 'CREATE_TAG'] },
  { id: 'teal-900', color: 'rgb(14, 152, 136)', tags: ['CREATE_WORKSPACE', 'CREATE_TAG'] },
  { id: 'teal-1000', color: 'rgb(6, 122, 111)', tags: ['CREATE_WORKSPACE', 'CREATE_TAG'] },
  // Mint
  { id: 'mint-800', color: 'rgb(22, 192, 164)', tags: ['CREATE_WORKSPACE', 'CREATE_TAG'] },
  { id: 'mint-900', color: 'rgb(0, 180, 153)', tags: ['CREATE_WORKSPACE', 'CREATE_TAG'] },
  { id: 'mint-1000', color: 'rgb(0, 123, 101)', tags: ['CREATE_WORKSPACE', 'CREATE_TAG'] },
  // Green
  { id: 'green-800', color: 'rgb(48, 164, 108)', tags: ['CREATE_WORKSPACE', 'CREATE_TAG'] },
  { id: 'green-900', color: 'rgb(41, 151, 100)', tags: ['CREATE_WORKSPACE', 'CREATE_TAG'] },
  { id: 'green-1000', color: 'rgb(24, 121, 78)', tags: ['CREATE_WORKSPACE', 'CREATE_TAG'] },
  // Yellow
  { id: 'yellow-800', color: 'rgb(255, 197, 61)', tags: ['CREATE_WORKSPACE', 'CREATE_TAG'] },
  { id: 'yellow-900', color: 'rgb(255, 186, 26)', tags: ['CREATE_WORKSPACE', 'CREATE_TAG'] },
  { id: 'yellow-1000', color: 'rgb(145, 89, 48)', tags: ['CREATE_WORKSPACE', 'CREATE_TAG'] },
  // Orange
  { id: 'orange-800', color: 'rgb(247, 104, 8)', tags: ['CREATE_WORKSPACE', 'CREATE_TAG'] },
  { id: 'orange-900', color: 'rgb(237, 95, 0)', tags: ['CREATE_WORKSPACE', 'CREATE_TAG'] },
  { id: 'orange-1000', color: 'rgb(153, 84, 58)', tags: ['CREATE_WORKSPACE', 'CREATE_TAG'] },
  // Red
  { id: 'red-800', color: 'rgb(229, 72, 77)', tags: ['CREATE_WORKSPACE', 'CREATE_TAG'] },
  { id: 'red-900', color: 'rgb(217, 61, 66)', tags: ['CREATE_WORKSPACE', 'CREATE_TAG'] },
  { id: 'red-1000', color: 'rgb(198, 42, 47)', tags: ['CREATE_WORKSPACE', 'CREATE_TAG'] },
  // Pink
  { id: 'pink-800', color: 'rgb(233, 61, 130)', tags: ['CREATE_WORKSPACE', 'CREATE_TAG'] },
  { id: 'pink-900', color: 'rgb(220, 49, 117)', tags: ['CREATE_WORKSPACE', 'CREATE_TAG'] },
  { id: 'pink-1000', color: 'rgb(203, 29, 99)', tags: ['CREATE_WORKSPACE', 'CREATE_TAG'] },
  // Violet
  { id: 'violet-800', color: 'rgb(171, 74, 186)', tags: ['CREATE_WORKSPACE', 'CREATE_TAG'] },
  { id: 'violet-900', color: 'rgb(164, 60, 180)', tags: ['CREATE_WORKSPACE', 'CREATE_TAG'] },
  { id: 'violet-1000', color: 'rgb(156, 43, 173)', tags: ['CREATE_WORKSPACE', 'CREATE_TAG'] },
  // Brown
  { id: 'brown-800', color: 'rgb(161, 128, 114)', tags: ['CREATE_WORKSPACE', 'CREATE_TAG'] },
  { id: 'brown-900', color: 'rgb(148, 116, 103)', tags: ['CREATE_WORKSPACE', 'CREATE_TAG'] },
  { id: 'brown-1000', color: 'rgb(125, 94, 84)', tags: ['CREATE_WORKSPACE', 'CREATE_TAG'] },
  // Ink
  { id: 'ink-800', color: 'rgb(0, 0, 0)', tags: ['CREATE_WORKSPACE', 'CREATE_TAG'] },
  { id: 'ink-900', color: 'rgb(45, 45, 50)', tags: ['CREATE_WORKSPACE', 'CREATE_TAG'] },
  { id: 'ink-1000', color: 'rgb(98, 99, 107)', tags: ['CREATE_WORKSPACE', 'CREATE_TAG'] },
  // Magenta
  { id: 'magenta-800', color: 'rgb(255, 2, 240)', tags: ['CREATE_WORKSPACE', 'CREATE_TAG'] },
  { id: 'magenta-900', color: 'rgb(241, 0, 227)', tags: ['CREATE_WORKSPACE', 'CREATE_TAG'] },
  { id: 'magenta-1000', color: 'rgb(193, 0, 182)', tags: ['CREATE_WORKSPACE', 'CREATE_TAG'] },
  // Bright purple
  { id: 'bright-purple-800', color: 'rgb(137, 48, 253)', tags: ['CREATE_WORKSPACE', 'CREATE_TAG'] },
  { id: 'bright-purple-900', color: 'rgb(122, 41, 227)', tags: ['CREATE_WORKSPACE', 'CREATE_TAG'] },
  { id: 'bright-purple-1000', color: 'rgb(122, 40, 247)', tags: ['CREATE_WORKSPACE', 'CREATE_TAG'] },
  // Cyan
  { id: 'cyan-800', color: 'rgb(65, 197, 242)', tags: ['CREATE_WORKSPACE', 'CREATE_TAG'] },
  { id: 'cyan-900', color: 'rgb(53, 186, 230)', tags: ['CREATE_WORKSPACE', 'CREATE_TAG'] },
  { id: 'cyan-1000', color: 'rgb(0, 123, 162)', tags: ['CREATE_WORKSPACE', 'CREATE_TAG'] },

  // ================================
  // Example: handpicked custom set
  // (grey-400, pink-200, purple-500)
  // ================================
  { id: 'grey-400', color: 'rgb(224, 224, 224)', tags: ['UI', 'CUSTOM_PALETTE_EXAMPLE'] },
  { id: 'pink-200', color: 'rgb(254, 239, 246)', tags: ['UI', 'CREATE_WORKSPACE', 'CUSTOM_PALETTE_EXAMPLE'] },
  { id: 'purple-500', color: 'rgb(202, 203, 255)', tags: ['ACCENT', 'CUSTOM_PALETTE_EXAMPLE'] },
] as const;

/**
 * Return all ColorDefinitions tagged with the given tag.
 */
export const getColors = (tag: ColorTag): ColorDefinition[] => COLOR_PALETTE.filter((c) => c.tags.includes(tag));

/**
 * Return a random rgb string from the set tagged with `tag`.
 * Falls back to a default color if no matches are found.
 */
export const getRandomColor = (tag: ColorTag): string => {
  const options = getColors(tag);
  if (options.length === 0) return 'rgb(90, 67, 214)';
  return options[Math.floor(Math.random() * options.length)].color;
};

/**
 * Return a random rgb string from the set tagged with `tag`,
 * avoiding any colors in `excluded`. Useful for sibling items
 * that should not share the same color.
 */
export const getRandomColorExcluding = (tag: ColorTag, excluded: string[]): string => {
  const options = getColors(tag).filter((c) => !excluded.includes(c.color));
  if (options.length === 0) return getRandomColor(tag);
  return options[Math.floor(Math.random() * options.length)].color;
};
