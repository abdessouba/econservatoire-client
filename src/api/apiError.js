/**
 * Normalizes the three possible backend response shapes into a single
 * predictable object the UI can consume.
 *
 * - ApiResponse<T>            -> handled on the success path (see services)
 * - ApiExceptionResponse      -> { type: 'error', message }
 * - ValidationErrorResponse   -> { type: 'validation', fieldErrors, message }
 * - Network / unknown errors  -> { type: 'network' | 'error', message }
 */
export function parseApiError(error) {
  if (!error?.response) {
    return {
      type: 'network',
      message:
        "Impossible de contacter le serveur. Vérifiez votre connexion et réessayez.",
    };
  }

  const { data, status } = error.response;

  // ValidationErrorResponse: { errors: { field: message }, status, timestamp }
  if (data && typeof data === 'object' && data.errors && typeof data.errors === 'object') {
    return {
      type: 'validation',
      status,
      fieldErrors: data.errors,
      message: 'Veuillez corriger les champs signalés ci-dessous.',
    };
  }

  // ApiExceptionResponse: { error, status, timestamp }
  if (data && typeof data === 'object' && typeof data.error === 'string') {
    return {
      type: 'error',
      status,
      message: data.error,
    };
  }

  if (data && typeof data === 'object' && typeof data.message === 'string') {
    return {
      type: 'error',
      status,
      message: data.message,
    };
  }

  return {
    type: 'error',
    status,
    message: "Une erreur inattendue s'est produite. Veuillez réessayer.",
  };
}
