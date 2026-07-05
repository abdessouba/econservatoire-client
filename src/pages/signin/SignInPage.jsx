import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import TopNavBar from "../../components/layout/TopNavBar";
import Footer from "../../components/layout/Footer";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import Alert from "../../components/ui/Alert";
import { validateSignIn } from "../../utils/validators";
import { signInEleve } from "../../api/eleveService";
import { parseApiError } from "../../api/apiError";
import { useAuth } from "../../context/AuthContext";

const INITIAL_FORM = { identifier: "", password: "" };

export default function SignInPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [alert, setAlert] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const location = useLocation();

  useEffect(()=>{
    if(location.state?.verified){
      setAlert({
        type: "success",
        message: location.state?.message,
      });
    }
  }, [])

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

    const validationErrors = validateSignIn(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSubmitting(true);
    try {
      console.log(form);
      const response = await signInEleve(form);
      login(response?.data);
      setAlert({
        type: "success",
        message: response?.message || "Connexion réussie !",
      });
      setTimeout(() => navigate("/tableau-de-bord"), 500);
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

  return (
    <div className="font-body-md text-on-surface min-h-screen flex flex-col">
      <TopNavBar
        showSchoolIcon
        links={[
          { label: "Informations", to: "#" },
          { label: "Contact", to: "#" },
        ]}
      />

      <main className="flex-grow relative flex items-center justify-center py-xl overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div
            className="w-full h-full bg-cover bg-center bg-primary"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAHc-JvYZAWRgSnek81kjiuySYvRu2945otVbxAKNr0dQ63LM2U0a-DZuG7fq_SsjhztoYd6eCrQG00Lvk6Qd8w4VS_EiSgwTNaj4iXt99-Nwwx0q5npWtwFpl4XyWpYyftHy83erVaAIyrR8Ctmp1jXsQK3cyucv2BKXi1HtcPmS-5GzKIFPoEly3pV9GBi-e76fQi79tDC7u4cMfgXT4pDApp6UtgR2A2636uM4E3ERvDWakc4rgv-Lh_B1GqP8yq5oXgEVf2IIIx')",
            }}
          />
          <div className="absolute inset-0 bg-primary/40 backdrop-blur-[2px]" />
        </div>

        <div className="absolute top-5 left-1/2 -translate-x-1/2 w-full max-w-md px-md z-20">
          <div className="bg-surface-container-low/90 backdrop-blur-md rounded-full py-2 px-4 flex items-center justify-center gap-2 border border-outline-variant/30 shadow-sm">
            <span className="material-symbols-outlined text-sm text-on-surface-variant">
              lock
            </span>
            <span className="font-label-sm text-label-sm text-on-surface-variant">
              Votre connexion au Conservatoire National est chiffrée.
            </span>
          </div>
        </div>

        <div className="relative z-10 w-full max-w-[440px] px-sm">
          <div className="bg-surface rounded-xl border border-outline-variant shadow-lg p-lg md:p-xl">
            <div className="text-center mb-lg">
              <h1 className="font-headline-md text-headline-md text-primary mb-2">
                Connexion Étudiants &amp; Personnel
              </h1>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Saisissez vos identifiants pour accéder au portail.
              </p>
            </div>

            {alert && (
              <Alert
                type={alert.type}
                message={alert.message}
                onClose={() => setAlert(null)}
                className="mb-md"
              />
            )}

            <form className="space-y-md" onSubmit={handleSubmit} noValidate>
              <Input
                label="Adresse e-mail ou Identifiant"
                id="Identifiant"
                name="identifier"
                type="text"
                icon="person"
                required
                placeholder="Entrez votre identifiant"
                value={form.identifier}
                onChange={handleChange}
                error={errors.identifier}
              />

              <div>
                <div className="flex justify-between items-center mb-xs">
                  <label
                    htmlFor="password"
                    className="block font-label-md text-label-md text-on-surface"
                  >
                    Mot de passe
                  </label>
                  <Link
                    to="/mot-de-passe-oublie"
                    className="font-label-sm text-label-sm text-secondary hover:underline"
                  >
                    Mot de passe oublié ?
                  </Link>
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  icon="lock"
                  required
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                  error={errors.password}
                />
              </div>

              <div className="flex items-center gap-2 py-1">
                <input
                  id="remember"
                  type="checkbox"
                  className="w-4 h-4 text-secondary border-outline rounded focus:ring-secondary"
                />
                <label
                  htmlFor="remember"
                  className="font-label-md text-label-md text-on-surface-variant select-none"
                >
                  Rester connecté pendant 30 jours
                </label>
              </div>

              <Button
                type="submit"
                fullWidth
                size="lg"
                icon="arrow_forward"
                loading={submitting}
              >
                Se connecter
              </Button>
            </form>

            <div className="mt-xl pt-lg border-t border-outline-variant text-center">
              <p className="font-body-md text-body-md text-on-surface-variant mb-2">
                Nouveau au Conservatoire ?
              </p>
              <Link
                to="/inscription"
                className="inline-block font-label-md text-label-md text-secondary border border-secondary px-6 py-2 rounded-lg hover:bg-secondary/5 transition-colors"
              >
                Créer un compte
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
