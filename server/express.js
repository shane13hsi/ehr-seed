/*eslint-disable no-console */

import compression from 'compression';
import express from 'express';
import constants from '../constants';

export default function(param) {
    const app = express();

    app.use(compression());
    app.use('/build', express.static('build'));

    app.get('/', (req, res) => {
        res.sendFile(param.indexHtmlPath);
    });

    app.listen(constants.SERVER_PORT);
    console.log(`The server started on port ${constants.SERVER_PORT}`);
}
