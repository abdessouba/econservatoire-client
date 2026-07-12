import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import TopNavBar from "../../components/layout/TopNavBar";
import Footer from "../../components/layout/Footer";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import Alert from "../../components/ui/Alert";
import MaterialIcon from "../../components/ui/MaterialIcon";
import { resetPassword } from "../../api/eleveService";
import { parseApiError } from "../../api/apiError";
import { useToast } from "../../context/ToastContext";

function validateResetForm(form) {
  const errors = {};
  if (!form.newPassword) {
    errors.newPassword = 'Le mot de passe est obligatoire.';
  } else if (form.newPassword.length < 8) {
    errors.newPassword = 'Le mot de passe doit contenir au moins 8 caractères.';
  }
  if (!form.confirmPassword) {
    errors.confirmPassword = 'Veuillez confirmer le mot de passe.';
  } else if (form.newPassword !== form.confirmPassword) {
    errors.confirmPassword = 'Les mots de passe ne correspondent pas.';
  }
  return errors;
}

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [form, setForm] = useState({ newPassword: "", confirmPassword: "" });
  const [errors, setErrors] = useState({});
  const [alert, setAlert] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => {
      if (!(name in prev)) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlert(null);

    const validationErrors = validateResetForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSubmitting(true);
    try {
      const response = await resetPassword({ token, newPassword: form.newPassword });
      showToast(
        "success",
        response.message || "Votre mot de passe a été mis à jour avec succès.",
      );
      navigate("/connexion", { replace: true });
    } catch (err) {
      const parsed = parseApiError(err);
      if (parsed.type === "validation") {
        setErrors(parsed.fieldErrors);
      }
      setAlert({ type: "error", message: parsed.message });
    } finally {
      setSubmitting(false);
    }
  };

  // Guard: no token in URL
  if (!token) {
    return (
      <div className="font-body-md text-on-surface min-h-screen flex flex-col">
        <TopNavBar secureSessionLabel="Portail Sécurisé" />
        <main className="flex-grow flex items-center justify-center py-xl px-sm">
          <div className="w-full max-w-[440px] bg-white border border-outline-variant rounded-xl p-lg shadow-sm text-center space-y-md">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-error-container rounded-full">
              <MaterialIcon name="link_off" className="text-error text-[28px]" />
            </div>
            <h1 className="font-headline-md text-headline-md text-primary">
              Lien invalide
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Ce lien de réinitialisation est invalide ou a expiré. Veuillez
              demander un nouveau lien.
            </p>
            <Link
              to="/mot-de-passe-oublie"
              className="inline-flex items-center gap-xs font-label-md text-label-md text-secondary hover:underline transition-colors"
            >
              <MaterialIcon name="arrow_back" className="text-[18px]" />
              Retour à la page de récupération
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="font-body-md text-on-surface min-h-screen flex flex-col">
      <TopNavBar secureSessionLabel="Portail Sécurisé" />

      <main className="flex-grow flex items-center justify-center p-sm relative overflow-hidden">
        {/* Background image + overlay */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCEiRZoytaMaEhOdMoVl8y4B4nJG68OeJb_3fH83AdmVQwo792Y9mhwLS7g4agVON2YrUaT5zVvReI6ayjDTappQjuSLrG6z7EccktSdFqESsEScwH3-QpLIN_aWRvtbhCoef37KUjtgy9LE1Wt6eA1ZiG9ejLfuo07V_6_0CtWgXdXTXk9COAgBffPuLlvITcc8UhR-5v2_9NwmWDQAWRGuu1ychnH8Ik2Fhth8eSqhjpWBH2L6Ri2fQ')",
          }}
        />
        <div className="absolute inset-0 z-0 bg-white/40 backdrop-blur-sm" />

        {/* Card */}
        <div className="relative z-10 w-full max-w-[480px] bg-surface-container-lowest border border-outline-variant rounded-lg p-lg shadow-sm">
          {/* Icon + heading */}
          <div className="text-center mb-md">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-secondary-fixed text-on-secondary-container rounded-full mb-sm">
              <MaterialIcon name="lock_reset" className="text-[32px]" />
            </div>
            <h1 className="font-headline-md text-headline-md text-primary mb-xs">
              Réinitialiser votre mot de passe
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Veuillez saisir votre nouveau mot de passe ci-dessous.
            </p>
          </div>

          <form className="space-y-md" onSubmit={handleSubmit} noValidate>
            {/* Info banner */}
            <div className="bg-surface-container-low p-sm rounded flex items-start gap-xs border-l-4 border-secondary">
              <MaterialIcon name="info" className="text-secondary text-[20px]" />
              <p className="font-label-sm text-label-sm text-on-surface-variant">
                Vos données sont chiffrées de bout en bout. Choisissez un mot de
                passe robuste d'au moins 8 caractères.
              </p>
            </div>

            {alert && (
              <Alert
                type={alert.type}
                message={alert.message}
                onClose={() => setAlert(null)}
              />
            )}

            <Input
              label="Nouveau mot de passe"
              id="newPassword"
              name="newPassword"
              type="password"
              icon="lock"
              required
              placeholder="••••••••"
              value={form.newPassword}
              onChange={handleChange}
              error={errors.newPassword}
            />

            <Input
              label="Confirmer le mot de passe"
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              icon="lock"
              required
              placeholder="••••••••"
              value={form.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
            />

            <Button
              type="submit"
              variant="primary"
              size="lg"
              icon="arrow_forward"
              fullWidth
              loading={submitting}
            >
              Réinitialiser le mot de passe
            </Button>

            <div className="pt-sm text-center">
              <Link
                to="/connexion"
                className="inline-flex items-center gap-xs font-label-md text-label-md text-secondary hover:underline transition-all"
              >
                <MaterialIcon name="arrow_back" className="text-[18px]" />
                Retour à la connexion
              </Link>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
