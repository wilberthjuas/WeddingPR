/**
 * @author Luis Enrique Huh Puc <lhuh@palaceresorts.com
 * @description AUTH MIDDLEWARE FILE
 */

/* * * * * * * * * * * *
 *  Import Statements  *
* * * * * * * * * * * */
const api = require('../app/endpoints');
const { 
   sendRequest, 
   getValueObject } = require('../libraries/Helpers');
const Logger = require('../libraries/Logger');


const AuthHashValidatorhMiddleware = (req, res, next) => {
   const logger = new Logger('AuthMiddleware.js');
   const data = req.body || { body: '' };

   // Se genera el token
   sendRequest(api.generateToken(), { token: data.body }, 'POST', { json: true })
   .then( resGenerator => {
      const tokenApi = resGenerator.data || { token: '' };
      sendRequest(api.decodeToken(), {}, 'GET', { Authorization: 'Bearer '.concat(tokenApi.token), json: true})
      .then( resDecoding => {
         const tmp = getValueObject(resDecoding, 'data', 'data_auth', 'data');
         res.locals.data = tmp || {};
         next();
      })
      .catch( err => {
         logger.error('Error to decoding token [hash]');
         logger.debug(err);
         res.locals.data = {};
         next()
      });
   })
   .catch( err => {
      logger.error('Error to generate token [hash]');
      logger.debug(err);
      res.locals.data = {};
      next()
   });
}

 /* * * * * * * * * * * * * *
 * Export Module Middleware *
* * * * * * * * * * * * * **/
module.exports = AuthHashValidatorhMiddleware;