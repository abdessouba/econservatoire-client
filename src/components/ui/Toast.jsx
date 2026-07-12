import { useEffect, useState } from 'react';
import MaterialIcon from './MaterialIcon';

const STYLES = {
  success: {
    wrapper: 'bg-secondary-fixed/30 border-secondary-fixed-dim text-on-secondary-fixed-variant',
    icon: 'check_circle',
    iconColor: 'text-secondary',
  },
  error: {
    wrapper: 'bg-error-container border-error/30 text-on-error-container',
    icon: 'error',
    iconColor: 'text-error',
  },
  info: {
    wrapper: 'bg-surface-container-low border-outline-variant text-on-surface-variant',
    icon: 'info',
    iconColor: 'text-primary',
  },
};

const DISMISS_DELAY_MS = 4000;
const EXIT_ANIMATION_MS = 260;

export function Toast({ id, type = 'info', message, onDismiss }) {
  const [exiting, setExiting] = useState(false);
  const style = STYLES[type] ?? STYLES.info;

  const handleDismiss = () => {
    setExiting(true);
    setTimeout(() => onDismiss(id), EXIT_ANIMATION_MS);
  };

  useEffect(() => {
    const timer = setTimeout(handleDismiss, DISMISS_DELAY_MS);
    return () => clearTimeout(timer);
    // handleDismiss is stable for the lifetime of this toast
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      role="alert"
      className={`flex items-start gap-sm p-sm rounded-lg border shadow-md w-80 max-w-[90vw] ${style.wrapper} ${
        exiting ? 'animate-toast-out' : 'animate-toast-in'
      }`}
    >
      <MaterialIcon name={style.icon} className={`${style.iconColor} text-xl shrink-0 mt-[1px]`} />
      <p className="flex-grow font-label-md text-label-md">{message}</p>
      <button
        type="button"
        onClick={handleDismiss}
        aria-label="Fermer"
        className="text-current opacity-60 hover:opacity-100 transition-opacity shrink-0"
      >
        <MaterialIcon name="close" className="text-lg" />
      </button>
    </div>
  );
}

export function Toaster({ toasts, onDismiss }) {
  if (toasts.length === 0) return null;
  return (
    <div
      className="fixed top-4 right-4 z-[300] flex flex-col gap-sm pointer-events-none"
      aria-live="polite"
      aria-label="Notifications"
    >
      {toasts.map((toast) => (
        <div key={toast.id} className="pointer-events-auto">
          <Toast {...toast} onDismiss={onDismiss} />
        </div>
      ))}
    </div>
  );
}
