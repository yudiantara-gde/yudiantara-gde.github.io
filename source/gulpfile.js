
/*
  Usage:
  1. npm install //To install all dev dependencies of package
  2. npm run dev //To start development and server for live preview
  3. npm run prod //To generate minifed files for live server
*/

const { src, dest, watch, series, parallel } = require("gulp");
const clean = require("gulp-clean");
const options = require("./config");
const browserSync = require("browser-sync").create();

const sass = require("gulp-sass")(require("sass"));
const postcss = require("gulp-postcss");
const concat = require("gulp-concat");
const uglify = require("gulp-terser");
const imagemin = require("gulp-imagemin");
const mozjpeg = require("imagemin-mozjpeg");
const pngquant = require("imagemin-pngquant");
const purgecss = require("gulp-purgecss");
const logSymbols = require("log-symbols");
const includePartials = require("gulp-file-include");
const data = require("gulp-data");
const twig = require("gulp-twig");
const plumber = require("gulp-plumber");
const fs = require("fs");
const path = require("path");

//Load Previews on Browser on dev
function livePreview(done) {
  browserSync.init({
    proxy: 'http://localhost:' + options.config.port + '/' + options.config.projectDir + '/dist',
  });
  done();
}

// Triggers Browser reload
function previewReload(done) {
  console.log("\n\t" + logSymbols.info, "Reloading Browser Preview.\n");
  browserSync.reload();
  done();
}

function devTWIG() {
  return src([`${options.paths.src.base}/**/*.twig`, `!${options.paths.src.base}/templates/**/*.twig`])
    .pipe(plumber({
        handeleError: function (err) {
          console.log(err);
          this.emit('end');
        }
    }))
    //.pipe(includePartials())
    .pipe(data(function (file) {
      return JSON.parse(fs.readFileSync('src/data/data.json'));
    }))
    .pipe(
      twig().on('error', function (err) {
        process.stderr.write(err.message + '\n');
        this.emit('end');
      })
    )
    .pipe(dest(options.paths.dist.base));
}

function devStyles() {
  const tailwindcss = require("tailwindcss");
  const autoprefixer = require("autoprefixer");
  return src(`${options.paths.src.css}/**/*.scss`)
    .pipe(sass().on("error", sass.logError))
    .pipe(postcss([tailwindcss(options.config.tailwindjs), autoprefixer()]))
    //.pipe(concat({ path: "style.css" }))
    .pipe(dest(options.paths.dist.css));
}

function devScripts() {
  return src([
    `${options.paths.src.js}/libs/**/*.js`,
    `${options.paths.src.js}/**/*.js`,
    `!${options.paths.src.js}/**/external/*`,
  ])
    .pipe(concat({ path: "scripts.js" }))
    .pipe(dest(options.paths.dist.js));
}

function devImages() {
  return src(`${options.paths.src.img}/**/*`).pipe(
    dest(options.paths.dist.img)
  );
}

function devFonts() {
  return src(`${options.paths.src.fonts}/**/*`).pipe(
    dest(options.paths.dist.fonts)
  );
}

function devThirdParty() {
  return src(`${options.paths.src.thirdParty}/**/*`).pipe(
    dest(options.paths.dist.thirdParty)
  );
}

function watchFiles() {
  //watch(`${options.paths.src.base}/**/*.html`, series(devHTML, previewReload));
  //watch(`${options.paths.src.base}/**/*.php`, series(devPHP, previewReload));
  watch(`${options.paths.src.base}/**/*.twig`, series(devTWIG, previewReload));
  watch([options.config.tailwindjs, `${options.paths.src.css}/**/*.scss`],series(devStyles, previewReload));
  watch(`${options.paths.src.js}/**/*.js`, series(devScripts, previewReload));
  watch(`${options.paths.src.img}/**/*`, series(devImages, previewReload));
  watch(`${options.paths.src.fonts}/**/*`, series(devFonts, previewReload));
  watch(`${options.paths.src.thirdParty}/**/*`, series(devThirdParty, previewReload));
  console.log("\n\t" + logSymbols.info, "Watching for Changes..\n");
}

function devClean() {
  console.log(
    "\n\t" + logSymbols.info,
    "Cleaning dist folder for fresh start.\n"
  );
  return src(options.paths.dist.base, { read: false, allowEmpty: true }).pipe(
    clean()
  );
}

//Production Tasks (Optimized Build for Live/Production Sites)
function prodHTML() {
  return src([`${options.paths.src.base}/**/*.twig`, `!${options.paths.src.base}/templates/**/*.twig`])
    .pipe(data(function (file) {
      return JSON.parse(fs.readFileSync('src/data/data.json'));
    }))
    .pipe(twig())
    //.pipe(dest(options.paths.build.base));
    .pipe(dest('../'));
}

function prodStyles() {
  const tailwindcss = require("tailwindcss");
  const autoprefixer = require("autoprefixer");
  const cssnano = require("cssnano");
  return src(`${options.paths.src.css}/**/*.scss`)
    .pipe(sass().on("error", sass.logError))
    .pipe(
      postcss([
        tailwindcss(options.config.tailwindjs),
        autoprefixer(),
        cssnano(),
      ])
    )
    //.pipe(dest(options.paths.build.css));
    .pipe(dest('../css'));
}

function prodScripts() {
  return src([
    //`${options.paths.src.js}/libs/**/*.js`,
    `${options.paths.src.js}/**/*.js`,
  ])
    .pipe(concat({ path: "scripts.js" }))
    .pipe(uglify())
    //.pipe(dest(options.paths.build.js));
    .pipe(dest('../js'));
}

function prodImages() {
  const pngQuality = Array.isArray(options.config.imagemin.png)
    ? options.config.imagemin.png
    : [0.7, 0.7];
  const jpgQuality = Number.isInteger(options.config.imagemin.jpeg)
    ? options.config.imagemin.jpeg
    : 70;
  const plugins = [
    pngquant({ quality: pngQuality }),
    mozjpeg({ quality: jpgQuality }),
  ];

  return src(options.paths.src.img + "/**/*")
    .pipe(imagemin([...plugins]))
    //.pipe(dest(options.paths.build.img));
    .pipe(dest('../img'));
}

function prodFonts() {
  return src(`${options.paths.src.fonts}/**/*`).pipe(
    //dest(options.paths.build.fonts)
    dest('../fonts')
  );
}

function prodThirdParty() {
  return src(`${options.paths.src.thirdParty}/**/*`).pipe(
    //dest(options.paths.build.thirdParty)
    dest('../third-party')
  );
}

function prodClean() {
  console.log(
    "\n\t" + logSymbols.info,
    "Cleaning build folder for fresh start.\n"
  );
  
  return src([
    '../*.html',
    '../component',
    '../css',
    '../fonts',
    '../img',
    '../js',
    '../third-party',
    `!${'../source'}`
  ], { read: false, allowEmpty: true })
  .pipe(clean({force : true}));
}

function buildFinish(done) {
  console.log(
    "\n\t" + logSymbols.info,
    `Production build is complete.\n`
  );
  done();
}

exports.default = series(
  devClean,
  parallel(
    devStyles, 
    devScripts, 
    devImages, 
    devFonts, 
    devThirdParty, 
    devTWIG,
    //devPHP,
  ),
  livePreview,
  watchFiles
);

exports.prod = series(
  prodClean,
  parallel(
    prodStyles,
    prodScripts,
    prodImages,
    prodHTML,
    prodFonts,
    prodThirdParty
  ),
  buildFinish
);
