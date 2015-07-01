if (require('piping')({hook: true})) {
    require('babel/register');
    require('./main');
}
