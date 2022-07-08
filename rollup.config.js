import typescript from 'rollup-plugin-typescript2';
import resolve from '@rollup/plugin-node-resolve';
import multi from '@rollup/plugin-multi-entry';
import postcss from 'rollup-plugin-postcss';
import litcss from 'rollup-plugin-postcss-lit';
import generatePackageJson from 'rollup-plugin-generate-package-json'
import copy from 'rollup-plugin-copy';

const path = require('path');
const pkg = require('./package')


export default {
  input: ['src/afe-content-switcher/index.ts','src/afe-content-display/index.ts', 'src/afe-content-text/index.ts','src/afe-content-hts-final/index.ts','src/afe-content-radio/index.ts', 'src/main/index.ts'],
  output: [
    {
      format: 'es',
      sourcemap: true,
      file: 'lib/web-components.bundled.js',
    }
  ],
  plugins: [
    resolve({
      browser: true,
    }),
    typescript(),
    postcss({
      minimize: false,
      inject: false,
      use: [
        [
          'sass', {
            includePaths: [path.resolve('node_modules')]
          }
        ]
      ]
    }),
    litcss(),
    multi(),
    generatePackageJson({
      baseContents: (pkg) => ({
        name: pkg.name,
        version: pkg.version,
        author: pkg.author,
        main: pkg.main,
        module: pkg.module,
        description: pkg.description,
        types: pkg.types,
        license: pkg.license,
        private: false
      })
    }),
    copy({
      targets: [{ src: 'LICENSE', dest: 'lib/' },
      { src: 'README.md', dest: 'lib/' }
      ]
    })
  ],
};
