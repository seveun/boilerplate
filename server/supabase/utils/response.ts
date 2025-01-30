// Succès
export const ok = (data: unknown) =>
  new Response(JSON.stringify(data), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });

export const created = (data: unknown) =>
  new Response(JSON.stringify(data), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });

export const noContent = () =>
  new Response(null, {
    status: 204,
  });

export const badRequest = (message = "Requête invalide") =>
  new Response(
    JSON.stringify({ error: message }),
    {
      status: 400,
      headers: { "Content-Type": "application/json" },
    },
  );

export const unauthorized = (message = "Non autorisé") =>
  new Response(
    JSON.stringify({ error: message }),
    {
      status: 401,
      headers: { "Content-Type": "application/json" },
    },
  );

export const forbidden = (message = "Accès interdit") =>
  new Response(
    JSON.stringify({ error: message }),
    {
      status: 403,
      headers: { "Content-Type": "application/json" },
    },
  );

export const notFound = (message = "Ressource non trouvée") =>
  new Response(
    JSON.stringify({ error: message }),
    {
      status: 404,
      headers: { "Content-Type": "application/json" },
    },
  );

export const methodNotAllowed = (message = "Méthode non autorisée") =>
  new Response(
    JSON.stringify({ error: message }),
    {
      status: 405,
      headers: { "Content-Type": "application/json" },
    },
  );

export const internalError = (message = "Erreur interne du serveur") =>
  new Response(
    JSON.stringify({ error: message }),
    {
      status: 500,
      headers: { "Content-Type": "application/json" },
    },
  );

export const notImplemented = (message = "Non implémenté") =>
  new Response(
    JSON.stringify({ error: message }),
    {
      status: 501,
      headers: { "Content-Type": "application/json" },
    },
  );

export const serviceUnavailable = (message = "Service indisponible") =>
  new Response(
    JSON.stringify({ error: message }),
    {
      status: 503,
      headers: { "Content-Type": "application/json" },
    },
  );
