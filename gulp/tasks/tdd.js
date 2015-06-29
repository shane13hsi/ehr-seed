var gulp = require('gulp');
var constants = require('../../build/constants');
var karma = require('karma').server;

gulp.task('tdd', function(done) {
    karma.start({
        configFile: constants.KARMA_CONFIG_PATH
    }, done);
});