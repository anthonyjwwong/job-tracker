export const formatSalary = (num?: number | null) => {
  if (!num || null) return null;

  return `$${Math.round(num / 1000)}k`;
};
