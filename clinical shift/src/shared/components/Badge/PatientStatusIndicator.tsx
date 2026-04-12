type PatientStatusType = "stable" | "monitoring" | "critical";

interface Props {
  status: PatientStatusType;
}

export default function PatientStatusIndicator({ status }: Props) {
  const styles = {
    stable: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    monitoring: "bg-amber-50 text-amber-700 border border-amber-200",
    critical: "bg-rose-50 text-rose-700 border border-rose-200",
  };

  const labels = {
    stable: "Stable",
    monitoring: "Monitoring",
    critical: "Critical",
  };

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${styles[status]}`}
    >
      {labels[status]}
    </span>
  );
}