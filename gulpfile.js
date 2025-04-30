const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer').default;


const paths = {
  styles: {
    src: 'scss/style.scss',
    dest: 'dist/css/'
  },
  html5: {
    src: 'index.html',
    dest: 'dist/'
  }
};


function styles() {
  console.log('Running styles task...');
  console.log('Autoprefixer type:', typeof autoprefixer);

  return gulp.src(paths.styles.src)
    .pipe(sass().on('error', sass.logError))

    .pipe(autoprefixer({
      overrideBrowserslist: ["last 2 versions"],
      cascade: false
    }))
    .pipe(gulp.dest(paths.styles.dest));
}

function html() {
  console.log('Running html task');
  return gulp.src(paths.html5.src)
    .pipe(gulp.dest(paths.html5.dest));
}

function watchFiles() {
  console.log('Starting watch...');
  gulp.watch('scss/**/*.scss', styles);
  gulp.watch(paths.html5.src, html);

}
exports.styles = styles;
exports.html = html;

exports.watch = watchFiles;
exports.default = gulp.series(gulp.parallel(styles, html), watchFiles);
