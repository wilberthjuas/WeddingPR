const axios = require('axios');
/**
 * Genera los headers para realizar la petición
 */
// #region Headers
const setHeaders = () => ({
   'Accept': '*/*',
	/* 'Authorization': 'Bearer ' + sessionStorage.token,
	'Content-Language': 'Bearer ' + sessionStorage.token, */
   'Content-Type': 'application/json'
});
// #endregion

// #region "REALIZAR PETICIÓN USANDO GET"
export const getData = (url, options = {}) => fetch(url, {
   headers: setHeaders(),
   method: 'GET'
})
   // Convertir y devolver los resultados como JSON si es posible
   .then(response => typeof response.json === 'function' ? response.json() : response)
   .then(json => (!json.error) ? Promise.resolve(json) : Promise.reject(json || "No data received."))
// #endregion "REALIZAR PETICIÓN USANDO GET"

/**
 * Abre un PDF
 * @param url {string} La url del objeto a solicitar
 * @param options {object} Objeto de configuración en caso de ser necesario para casos específicos
 */
// #region "DESCARGAR ARCHIVO PDF"
export const getPDF = url => fetch(new Request(url, {
   headers: setHeaders(),
   method: 'GET',
   mode: 'cors',
   cache: 'default'
}))
   .then(response => response.blob())
   .then(response => window.open(URL.createObjectURL(response)));
// #endregion "DESCARGAR ARCHIVO PDF"

/**
 * Abre un PDF
 * @param url {string} La url del objeto a solicitar
 * @param options {object} Objeto de configuración en caso de ser necesario para casos específicos
 */
// #region "GENERAR ARCHIVO PDF PARA EMBEBER"
export const getEmbededPDF = url => fetch(new Request(url, {
   headers: {
      'Accept': '*/*',
      'Content-Type': 'application/pdf'
   },
   method: 'GET',
   mode: 'cors',
   cache: 'default'
}))
   // .then(response => response.blob())
// .then(response=>response.text())
// .then(response => response)
// .then(response => URL.createObjectURL(response));
// #endregion "GENERAR ARCHIVO PDF PARA EMBEBER"

/**
 * Realiza peticiones usando métodos POST/PUT
 * @param {string} url La url del objeto a solicitar
 * @param {object} data Los datos a enviar del tipo clave:valor
 * @param {string} method El tipo de método a usar, default: POST
 */
// #region "REALIZAR PETICIÓN USANDO POST (DEFAULT)|PUT"
export const sendData = (url, data, method = 'POST') => {
   data = JSON.stringify(data || {});
   if (method == 'PUT') {
      return fetch(url, {
         method: method,
         headers: setHeaders(),
         mode: 'cors',
         cache: 'default',
         body: data,
         redirect: 'follow'
      })
         .then(response => typeof response.json === 'function' ? response.json() : response)
         .then(json => (!json.error) ? Promise.resolve(json) : Promise.reject(json || "No data received."))

   } else {
      
      return fetch(url, {
         method: method,
         headers: setHeaders(),
         mode: 'cors',
         cache: 'default',
         body: data
      })
         .then(response => typeof response.json === 'function' ? response.json() : response)
         .then(json => (!json.error) ? Promise.resolve(json) : Promise.reject(json || "No data received."))
   }
}
// #endregion

export const sendHubSpot = (postData, idForm) => {

   var https = require('https');
   var options = {
      hostname: 'forms.hubspot.com',
      path: '/uploads/form/v2/2284186/'+idForm,
      method: 'POST',
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': postData.length,
      }
  }

  // set up the request
  var request = https.request(options, function (response) {
      console.log("Status: " + response.statusCode);
      console.log("Headers: " + JSON.stringify(response.headers));
      response.setEncoding('utf8');
      response.mode('no-cors'),
      response.on('data', function (chunk) {
          console.log('Body: ' + chunk)
      });
  });

   //console.log(request.on);   
  request.on('error', function (e) {
         console.log("Problem with request " + e.message)
      })
  // post the data
  request.write(postData);
  request.end();

}
