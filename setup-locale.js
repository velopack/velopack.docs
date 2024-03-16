const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('Removing "i18n" directory');
const i18nDir = path.join(__dirname, 'i18n');
if (fs.existsSync(i18nDir)) {
    fs.rmSync(i18nDir, { recursive: true, force: true });
}

console.log('Downloading translations from Crowdin');
execSync("npm run crowdin-download", { stdio: 'inherit' });

console.log('Renaming "zh" directory to "zh-CN"');
fs.renameSync(path.join(i18nDir, 'zh'), path.join(i18nDir, 'zh-CN'));

console.log("Copying reference libraries to i18n directories");
const locales = ['zh-CN'];
const referenceDir = path.join(__dirname, 'docs', 'reference');
locales.forEach(locale => {
    const localeDir = path.join(i18nDir, locale, 'docusaurus-plugin-content-docs', 'current', 'reference');
    fs.cpSync(referenceDir, localeDir, { recursive: true });
});