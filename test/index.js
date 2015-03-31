import 'es5-shim';

var testsContext = require.context('./components', true, /\.js$/);
testsContext.keys().forEach(testsContext);
