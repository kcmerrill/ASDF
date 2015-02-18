var gulp = require('gulp');
var browserify = require('gulp-browserify');
var concat = require('gulp-concat');

gulp.task('browserify', function() {
    gulp.src('src/asdf.js')
      .pipe(browserify())
      .pipe(gulp.dest('dist/'));
});

gulp.task('default',['browserify']);

gulp.task('watch', function() {
    gulp.watch('src/**/*.*', ['default']);
});
