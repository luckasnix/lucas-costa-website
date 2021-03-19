module.exports = {
  env: {
    SANITY_PROJECT_ID: process.env.SANITY_PROJECT_ID,
    SANITY_DATASET: process.env.SANITY_DATASET
  },
  i18n: {
    locales: [
      'pt-BR',
      'en-US',
      'es-ES'
    ],
    defaultLocale: 'pt-BR',
    localeDetection: false
  }
}
