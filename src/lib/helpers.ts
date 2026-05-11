/**
 * Format a date to French locale string
 */
export function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Format a phone number for display
 */
export function formatPhone(phone: string): string {
  return phone.replace(/(\d{2})(?=\d)/g, "$1 ");
}

/**
 * Truncate text with ellipsis
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + "…";
}

/**
 * Generate className string from conditionals
 */
export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}
