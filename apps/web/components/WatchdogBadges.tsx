import type { AlertSeverity, HealthStatus } from "@/lib/types";

const healthTone: Record<
  string,
  { border: string; text: string; color: string }
> = {
  Healthy: {
    border: "border-[var(--color-safe)]",
    text: "text-[var(--color-safe)]",
    color: "var(--color-safe)",
  },
  Degraded: {
    border: "border-[var(--color-warning)]",
    text: "text-[var(--color-warning)]",
    color: "var(--color-warning)",
  },
  Unresponsive: {
    border: "border-[var(--color-danger)]",
    text: "text-[var(--color-danger)]",
    color: "var(--color-danger)",
  },
};

/**
 * Statuses the watchdog contract reports, in severity order. The timeline
 * legend renders all of them so the palette is documented even when a status
 * does not appear in the current window.
 */
export const HEALTH_STATUSES = ["Healthy", "Degraded", "Unresponsive"] as const;

/** CSS color token for a health status, shared by the badge and the timeline. */
export function healthColor(status: HealthStatus): string {
  return healthTone[status]?.color ?? "var(--color-text-secondary)";
}

export function HealthBadge({ status }: { status: HealthStatus }) {
  const tone = healthTone[status] ?? {
    border: "border-[var(--color-border)]",
    text: "text-[var(--color-text-secondary)]",
    color: "var(--color-text-secondary)",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-xs font-medium ${tone.border} ${tone.text}`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${tone.text.replace("text-", "bg-")}`}
      />
      {status}
    </span>
  );
}

const severityTone: Record<AlertSeverity, { border: string; text: string }> = {
  Info: {
    border: "border-[var(--color-accent)]",
    text: "text-[var(--color-accent)]",
  },
  Warning: {
    border: "border-[var(--color-warning)]",
    text: "text-[var(--color-warning)]",
  },
  Critical: {
    border: "border-[var(--color-danger)]",
    text: "text-[var(--color-danger)]",
  },
};

export function SeverityBadge({ severity }: { severity: AlertSeverity }) {
  const tone = severityTone[severity] ?? severityTone.Info;
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${tone.border} ${tone.text}`}
    >
      {severity}
    </span>
  );
}
