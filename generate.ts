const TypeDoc = require("typedoc");
const path = require("path");
const doxygen = require('doxygen');
const moxygen = require('moxygen');
const fs = require("fs");
const exec = require("child_process").execSync;

const doxygenVersion = "1.10.0";
const doxygenTemp = ".doxy/";
const doxygenFile = "Doxyfile";

async function main() {
    await download_doxygen();
    await gen_typedoc();
    await gen_doxygen("../velopack.fusion/for-cpp", "./docs/reference/cpp");
}

async function download_doxygen() {
    if (!doxygen.isDoxygenExecutableInstalled(doxygenVersion)) {
        console.log(`Doxygen ${doxygenVersion} not found, downloading...`);
        await doxygen.downloadVersion(doxygenVersion);
    }
}

async function gen_doxygen(sourceDir: string, outputDir: string) {
    console.log(`Generating Doxygen: ${sourceDir} -> ${outputDir}`);
    if (fs.existsSync(doxygenTemp)) {
        fs.rmSync(doxygenTemp, { recursive: true, force: true });
    }
    fs.writeFileSync(doxygenFile, `
PROJECT_NAME           = Velopack
OUTPUT_DIRECTORY       = ${doxygenTemp}
INPUT                  = ${sourceDir}
GENERATE_XML           = YES
XML_OUTPUT             = xml
XML_PROGRAMLISTING     = YES
XML_NS_MEMB_FILE_SCOPE = NO
GENERATE_RTF           = NO
GENERATE_MAN           = NO
GENERATE_DOCBOOK       = NO
GENERATE_HTML          = NO
GENERATE_LATEX         = NO
GENERATE_DOCBOOK       = NO
GENERATE_AUTOGEN_DEF   = NO
GENERATE_SQLITE3       = NO
GENERATE_PERLMOD       = NO
`);

    doxygen.run(doxygenFile, doxygenVersion);

    fs.mkdirSync(outputDir, { recursive: true });
    const options = {
        ...moxygen.defaultOptions,
        templates: path.join(__dirname, "templates", "moxygen"),
        directory: path.join(doxygenTemp, "xml"),
        output: path.join(outputDir, "api.md"),
    };

    // moxygen is async but has no callback, so here's an arbitrary delay
    // TODO: just delete the file and keep checking until it's created.
    moxygen.run(options);
    await sleep(2000);
}

async function gen_typedoc() {
    fs.rmSync("./docs/reference/js/classes", { recursive: true, force: true });
    fs.rmSync("./docs/reference/js/enums", { recursive: true, force: true });
    const app = await TypeDoc.Application.bootstrapWithPlugins({
        entryPoints: ["../velopack.fusion/for-js/Velopack.d.ts"],
        plugin: ["typedoc-plugin-markdown"],
        hideBreadcrumbs: true,
        hideInPageTOC: true,
        compilerOptions: {
            module: "commonjs",
            target: "es2021",
            include: ["../velopack.fusion/for-js/Velopack.d.ts"],
            files: ["../velopack.fusion/for-js/Velopack.d.ts"],
        }
    });

    const project = await app.convert();
    if (project) {
        fs.mkdirSync("./docs/reference/js", { recursive: true });
        await app.generateDocs(project, "./docs/reference/js");
    }
    fs.unlinkSync("./docs/reference/js/modules.md");
    fs.unlinkSync("./docs/reference/js/README.md");
    fs.unlinkSync("./docs/reference/js/.nojekyll");
}

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

// typedoc gets confused with this file here
fs.renameSync("tsconfig.json", "tsconfig.json.bak");

main().then(() => {
    console.log("Done");
}).catch((e) => {
    console.error(e);
    process.exit(1);
}).finally(() => {
    fs.renameSync("tsconfig.json.bak", "tsconfig.json");
    fs.unlinkSync(doxygenFile);
    fs.rmSync(doxygenTemp, { recursive: true, force: true });
});