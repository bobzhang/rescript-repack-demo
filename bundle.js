var esbuild = require("esbuild");

esbuild.build({
  entryPoints: ["src/map.mjs"],
  bundle: true,
  //   minify:true,
  //   minifyWhitespace: true,
  minifySyntax: true,
  target: "es2015",
  outdir: "bundle",
  format: "esm",

  outExtension: {
    ".js": ".mjs",
  },
});
