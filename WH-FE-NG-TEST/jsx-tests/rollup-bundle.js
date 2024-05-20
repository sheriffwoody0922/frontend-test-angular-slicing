//@ts-check
const rollup = require('rollup');
const path = require("path");
const fs = require('fs-extra');

const commonjs = require('@rollup/plugin-commonjs');
/** @type { typeof import('@rollup/plugin-node-resolve')["default"] } */
//@ts-ignore
const nodeResolve = require('@rollup/plugin-node-resolve')["default"];
/** @type { typeof import("@rollup/plugin-babel")["default"]} */
//@ts-ignore
const babel = require('@rollup/plugin-babel')["default"];
/** @type { typeof import("@rollup/plugin-typescript")["default"]} */
//@ts-ignore
const tsc = require("@rollup/plugin-typescript");

const UglifyJS = require("uglify-js");

const root = path.resolve(__dirname);
rollup.rollup({
    input: root+"/src/index.tsx",
    onwarn: /** @param {import("rollup").RollupWarning} message */function (message) {
        if (message.code == "UNRESOLVED_IMPORT" && message.source.indexOf("!style") > -1)
            return true;
    },
    plugins: [
        nodeResolve({
            mainFields: ["jsnext:main", 'module', 'main']
        }),
        //@ts-ignore
        commonjs(),
        tsc({ tsconfig: root+'/tsconfig.json' }),
        babel({
            compact: false,
            include: 'node_modules/**',
            "presets": [
                [
                    "@babel/preset-env",
                    {
                        useBuiltIns: "entry",
                        forceAllTransforms: true,
                        corejs: {
                            version: "3.20",
                            proposals: false
                        }
                    }
                ]
            ],
            babelHelpers: "bundled"
        }),
    ]
}).then(output => {
    const file = root+ "/dist/index.js";

    return output.generate({
        format: "umd",
        file: file
    }).then(code => {
        const result = UglifyJS.minify(code.output[0].code, {
            output: {
                beautify: false,
                "max_line_len": 999999
            },
            mangle: false,
            compress: {
                sequences: true,
                dead_code: true,
                conditionals: true,
                global_defs: {
                    ngDevMode: false,
                    ngI18nClosureMode: false,
                    ngJitMode: false,
                    process: {
                        env: {
                            NODE_ENV: "production"
                        }
                    }
                }
            },
            ie8: false
        });

        return fs.ensureFile(file).then(() => {
            return fs.writeFile(file, result.code);
        });
    })
})