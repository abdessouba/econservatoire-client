import { Link, useNavigate } from 'react-router-dom';
import Footer from '../../components/layout/Footer';
import MaterialIcon from '../../components/ui/MaterialIcon';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { logoutEleve } from '../../api/eleveService';

const SIDEBAR_LINKS = [
  { icon: 'dashboard', label: 'Vue d\'ensemble', active: true },
  { icon: 'school', label: 'Mes Cours' },
  { icon: 'piano', label: 'Salles de Pratique' },
  { icon: 'account_balance_wallet', label: 'Aide Financière' },
  { icon: 'settings', label: 'Paramètres' },
];

const formatDate = (value) => {
  if (!value) return 'Non renseigné';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(date);
};

const formatDateTime = (value) => {
  if (!value) return 'Non renseigné';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};

const formatValue = (value) => value || 'Non renseigné';

function InfoCard({ icon, title, items }) {
  return (
    <div className="md:col-span-4 tonal-card rounded-xl p-md">
      <div className="flex items-center gap-sm mb-md">
        <MaterialIcon name={icon} className="text-secondary" />
        <h3 className="font-headline-sm text-headline-sm text-on-surface">{title}</h3>
      </div>
      <div className="space-y-md">
        {items.map((item) => (
          <div key={item.label}>
            <p className="font-label-sm text-on-surface-variant uppercase tracking-wider">
              {item.label}
            </p>
            <p
              className={
                item.highlight
                  ? 'font-body-md text-secondary font-semibold break-words'
                  : 'font-body-md text-on-surface font-semibold break-words whitespace-pre-line'
              }
            >
              {formatValue(item.value)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const account = user?.data ?? user ?? null;

  const fullName = [account?.prenom, account?.nom].filter(Boolean).join(' ').trim();
  const arabicFullName = [account?.prenom_ar, account?.nom_ar].filter(Boolean).join(' ').trim();
  const displayName = fullName || 'Profil étudiant';
  const isVerified = Boolean(account?.valide);
  const photoUrl = typeof account?.photo === 'string' ? account.photo : null;
  const initials = [account?.prenom?.[0], account?.nom?.[0]].filter(Boolean).join('') || '??';

  const identityItems = [
    { label: 'Nom complet', value: displayName },
    { label: 'Nom complet en arabe', value: arabicFullName },
    { label: 'Sexe', value: formatValue(account?.sexe) },
    { label: 'Date de naissance', value: formatDate(account?.date_naissance) },
    { label: 'Lieu de naissance', value: formatValue(account?.lieu_naissance) },
    { label: 'Pays', value: formatValue(account?.pay?.nom_pay) },
  ];

  const contactItems = [
    { label: 'E-mail', value: account?.email, highlight: true },
    { label: 'Téléphone mobile', value: account?.mobile },
    { label: 'Téléphone fixe', value: account?.fixe },
    { label: 'Adresse', value: account?.adresse },
    { label: 'CIN', value: account?.cin },
  ];

  const familyItems = [
    { label: 'Nom du père', value: account?.nom_pere },
    { label: 'Profession du père', value: account?.profession_pere },
    { label: 'Culture du parent', value: account?.parent_culture },
    { label: 'DRPP parent', value: account?.drpp_parent },
    { label: 'Lien de parenté', value: account?.lien_parente },
  ];

  const accountItems = [
    { label: 'Identifiant interne', value: account?.id },
    { label: 'Compte vérifié', value: isVerified ? 'Oui' : 'Non' },
    { label: 'Créé le', value: formatDateTime(account?.created_at) },
  ];

  const handleLogout = async () => {
    try {
      await logoutEleve();
      logout();
      showToast('success', 'Vous avez été déconnecté avec succès.');
    } catch {
      logout();
      showToast('info', 'Votre session a été fermée.');
    }
    navigate('/connexion', { replace: true });
  };

  return (
    <div className="bg-surface min-h-screen">
      {/* SideNavBar */}
      <aside className="h-screen w-64 fixed left-0 top-0 bg-surface-container-low border-r border-outline-variant flex flex-col py-md px-sm gap-xs z-50">
        <div className="mb-lg px-xs">
          <h1 className="font-headline-sm text-headline-sm font-bold text-on-surface">
            Portail Étudiant
          </h1>
          <p className="font-body-md text-label-sm text-on-surface-variant">
            Année Académique 2024-25
          </p>
        </div>
        <nav className="flex-grow space-y-1">
          {SIDEBAR_LINKS.map((link) => (
            <a
              key={link.label}
              href="#"
              className={
                link.active
                  ? 'flex items-center gap-sm px-sm py-2 bg-secondary-container text-on-secondary-container font-bold rounded-lg translate-x-1 duration-200'
                  : 'flex items-center gap-sm px-sm py-2 text-on-surface-variant hover:bg-surface-container-high transition-all rounded-lg'
              }
            >
              <MaterialIcon name={link.icon} />
              <span className="font-label-md text-label-md">{link.label}</span>
            </a>
          ))}
        </nav>
        <div className="mt-auto space-y-1 border-t border-outline-variant pt-md">
          <button className="w-full mb-md px-sm py-2 bg-secondary text-on-secondary font-label-md rounded-lg hover:opacity-90 transition-opacity">
            S'inscrire aux Examens
          </button>
          <a
            href="#"
            className="flex items-center gap-sm px-sm py-2 text-on-surface-variant hover:bg-surface-container-high transition-all rounded-lg"
          >
            <MaterialIcon name="help" />
            <span className="font-label-md text-label-md">Support</span>
          </a>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-sm px-sm py-2 text-on-surface-variant hover:bg-surface-container-high transition-all rounded-lg"
          >
            <MaterialIcon name="logout" />
            <span className="font-label-md text-label-md">Déconnexion</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="ml-64 min-h-screen">
        <header className="w-full top-0 sticky bg-surface border-b border-outline-variant z-40">
          <div className="flex justify-between items-center h-16 px-md max-w-container-max mx-auto">
            <div className="flex items-center gap-lg">
              <Link to="/" className="font-headline-md text-headline-md font-bold text-primary">
                Conservatoire
              </Link>
              <nav className="hidden md:flex gap-md">
                <a
                  className="font-label-md text-label-md text-secondary border-b-2 border-secondary pb-1"
                  href="#"
                >
                  Tableau de bord
                </a>
                <a
                  className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors"
                  href="#"
                >
                  Admissions
                </a>
                <a
                  className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors"
                  href="#"
                >
                  Académique
                </a>
                <a
                  className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors"
                  href="#"
                >
                  Performances
                </a>
              </nav>
            </div>
            <div className="flex items-center gap-md">
              <div className="relative">
                <MaterialIcon
                  name="search"
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-outline"
                />
                <input
                  className="pl-10 pr-4 py-1.5 bg-surface-container-low border border-outline-variant rounded-full text-label-md focus:ring-2 focus:ring-secondary focus:border-secondary outline-none w-64"
                  placeholder="Rechercher des ressources..."
                  type="text"
                />
              </div>
              <button
                onClick={handleLogout}
                className="bg-primary text-on-primary px-sm py-2 rounded-lg font-label-md hover:opacity-90 transition-opacity"
              >
                Déconnexion
              </button>
            </div>
          </div>
        </header>

        <div className="max-w-container-max mx-auto px-md py-lg">
          {/* Profile Header */}
          <section
            className={`rounded-xl p-md mb-md flex flex-col md:flex-row items-center gap-md border shadow-sm ${
              isVerified
                ? 'bg-emerald-50 border-emerald-200'
                : 'bg-amber-50 border-amber-200'
            }`}
          >
            <div className="relative">
              {photoUrl ? (
                <img
                  src={photoUrl}
                  alt={displayName}
                  className="w-32 h-32 rounded-full border-4 border-white shadow-sm object-cover"
                />
              ) : (
                <div className="w-32 h-32 rounded-full border-4 border-white shadow-sm bg-surface-container-high flex items-center justify-center text-secondary">
                  <span className="font-headline-md text-display-lg">{initials}</span>
                </div>
              )}
              <div
                className={`absolute bottom-1 right-1 w-7 h-7 rounded-full border-4 border-white flex items-center justify-center ${
                  isVerified ? 'bg-emerald-500' : 'bg-amber-500'
                }`}
              >
                <MaterialIcon
                  name={isVerified ? 'verified' : 'schedule'}
                  className="text-white text-[14px]"
                />
              </div>
            </div>
            <div className="flex-grow text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center gap-sm mb-xs">
                <h2 className="font-display-lg text-headline-md text-on-surface">
                  {displayName}
                </h2>
                <span
                  className={`px-3 py-1 rounded-full font-label-sm text-xs inline-flex items-center gap-1 self-center md:self-auto ${
                    isVerified
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  <MaterialIcon
                    name={isVerified ? 'verified' : 'warning'}
                    className="text-[14px]"
                  />
                  {isVerified ? 'Compte vérifié' : 'Compte en attente'}
                </span>
              </div>
              <p className="font-body-md text-on-surface-variant max-w-2xl mb-sm">
                {isVerified
                  ? 'Votre compte est vérifié. Vous pouvez accéder à votre portail et consulter vos informations personnelles en toute sécurité.'
                  : 'Votre compte n\u2019est pas encore vérifié. Certaines fonctionnalités peuvent rester limitées jusqu\u2019à validation.'}
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-xs">
                <span className="flex items-center gap-1 font-label-sm text-secondary">
                  <MaterialIcon name={isVerified ? 'verified' : 'info'} className="text-sm" />
                  {isVerified ? 'Identité vérifiée' : 'Identité en cours de vérification'}
                </span>
                <span className="mx-2 text-outline">|</span>
                <span className="flex items-center gap-1 font-label-sm text-on-surface-variant">
                  <MaterialIcon name="event" className="text-sm" />
                  Inscrit le {formatDate(account?.created_at)}
                </span>
              </div>
            </div>
            <div className="flex gap-sm">
              <button className="bg-secondary text-on-secondary px-md py-2 rounded-lg font-label-md flex items-center gap-2 hover:opacity-90 transition-opacity">
                <MaterialIcon name="edit" /> Modifier le profil
              </button>
            </div>
          </section>

          {/* Data Privacy Banner */}
          <div className="bg-surface-container-low border border-outline-variant px-md py-sm rounded-lg flex items-center gap-sm mb-md">
            <MaterialIcon name="lock" className="text-primary" />
            <p className="font-label-sm text-on-surface-variant">
              Vos données étudiantes sont récupérées depuis votre session sécurisée HttpOnly.
              Seul le personnel autorisé peut accéder à votre dossier complet.
            </p>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-md">
            <InfoCard icon="person" title="Identité personnelle" items={identityItems} />
            <InfoCard icon="contact_mail" title="Coordonnées" items={contactItems} />
            <InfoCard icon="family_restroom" title="Responsable / parent" items={familyItems} />

            <div className="md:col-span-12 tonal-card rounded-xl p-md">
              <div className="flex items-center gap-sm mb-md">
                <MaterialIcon name="verified_user" className="text-secondary" />
                <h3 className="font-headline-sm text-headline-sm text-on-surface">
                  Statut du compte
                </h3>
              </div>

              <div
                className={`rounded-xl border p-md flex flex-col md:flex-row md:items-center gap-md ${
                  isVerified
                    ? 'bg-emerald-50 border-emerald-200'
                    : 'bg-amber-50 border-amber-200'
                }`}
              >
                <div
                  className={`w-14 h-14 rounded-full flex items-center justify-center shrink-0 ${
                    isVerified ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                  }`}
                >
                  <MaterialIcon name={isVerified ? 'verified' : 'hourglass_top'} className="text-3xl" />
                </div>

                <div className="flex-grow">
                  <div className="flex flex-col md:flex-row md:items-center gap-2 mb-xs">
                    <h4 className="font-headline-sm text-headline-sm text-on-surface">
                      {isVerified ? 'Compte vérifié' : 'Compte en attente de validation'}
                    </h4>
                    <span
                      className={`px-3 py-1 rounded-full font-label-sm text-xs inline-flex items-center gap-1 w-fit ${
                        isVerified
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      <MaterialIcon
                        name={isVerified ? 'check_circle' : 'warning'}
                        className="text-[14px]"
                      />
                      {isVerified ? 'Actif' : 'À vérifier'}
                    </span>
                  </div>

                  <p className="font-body-md text-on-surface-variant max-w-3xl">
                    {isVerified
                      ? 'Votre dossier est validé. Le portail vous reconnaît comme un compte fiable et vous donne accès aux fonctionnalités protégées.'
                      : 'Votre dossier n\u2019est pas encore validé. Une fois la validation effectuée, votre compte passera au statut vérifié.'}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-md mt-md">
                {accountItems.map((item) => (
                  <div key={item.label} className="bg-white rounded-lg border border-outline-variant p-sm">
                    <p className="font-label-sm text-on-surface-variant uppercase tracking-wider">
                      {item.label}
                    </p>
                    <p className="font-body-md text-on-surface font-semibold break-words">
                      {formatValue(item.value)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </main>
    </div>
  );
}
