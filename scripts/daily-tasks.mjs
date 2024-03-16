import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { setTimeout } from 'timers/promises';
import { fileURLToPath } from 'url';

// config
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const locales = ['zh-CN'];
const i18nDir = path.join(__dirname, 'i18n');

// update reference libraries
console.log("Updating reference libraries");
execSync("npm run generate", { stdio: 'inherit' });

// publish latest documentation to crowdin
console.log("Writing docusaurus translations");
execSync("npm run write-translations", { stdio: 'inherit' });

// give crowdin time to process uploaded files
await setTimeout(10 * 1000);

// download and fix up translations from crowdin
console.log("Preparing to download translations from Crowdin");
if (fs.existsSync(i18nDir)) {
    locales.forEach(locale => {
        const localeDir = path.join(i18nDir, locale);
        if (fs.existsSync(localeDir)) {
            console.log(`Cleaning "${locale}"`);
            fs.rmSync(localeDir, { recursive: true });
        }
    });
}

console.log('Downloading translations from Crowdin');
execSync("npm run crowdin-download", { stdio: 'inherit' });

console.log('Renaming "zh" directory to "zh-CN"');
fs.renameSync(path.join(i18nDir, 'zh'), path.join(i18nDir, 'zh-CN'));

const referenceDir = path.join(__dirname, 'docs', 'reference');
locales.forEach(locale => {
    const localeDir = path.join(i18nDir, locale, 'docusaurus-plugin-content-docs', 'current', 'reference');
    console.log(`Copying reference lib to "${locale}"`);
    fs.cpSync(referenceDir, localeDir, { recursive: true });
});