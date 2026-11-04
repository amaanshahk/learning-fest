
const DESIGN_SEED = "AMAANNAAMA";

const ACCENTS = [
  {
    light: "#347568",
    dark: "#70A99A",
  },
  {
    light: "#3F7180",
    dark: "#83B8C2",
  },
  {
    light: "#596F91",
    dark: "#9BAFD2",
  },
] as const;

function hashSeed(seed: string): number {
  let hash = 2166136261;

  for (let i = 0; i < seed.length; i++) {
    hash ^= seed.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }

  return hash >>> 0;
}

const accentIndex = hashSeed(DESIGN_SEED) % ACCENTS.length;
const selectedAccent = ACCENTS[accentIndex];

export const designConfig = {
  accentLight: selectedAccent.light,
  accentDark: selectedAccent.dark,
};
