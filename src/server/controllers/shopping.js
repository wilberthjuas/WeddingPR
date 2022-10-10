const Controller = require('../controllers/main');
const api = require('../app/endpoints');
const { ResponseFormat, sendRequest } = require('../libraries/Helpers');

class ShoppingController extends Controller {

    sendShopping(){
        const format = new ResponseFormat;
        sendRequest(api.sendShoppingCart(), this.data, 'post', { Authorization: this.token })
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

    getShopping(){
        const format = new ResponseFormat;
        sendRequest(api.getShoppingCart(), 'post', { Authorization: this.token })
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

    postComment(){
        const format = new ResponseFormat;
        sendRequest(api.postComment(), this.data, 'post', { Authorization: this.token })
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

module.exports = ShoppingController;