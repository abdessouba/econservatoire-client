import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import TopNavBar from '../../components/layout/TopNavBar';
import Footer from '../../components/layout/Footer';
import PrivacyBanner from '../../components/ui/PrivacyBanner';
import Alert from '../../components/ui/Alert';
import MaterialIcon from '../../components/ui/MaterialIcon';
import RegistrationStepper from './RegistrationStepper';
import PersonalInfoSection from './sections/PersonalInfoSection';
import ContactSection from './sections/ContactSection';
import ParentSection from './sections/ParentSection';
import AdminSection from './sections/AdminSection';
import { useDraftState } from '../../hooks/useDraftState';
import { INITIAL_REGISTRATION_FORM, toEleveRequest } from '../../utils/eleveMapper';
import { validateRegistration, mapBackendFieldErrors } from '../../utils/validators';
import { registerEleve } from '../../api/eleveService';
import { getPaysList } from '../../api/paysService';
import { parseApiError } from '../../api/apiError';
import { useToast } from '../../context/ToastContext';

const STEP_FIELDS = {
  1: ['nom', 'prenom', 'nomAr', 'prenomAr', 'sexe', 'dateNaissance', 'lieuNaissance', 'payId'],
  2: ['adresse', 'cin', 'mobile', 'fixe', 'email', 'password', 'confirmPassword'],
  3: ['nomPere', 'professionPere', 'lienParente', 'parentCulture', 'drppParent'],
  4: ['identifiantUnique', 'profile', 'tarif'],
};

const DRAFT_KEY = 'conservatoire.registration.draft';

function stepOfField(field) {
  const entry = Object.entries(STEP_FIELDS).find(([, fields]) => fields.includes(field));
  return entry ? Number(entry[0]) : 4;
}

