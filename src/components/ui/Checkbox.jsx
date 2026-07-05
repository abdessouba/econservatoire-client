import MaterialIcon from './MaterialIcon';

export default function Checkbox({ label, id, error, highlight = false, className = '', ...rest }) {
  return (
    <div className={className}>
      <label
        htmlFor={id}
        className={`flex items-start gap-sm cursor-pointer group ${
          highlight ? 'p-sm bg-secondary-fixed/10 rounded-lg' : ''
        }`}
      >
        <input
          id={id}
          type="checkbox"
          aria-invalid={Boolean(error)}
          className={`mt-1 w-5 h-5 rounded focus:ring-secondary text-secondary ${
            error ? 'border-error' : 'border-outline-variant'
          }`}
          {...rest}
        />
        <span
          className={
            highlight
              ? 'font-label-md text-label-md text-on-secondary-fixed-variant'
              : 'font-body-md text-body-md text-on-surface'
          }
        >
          {label}
        </span>
      </label>
      {error && (
        <p className="flex items-center gap-1 font-label-sm text-label-sm text-error mt-1 ml-8">
          <MaterialIcon name="error" className="text-sm" />
          {error}
        </p>
      )}
    </div>
  );
}
