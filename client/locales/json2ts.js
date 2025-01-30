/* eslint-disable */
const fs = require('node:fs');
const path = require('node:path');

const translations = {
  fr: require('./fr.json'),
  en: require('./en.json'),
  es: require('./es.json'),
};

for (const [locale, translation] of Object.entries(translations)) {
  const output = `export default ${JSON.stringify(
    translation,
    null,
    2,
  )} as const;`;

  if (!fs.existsSync(path.join(__dirname, './generated'))) {
    fs.mkdirSync(path.join(__dirname, './generated'));
  }

  // Create file in ./[locale].ts with output
  try {
    fs.writeFileSync(path.join(__dirname, `./generated/${locale}.ts`), output);
  } catch (err) {
    console.error(err);
  }
}
