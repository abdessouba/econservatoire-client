import MaterialIcon from './MaterialIcon';

export default function PrivacyBanner({
  text = 'Vos données sont chiffrées et traitées conformément aux normes de protection de la vie privée en vigueur.',
  className = '',
}) {
  return (
    <div
      className={`bg-surface-container-low p-sm rounded border border-outline-variant flex items-center gap-sm ${className}`}
    >
      <MaterialIcon name="lock" className="text-primary" />
      <p className="font-label-sm text-label-sm text-on-surface-variant">{text}</p>
    </div>
  );
}
