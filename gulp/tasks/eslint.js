var eslint = require('gulp-eslint');
var gulp = require('gulp');

gulp.task('eslint', function() {
    return gulp.src([
        'gulpfile.js',
        'gulp/**/*.js',
        'src/**/*.js',
        'build/*.js'
    ])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failOnError());
});
