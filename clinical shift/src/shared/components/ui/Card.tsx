interface Props {
  title?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
}

export default function Card({
  title,
  children,
  actions,
  className = "",
}: Props) {
  return (
    <div
      className={`rounded-2xl border border-slate-200 bg-white shadow-sm ${className}`}
    >
      {(title || actions) && (
        <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-5 py-4">
          {title && (
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
              {title}
            </h3>
          )}
          {actions}
        </div>
      )}

      <div className="p-5">{children}</div>
    </div>
  );
}