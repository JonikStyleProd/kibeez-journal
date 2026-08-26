import React from 'react';
import { CheckCircle2, Info, Bookmark, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map(toast => (
        <div
          key={toast.id}
          className="pointer-events-auto flex items-center justify-between gap-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-3.5 text-sm text-[var(--text-primary)] shadow-2xl shadow-[var(--shadow-color)] transition-all animate-slide-up"
        >
          <div className="flex items-center gap-2.5">
            {toast.type === 'success' && <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />}
            {toast.type === 'bookmark' && <Bookmark className="h-4 w-4 text-blue-500 fill-blue-500/20 shrink-0" />}
            {toast.type === 'info' && <Info className="h-4 w-4 text-amber-500 shrink-0" />}
            <span className="font-medium text-[var(--text-secondary)]">{toast.message}</span>
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
