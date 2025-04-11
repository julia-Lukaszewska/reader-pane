export default {
  singleQuote: true, // #PL: używaj ' zamiast "
  semi: false, // #PL: brak średników
  tabWidth: 2, // #PL: 2 spacje
  trailingComma: 'es5', // #PL: przecinki w obiektach, tablicach, itd.
  bracketSpacing: true, // #PL: { a: 1 } zamiast {a:1}
  embeddedLanguageFormatting: 'auto', // #PL: poprawia też wcięcia
  plugins: ['prettier-plugin-css-order'], // #PL: obsługa sortowania stylów
}
