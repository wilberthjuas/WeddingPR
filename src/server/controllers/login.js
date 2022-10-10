/**
 * @author Luis Enrique Huh Puc <lhuh@palaceresorts.com
 * @description LOGIN CONTROLLER FILE
 */
"use strict";

 /* * * * * * * * * * * *
 *  Import Statements  *
* * * * * * * * * * * */
const Controller = require('./main');
const api = require('../app/endpoints');
const Logger = require('../libraries/Logger');
const { ResponseFormat, sendRequest } = require('../libraries/Helpers');

class LoginController extends Controller{
   /**
    * Obtiene los datos del hash encriptado.
    */
   getDataHash(){
      const format = new ResponseFormat;
      const data = this.locals.data || {};

      format.set(data, 200, false, 'Resource Found');
      this.response = {
         message: format.get()
      };
   }
}

module.exports = LoginController;