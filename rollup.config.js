import { babel } from '@rollup/plugin-babel';
import glsl from 'rollup-plugin-glsl';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import sourcemaps from 'rollup-plugin-sourcemaps';
import livereload from 'rollup-plugin-livereload';
import ts from '@rollup/plugin-typescript';
import serve from 'rollup-plugin-serve';
import image from '@rollup/plugin-image';
import typescript from 'typescript';

const env = process.env.__ENV;
const production = env === 'production';
const devOutput = {
  sourcemap: true,
  file: 'lib/index.js',
  format: 'iife'
};
const productionOutput = [
  {
    file: 'lib/index.js',
    format: 'iife'
  }
];

const config = {
  input: 'src/app.ts',
  output: production ? productionOutput : devOutput,
  plugins: [
    image(),
    glsl({
      include: 'src/**/*.glsl',
      exclude: ['**/index.html'],
      sourceMap: true
    }),
    ts({
      typescript,
      tsconfig: 'tsconfig.json'
    }),
    sourcemaps(),
    nodeResolve(),
    babel({ babelHelpers: 'bundled' }),
    !production &&
      serve({
        port: 3000
      }),
    !production &&
      livereload({
        watch: 'lib',
        verbose: true,
        port: 35729
      })
  ]
};

export default config;
