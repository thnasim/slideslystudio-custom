export function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function formatDate(input: string | Date): string {
  const date = typeof input === 'string' ? new Date(input) : input;
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export function categoryLabel(slug?: string): string {
  if (!slug) return '';
  return slug
    .split('-')
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join(' ');
}
