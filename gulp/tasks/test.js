var gulp = require('gulp');
var constants = require('../../constants');
var karma = require('karma').server;

gulp.task('test', function(done) {
    karma.start({
        configFile: constants.KARMA_CONFIG_PATH,
        singleRun: true,
        autoWatch: false
    }, done);
});
