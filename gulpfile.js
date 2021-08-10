const fs = require('fs')
const gulp = require('gulp')
const path = require('path')

const tsconfig = JSON.parse(
    fs.readFileSync(path.resolve('tsconfig.json'), { encoding: 'utf8' }),
)
const config = {
    entypoints: [...tsconfig.tstl.bundleEntryPoints],
    out: tsconfig.compilerOptions.outDir || 'dist',
}

//clear out dir
const del = require('del')
async function clean() {
    return await del([`${config.out}/*`])
}

//build ts
const tstl = require('typescript-to-lua')
function diagnosticsResults(result) {
    result.diagnostics.filter(d => {
        return [`Cannot find name 'https'`].indexOf(d.messageText) < 0
    })
    if (result.diagnostics.length > 0) console.log(result)
}
function makeBundleFile(filePath, conf) {
    return new Promise(async (resolve, reject) => {
        try {
            let result = await tstl.transpileFiles([filePath], {
                //original from tsconfig.json (wtf mix ts and tstl)
                compilerOptions: {
                    ...conf.compilerOptions,
                },
                tstl: {
                    ...conf.tstl,
                },
                ...conf.tstl,
                plugins: [...conf.compilerOptions.plugins],
                types: ['lua-types/5.1'],
                //if not . then put out to src
                rootDir: '.',
                //out path with same name from src
                luaBundle: `${conf.compilerOptions.outDir}/${path
                    .basename(filePath)
                    .replace('.ts', '.lua')}`,
                //entry point
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
            return makeBundleFile(entryPoint, tsconfig)
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
