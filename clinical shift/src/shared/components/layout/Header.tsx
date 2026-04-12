export default function Header() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex flex-col">
          <h1 className="text-lg font-semibold text-slate-900">
            Clinical Shift Dashboard
          </h1>
          <p className="text-xs text-slate-500">
            Real-time patient monitoring & task management
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm font-medium text-slate-900">Mahtab</p>
            <p className="text-xs text-slate-500">Frontend Engineer</p>
          </div>
        </div>
      </div>
    </header>
  );
}