export default function RegistrationPage() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [form, setForm, clearDraft] = useDraftState(DRAFT_KEY, INITIAL_REGISTRATION_FORM, [
    'password',
    'confirmPassword',
  ]);
  const [errors, setErrors] = useState({});
  const [currentStep, setCurrentStep] = useState(1);
  const [alert, setAlert] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [paysOptions, setPaysOptions] = useState([]);
  const [paysLoading, setPaysLoading] = useState(true);
  const [paysError, setPaysError] = useState(null);
  const fileInputRef = useRef(null);
  const formTopRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    getPaysList()
      .then((response) => {
        if (cancelled) return;
        setPaysOptions(Array.isArray(response?.data) ? response.data : []);
      })
      .catch(() => {
        if (cancelled) return;
        setPaysError('Impossible de charger la liste des pays.');
      })
      .finally(() => {
        if (!cancelled) setPaysLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    setErrors((prev) => {
      if (!(name in prev)) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });
  };

  const handlePhotoClick = () => fileInputRef.current?.click();

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setPhotoPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const goToStep = (step) => {
    setCurrentStep(step);
    if (window.innerWidth < 1024) {
      formTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const validateStep = (step) => {
    const allErrors = validateRegistration(form);
    const fieldsForStep = STEP_FIELDS[step];
    const stepErrors = Object.fromEntries(
      Object.entries(allErrors).filter(([field]) => fieldsForStep.includes(field)),
    );
    setErrors((prev) => ({
      ...prev,
      ...stepErrors,
      ...Object.fromEntries(fieldsForStep.filter((f) => !stepErrors[f]).map((f) => [f, undefined])),
    }));
    return Object.keys(stepErrors).length === 0;
  };

  const handleNext = (step) => {
    if (validateStep(step)) {
      goToStep(step + 1);
    } else {
      setAlert({ type: 'error', message: 'Veuillez corriger les champs signalés avant de continuer.' });
    }
  };

  const hasStepError = (step) =>
    STEP_FIELDS[step].some((field) => Boolean(errors[field])) ||
    (step === 4 && Boolean(errors.luCondition));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlert(null);

    const validationErrors = validateRegistration(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      const firstField = Object.keys(validationErrors)[0];
      goToStep(stepOfField(firstField));
      setAlert({
        type: 'error',
        message: 'Veuillez corriger les champs signalés avant de soumettre le formulaire.',
      });
      return;
    }

    setSubmitting(true);
    try {
      const payload = toEleveRequest(form);
      const response = await registerEleve(payload);
      clearDraft();
      const email = form.email;
      showToast('success', response?.message || 'Inscription réussie !');
      navigate('/verification-email', { state: { email } });
    } catch (err) {
      const parsed = parseApiError(err);
      if (parsed.type === 'validation') {
        const mapped = mapBackendFieldErrors(parsed.fieldErrors);
        setErrors((prev) => ({ ...prev, ...mapped }));
        const firstField = Object.keys(mapped)[0];
        if (firstField) goToStep(stepOfField(firstField));
      }
      setAlert({ type: 'error', message: parsed.message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-background text-on-background font-body-md min-h-screen flex flex-col">
      <TopNavBar
        links={[
          { label: 'Tableau de bord', to: '/tableau-de-bord' },
          { label: 'Admissions', to: '/inscription', active: true },
          { label: 'Académique', to: '#' },
          { label: 'Performances', to: '#' },
        ]}
        right={
          <Link
            to="/connexion"
            className="bg-secondary text-on-secondary px-sm py-xs rounded font-label-md text-label-md hover:opacity-90 transition-opacity"
          >
            Connexion Sécurisée
          </Link>
        }
      />
      <main ref={formTopRef} className="max-w-container-max mx-auto px-md py-lg flex-grow w-full">
        <div className="mb-xl text-center md:text-left">
          <h1 className="font-display-lg text-display-lg text-primary mb-xs">
            Inscription Nouvel Élève
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant">
            Veuillez remplir le formulaire ci-dessous pour finaliser votre dossier académique.
          </p>
        </div>

        <PrivacyBanner className="mb-md" />

        {alert && (
          <Alert
            type={alert.type}
            message={alert.message}
            onClose={() => setAlert(null)}
            className="mb-md"
          />
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-lg">
          <aside className="lg:col-span-3">
            <div className="sticky top-24 space-y-md">
              <div className="flex items-center gap-sm p-sm rounded-xl bg-surface-container-high border border-outline-variant">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-on-primary">
                  <MaterialIcon name="person_add" />
                </div>
                <div>
                  <p className="font-label-md text-label-md text-primary">Portail Étudiant</p>
                  <p className="font-label-sm text-label-sm text-on-surface-variant">
                    Session 2024-25
                  </p>
                </div>
              </div>

              <RegistrationStepper
                currentStep={currentStep}
                onStepClick={goToStep}
                hasStepError={hasStepError}
              />

              <div className="p-sm bg-surface-container rounded-lg border border-outline-variant">
                <button
                  type="button"
                  onClick={handlePhotoClick}
                  className="w-full h-40 bg-surface-dim rounded border border-dashed border-outline flex flex-col items-center justify-center gap-xs cursor-pointer hover:bg-white transition-colors relative overflow-hidden group"
                >
                  {photoPreview && (
                    <img
                      className="absolute inset-0 w-full h-full object-cover"
                      src={photoPreview}
                      alt="Aperçu de la photo d'identité"
                    />
                  )}
                  {!photoPreview && (
                    <>
                      <MaterialIcon name="photo_camera" className="text-primary text-3xl z-10" />
                      <span className="font-label-sm text-label-sm text-primary z-10">
                        Photo d'identité
                      </span>
                    </>
                  )}
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handlePhotoChange}
                />
              </div>
            </div>
          </aside>

          <form className="lg:col-span-9 space-y-md" onSubmit={handleSubmit} noValidate>
            <PersonalInfoSection
              active={currentStep === 1}
              form={form}
              errors={errors}
              onChange={handleChange}
              onNext={() => handleNext(1)}
              paysOptions={paysOptions}
              paysLoading={paysLoading}
              paysError={paysError}
            />
            <ContactSection
              active={currentStep === 2}
              form={form}
              errors={errors}
              onChange={handleChange}
              onNext={() => handleNext(2)}
              onBack={() => goToStep(1)}
            />
            <ParentSection
              active={currentStep === 3}
              form={form}
              errors={errors}
              onChange={handleChange}
              onNext={() => handleNext(3)}
              onBack={() => goToStep(2)}
            />
            <AdminSection
              active={currentStep === 4}
              form={form}
              errors={errors}
              onChange={handleChange}
              onBack={() => goToStep(3)}
              submitting={submitting}
            />
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
