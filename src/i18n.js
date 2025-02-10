
const i18n = createI18n({
  locale: localStorage.getItem('lang') || 'en', // Default language
  fallbackLocale: 'en',
  messages: { en, ar },
});

export default i18n;
