import { Link, useNavigate } from 'react-router-dom';
import Footer from '../../components/layout/Footer';
import MaterialIcon from '../../components/ui/MaterialIcon';
import { useAuth } from '../../context/AuthContext';

const SIDEBAR_LINKS = [
  { icon: 'dashboard', label: 'Vue d\'ensemble', active: true },
  { icon: 'school', label: 'Mes Cours' },
  { icon: 'piano', label: 'Salles de Pratique' },
  { icon: 'account_balance_wallet', label: 'Aide Financière' },
  { icon: 'settings', label: 'Paramètres' },
];

const IDENTITY = [
  { label: 'Nom légal complet', value: 'Jean-Baptiste Lully' },
  { label: 'Date de naissance', value: '28 Novembre 1998' },
  { label: 'Nationalité', value: 'Française' },
  { label: 'Identifiant national', value: 'FR-8820-XL-92' },
];

const CONTACT = [
  { label: 'E-mail institutionnel', value: 'j.lully@conservatoire.edu', highlight: true },
  { label: 'Téléphone', value: '+33 1 42 67 00 00' },
  { label: 'Adresse résidentielle', value: '14 Rue de la Musique\n75008 Paris, France' },
  { label: "Contact d'urgence", value: 'Mme. Madeleine Lully (Épouse)' },
];

const ACADEMIC_PATH = [
  {
    period: 'ACTUEL',
    title: 'Master de Composition',
    detail: 'Spécialité : Structures du Grand Motet',
    current: true,
  },
  {
    period: '2019 - 2022',
    title: "Licence d'Orchestration",
    detail: 'Diplômé avec Mention Très Bien',
  },
  {
    period: '2016 - 2019',
    title: 'Préparatoire du Conservatoire',
    detail: 'Institut National de Lyon',
  },
];

const REGISTRATION_STEPS = [
  { label: 'Candidature', state: 'done' },
  { label: 'Soumission des travaux', state: 'active', number: 2 },
  { label: 'Évaluation par les pairs', state: 'pending', number: 3 },
  { label: 'Jury final', state: 'pending', number: 4 },
];

