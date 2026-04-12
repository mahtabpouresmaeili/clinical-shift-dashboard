type Props = React.InputHTMLAttributes<HTMLInputElement>;

export default function Input({ className = '', ...props }: Props) {
  return (
    <input
      {...props}
      className={`w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-200 ${className}`}
    />
  );
}
