var gulp = require('gulp');
var ts = require('gulp-typescript');
var tsProject = ts.createProject('tsconfig.json');

gulp.task('default', ['move-dev-config', 'move-test-config'], function() {
  return tsProject.src()
    .pipe(tsProject())
    .js.pipe(gulp.dest('built'));
});

gulp.task('move-dev-config', function() {
  return gulp.src(['./src/dev-config.json', './src/test-config.json'])
    .pipe(gulp.dest('built'));
});

gulp.task('move-test-config', function() {
  return gulp.src(['./src/test/mocha.opts', './src/test/.mocharc.yml'])
    .pipe(gulp.dest('built/test'));
});

gulp.task('scripts', function() {
  return tsProject.src()
    .pipe(tsProject())
    .js.pipe(gulp.dest('built'));
});

gulp.task('watch', ['scripts'], function() {
  gulp.watch([
    './src/*.ts',
    './src/**/*.ts',
    './src/**/**/*.ts',
  ], ['scripts']);
});
