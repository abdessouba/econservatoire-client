const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const isBlank = (value) => !value || !String(value).trim();

/**
 * Client-side mirror of the backend `EleveRequest` bean validation
 * constraints, so the user gets instant, French feedback before the request
 * ever reaches the server. The backend remains the source of truth: any
 * ValidationErrorResponse it returns is merged into these errors too.
 */
export function validateRegistration(form) {
  const errors = {};

  if (isBlank(form.nom)) errors.nom = 'Le nom est obligatoire.';
  else if (form.nom.length > 100) errors.nom = 'Le nom ne doit pas dépasser 100 caractères.';

  if (isBlank(form.prenom)) errors.prenom = 'Le prénom est obligatoire.';
  else if (form.prenom.length > 100)
    errors.prenom = 'Le prénom ne doit pas dépasser 100 caractères.';

  if (form.nomAr && form.nomAr.length > 100)
    errors.nomAr = 'Ce champ ne doit pas dépasser 100 caractères.';

  if (form.nomPrenomAr && form.nomPrenomAr.length > 200)
    errors.nomPrenomAr = 'Ce champ ne doit pas dépasser 200 caractères.';

  if (isBlank(form.sexe)) errors.sexe = 'Le sexe est obligatoire.';

  if (isBlank(form.dateNaissance)) {
    errors.dateNaissance = 'La date de naissance est obligatoire.';
  } else {
    const date = new Date(form.dateNaissance);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (Number.isNaN(date.getTime()) || date >= today) {
      errors.dateNaissance = 'La date de naissance doit être une date passée.';
    }
  }

  if (form.lieuNaissance && form.lieuNaissance.length > 50)
    errors.lieuNaissance = 'Ce champ ne doit pas dépasser 50 caractères.';

  if (!form.payId) errors.payId = 'Le pays est obligatoire.';

  if (form.adresse && form.adresse.length > 200)
    errors.adresse = "L'adresse ne doit pas dépasser 200 caractères.";

  if (form.cin && form.cin.length > 20)
    errors.cin = 'Ce champ ne doit pas dépasser 20 caractères.';

  if (form.nomPere && form.nomPere.length > 100)
    errors.nomPere = 'Ce champ ne doit pas dépasser 100 caractères.';

  if (form.professionPere && form.professionPere.length > 100)
    errors.professionPere = 'Ce champ ne doit pas dépasser 100 caractères.';

  if (form.mobile && form.mobile.length > 15)
    errors.mobile = 'Ce champ ne doit pas dépasser 15 caractères.';

  if (form.fixe && form.fixe.length > 15)
    errors.fixe = 'Ce champ ne doit pas dépasser 15 caractères.';

  if (isBlank(form.email)) errors.email = "L'adresse e-mail est obligatoire.";
  else if (!EMAIL_REGEX.test(form.email)) errors.email = "L'adresse e-mail n'est pas valide.";
  else if (form.email.length > 100)
    errors.email = "L'adresse e-mail ne doit pas dépasser 100 caractères.";

  if (form.identifiantUnique && form.identifiantUnique.length > 100)
    errors.identifiantUnique = 'Ce champ ne doit pas dépasser 100 caractères.';

  if (isBlank(form.password)) errors.password = 'Le mot de passe est obligatoire.';
  else if (form.password.length < 8)
    errors.password = 'Le mot de passe doit contenir au moins 8 caractères.';
  else if (form.password.length > 255)
    errors.password = 'Le mot de passe ne doit pas dépasser 255 caractères.';

  if (isBlank(form.confirmPassword))
    errors.confirmPassword = 'Veuillez confirmer le mot de passe.';
  else if (form.password !== form.confirmPassword)
    errors.confirmPassword = 'Les mots de passe ne correspondent pas.';

  if (isBlank(form.profile)) errors.profile = 'Le type de profil est obligatoire.';

  if (form.tarif && form.tarif.length > 50)
    errors.tarif = 'Ce champ ne doit pas dépasser 50 caractères.';

  if (form.parentCulture && form.parentCulture.length > 50)
    errors.parentCulture = 'Ce champ ne doit pas dépasser 50 caractères.';

  if (form.drppParent && form.drppParent.length > 10)
    errors.drppParent = 'Ce champ ne doit pas dépasser 10 caractères.';

  if (form.lienParente && form.lienParente.length > 10)
    errors.lienParente = 'Ce champ ne doit pas dépasser 10 caractères.';

  if (!form.luCondition)
    errors.luCondition = "Vous devez accepter les conditions générales d'inscription.";

  return errors;
}

export function validateSignIn(form) {
  const errors = {};
  if (isBlank(form.identifier)) errors.identifier = "L'Identifier est obligatoire.";

  if (isBlank(form.password)) errors.password = 'Le mot de passe est obligatoire.';

  return errors;
}

/**
 * Maps the "field" name used in ValidationErrorResponse.errors (backend,
 * snake_case matching the Java bean properties) to our local camelCase form
 * state keys, so server-side errors highlight the right input.
 */
const BACKEND_TO_FORM_FIELD = {
  nom: 'nom',
  prenom: 'prenom',
  nom_ar: 'nomAr',
  sexe: 'sexe',
  date_naissance: 'dateNaissance',
  lieu_naissance: 'lieuNaissance',
  payId: 'payId',
  pay_id: 'payId',
  adresse: 'adresse',
  cin: 'cin',
  nom_pere: 'nomPere',
  profession_pere: 'professionPere',
  mobile: 'mobile',
  fixe: 'fixe',
  email: 'email',
  identifiant_unique: 'identifiantUnique',
  nom_prenom_ar: 'nomPrenomAr',
  password: 'password',
  photo: 'photo',
  profile: 'profile',
  lu_condition: 'luCondition',
  militaire: 'militaire',
  reclassement: 'reclassement',
  tarif: 'tarif',
  parent_culture: 'parentCulture',
  drpp_parent: 'drppParent',
  lien_parente: 'lienParente',
  frais_imprime: 'fraisImprime',
};

export function mapBackendFieldErrors(fieldErrors = {}) {
  const mapped = {};
  Object.entries(fieldErrors).forEach(([field, message]) => {
    const key = BACKEND_TO_FORM_FIELD[field] ?? field;
    mapped[key] = message;
  });
  return mapped;
}
