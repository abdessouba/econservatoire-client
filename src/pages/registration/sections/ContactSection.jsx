import { useState } from 'react';
import Input from '../../../components/ui/Input';
import TextArea from '../../../components/ui/TextArea';
import Button from '../../../components/ui/Button';
import MaterialIcon from '../../../components/ui/MaterialIcon';

export default function ContactSection({ active, form, errors, onChange, onNext, onBack }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <section className={`space-y-md ${active ? '' : 'hidden'}`}>
      <div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant">
        <h2 className="font-headline-sm text-headline-sm text-primary mb-md border-b border-outline-variant pb-xs">
          Contact &amp; Pièces Justificatives
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
          <TextArea
            label="Adresse Résidentielle"
            id="adresse"
            name="adresse"
            rows={2}
            placeholder="Numéro, rue, quartier..."
            value={form.adresse}
            onChange={onChange}
            error={errors.adresse}
            containerClassName="md:col-span-2"
          />
          <Input
            label="CIN / Identité"
            id="cin"
            name="cin"
            placeholder="A123456"
            value={form.cin}
            onChange={onChange}
            error={errors.cin}
          />
          <Input
            label="Téléphone Mobile"
            id="mobile"
            name="mobile"
            type="tel"
            placeholder="+212 6..."
            value={form.mobile}
            onChange={onChange}
            error={errors.mobile}
          />
          <Input
            label="Téléphone Fixe"
            id="fixe"
            name="fixe"
            type="tel"
            placeholder="+212 5..."
            value={form.fixe}
            onChange={onChange}
            error={errors.fixe}
          />
          <Input
            label="E-mail"
            id="email"
            name="email"
            type="email"
            required
            placeholder="nom@exemple.com"
            value={form.email}
            onChange={onChange}
            error={errors.email}
          />
        </div>

        <h3 className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider mt-lg mb-sm pt-sm border-t border-outline-variant">
          Identifiants de connexion
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
          <div className="relative">
            <Input
              label="Mot de passe"
              id="password"
              name="password"
              required
              type={showPassword ? 'text' : 'password'}
              placeholder="8 caractères minimum"
              value={form.password}
              onChange={onChange}
              error={errors.password}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-[38px] text-on-surface-variant hover:text-secondary transition-colors"
              aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
            >
              <MaterialIcon name={showPassword ? 'visibility_off' : 'visibility'} />
            </button>
          </div>
          <div className="relative">
            <Input
              label="Confirmer le mot de passe"
              id="confirmPassword"
              name="confirmPassword"
              required
              type={showConfirm ? 'text' : 'password'}
              placeholder="Ressaisissez le mot de passe"
              value={form.confirmPassword}
              onChange={onChange}
              error={errors.confirmPassword}
            />
            <button
              type="button"
              onClick={() => setShowConfirm((v) => !v)}
              className="absolute right-3 top-[38px] text-on-surface-variant hover:text-secondary transition-colors"
              aria-label={showConfirm ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
            >
              <MaterialIcon name={showConfirm ? 'visibility_off' : 'visibility'} />
            </button>
          </div>
        </div>
      </div>
      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack} icon="arrow_back" iconPosition="leading">
          Retour
        </Button>
        <Button onClick={onNext} icon="arrow_forward">
          Continuer
        </Button>
      </div>
    </section>
  );
}
