const Controller = require('../controllers/main');
const api = require('../app/endpoints');
const { ResponseFormat, sendRequest } = require('../libraries/Helpers');
const axios = require('axios');
const qs = require('qs')
const flatCache = require('flat-cache');
const path = __dirname.concat('/../.cache');
class Countries extends Controller {

    getCountries(){
        const dataForm = {}
        const format = new ResponseFormat;
        axios({
        url: api.getCountries(),
        method:'GET',
        headers: { 
            'Authorization' : this.getToken()
            }
        })
        .then( response => {
            const res = 
            {
                data:response.data,
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

    getToken(){
        const cache = flatCache.load('weddingCache', path);
        let cacheContent = cache.getKey('__wedding__token');
        let authorization = '';
        if (cacheContent) {
          cacheContent = JSON.parse(cacheContent);
          authorization = `Bearer ${cacheContent.token}`;
        }
        return authorization;
    }

    getStatesByCountry(){
        const countryData = (this.data)
        const format = new ResponseFormat;
        axios({
        url: api.getStatesByCountry()+"/"+countryData.iso+"/"+null,
        method:'GET',
        headers: { 
            'Authorization' : 'Bearer dLIUr1z4B9e3RXXbtb3E6RXbq65SNB+sCVHLfplrV8dxndJuaY6/LTpWhUY94v4/Bsjs0M88mybClej7a1XYofXeYuDuDwnCiVZ1i2X7Fye6nEZMoRI0ii4o1V8RL3jLyO72TspQG8kzFSX5JvqiSkPYwuHFCIX/0uX4YYwUzGOpOA7QllPL/YhSuN/H+tJrUXrpyIHZLCKtt5sc1R/vTB4qSCqsUKvFcNQjMO7JgFgm9GDj8hqUCmO9CtK/H/C9eVMHzjoL35/Q2dTGFXHRxbWbwlrFw6j+gXqd4tppr2aF8WWS5oS6iYrIArG62rYNjHMQ205opQIK8OYcNUn7PFzxevSQICBPSAKeg0pYawzS59gyiEPEwGZOTITL6EMxlJYAwQ+mhIOpUtp1TwWPVRyHVC2TlE/WPk6qFMgGL5oZ24jLEz2FQSpm1qO1BjEhthV1GfhI2bvJ/WOOmtIRvIQvqfUBAMAh7RaV0qXvtE+3zW87TUKay3H/e04xku7ruotkNJxzhzjOuQjxXTnVm9uGDuI9LL9iTs98aGwmU9YJat7Ki9sxkClCeOeBeTEFmbzX6uGBLnCzPTMtTf497ANyG4sVmXR/09W5/QCa+jXKauP5OKXYBgR4stB3fknjO0cBqsPREKa7qntxTkDfrNXTpFYB14eMaJT9YEyv1IHhZhVwOFmvx2M6WqVbMPSvJ/tOCtR68TpceCjt9eJS8F9hKRCIRi07wy6+5/bfW5DTPNC24twbNZJ4ywU0xP97WkhzAdnwFk4gZ+3J2TGcISyqbNLzVm6wQs157OJAFivdZP5kTIAZU4iRyfdEMsyo9vhfW5LZBca+sLUIgWL2P0NQ6SSMweyKKMDqGTbs9PJkW1PU5wbE77HI2U+4B8xFTkFcWFr+iVZ/A2qpHsv6s97529XSpDLYd4U4/Bho6Sf5Q9R439fUHPAeQkMg41a0R5it/8ph0MW9FqpcqKXDNM+4tPnAzKeyjqCMBlgj4DNlRkS5zG0cbKBtLr4vcGhyHO16DBNoNVwJno/2VmmG2xcgFYh5OztPDm+sBldo6lm5yBP/pWSw4z+g/DV2YmwHUASIVbv11qWaB44294r5E+Lhj1NJTsiiLjlBfVflWpl6x2jXoNKO'
            }
        })
        .then( response => {
            const res = 
            {
                data:response.data,
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
module.exports = Countries;