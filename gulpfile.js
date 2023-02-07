var gulp    = require('gulp'),
    sass    = require('gulp-sass')(require('sass')),
    connect = require('gulp-connect'),
    pug     = require('gulp-pug'),
    plumber = require('gulp-plumber'),
    rename  = require('gulp-rename'),
    uglify  = require('gulp-uglify'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync  = require('browser-sync').create();

function reload(done) {
    connect.server({
        root: 'dist/',
        livereload: true,
        port: 8080
    });

    done();
}

// Compile and Minify SCSS
function styles() {
    return (
        gulp.src('src/scss/styles.scss')
        .pipe(plumber())
        .pipe(sass())
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 3 versions'],
            cascade: false
        }))
        .pipe(sass({outputStyle: 'expanded'}))
        .pipe(gulp.dest('dist/css'))
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(rename('styles.min.css'))
        .pipe(gulp.dest('dist/css'))
        .pipe(connect.reload())
        .pipe(browserSync.stream())
    );
}

// Compile and Minify MAIN JS
function scripts() {
    return (
        gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js', 'src/js/scripts.js'])
        .pipe(plumber())
        .pipe(gulp.dest('dist/js'))
        .pipe(uglify())
        .pipe(rename('scripts.min.js'))
        .pipe(gulp.dest('dist/js'))
        .pipe(connect.reload())
    );
}

function html() {
    return (
        gulp.src('*.html')
        .pipe(plumber())
        .pipe(connect.reload())
    );
}

function views() {
    return (
        gulp.src('src/pug/pages/*.pug')
        .pipe(plumber())
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest('dist'))
        .pipe(connect.reload())
    );
}

function watchtask(done) {
    gulp.watch('*.html', html);
    gulp.watch('src/scss/**/*.scss', styles);
    gulp.watch('src/js/scripts.js', scripts);
    gulp.watch('src/pug/**/*.pug', views);
    done();
}

const watch = gulp.parallel(watchtask, reload);
const build = gulp.series(gulp.parallel(styles, scripts, html, views));

exports.reload  = reload;
exports.styles  = styles;
exports.scripts = scripts;
exports.html    = html;
exports.views   = views;
exports.watch   = watch;
exports.build   = build;
exports.default = watch;