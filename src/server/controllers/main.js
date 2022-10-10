/**
 * @author Luis Enrique Huh Puc <lhuh@palaceresorts.com
 * @description COMMENTS CONTROLLER FILE
 */
"use strict";

 /* * * * * * * * * * * *
 *  Import Statements  *
* * * * * * * * * * * */
const env = require('node-env-file');
const flatCache = require('flat-cache');
const { ResponseFormat, sendRequest, serializeData, localTime } = require('../libraries/Helpers');
const Logger = require('../libraries/Logger');
const path = __dirname.concat('/../.cache');

/* * * * * * * * * * **
*  Environment File  *
* * * * * * * * * * **/
env(__dirname + '/../.env');

class Controller {
   constructor(req, res, url = ''){
      console.log(req)
      this._data = req.body;
      this._params = req.params;
      this._res = res;
      this._url = url;
   }

   get token(){
      const cache = flatCache.load('weddingCache', path);
      let cacheContent = cache.getKey('__wedding__token');
   
      if (cacheContent) {
         cacheContent = JSON.parse(cacheContent);
         return  `Bearer ${cacheContent.token}`;
      }else{
         return '';
      }
   }

   set headers(headers = {}){
      this._headers = headers;
   }

   get headers(){
      return this._headers;
   }

   get username(){
      return process.env.AUTH_USERNAME;
   }

   get password(){
      return process.env.AUTH_PASSWORD;
   }

   set url(url = ''){
      this._url = url;
   }

   get url(){
      return this._url;
   }

   set data(data = {}){
      this._data = data;
   }

   get data(){
      return this._data || {};
   }

   set response(data = {}){
      const status = data.status || 200;
      const message = data.message || {};
      this._res.status(status).send(message);
   }

   get response(){
      return this._res;
   }

   set listIgnore(list = []){
      this._listIgnore = list;
   }

   get listIgnore(){
      return this._listIgnore;
   }

   get params(){
      return this._params;
   }

   get locals(){
      return this._res.locals || {};
   }

   get basicInfoPost(){
      return {
         estado: 1,
         usuario_creacion: this.username,
         fecha_creacion: localTime(),
         usuario_ultima_modificacion: this.username,
         fecha_ultima_modificacion: localTime()
      }
   }

   get basicInfoUpdate(){
      return {
         estado: 1,
         usuario_ultima_modificacion: this.username,
         fecha_ultima_modificacion: localTime()
      }
   }

   defaultHeaders(){
      return {
         authorization: this.token,
         json: true
      }
   }

   defaultListIgnore(){
      return [
         'usuario_creacion',
         'fecha_creacion',
         'usuario_ultima_modificacion',
         'fecha_ultima_modificacion'
      ];
   }

   keyCleaner(data = []){
      const tmp = [];

      for (let i = 0; i < data.length; i++) {
         const object = data[i];
         for (const key in object) {
            if (object.hasOwnProperty(key)) {
               const listIgnore = this.listIgnore || this.defaultListIgnore();
               for (let j = 0; j < listIgnore.length; j++) {
                  if (key === listIgnore[j]) {
                     delete object[key];
                  }
               }
            }
         }
         tmp.push(object);
      }

      return tmp;
   }

   post(data = null, callback){
      const tmpData = Object.assign({}, this.basicInfoPost, data || this.data);
      const format = new ResponseFormat;
      const logger = new Logger(__filename);

      sendRequest(this.url, tmpData, 'POST', this.headers || this.defaultHeaders())
      .then( response => {
         try {
            response = JSON.parse(response);
         } catch (e) {}

         if (callback != null && typeof callback === 'function') {
            return callback(response);
         }else{

            format.set({ resource_id:  response.id || 0, ...this.data }, 200, false, 'Resource Created');
            return this.response = { message: format.get() };
         }
      })
      .catch( error => {
         logger.error(`Error trying to create resource in ${this.url}`);
         logger.debug(error);
         format.set([], 403, true, 'Error trying to create resource');
         return this.response = { message: format.get(), status: 403 };
      });
   }

   get(id, callback){
      const format = new ResponseFormat;
      const logger = new Logger(__filename);

      if (id) {
         this.url = `${this.url}/${id}`;
      }

      sendRequest(this.url, {}, 'GET', this.headers || this.defaultHeaders())
      .then( response => {
         try {
            response = JSON.parse(response);
         } catch (e) {}

         if (callback != null && typeof callback === 'function') {
            return callback(response);
         }else{
            let data = response.data || [];
            data = this.keyCleaner(data);
            data = serializeData(data);
            format.set(data, 200, false, 'Resource Found');
            return this.response = { message: format.get() };
         }
      })
      .catch( error => {
         logger.error(`Error trying to get resource in ${this.url}`);
         logger.debug(error);
         format.set([], 403, true, 'Error trying to get resource');
         return this.response = { message: format.get(), status: 403 };
      });
   }

   put(data = null, callback){
      const tmpData = Object.assign({}, this.basicInfoUpdate, data || this.data);
      const format = new ResponseFormat;
      const logger = new Logger(__filename);

      sendRequest(this.url, tmpData, 'PUT', this.headers || this.defaultHeaders())
      .then( response => {
         try {
            response = JSON.parse(response);
         } catch (e) {}

         if (callback != null && typeof callback === 'function') {
            return callback(response);
         }else{
            format.set([], 200, false, 'Updated resource');
            return this.response = { message: format.get() };
         }
      })
      .catch( error => {
         logger.error(`Error trying to update resource in ${this.url}`);
         logger.debug(error);
         format.set([], 403, true, 'Error trying to update resource');
         return this.response = { message: format.get(), status: 403 };
      });
   }

   delete(){
      
   }
}

module.exports = Controller;