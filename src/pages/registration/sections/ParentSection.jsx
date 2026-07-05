import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const LIEN_PARENTE_OPTIONS = [
  { value: 'Père', label: 'Père' },
  { value: 'Mère', label: 'Mère' },
  { value: 'Tuteur', label: 'Tuteur légal' },
  { value: 'Autre', label: 'Autre' },
];

export default function ParentSection({ active, form, errors, onChange, onNext, onBack }) {
  return (
    <section className={`space-y-md ${active ? '' : 'hidden'}`}>
      <div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant">
        <h2 className="font-headline-sm text-headline-sm text-primary mb-md border-b border-outline-variant pb-xs">
          Parent / Tuteur Légal
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
          <Input
            label="Nom du Père / Tuteur"
            id="nomPere"
            name="nomPere"
            placeholder="Prénom et Nom"
            value={form.nomPere}
            onChange={onChange}
            error={errors.nomPere}
          />
          <Input
            label="Profession"
            id="professionPere"
            name="professionPere"
            placeholder="Métier exercé"
            value={form.professionPere}
            onChange={onChange}
            error={errors.professionPere}
          />
          <Select
            label="Lien de parenté"
            id="lienParente"
            name="lienParente"
            placeholder="Sélectionnez"
            options={LIEN_PARENTE_OPTIONS}
            value={form.lienParente}
            onChange={onChange}
            error={errors.lienParente}
          />
          <Input
            label="Niveau culturel du parent"
            id="parentCulture"
            name="parentCulture"
            placeholder="Ex: Universitaire"
            value={form.parentCulture}
            onChange={onChange}
            error={errors.parentCulture}
          />
          <Input
            label="Code DRPP du parent"
            id="drppParent"
            name="drppParent"
            placeholder="Optionnel"
            value={form.drppParent}
            onChange={onChange}
            error={errors.drppParent}
          />
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
