/**
 * @author Luis Enrique Huh Puc <lhuh@palaceresorts.com> ALAN GIMENEZ
 * @description METHODS FILE
 */

/* * * * * * * * * * *
* Import Statements *
* * * * * * * * * * */
const axios = require('axios');
const flatCache = require('flat-cache');
const path = __dirname.concat('/../.cache');
const Logger = require('../libraries/Logger');
const http = require('http'); // Para descarga de archivos
const logger = new Logger('methods.js');

/**
 * Generar los encabezados para las solicitudes
 */
function getHeaders() {
   let reqHeaders = {
      authorization: getToken(),
      'response-type': 'application/json',
      'content-type': 'application/json',
      'accept': 'application/json'
   };

   return reqHeaders;
}

function getToken() {
   const cache = flatCache.load('weddingCache', path);
   let cacheContent = cache.getKey('__wedding__token');
   let authorization = '';
   if (cacheContent) {
      cacheContent = JSON.parse(cacheContent);
      authorization = `Bearer ${cacheContent.token}`;
   }
   return authorization;
}

// #region MÉTODO GENÉRICO
async function makeRequest(req, res, url) {
   let axiosrequest = null;
   let reqHeaders = getHeaders();

   req.headers.json = true;

   // Realiza la solicitud en base a la información que se envía
   switch (String(req.method || '').toUpperCase()) {
      case 'POST':
         axiosrequest = axios.post(url, req.body, { headers: reqHeaders });
         break;

      case 'PUT':
         axiosrequest = axios.put(url, req.body, { headers: reqHeaders });
         break;

      default:
         axiosrequest = axios.get(url, { headers: reqHeaders });
         break;
   }

   return axiosrequest
      .then(response => {
         return res.send(formatResponse(response));
      })
      .catch(error => {
         const _tmp = {
            request_url: req.originalUrl,
            request_method: req.method,
            request_agent: req.headers['user-agent']
         };
         /* console.log('Code =>', error.code)
         console.log('data =>', error.data)
         console.log('response data=>', error.response.data)
         console.log('request originalUrl =>', req.originalUrl)
         console.log('request method =>', req.method)
         console.log('request headers =>', req.headers['user-agent']) */
         /* console.log('request =>', req)
         console.log('request =>', req) */
         /* console.log('Request error =>', error) */
         let theResponse = {
            error: true,
            data: [],
            message: "Something happened."
         };

         // Validar que no haya error "ENOTFOUND"
         if (error.code) {
            _tmp['message'] = error.code;
            logger.error({ url: req.originalUrl, error: error.code });
            logger.debug(_tmp);
            theResponse = {
               error: true,
               data: [],
               message: error.code
            };
         } else if (error.response) {
            _tmp['error_code'] = error.response.data.code;
            _tmp['error_status'] = error.response.data.status;
            _tmp['error_message'] = error.response.data.message;
            logger.error({ url: req.originalUrl, error: error.response.data.status });
            logger.debug(_tmp);
            // Tomar los datos de la respuesta y devolverlos directamente
            theResponse = formatResponse(error.response);
         } else {
            _tmp['error_info'] = error;
            logger.error({ url: req.originalUrl, error: error.stack || error.message || 'Unknown error' });
            logger.debug(_tmp);
            let customErrorMessage = error.stack || error.message || "There was an unknown error on the server side.";
            // Responder de acuerdo al código de respuesta enviado por node
            theResponse = {
               error: true,
               data: [],
               message: customErrorMessage
            };
         }
         return res.send(theResponse);

      });
}

// Funciones para validar el tipo de respuesta recibida
const isInformational = (statusCode) => (statusCode >= 100) && (statusCode <= 199);

const isSuccess = (statusCode) => (statusCode >= 200) && (statusCode <= 299);

const isRedirection = (statusCode) => (statusCode >= 300) && (statusCode <= 399);

const isClientError = (statusCode) => (statusCode >= 400) && (statusCode <= 499);

const isServerError = (statusCode) => (statusCode >= 500);

const formatError = (response) => {
   const code = response.status;
   const status = response.statusText;
   const error = isClientError(code);
   const message = response.data.message || '';
   return {
      code: code,
      status: status,
      error: error,
      message: message,
   };
}

/**
 * Devuelve la respuesta de la API en el formato estándar de las Apis de Clever
 * El campo {extra} devuelve información sobre la petición y demás información
 * para propósitos de depuración. Este campo se elimina al estar en producción
 * @param {response} apiResponse El objeto devuelto por la API como respuesta a la petición
 */
