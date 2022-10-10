/**
 * @author Luis Enrique Huh Puc <lhuh@palaceresorts.com
 * @description CACHE CONFIG FILE
 */

/* * * * * * * * * * * *
 *  Import Statements  *
* * * * * * * * * * * */
const flatCache = require('flat-cache');
const env = require('node-env-file');
const api = require('../app/endpoints');
const Logger = require('../libraries/Logger');
const { getAuthorizationToken } = require('../libraries/Helpers');


/* * * * * * * * * * **
*  Environment File  *
* * * * * * * * * * **/
env(__dirname + '/../.env');
const authCredentials = { username: process.env.AUTH_USERNAME || 'guest', password: process.env.AUTH_PASSWORD || '' };

/* * * * * * * * *
*  Set variables *
* * * * * * * * */
const path = __dirname.concat('/../.cache');
const cache = flatCache.load('weddingCache', path);
const logger = new Logger('cache.js');

/* * * * * * * * * * * * * *
*  Calculate Elapsed Time  *
* * * * * * * * * * * * * */
const getElapsedHours = (date) => {
   const createdTime = (new Date(date)).getTime();
   const currentTime = (new Date()).getTime();
   const distance = currentTime - createdTime;
   let hours = 0;
   if(distance > 0){
      hours = Math.floor(distance / (1000 * 60 * 60));
   }
   return hours;
}

/* * * * * * * * * *
*  Generate Cache  *
* * * * * * * * * */
const CacheMiddleware = (req,res, next) => {
   const key = '__wedding__token';
   const cacheContent = cache.getKey(key);
   let isLogged = false;

   if (cacheContent) {
      const credentials = JSON.parse(cacheContent);
      const lifetime = credentials.lifetime;
      const update_before = credentials.update_before;
      const elapsed_hours = getElapsedHours(credentials.created);
      const updateTime = lifetime - update_before;

      if (elapsed_hours >= updateTime) {
         cache.removeKey(key);
         cache.save();
         logger.info('Cache removed');
         isLogged = false;
      }else{
         isLogged = true;
      }
   }

   if (isLogged) {
      next();
   }else{
      getAuthorizationToken(authCredentials.username, authCredentials.password, api.authenticateApp())
      .then(response => {
         const data = response.data
         if (data) {
            const _tmp = {
               token: data,
               created: Date.now(),
               lifetime: 24,
               update_before: 12
            };
            cache.setKey(key, JSON.stringify(_tmp));
            cache.save();
            logger.info('Cache');
            next();
         }else{
            throw response;
         }
      }).catch(error => {
         logger.error('Error from auth');
         logger.debug(error);
         next();
      })
   }
};

 /* * * * * * * * * * * * * *
 * Export Module Middleware *
* * * * * * * * * * * * * **/
module.exports = CacheMiddleware;