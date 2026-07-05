import { Link } from 'react-router-dom';
import MaterialIcon from '../ui/MaterialIcon';

/**
 * Shared site header. Supports the few visual variations used across the
 * Stitch mockups (full nav + CTA, simplified nav, "secure session" badge)
 * through plain props instead of duplicating markup per page.
 */
export default function TopNavBar({
  showSchoolIcon = false,
  links = [],
  secureSessionLabel,
  right,
}) {
  return (
    <header className="w-full top-0 sticky bg-surface border-b border-outline-variant z-50">
      <div className="flex justify-between items-center h-16 px-md max-w-container-max mx-auto">
        <div className="flex items-center gap-sm">
          {showSchoolIcon && <MaterialIcon name="school" className="text-primary text-3xl" />}
          <Link to="/" className="font-headline-md text-headline-md font-bold text-primary">
            Conservatoire
          </Link>
        </div>

        {links.length > 0 && (
          <nav className="hidden md:flex gap-md items-center">
            {links.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className={
                  link.active
                    ? 'font-label-md text-label-md text-secondary border-b-2 border-secondary pb-1'
                    : 'font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors'
                }
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}

        {secureSessionLabel && (
          <div className="flex items-center gap-sm">
            <MaterialIcon name="lock" className="text-on-surface-variant" />
            <span className="font-label-md text-label-md text-on-surface-variant">
              {secureSessionLabel}
            </span>
          </div>
        )}

        {right && <div className="flex items-center gap-sm">{right}</div>}
      </div>
    </header>
  );
}
