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

/**
 * Used to surface the `message` field returned by ApiResponse on success,
 * or the normalized error message coming from parseApiError on failure.
 */
export default function Alert({ type = 'info', message, onClose, className = '' }) {
  if (!message) return null;
  const style = STYLES[type] ?? STYLES.info;

  return (
    <div
      role="alert"
      className={`animate-toast-in flex items-start gap-sm p-sm rounded-lg border ${style.wrapper} ${className}`}
    >
      <MaterialIcon name={style.icon} className={`${style.iconColor} text-xl`} />
      <p className="flex-grow font-label-md text-label-md">{message}</p>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Fermer"
          className="text-current opacity-70 hover:opacity-100 transition-opacity"
        >
          <MaterialIcon name="close" className="text-lg" />
        </button>
      )}
    </div>
  );
}
