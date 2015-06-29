var eslint = require('gulp-eslint');
var gulp = require('gulp');

gulp.task('eslint', function() {
    return gulp.src([
        'gulp/**/*.js',
        'src/**/*.js',
        'webpack/*.js'
    ])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failOnError());
});