export default function DashboardPage() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/connexion');
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
          <section className="tonal-card rounded-xl p-md mb-md flex flex-col md:flex-row items-center gap-md">
            <div className="relative">
              <div className="w-32 h-32 rounded-full border-4 border-surface-container shadow-sm bg-surface-container-high flex items-center justify-center">
                <MaterialIcon name="person" className="text-6xl text-on-surface-variant" />
              </div>
              <div className="absolute bottom-1 right-1 bg-green-500 w-6 h-6 rounded-full border-4 border-white" />
            </div>
            <div className="flex-grow text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center gap-sm mb-xs">
                <h2 className="font-display-lg text-headline-md text-on-surface">
                  Jean-Baptiste Lully
                </h2>
                <span className="px-3 py-1 bg-primary-container text-on-primary-container rounded-full font-label-sm text-xs">
                  PROGRAMME MAESTRO
                </span>
              </div>
              <p className="font-body-md text-on-surface-variant max-w-2xl mb-sm">
                Étudiant senior en Composition & Orchestration. Lauréat du Mérite de l'Académie
                Royale 2024 pour l'excellence baroque.
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-xs">
                <span className="flex items-center gap-1 font-label-sm text-secondary">
                  <MaterialIcon name="verified" className="text-sm" /> Identité Vérifiée
                </span>
                <span className="mx-2 text-outline">|</span>
                <span className="flex items-center gap-1 font-label-sm text-on-surface-variant">
                  <MaterialIcon name="event" className="text-sm" /> Inscrit depuis 2022
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
              Vos données étudiantes sont chiffrées et protégées conformément aux réglementations
              nationales sur la vie privée. Seul le personnel autorisé peut consulter votre
              parcours académique détaillé.
            </p>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-md">
            <div className="md:col-span-4 tonal-card rounded-xl p-md">
              <div className="flex items-center gap-sm mb-md">
                <MaterialIcon name="person" className="text-secondary" />
                <h3 className="font-headline-sm text-headline-sm text-on-surface">
                  Identité Personnelle
                </h3>
              </div>
              <div className="space-y-md">
                {IDENTITY.map((item) => (
                  <div key={item.label}>
                    <p className="font-label-sm text-on-surface-variant uppercase tracking-wider">
                      {item.label}
                    </p>
                    <p className="font-body-md text-on-surface font-semibold">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="md:col-span-4 tonal-card rounded-xl p-md">
              <div className="flex items-center gap-sm mb-md">
                <MaterialIcon name="contact_mail" className="text-secondary" />
                <h3 className="font-headline-sm text-headline-sm text-on-surface">
                  Coordonnées
                </h3>
              </div>
              <div className="space-y-md">
                {CONTACT.map((item) => (
                  <div key={item.label}>
                    <p className="font-label-sm text-on-surface-variant uppercase tracking-wider">
                      {item.label}
                    </p>
                    <p
                      className={
                        item.highlight
                          ? 'font-body-md text-secondary underline'
                          : 'font-body-md text-on-surface whitespace-pre-line'
                      }
                    >
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="md:col-span-4 tonal-card rounded-xl p-md">
              <div className="flex items-center gap-sm mb-md">
                <MaterialIcon name="history_edu" className="text-secondary" />
                <h3 className="font-headline-sm text-headline-sm text-on-surface">
                  Parcours Académique
                </h3>
              </div>
              <div className="relative pl-6 space-y-md">
                <div className="absolute left-2 top-2 bottom-2 w-0.5 bg-outline-variant" />
                {ACADEMIC_PATH.map((step) => (
                  <div key={step.title} className="relative">
                    <div
                      className={`absolute -left-[1.35rem] top-1.5 w-3 h-3 rounded-full border-2 border-white ${
                        step.current ? 'bg-secondary' : 'bg-outline'
                      }`}
                    />
                    <p
                      className={
                        step.current
                          ? 'font-label-sm text-secondary font-bold'
                          : 'font-label-sm text-on-surface-variant'
                      }
                    >
                      {step.period}
                    </p>
                    <p className="font-body-md text-on-surface font-semibold">{step.title}</p>
                    <p className="font-label-sm text-on-surface-variant">{step.detail}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="md:col-span-12 tonal-card rounded-xl p-md">
              <h3 className="font-headline-sm text-headline-sm text-on-surface mb-lg">
                Prochaine Inscription aux Performances
              </h3>
              <div className="flex flex-col md:flex-row justify-between items-center gap-md px-lg">
                {REGISTRATION_STEPS.map((step, index) => (
                  <div
                    key={step.label}
                    className={`flex flex-col items-center gap-2 relative ${
                      index < REGISTRATION_STEPS.length - 1 ? '' : ''
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                        step.state === 'done'
                          ? 'bg-secondary text-on-secondary'
                          : step.state === 'active'
                            ? 'bg-secondary-container text-on-secondary-container border-2 border-secondary'
                            : 'bg-surface-container-high text-on-surface-variant'
                      }`}
                    >
                      {step.state === 'done' ? (
                        <MaterialIcon name="check" />
                      ) : (
                        step.number
                      )}
                    </div>
                    <p
                      className={
                        step.state === 'active'
                          ? 'font-label-md text-secondary'
                          : step.state === 'done'
                            ? 'font-label-md text-on-surface'
                            : 'font-label-md text-on-surface-variant'
                      }
                    >
                      {step.label}
                    </p>
                    {index < REGISTRATION_STEPS.length - 1 && (
                      <div
                        className={`hidden md:block absolute left-full top-5 w-32 h-0.5 mx-2 ${
                          step.state === 'done' ? 'bg-secondary' : 'bg-outline-variant'
                        }`}
                      />
                    )}
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
