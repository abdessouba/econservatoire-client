import { useState } from "react";
import { Link } from "react-router-dom";
import TopNavBar from "../../components/layout/TopNavBar";
import Footer from "../../components/layout/Footer";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import Alert from "../../components/ui/Alert";
import { forgotPassword } from "../../api/eleveService";
import { parseApiError } from "../../api/apiError";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [toast, setToast] = useState(null); // { type: 'success' | 'error', message: string }
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setToast(null);
    setEmailError("");
    setSubmitting(true);
    try {
      const response = await forgotPassword(email);
      setToast({
        type: "success",
        message: response.message || "Instructions envoyées à votre adresse e-mail.",
      });
      setEmail("");
    } catch (err) {
      const parsed = parseApiError(err);
      if (parsed.type === "validation" && parsed.fieldErrors?.email) {
        setEmailError(parsed.fieldErrors.email);
      }
      setToast({ type: "error", message: parsed.message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="font-body-md text-on-surface min-h-screen flex flex-col">
      
      <TopNavBar secureSessionLabel="Portail Sécurisé" />

      <main className="flex-grow relative flex items-center justify-center py-xl overflow-hidden">
        {/* Background image + overlay */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA25EXt6rPN8gRYMBzLVRaPdf9poLWRf7QW10_8Tv14Mo6FMUuB1ArcGxvzl8zPJK88vK-P4lhsIJr8vQrC-56dUgcHkxqFJLCapugU0oT9ceM4-CXLhDEU06cdj-XCw3pLClQNEUip_P_jk3t0kC7o1ApsQSF0BYOhOGvepRA6ehPJjfLPzDQZLMM4EwfTD4u6sRuKIBoZJWpBfmWWnqBCZdFZW0vc5mX180L28br8GYJTlsslOEkbiA')",
            }}
          />
          <div className="absolute inset-0 bg-primary/60 backdrop-blur-sm" />
        </div>

        {/* Card */}
        <div className="relative z-10 w-full max-w-[440px] px-sm">
          <div className="bg-white border border-outline-variant p-lg flex flex-col gap-md shadow-lg rounded-xl">
            {/* Icon + heading */}
            <div className="flex flex-col items-center gap-xs text-center">
              <div className="w-12 h-12 rounded-full bg-surface-container-low flex items-center justify-center text-primary mb-2">
                <span className="material-symbols-outlined text-4xl">lock_reset</span>
              </div>
              <h1 className="font-headline-md text-headline-md text-primary">
                Mot de passe oublié ?
              </h1>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-[340px]">
                Entrez votre adresse e-mail pour recevoir les instructions de
                réinitialisation de votre mot de passe.
              </p>
            </div>

            {/* Form */}
            <form className="flex flex-col gap-md" onSubmit={handleSubmit} noValidate>
              {/* Secure session banner */}
              <div className="flex items-center gap-xs p-xs bg-surface-container-low border border-outline-variant rounded text-on-surface-variant">
                <span className="material-symbols-outlined text-sm">lock</span>
                <span className="font-label-sm text-label-sm">
                  Session sécurisée et cryptée
                </span>
              </div>

              {/* Toast notification */}
                    {toast && (
                        <Alert
                          type={toast.type}
                          message={toast.message}
                          onClose={() => setToast(null)}
                        />
                  )}

              <Input
                label="Adresse e-mail"
                id="email"
                name="email"
                type="email"
                icon="alternate_email"
                required
                placeholder="Entrez votre adresse e-mail"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailError("");
                }}
                error={emailError}
              />

              <Button
                type="submit"
                variant="primary"
                size="lg"
                icon="send"
                fullWidth
                loading={submitting}
              >
                Envoyer les instructions
              </Button>

              <div className="flex justify-center pt-xs">
                <Link
                  to="/connexion"
                  className="flex items-center gap-xs font-label-md text-label-md text-secondary hover:text-primary transition-colors"
                >
                  <span className="material-symbols-outlined text-sm">arrow_back</span>
                  Retour à la connexion
                </Link>
              </div>
            </form>

            {/* Footer note */}
            <div className="border-t border-outline-variant pt-md text-center">
              <p className="font-label-sm text-label-sm text-outline">
                Votre adresse e-mail est celle utilisée lors de votre inscription.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
