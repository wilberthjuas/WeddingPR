"use strict";
/**
 * @author Luis Enrique Huh Puc <lhuh@palaceresorts.com>
 * @description LOGGER FILE
 */

/* * * * * * * * * * * *
 *  Import Statements  *
* * * * * * * * * * * */
const fs = require('fs');
const util = require('util');

class Logger{
   constructor(filename = ''){
      this._filename = filename;
      this._message = '';
      this._path = __dirname.concat('/../.logs/');
      this._infoStream = fs.createWriteStream(this._path.concat('info.log'));
      this._debugStream = fs.createWriteStream(this._path.concat('debug.log'));
      this._errorStream = fs.createWriteStream(this._path.concat('error.log'));
   }

   set filename(filename){
      this._filename = filename;
   }

   get filename(){
      return this._filename;
   }

   set message(value){
      this._message = `[${new Date().toISOString()}] [${value.type.toUpperCase()}] ${this.filename} : ${util.format('%j', value.msg)} \n`;
   }

   get message(){
      return this._message;
   }

   info(...msg){
      this.message = {type: 'info', msg:[...msg]};
      this._infoStream.write(this.message);
   }

   debug(...msg){
      this.message = {type: 'debug', msg:[...msg]};
      this._debugStream.write(this.message);
   }

   error(...msg){
      this.message = {type: 'error', msg:[...msg]};
      this._errorStream.write(this.message);
   }
}

module.exports = Logger;