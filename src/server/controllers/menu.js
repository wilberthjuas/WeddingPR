const Controller = require('../controllers/main');
const api = require('../app/endpoints');
const { ResponseFormat, sendRequest } = require('../libraries/Helpers');

class MenuController extends Controller {

    getMenu(){
        console.log("entra al controlador");
        
        const format = new ResponseFormat;
        sendRequest(api.getMenu(), this.data, 'post')
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

module.exports = MenuController;