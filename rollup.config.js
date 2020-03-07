import babel from 'rollup-plugin-babel';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import filesize from 'rollup-plugin-filesize';
import autoprefixer from 'autoprefixer';
import localResolve from 'rollup-plugin-local-resolve';
import copy from 'rollup-plugin-copy';


import pkg from './package.json';

const config = {
  input: 'src/scripts/index.js',
  output: [
    {
      file: pkg.module,
      format: 'es',
      exports: 'named',
      globals: { 'styled-components': 'styled' },
      sourcemap: true,
    },
  ],
  external: [
    'react',
    'react-dom',
    'prop-types',
    'react-router-dom',
    'react-image',
    'styled-components',
    'react-hgs-input-range',
    'isomorphic-unfetch',
    'polished',
    'react-slick',
  ],
  plugins: [
    peerDepsExternal(),
    postcss({ extract: true, plugins: [autoprefixer] }),
    copy({
      targets: [
        { 
          src: 'src/styles/*.css',
          dest: 'dist/styles'
        },
      ]
    }),
    babel({
      runtimeHelpers: true,
      presets: [
        [
          '@babel/preset-env',
          {
            modules: false,
          },
        ],
        '@babel/preset-react',
      ],
      ignore: ['node_modules/**'],
      plugins: [
        '@babel/plugin-proposal-class-properties',
        ['babel-plugin-styled-components'],
      ],
    }),
    localResolve(),
    resolve({
      extensions: ['.js', '.json', '.jsx','.css'],
    }),
    commonjs({
      include: 'node_modules/**',
      namedExports: {
        'node_modules/react-is/index.js': ['isValidElementType'],
        'node_modules/stylis/stylis.min': ['Stylis'],
      },
    }),
    filesize(),
  ],
};

export default config;
