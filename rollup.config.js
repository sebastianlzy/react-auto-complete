// Rollup plugins.
import babel from 'rollup-plugin-babel';
import cjs from 'rollup-plugin-commonjs';
import globals from 'rollup-plugin-node-globals';
import replace from 'rollup-plugin-replace';
import resolve from 'rollup-plugin-node-resolve';
import sass from 'rollup-plugin-sass';

export default {
  input: 'src/main.js',
  output: {
    file: 'public/app.js',
    format: 'iife'
  },
  plugins: [
    sass({
      output: './public/app.css'
    }),
    babel({
      babelrc: false,
      exclude: 'node_modules/**',
      presets: [['es2015', {modules: false}], 'stage-0', 'react'],
      plugins: [
        'external-helpers',
      ],
    }),
    cjs({
      exclude: [
        'node_modules/process-es6/**',
      ],
      include: [
        'node_modules/create-react-class/**',
        'node_modules/fbjs/**',
        'node_modules/object-assign/**',
        'node_modules/react/**',
        'node_modules/react-dom/**',
        'node_modules/prop-types/**',
        'node_modules/axios/**'
      ]
    }),
    globals(),
    replace({'process.env.NODE_ENV': JSON.stringify('development')}),
    resolve({
      browser: true,
      main: true
    })
  ],
  sourcemap: true
}
