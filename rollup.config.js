export default {
  input: 'index.js',
  output: [ { file: 'dist/index.cjs', format: 'cjs' },
            { dir: './dist', format: 'es' } ],
  plugins: []
}
