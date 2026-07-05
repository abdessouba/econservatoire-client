import MaterialIcon from './MaterialIcon';

const VARIANTS = {
  primary:
    'bg-secondary text-on-secondary hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed',
  dark: 'bg-primary text-on-primary hover:opacity-90 shadow-lg disabled:opacity-60 disabled:cursor-not-allowed',
  outline:
    'border border-primary text-primary hover:bg-surface-container-low disabled:opacity-50 disabled:cursor-not-allowed',
  ghost:
    'text-on-surface-variant hover:text-secondary disabled:opacity-50 disabled:cursor-not-allowed',
};

const SIZES = {
  sm: 'px-sm py-1.5 text-label-sm',
  md: 'px-lg py-sm text-label-md',
  lg: 'px-xl py-3 text-label-md',
};

/**
 * Shared button used across every page. Keeps the visual language defined in
 * the Stitch design system (rounded-lg, label font, icon + hover states).
 */
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'trailing',
  loading = false,
  fullWidth = false,
  className = '',
  type = 'button',
  ...rest
}) {
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center gap-sm rounded-lg font-label-md transition-all active:scale-[0.98] ${VARIANTS[variant]} ${SIZES[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
      disabled={loading || rest.disabled}
      {...rest}
    >
      {loading && <MaterialIcon name="sync" className="animate-spin" />}
      {!loading && icon && iconPosition === 'leading' && <MaterialIcon name={icon} />}
      <span>{children}</span>
      {!loading && icon && iconPosition === 'trailing' && <MaterialIcon name={icon} />}
    </button>
  );
}
