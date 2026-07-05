import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Checkbox from '../../../components/ui/Checkbox';
import Button from '../../../components/ui/Button';

const PROFILE_OPTIONS = [
  { value: 'Étudiant Standard', label: 'Étudiant Standard' },
  { value: 'Professionnel', label: 'Professionnel' },
  { value: 'Auditeur Libre', label: 'Auditeur Libre' },
];

const TARIF_OPTIONS = [
  { value: 'Plein Tarif', label: 'Plein Tarif' },
  { value: 'Tarif Réduit (Social)', label: 'Tarif Réduit (Social)' },
  { value: 'Exonéré', label: 'Exonéré' },
];

export default function AdminSection({
  active,
  form,
  errors,
  onChange,
  onBack,
  submitting,
}) {
  return (
    <section className={`space-y-md ${active ? '' : 'hidden'}`}>
      <div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant">
        <h2 className="font-headline-sm text-headline-sm text-primary mb-md border-b border-outline-variant pb-xs">
          Détails Administratifs
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-md mb-lg">
          <Input
            label="Identifiant unique (Massar/Code)"
            id="identifiantUnique"
            name="identifiantUnique"
            placeholder="ID National"
            value={form.identifiantUnique}
            onChange={onChange}
            error={errors.identifiantUnique}
          />
          <Select
            label="Type de Profil"
            id="profile"
            name="profile"
            required
            placeholder="Sélectionnez"
            options={PROFILE_OPTIONS}
            value={form.profile}
            onChange={onChange}
            error={errors.profile}
          />
          <Select
            label="Régime de Tarification"
            id="tarif"
            name="tarif"
            placeholder="Sélectionnez"
            options={TARIF_OPTIONS}
            value={form.tarif}
            onChange={onChange}
            error={errors.tarif}
          />
        </div>

        <div className="space-y-sm pt-md border-t border-outline-variant">
          <Checkbox
            id="militaire"
            name="militaire"
            checked={form.militaire}
            onChange={onChange}
            label="Issu d'une famille de militaire / corps d'état"
          />
          <Checkbox
            id="reclassement"
            name="reclassement"
            checked={form.reclassement}
            onChange={onChange}
            label="Demande de reclassement de niveau"
          />
          <Checkbox
            id="fraisImprime"
            name="fraisImprime"
            checked={form.fraisImprime}
            onChange={onChange}
            label="Frais d'imprimés et dossier acquittés"
          />
          <Checkbox
            id="luCondition"
            name="luCondition"
            checked={form.luCondition}
            onChange={onChange}
            error={errors.luCondition}
            highlight
            label="J'ai lu et j'accepte les conditions générales d'inscription et le règlement intérieur du Conservatoire National."
          />
        </div>
      </div>
      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack} icon="arrow_back" iconPosition="leading">
          Retour
        </Button>
        <Button type="submit" variant="dark" size="lg" icon="send" loading={submitting}>
          Finaliser l'Inscription
        </Button>
      </div>
    </section>
  );
}
