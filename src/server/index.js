/**
 * @author Luis Enrique Huh Puc <lhuh@palaceresorts.com
 * @description SERVER CONFIG FILE
 */

/* * * * * * * * * * * *
*  Import Statements  *
* * * * * * * * * * * */
const express = require('express');
const env = require('node-env-file');
const path = require('path');
const routes = require('./app/routes');
const Logger = require('./libraries/Logger');

/* * * * * * * * * **
* Environment File *
* * * * * * * * * */
env(__dirname + '/.env');
const port = process.env.PORT || 5000;
const logger = new Logger('index.js');

/* * * * * **
*  Routes  *
* * * * * */
const app = express();
app.use(express.static('dist'));
app.use('/public', express.static('public'));
app.use('/api/', routes);

app.get('/*', function(req, res) {
   res.sendFile(path.join(__dirname, '../../dist/index.html'), function(err) {
     if (err) {
       res.status(500).send(err)
     }
   })
});

/* * * * * * * * * **
*  Listening Port  *
* * * * * * * * * */
app.listen(port, () => logger.info(`Listening on port ${port}!`));