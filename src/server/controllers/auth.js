/**
 * @author Luis Enrique Huh Puc <lhuh@palaceresorts.com
 * @description AUTH METHOD FILE
 */

 /* * * * * * * * * * * *
 *  Import Statements  *
* * * * * * * * * * * */
const env = require('node-env-file');
const flatCache = require('flat-cache');
const Logger = require('../libraries/Logger');
const api = require('../app/endpoints');
const { ResponseFormat , Validator, getAuthorizationToken, sendRequest, getValueObject } = require('../libraries/Helpers');

/* * * * * * * * * * **
*  Environment File  *
* * * * * * * * * * **/
env(__dirname + '/../.env');
const authCredentials = { username: process.env.AUTH_USERNAME || 'guest', password: process.env.AUTH_PASSWORD || '' };

/* * * * * * * * *
*  Set variables *
* * * * * * * * */
const logger = new Logger('auth.js');
const path = __dirname.concat('/../.cache');

const getHeaderAuthorization = () => {
   const cache = flatCache.load('weddingCache', path);
   let cacheContent = cache.getKey('__wedding__token');

   if (cacheContent) {
      cacheContent = JSON.parse(cacheContent);
      return  `Bearer ${cacheContent.token}`;
   }

   return '';
};

const AuthServices = (req, res, url) => {
   const credentials = req.body;
   const validator = new Validator(credentials);
   const format = new ResponseFormat;

   if (!validator.isValid) {
      return res.status(400).send(validator.reponse());
   }

   getAuthorizationToken(credentials.email, credentials.password, url)
   .then( response => {
      /* console.log(response);
      format.set(response, 200, false, 'Successful');
         return res.send(format.get()); */
      sendRequest(api.decodeToken(), {}, 'GET', { authorization: `Bearer ${response.data}`, json: true})
      .then( authRes => {
         const data = Object.assign({}, authRes.data.data_auth);
         data['token'] = response.data;
         delete data['password'];
         delete data['usuario_creacion'];
         delete data['fecha_creacion'];
         delete data['usuario_ultima_modificacion'];
         delete data['fecha_ultima_modificacion'];
         sendRequest(api.getHotelName(data['idclv_propiedad']), {}, 'GET', { authorization: `Bearer ${response.data}`, json: true})
         .then( coreRes => {
            const property = coreRes.data;
            data['hotel_name'] = property['nombre_comercial'];
            format.set(data, 200, false, 'Successful');
            return res.send(format.get());
         })
         .catch(err => {
            logger.error('Error in hotel name getting');
            logger.debug(err);
            format.set([], 403, true, 'Error to authenticate');
            return res.status(403).send(format.get());
         });
      })
      .catch(err => {
         logger.error('Error in token decoding');
         logger.debug(err);
         format.set([], 403, true, 'Error to authenticate');
         return res.status(403).send(format.get());
      });
   })
   .catch(err => {
      logger.error('Error to authenticate from portal');
      logger.debug(err);
      format.set([], 403, true, 'Error to authenticate');
      return res.status(403).send(format.get());
   });
};

const AuthPayment = (req, res, url) => {
   const authorization = getHeaderAuthorization();
   
   const data = Object.assign({}, req.body);//Todo el cuerpo del pago
   const _data = Object.assign({}, data.data) || {};//Datos del pago
   const items = Object.assign({}, _data.items);//Servicios a pagar
   const paymentlist = {};

   for (const key in items) {
      if (items.hasOwnProperty(key)) {
         const item = items[key];
         paymentlist['payment_amount_' + item.id] = {
            concepto_ingreso: item.concept,
            idconcepto_ingreso: item.idConcept,
            idevent_detalle_item: item.id,
            value: item.amount
         }
      }
   }
   data['username'] = authCredentials.username;

   delete data.data.reserva;
   delete data.data.idfin_cliente_interno;
   delete data.data.idconcepto_ingreso;
   delete data.data.hotel;
   delete data.data.cia;
   delete data.data.items;

   data['data']['paymentlist'] = paymentlist;
   data['data']['idfin_forma_pago'] =  "1";
   /* data['data']['idconcepto_ingreso'] = "1"; */
   data['data']['username'] = authCredentials.username;
   
   sendRequest(url, data, 'POST', { authorization: authorization, json: true})
   .then( response => {
      return res.send(response);
   })
   .catch( err => {
      return res.send(err);
   });
};

const AuthResetPassword = (req, res, url, skip = false) =>{
   const  authorization = getHeaderAuthorization();
   //getting data
   const requestData = req.body;

   const realURL = url.concat('/', requestData.id);
   
   const data = !skip ? { 
      password: requestData['pass'],
      fecha_sesion: new Date(),
      estado_sesion: 1
   } : { estado_sesion: 1 };

   sendRequest(realURL, data, 'PUT', { authorization: authorization, json: true})
   .then( response => {
      return res.send(response);
   })
   .catch( err => {
      return res.send(err);
   });
};

module.exports.AuthServices = AuthServices;
module.exports.AuthPayment = AuthPayment;
module.exports.AuthResetPassword = AuthResetPassword;