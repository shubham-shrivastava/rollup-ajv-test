import babel from '@rollup/plugin-babel';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import * as Rollup from 'rollup';
import commonjs from '@rollup/plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import serve from 'rollup-plugin-serve';

import * as meta from './package.json';

const extensions = ['.js', '.ts'];


/** @type {Rollup.RollupOptions} */
const config = [
  {
    input: "src/index.ts",
    output: [
      {
        file: `example/${meta.main}`,
        format: 'umd',
        name: 'test'
      },
      {
        file: `example/${meta.module}`,
        format: 'es',
        name: 'test'
      },
    ],
    plugins: [
      typescript(),
      json(),
      commonjs(),
      resolve(),
      babel({
        babelHelpers: 'bundled',
        exclude: 'node_modules/**',
        extensions
      }),
      serve({
        open: true,
        openPage: '/',
        host: 'localhost',
        port: 3003,
        contentBase: ['example'],
      }),
      livereload({
        watch: ['example'],
        exts: ['html', 'js', 'css'],
      })
    ]
  }
];

export default config;
