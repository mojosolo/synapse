const proverbs = [
  "little strokes fell great oaks.",
  "you can't have a rainbow without a little rain.",
  // Add more proverbs as needed
];

export function embedProverb(): string {
  // Select a proverb at random
  const index = Math.floor(Math.random() * proverbs.length);
  return proverbs[index];
} 