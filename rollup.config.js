export default {
  input: "index.js",
  external: id => id != "tslib" && !/^(\.?\/|\w:)/.test(id),
  output: [ { file: "dist/index.cjs", format: "cjs" },
            { dir: "./dist", format: "es" } ],
  plugins: []
}
