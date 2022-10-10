/**
 * @author Luis Enrique Huh Puc <lhuh@palaceresorts.com
 * @description AUTH METHOD FILE
 */

 /* * * * * * * * * * * *
 *  Import Statements  *
* * * * * * * * * * * */
const flatCache = require('flat-cache');
const fs = require('fs');
const FormData = require('form-data');
const Logger = require('../libraries/Logger');
const { ResponseFormat, sendRequest } = require('../libraries/Helpers');


/* * * * * * * * *
*  Set variables *
* * * * * * * * */
const logger = new Logger('upload.js');
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

const UploadFile = (req, res, url) => {
   const format = new ResponseFormat;
   const headers = {
      'authorization': getHeaderAuthorization()
   };

   const file = req.file;
   const extraParams = req.body;
   const readFile = fs.createReadStream(file['path']);

   const form = new FormData();

   form.append('id-profile', extraParams.id);
   form.append('name-bucket', 'events');
   form.append('file', readFile, {filename: file['originalname'], contentType: file['mimetype']});

   const _headers = Object.assign({}, headers, form.getHeaders());

   sendRequest(url, form, 'POST', _headers)
   .then( resp => {
      fs.unlink(file['path'], (err) => {
         if (err) {
            logger.error('Error deleting', file['path']);
            logger.debug(err);
         }
      })

      if (!resp['error']) {
         format.set({ path: resp['data']['objectURL']}, 200, false, 'Successful');
         return res.send(format.get());
      }

      logger.error('Something went wrong uploading cover');
      logger.debug(resp);
      format.set([], 400, true, 'Error to upload cover');
      return res.status(400).send(format.get());
   })
   .catch( e => {
      logger.error('It can\'t upload file');
      logger.debug(e);
      format.set([], 400, true, 'Error to upload cover');
      return res.status(400).send(format.get());
   });
   /* format.set([], 500, true, 'Error to upload cover');
   return res.status(500).send(format.get()); */
}

module.exports = UploadFile;