const Controller = require('../controllers/main');
const api = require('../app/endpoints');
const { ResponseFormat, sendRequest } = require('../libraries/Helpers');
const axios = require('axios');
const qs = require('qs')
const FormData = require('form-data');
class EmailController extends Controller {

    loginEmail(){
        const emailData = (this.data)
        const format = new ResponseFormat;
        const dataRequest = {
            system:"weddingsweb",
            password:"weddings@2020"
        }
        axios({
        url: api.loginEmail(),
        data:qs.stringify(dataRequest),
        method:'post',
        dataType: 'json',
        headers: { 
            'content-type': 'application/x-www-form-urlencoded'
            }
        })
        .then( response => {
            const res = 
            {
                data:response.data.id,
            }
            format.set(res.data, res.Code, res.Error, res.Msg);
            this.response = {
                message: format.get()
            };
        })
        .catch(function (error) {
            console.error(error);
          });
    }

    sendEmail(){
        const emailData = (this.data)
        const format = new ResponseFormat;
        const token = emailData.token
        delete emailData.token
        let formEmail = new FormData()
        for(let key in emailData){
            formEmail.append(key,emailData[key])
        }
        axios({
        url: api.sendEmail(),
        data:qs.stringify(emailData),
        method:'post',
        headers: { 
            'Authorization' : 'Bearer'+token
            }
        })
        .then( response => {
            const res = 
            {
                data:response.data.id,
            }
            format.set(res.data, res.Code, res.Error, res.Msg);
            this.response = {
                message: format.get()
            };
        })
        .catch(function (error) {
            console.error(error);
        });
    }

}

module.exports = EmailController;