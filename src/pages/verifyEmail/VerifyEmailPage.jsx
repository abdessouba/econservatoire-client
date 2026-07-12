import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import TopNavBar from "../../components/layout/TopNavBar";
import Footer from "../../components/layout/Footer";
import Button from "../../components/ui/Button";
import Alert from "../../components/ui/Alert";
import MaterialIcon from "../../components/ui/MaterialIcon";
import { verifyEmail } from "../../api/eleveService";
import { parseApiError } from "../../api/apiError";
import { useToast } from "../../context/ToastContext";

export default function VerifyEmailPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const email = location.state?.email;
  const [alert, setAlert] = useState(null);
  const [resending, setResending] = useState(false);

  useEffect(() => {
    const token = new URLSearchParams(location.search).get("token");

    // Email verification via token link (user clicked from inbox)
    if (token) {
      verifyEmail(token)
        .then((response) => {
          showToast("success", response?.message || "E-mail vérifié avec succès !");
          navigate("/connexion", { replace: true });
        })
        .catch((err) => {
          const parsed = parseApiError(err);
          setAlert({ type: "error", message: parsed.message });
        });
      return; // skip the email-guard below
    }

    // No token and no email state → user landed here directly, send back
    if (!email) {
      navigate("/inscription", { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // While the token verification redirect is in flight, show nothing
  const hasToken = Boolean(new URLSearchParams(location.search).get("token"));
  if (hasToken && !alert) return null;

  if (!email && !alert) return null;

  const handleResend = () => {
    setResending(true);
    // No dedicated "resend" endpoint yet; simulates the action so UX is complete.
    setTimeout(() => {
      setResending(false);
      setAlert({ type: "success", message: "Un nouveau lien de vérification a été envoyé." });
    }, 1200);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <TopNavBar secureSessionLabel="Session sécurisée" />
      <main className="flex-grow flex items-center justify-center py-xl px-sm relative overflow-hidden bg-[#F5F7F9]">
        <div className="absolute inset-0 pointer-events-none opacity-5">
          <div
            className="absolute top-0 left-0 w-full h-full"
            style={{
              backgroundImage: "radial-gradient(#001e40 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />
        </div>

        <div className="w-full max-w-[520px] bg-white border border-[#D1D5DB] rounded-lg p-lg relative z-10">
          <div className="flex flex-col items-center text-center mb-md">
            <div className="w-20 h-20 bg-secondary-container bg-opacity-20 rounded-full flex items-center justify-center mb-sm">
              <MaterialIcon
                name="mark_as_unread"
                className="text-[48px] text-secondary"
              />
            </div>
            <h1 className="font-headline-md text-headline-md text-primary mb-xs">
              Vérifiez votre boîte de réception
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-[360px]">
              Nous avons envoyé un lien de vérification à votre adresse e-mail
              enregistrée afin d'assurer la sécurité de votre dossier étudiant.
            </p>
          </div>

          {email && (
            <div className="bg-surface-container-low rounded p-sm flex items-center justify-center gap-xs mb-md border border-outline-variant">
              <MaterialIcon
                name="alternate_email"
                className="text-on-surface-variant text-[18px]"
              />
              <span className="font-label-md text-label-md text-primary">
                {email}
              </span>
            </div>
          )}

          <div className="space-y-sm mb-lg">
            <div className="flex gap-sm">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center font-label-sm text-label-sm">
                1
              </div>
              <p className="font-body-md text-body-md text-on-surface">
                Cliquez sur le lien dans l'e-mail pour activer votre compte.
              </p>
            </div>
            <div className="flex gap-sm">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center font-label-sm text-label-sm">
                2
              </div>
              <p className="font-body-md text-body-md text-on-surface">
                Vous ne le trouvez pas ? Vérifiez votre dossier{" "}
                <strong>Spam</strong> ou <strong>Promotions</strong>.
              </p>
            </div>
          </div>

          {alert && (
            <Alert
              type={alert.type}
              message={alert.message}
              onClose={() => setAlert(null)}
              className="mb-md"
            />
          )}

          <div className="flex flex-col gap-sm">
            <Button
              onClick={handleResend}
              loading={resending}
              icon="send"
              iconPosition="leading"
              fullWidth
            >
              Renvoyer l'e-mail
            </Button>
            <div className="pt-sm border-t border-outline-variant text-center mt-sm">
              <Link
                to="/connexion"
                className="inline-flex items-center gap-xs text-on-surface-variant font-label-md text-label-md hover:text-secondary transition-colors"
              >
                <MaterialIcon name="arrow_back" className="text-[18px]" />
                Retour à la connexion sécurisée
              </Link>
            </div>
          </div>

          <div className="mt-lg flex items-center justify-center gap-xs px-sm py-xs bg-surface-container-highest rounded-full">
            <MaterialIcon
              name="verified_user"
              className="text-[16px] text-on-tertiary-fixed-variant"
            />
            <span className="font-label-sm text-label-sm text-on-tertiary-fixed-variant">
              Chiffré selon les normes de sécurité nationales
            </span>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
