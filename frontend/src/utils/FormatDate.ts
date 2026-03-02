export function formatDate(date: string | Date): string {
  const now = new Date();
  const then = new Date(date);
  const diff = Math.floor((now.getTime() - then.getTime()) / 1000);

  if (diff < 60) return "Ahora";
  if (diff < 3600) return `${Math.floor(diff / 60)} min`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} h`;
  if (diff < 604800) return `${Math.floor(diff / 86400)} d`;
  if (diff < 2592000) return `${Math.floor(diff / 604800)} sem`;
  if (diff < 31536000) return `${Math.floor(diff / 2592000)} mes`;
  return `${Math.floor(diff / 31536000)} año`;
}
