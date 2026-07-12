import axiosClient from "./axiosClient";

/**
 * Registers a new eleve (student).
 * Backend: POST /api/eleve/auth
 * Success response body: ApiResponse<EleveSignInReponse|Eleve>
 */
export function registerEleve(eleveRequest) {
  return axiosClient
    .post("/eleve/auth/signup", eleveRequest)
    .then((res) => res.data);
}

/**
 * Signs in an eleve. Backend: POST /api/eleve/auth/signin
 * The server sets an HttpOnly session cookie, so withCredentials is required
 * (already configured on the shared axios instance).
 * Success response body: ApiResponse<EleveSignInReponse>
 */
export function signInEleve(credentials) {
  return axiosClient
    .post("/eleve/auth/signin", credentials)
    .then((res) => res.data);
}

/**
 * Sends a password-reset request for the given identifier.
 * Backend: POST /api/eleve/auth/forget-password
 * Body: ForgetPasswordRequest { identifier }
 * Success response body: ApiResponse<Void>
 */
export function forgotPassword(identifier) {
  return axiosClient
    .post("/eleve/auth/forget-password", { identifier })
    .then((res) => res.data);
}

/**
 * Resets the password using the token from the e-mail link.
 * Backend: POST /api/eleve/auth/reset-password
 * Body: ResetPasswordRequest { token, newPassword, confirmPassword }
 * Success response body: ApiResponse<Void>
 */
export function resetPassword(data) {
  return axiosClient
    .post("/eleve/auth/reset-password", data)
    .then((res) => res.data);
}


export function verifyEmail(token){
  return axiosClient
    .get("/eleve/auth/verify-email?token="+token)
    .then((res) => res.data);
}

export function getAuthData(){
  return axiosClient
    .get("/eleve/auth/me")
    .then((res) => res.data);
}

export function logoutEleve() {
  return axiosClient
    .get("/eleve/auth/logout")
    .then((res) => res.data);
}