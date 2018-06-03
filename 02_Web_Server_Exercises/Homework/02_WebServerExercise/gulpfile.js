var gulp = require('gulp')
var htmlmin = require('gulp-htmlmin')
let cleanCSS = require('gulp-clean-css')

gulp.task('minify', function () {
  return gulp.src('./views/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist/html'))
})

gulp.task('minify-css', () => {
  return gulp.src('./public/css/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist/css'))
})

gulp.task('default', ['minify', 'minify-css'])