const formatResponse = (apiResponse) => {
   /* console.log(apiResponse.data);
   console.log(apiResponse.status); */
   let formattedResponse = {
      data: [],
      error: false,
      message: "",
      headers: getHeaders(),
      // Campo Adicional para depuración
      extra: {
         message: "Ready"
      }
   };

   // :: Modificar la variable isProduction para que tome el valor de la configuración global
   let isProduction = false;
   if (apiResponse.data) {
      const responseStatus = formatError(apiResponse);

      // Armar la respuesta
      formattedResponse = {
         data: apiResponse.data.data || apiResponse.data || apiResponse || [],
         error: apiResponse.data.error || apiResponse.error || responseStatus.error || false,
         message: apiResponse.data.message || apiResponse.message || responseStatus.message || '',
         extra: {
            warning: (!apiResponse.data.data) ? "Response body does not meet Clever response standard. Please use data, error and message fields in your response." : "Success."
         }
      };

      // Eliminar los campos de auditoría antes de devolver el resultado de la API
      for (let index = 0; index < formattedResponse.data.length; index++) {
         const item = formattedResponse.data[index];
         delete item.usuario_creacion;
         delete item.fecha_creacion;
         delete item.usuario_ultima_modificacion;
         delete item.fecha_ultima_modificacion;
      }
      // Limpiar los campos de auditoría del elemento cuando el campo data no es un array
      delete formattedResponse.data.usuario_creacion;
      delete formattedResponse.data.fecha_creacion;
      delete formattedResponse.data.usuario_ultima_modificacion;
      delete formattedResponse.data.fecha_ultima_modificacion;
   } else {
      formattedResponse = {
         data: [],
         error: apiResponse.error,
         message: apiResponse.message,
         extra: apiResponse.extra || { message: "Error detected." }
      };
   }

   // Devolver el objeto con la respuesta formateada
   // Eliminar el campo de debug cuando estamos en producción
   if (isProduction) {
      delete formattedResponse.extra;
   }
   return formattedResponse;
};
// #endregion MÉTODO GENÉRICO


// #region : DESCARGA DE ARCHIVOS
const fileDownload = (req, res, url) => {
   let filetype = req.filetype = 'PDF';
   let filename = ''.concat((req.filename || 'download'), (filetype || ''));
   var options = {
      method: String(req.method || 'GET').toUpperCase(),
      port: 80,
      path: url,
      headers: {
         'authorization': getToken()
      }
   };

   var request = http.request(options, function (response) {
      var data = [];

      response.on('data', (chunk) => {
         data.push(chunk);
      });

      response.on('end', () => {
         // Asignar valores a las cabeceras y enviar el documento
         data = Buffer.concat(data);
         const cache = flatCache.load('weddingCache', path);
         let cacheContent = cache.getKey('__wedding__token');
         let authorization = '';
         if (cacheContent) {
            cacheContent = JSON.parse(cacheContent);
            authorization = `Bearer ${cacheContent.token}`;
         }

         res.writeHead(200, {
            'Content-Type': 'application/pdf',
            'Content-Disposition': `inline; filename=${filename}`,
            //  'inline; filename=wedding-details.pdf',
            'Content-Length': data.length,
            'Authorization': authorization,
            // 'response-type': 'application/json',
            // 'content-type': 'application/json',
            // 'accept': 'application/json'
         });

         res.end(data);
      });
   });

   request.end();
};
// #endregion / DESCARGA DE ARCHIVOS

const PDFRequest = async (req, res, url) => {
   const options = {
      headers: {
         'Authorization': getToken(),
         'Response-Type': 'stream',
         'Content-Type': 'stream',
         'Accept': 'stream'
      }
   };

   const request = await http.get(url, options, (response) => {
      const buffer = [];
      response.on('data', (chunk) => {
         buffer.push(chunk);
      })

      response.on('end', () => {
         const data = Buffer.concat(buffer);
         res.writeHead(200, {
            'Content-Type': 'application/pdf',
            'Content-Length': data.length
         });
         res.end(data);
      })
   })
   
   request.on('error', (err) => {
      console.log('error', err);
   })
   request.end();
};
module.exports.fileDownload = fileDownload;
module.exports.PDFRequest = PDFRequest;
module.exports.makeRequest = makeRequest;
