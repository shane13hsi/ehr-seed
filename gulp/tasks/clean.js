var gulp = require('gulp');
var constants = require('../../constants');
var del = require('del');

gulp.task('clean', function(done) {
    del([constants.DIST_DIR], done);
});
