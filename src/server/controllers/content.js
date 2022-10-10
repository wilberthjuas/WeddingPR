"use strict";
const Controller = require('../controllers/main');
const api = require('../app/endpoints');
const Logger = require('../libraries/Logger');
const { ResponseFormat, sendRequest } = require('../libraries/Helpers');

class ContentController extends Controller{
    getSingleContent() {
        const format = new ResponseFormat;
        sendRequest(api.getSingleContent(), this.data, 'post')
            .then( res => {
                format.set(res.data, res.Code, res.Error, res.Msg);
                this.response = {
                    message: format.get()
                };
            })
            .catch( e => {
                console.error(e);
            });
    } 
   
}

module.exports = ContentController;