import MaterialIcon from './MaterialIcon';

/**
 * Text input with label, optional leading icon and validation error state.
 * On error the border/ring turn red and a message appears below the field,
 * matching the design system's "Validation" component spec.
 */
export default function Input({
  label,
  id,
  error,
  icon,
  required,
  containerClassName = '',
  className = '',
  dir,
  ...rest
}) {
  return (
    <div className={`space-y-xs ${containerClassName}`}>
      {label && (
        <label
          htmlFor={id}
          className={`block font-label-md text-label-md text-on-surface ${dir === 'rtl' ? 'text-right' : ''}`}
        >
          {label}
          {required && <span className="text-error"> *</span>}
        </label>
      )}
      <div className="relative">
        {icon && (
          <MaterialIcon
            name={icon}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-lg pointer-events-none"
          />
        )}
        <input
          id={id}
          dir={dir}
          aria-invalid={Boolean(error)}
          className={`w-full bg-white border rounded p-sm outline-none transition-all focus:ring-2 ${
            icon ? 'pl-10' : ''
          } ${dir === 'rtl' ? 'text-right' : ''} ${
            error
              ? 'border-error text-error focus:ring-error/30 focus:border-error'
              : 'border-outline-variant focus:ring-secondary focus:border-secondary'
          } ${className}`}
          {...rest}
        />
      </div>
      {error && (
        <p className="flex items-center gap-1 font-label-sm text-label-sm text-error">
          <MaterialIcon name="error" className="text-sm" />
          {error}
        </p>
      )}
    </div>
  );
}
