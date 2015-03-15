'use strict';
var testsContext = require.context('./components', true, /\.js$/);
testsContext.keys().forEach(testsContext);
