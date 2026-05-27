function LotusIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 2C10.5 4 8 6 8 9c0 2.2 1.8 4 4 4s4-1.8 4-4c0-3-2.5-5-4-7zm0 14c-3.3 0-6 2.7-6 6h12c0-3.3-2.7-6-6-6z" />
    </svg>
  );
}

export default function LotusDivider() {
  return (
    <div className="lotus-divider my-8">
      <LotusIcon className="h-5 w-5 shrink-0 text-cyan" />
    </div>
  );
}
