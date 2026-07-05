import MaterialIcon from './MaterialIcon';

export default function TextArea({
  label,
  id,
  error,
  required,
  containerClassName = '',
  className = '',
  ...rest
}) {
  return (
    <div className={`space-y-xs ${containerClassName}`}>
      {label && (
        <label htmlFor={id} className="block font-label-md text-label-md text-on-surface">
          {label}
          {required && <span className="text-error"> *</span>}
        </label>
      )}
      <textarea
        id={id}
        aria-invalid={Boolean(error)}
        className={`w-full bg-white border rounded p-sm outline-none transition-all focus:ring-2 ${
          error
            ? 'border-error text-error focus:ring-error/30 focus:border-error'
            : 'border-outline-variant focus:ring-secondary focus:border-secondary'
        } ${className}`}
        {...rest}
      />
      {error && (
        <p className="flex items-center gap-1 font-label-sm text-label-sm text-error">
          <MaterialIcon name="error" className="text-sm" />
          {error}
        </p>
      )}
    </div>
  );
}
