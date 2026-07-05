import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import { getPaysLabel } from '../../../api/paysService';

const SEXE_OPTIONS = [
  { value: 'HOMME', label: 'Homme' },
  { value: 'FEMME', label: 'Femme' },
];

export default function PersonalInfoSection({
  active,
  form,
  errors,
  onChange,
  onNext,
  paysOptions,
  paysLoading,
  paysError,
}) {
  return (
    <section className={`space-y-md ${active ? '' : 'hidden'}`}>
      <div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant">
        <h2 className="font-headline-sm text-headline-sm text-primary mb-md border-b border-outline-variant pb-xs">
          Informations Personnelles
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
          <Input
            label="Nom"
            id="nom"
            name="nom"
            required
            placeholder="Entrez votre nom"
            value={form.nom}
            onChange={onChange}
            error={errors.nom}
          />
          <Input
            label="Prénom"
            id="prenom"
            name="prenom"
            required
            placeholder="Entrez votre prénom"
            value={form.prenom}
            onChange={onChange}
            error={errors.prenom}
          />
          <Input
            label="الاسم بالعربية"
            id="nom_ar"
            name="nom_ar"
            dir="rtl"
            placeholder="الاسم"
            value={form.prenomAr}
            onChange={onChange}
            error={errors.prenomAr}
          />
          <Input
            label="الاسم العائلي بالعربية"
            id="nomAr"
            name="nomAr"
            dir="rtl"
            placeholder="اسم العائلة"
            value={form.nomAr}
            onChange={onChange}
            error={errors.nomAr}
          />
          <Select
            label="Sexe"
            id="sexe"
            name="sexe"
            required
            placeholder="Sélectionnez"
            options={SEXE_OPTIONS}
            value={form.sexe}
            onChange={onChange}
            error={errors.sexe}
          />
          <Input
            label="Date de naissance"
            id="dateNaissance"
            name="dateNaissance"
            type="date"
            required
            value={form.dateNaissance}
            onChange={onChange}
            error={errors.dateNaissance}
          />
          <Input
            label="Lieu de naissance"
            id="lieuNaissance"
            name="lieuNaissance"
            placeholder="Ville de naissance"
            value={form.lieuNaissance}
            onChange={onChange}
            error={errors.lieuNaissance}
          />
          <Select
            label="Pays"
            id="payId"
            name="payId"
            required
            placeholder={paysLoading ? 'Chargement des pays...' : 'Sélectionnez un pays'}
            options={paysOptions.map((p) => ({ value: p.id, label: getPaysLabel(p) }))}
            value={form.payId}
            onChange={onChange}
            error={errors.payId || paysError}
            disabled={paysLoading || Boolean(paysError)}
          />
        </div>
      </div>
      <div className="flex justify-end">
        <Button onClick={onNext} icon="arrow_forward">
          Continuer
        </Button>
      </div>
    </section>
  );
}
