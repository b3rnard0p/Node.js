/** Sentinela para Select sempre controlado (evita undefined → string). */
export const SELECT_EMPTY = "__none__" as const;

export function formatDateInput(raw: string | Date | undefined | null): string {
  if (raw == null || raw === "") {
    return new Date().toISOString().split("T")[0];
  }
  if (typeof raw === "object" && raw instanceof Date) {
    return raw.toISOString().split("T")[0];
  }
  const s = String(raw);
  return s.includes("T") ? s.split("T")[0] : s.slice(0, 10);
}

/** Time vindo da API (ex.: 10:30:00) para input type="time". */
export function formatTimeInput(raw: string | undefined | null): string {
  if (raw == null || raw === "") return "";
  const s = String(raw);
  return s.length >= 5 ? s.slice(0, 5) : s;
}
