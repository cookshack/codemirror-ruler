export default {
  input: 'index.js',
  external: /^(?!\.?\/)/, // internal if starts with ./ or /
  output: [ { file: 'dist/index.cjs', format: 'cjs' },
            { dir: './dist', format: 'es' } ],
  plugins: []
}
