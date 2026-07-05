export default function Footer() {
  return (
    <footer className="w-full py-lg mt-xl bg-surface-dim border-t border-outline-variant">
      <div className="grid grid-cols-1 md:grid-cols-2 items-center px-md max-w-container-max mx-auto gap-md">
        <div>
          <span className="font-headline-sm text-headline-sm font-bold text-primary">
            Conservatoire
          </span>
          <p className="font-body-md text-body-md text-on-surface-variant mt-xs">
            © 2024 Conservatoire National de Musique. Tous droits réservés.
          </p>
        </div>
        <div className="flex flex-wrap gap-md md:justify-end">
          <a
            className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors"
            href="#"
          >
            Politique de confidentialité
          </a>
          <a
            className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors"
            href="#"
          >
            Accessibilité
          </a>
          <a
            className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors"
            href="#"
          >
            Conditions d'utilisation
          </a>
          <a
            className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors"
            href="#"
          >
            Contacter le support
          </a>
        </div>
      </div>
    </footer>
  );
}
