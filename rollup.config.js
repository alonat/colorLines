import { terser } from 'rollup-plugin-terser';
import postcss from 'rollup-plugin-postcss';
import cssnano from 'cssnano';

export default {
  input: './src/js/index.js',
  output: {
    dir: './docs',
    format: 'es',
    sourcemap: true,
  },
  plugins: [
    terser(),
    postcss({
      plugins: [
        cssnano(),
      ],
      use: ['sass'],
      minimize: true,
      extract: true,
      sourceMap: 'inline',
    }),
  ],
}
