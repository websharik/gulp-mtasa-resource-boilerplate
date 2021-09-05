const gulp = require('gulp')
const path = require('path')
const tstl = require('typescript-to-lua')

const tsconfig = tstl.parseConfigFileWithSystem('tsconfig.json')
const config = {
    entypoints: [...tsconfig.raw.bundleEntryPoints],
    out: tsconfig.raw.compilerOptions.outDir || 'dist',
}

//clear out dir
const del = require('del')
async function clean() {
    return await del([`${config.out}/*`])
}

//build ts
function diagnosticsResults(result) {
    result = tstl.prepareDiagnosticForFormatting(result)
    if (result.diagnostics.length > 0) {
        console.error(`${result.diagnostics.length} errors found:`)
        result.diagnostics.map((d) => {
            console.error(d.messageText)
        })
    }
}
function makeBundleFile(filePath) {
    return new Promise(async (resolve, reject) => {
        try {
            let result = await tstl.transpileFiles([filePath], {
                ...tsconfig.options,
                luaBundle: `${path.basename(filePath).replace('.ts', '.lua')}`,
                luaBundleEntry: filePath,
            })
            diagnosticsResults(result)
            resolve(result)
        } catch (e) {
            reject(e)
        }
    })
}
async function build() {
    return Promise.all(
        config.entypoints.map(entryPoint => {
            return makeBundleFile(entryPoint)
        }),
    )
}

exports.clean = clean
exports.build = gulp.series(clean, build)
const watch = function () {
    console.log('Watching TS files...')
    gulp.watch('./src/**/*.ts', { delay: 500 }, gulp.series(clean, build))
}
exports.dev = watch
exports.default = watch
