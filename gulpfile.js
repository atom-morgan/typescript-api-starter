var gulp = require('gulp');
var ts = require('gulp-typescript');
var tsProject = ts.createProject('tsconfig.json');

gulp.task('default', ['move-db-config', 'move-test-config'], function() {
  return tsProject.src()
    .pipe(tsProject())
    .js.pipe(gulp.dest('built'));
});

gulp.task('move-db-config', function() {
  return gulp.src(['./src/dev.json', './src/config.json'])
    .pipe(gulp.dest('built'));
});

gulp.task('move-test-config', function() {
  return gulp.src(['./src/test/mocha.opts'])
    .pipe(gulp.dest('built/test'));
})