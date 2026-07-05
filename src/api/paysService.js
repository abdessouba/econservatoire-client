import axiosClient from "./axiosClient";

/**
 * Fetches the list of countries used to populate the "Pays" select field.
 * Backend: GET /api/pays
 * Success response body: ApiResponse<Pays[]>
 */
export function getPaysList() {
  return axiosClient.get("/pays").then((res) => res.data);
}

/**
 * Reads a human readable label off of a "Pays" object regardless of the
 * exact field name used by the backend (nom, libelle, nomFr, name...).
 */
export function getPaysLabel(pays) {
  return pays?.nom_pay;
}
