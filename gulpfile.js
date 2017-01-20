const gulp = require('gulp');
const sass = require('gulp-sass');
const cleanCss = require('gulp-clean-css');
const concatCss = require('gulp-concat-css');
const autoprefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify');

const sassInput = './dev/sass/index.sass';
const cssOutput = './dev/css';
const cssInput = './dev/css/**/*.css';
const htmlInput = './dev/*.html';
const dist = './dist';
const inputWatch = ['./dev/sass/**/*.{scss,sass}', htmlInput];
let sassOptions = {
  errLogToConsole: true,
  outputStyle: 'expanded'
};

gulp.task('html', () => {
  console.log('Tranfering HTML...');

  return gulp
    .src(htmlInput)
    .pipe(gulp.dest(dist));
});

gulp.task('sass', () => {
  return gulp
    .src(sassInput)
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest(cssOutput));
});

gulp.task('concat-minify-css', () => {
  return gulp
    .src(cssInput)
    .pipe(concatCss("./bundle.css"))
    .pipe(cleanCss())
    .pipe(gulp.dest(dist));
});

gulp.task('watch', () => {
  return gulp
    .watch(inputWatch, ['html', 'sass', 'concat-minify-css'])
    .on('change', function(event) {
      console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
});

gulp.task('default', ['html', 'sass', 'concat-minify-css', 'watch'], () => {
  console.log('Running default tasks...');
})
