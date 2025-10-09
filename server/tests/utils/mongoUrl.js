function buildMongoUrl(base, dbName) {
  if (!base) throw new Error('ATLAS_URI est vide. Vérifie le chargement de .env.');
  const withSlash = base.endsWith('/') ? base : `${base}/`;
  return `${withSlash}${dbName}?retryWrites=true&w=majority`;
}

module.exports = { buildMongoUrl };
