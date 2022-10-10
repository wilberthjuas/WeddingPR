import { isArray } from 'util';

export const substr = (text = '', start = 0, end = (text) ? text.length : 0) => {
   if (text) {
      return text.substr(start, end);
   }else{
      return '';
   }
}

//funcion para formatear cantidades  en formato  12,333,444.90
export const formatNumber2= (num) => {
   if (!num || num == 'NaN') return '-';
   if (num == 'Infinity') return '&#x221e;';
   num = num.toString().replace(/\$|\,/g, '');
   if (isNaN(num))
       num = "0";
   var sign = (num == (num = Math.abs(num)));
   num = Math.floor(num * 100 + 0.50000000001);
  var cents = num % 100;
   num = Math.floor(num / 100).toString();
   if (cents < 10)
       cents = "0" + cents;
   for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3) ; i++)
       num = num.substring(0, num.length - (4 * i + 3)) + ',' + num.substring(num.length - (4 * i + 3));
   return (((sign) ? '' : '-') + num + '.' + cents);
};

export const slice = (text = '', slices = 1) => {
   let tmp = [];
   if (text) {
      if (isArray(slices)) {
         let count = 0;
         for (let i = 0; i < slices.length; i++) {
            tmp.push(text.substr(count, slices[i]));
            count += slices[i];
         }
      }else{
         for (let i = 0; i < text.length / slices; i++) {
            tmp.push(text.substr(i * slices, slices));
         }
      }
      return tmp;
   }else{
      return [];
   }
}

export const replace = (text = '', length = 1, replaceWith = ' ') => {
   const tmp = slice(text, length);
   return tmp.join(replaceWith);
}

export const Guid = () => {
   const s4 = () => {
      return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
   };

   return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
};

export const findInObject = (object, value) => {
   let found = false;
   let _tmp = '';
   for (const key in object) {
      if (object.hasOwnProperty(key)) {
         if(key == value){
            _tmp = object[key];
            found = true;
            break;
         }
      }
   }

   return found ? _tmp : -1;
};

export const findInArray = (array = [], key = '', value = '') => {
   return array.find(item => item[key] == value);
};

export const changeData = (data, format) =>{
   var hoy = data !== undefined ? new Date(data) : new Date();
   var dd = hoy.getDate();
   var mm = hoy.getMonth() + 1; //hoy es 0!
   var yyyy = hoy.getFullYear();
   var f_date="";
   dd = (dd < 10 ? ('0' + dd) : dd);
   mm = (mm < 10 ? ('0' + mm) : mm);
   if(format=="ISO"){
      f_date=dd + '-' + mm + '-' + yyyy;
   }else{
      f_date=yyyy + '-'+ mm + '-' + dd;
   }
   return f_date;

};

export const getPropertyImage = (url, callback) => {
    const img = new Image();
    img.addEventListener('load', (meta) => {
       return callback(meta);
    })
    img.src = url;
};

export const formatNumber = (value, decimals) => {
   return parseFloat((Math.round(value * 100) / 100).toFixed(decimals));
}

export const randomNumber = (min, max) => {
   if (max == null || max == undefined) {
      max = min;
      min = 1;
   }
   return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const onlyNumbers = (e) => {
   const key = e.which;
   if (key < 48 || key > 57) {
      e.preventDefault();   
   }
};

export const maxValue = (e, value) => {
   const input = e.target;
   if (input.value >= value) {
      input.value = value;
      e.preventDefault();
   }
}

export const onlyText = (e) => {
   const key = e.which;
   if (key >= 48 && key <= 57) {
      e.preventDefault();   
   }
};

export const getItemFromArray = (array = [], item) => {
   return array.indexOf(item);
};

export const deleteItemFromArray = (array = [], item) => {
   const index = getItemFromArray(array, item);
   if (index != -1) {
      array.splice(item, 1);
      return array;
   }else{
      return array;
   }
};

export const objectsEquals = (a, b) => {
   var aKeys = Object.keys(a).sort();
   var bKeys = Object.keys(b).sort();
   if (aKeys.length !== bKeys.length) {
       return false;
   }
   if (aKeys.join('') !== bKeys.join('')) {
       return false;
   }
   for (var i = 0; i < aKeys.length; i++) {
      const _a = aKeys[i];
      const _b = bKeys[i];
       if ( a[_a]  !== b[_b]) {
           return false;
       }
   }
   return true;
};

export const arraysEquals = (a, b) => {
   if (a === b) return true;
   if (a == null || b == null) return false;
   if (a.length != b.length) return false;
   for (var i = 0; i < a.length; ++i) {
      if (!objectsEquals(a[i], b[i])) {
         return false;
      }
   }
   return true;
};

export const formatter = (() => {
   const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
   ];
   const weekdays = [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday'
   ]
   const suffix = [
      'st',
      'nd',
      'rd',
      'th',
   ]
   const currencies_data = {
      "usa": {
         locale: "en-US",
         currency: "USD",
         display: 'code'
      },
      "mx": {
         locale: "es-MX",
         currency: "MXN",
         display: 'code'
      }
   };

   return {
      formatNumber: (value = 0, decimals = 1) => {
         return parseFloat((Math.round(value * 100) / 100).toFixed(decimals));
      },
      roundedNumber: (value = 0, position = 'down') => {
         return position == 'down' ? Math.floor(value) : Math.ceil(value);
      },
      parseBoolean: (string = 'false') => {
         switch(string.toLowerCase().trim()){
            case "true": case "yes": case "1": return true;
            case "false": case "no": case "0": case null: return false;
            default: return Boolean(string);
         }
      },
      toShortDateString: (date = new Date) => {
         date = validator.validateDate(date);
         date = date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate();
         return date != 'NaN-NaN-NaN' ? date : 'Invalid Date';
      },
      toDateString: (date = new Date) => {
         date = date instanceof Date ? date : (date == 'Invalid Date' ? new Date() : new Date(date));
         const month = date.getMonth();
         const day = date.getDate();
         const year = date.getFullYear();
         return months[month] + ' ' + day + ', ' + year;
      },
      toLongDateString: (date = new Date) => {
         date = validator.validateDate(date);
         return date;
      },
      toTextTag: (text = '', separator = '-') => {
         if (text) {
            text = text.trim();
            text = text.toLowerCase();
            const tmp = text.split(' ');
            return tmp.join(separator);
         }
         return '';
      },
      toTagText: (text = '', separator = '-') => {
         if (text) {
            text = text.trim();
            text = text.toLowerCase();
            const tmp = text.split(separator);
            return tmp.join(' ');
         }
         return '';
      },
      toUpperCaseEachWord: (text = '') => {
         const rex = /\b[a-z]/g;
         text = text.toLowerCase();
         return text.replace(rex, c => c.toUpperCase());
      },
      currency: (value, currency) => {
         if (!currency) {
            return value;
         }
   
         currency = currency || 'usa';
   
         if (typeof currency === 'boolean' || typeof currency === 'string') {
            const format = currencies(currency);
            return new Intl.NumberFormat(format.locale, {style: 'currency', currency: format.currency, currencyDisplay: format.display}).format(value);
         }else{
            const format = currencies(currency.country);
            const _locale = format.locale;
            const _currency = format.currency;
            const _display = currency.display || format.display;
            return new Intl.NumberFormat(_locale, {style: 'currency', currency: _currency, currencyDisplay: _display}).format(value);
         }
         
         function currencies(ctryCode = 'usa'){
   
            let data = currencies_data[ctryCode];
            data = data || currencies_data['usa'];
   
            return data;
         }
      }
   };
})();

export const generator = (() => {
   const today = new Date();
   const endYear = new Date(1995, 11, 31, 23, 59, 59, 999);
   const msPer = (prefix = 'day') => {
      prefix = prefix ? prefix : 'day';
      const _tmp = prefix == 'month' ? 12 * 7 * 24 : (prefix == 'week' ? 7 * 24 : 24);
      return _tmp * 60 * 60 * 1000;
   }
   return {
      //Fechas
      getDate: (date) => {
         const isDate = validator.validateDate(date);
         if (isDate) {
            return isDate;
         }else{
            return new Date();
         }
      },
      getYear: () => {
         return (generator.getDate()).getFullYear();
      },
      getRangeYears: (start = 1, range = 0) => {
         const year = range > 0 ? start : generator.getYear();
         const years = [];
         for (let i = 0; i < (range > 0 ? range : start); i++) {
            years.push(year + i);
         }
         return years;
      },
      getDropdownYears: (start = 1, range = 0, invert = false) => {
         const years = generator.getRangeYears(start, range);
         const dropdown = {};
         for (let i = 0; i < years.length; i++) {
            const year = years[i];
            dropdown[!invert ? substr(year.toString(), 2, 2) : year] = !invert ? year : substr(year.toString(), 2, 2);
         }
         return dropdown;
      },
      getDaysLeft: () => {
         endYear.setFullYear(today.getFullYear());
         const daysLeft = (endYear.getTime() - today.getTime()) / msPer();
         return Math.round(daysLeft);
      },
      getWeeksLeft: () => {
         endYear.setFullYear(today.getFullYear());
         const weekLeft = (endYear.getTime() - today.getTime()) / msPer('week');
         return Math.round(weekLeft);
      },
      getMonthsLeft: () => {
         endYear.setFullYear(today.getFullYear());
         const monthLeft = (endYear.getTime() - today.getTime()) / msPer('month');
         return Math.round(monthLeft) + 1;
      },
      getLimitDay: (date = new Date(), limit = 0) => {
         date = validator.validateDate(date);
         date.setDate(date.getDate() + limit);
         return date;
      },//Pendiente por revisar
      getDaysLeft2(date = new Date(), limit) {
         //------------------------------------------------------------
         //obtenemos la fecha actual en formarto  2018/09/01
         date = validator.validateDate(date);
         var hoy = new Date();
         let dia = hoy.getDate();
         let mes = hoy.getMonth() + 1;
         let anio = hoy.getFullYear();
         //pasamos a formato
         let fechahoy = String(anio + "/" + mes + "/" + dia);
         //----------------------------------------------------------------
         //----------------------------------------------------------------
         //obtenemos el paylimit en formato 2018/09/01
         var fecha1 = date;
         fecha1.setDate(fecha1.getDate() + limit);
         let day = fecha1.getDate();
         let month = fecha1.getMonth() + 1;
         let year = fecha1.getFullYear();
         let paylimit = String(year + "/" + month + "/" + day);
   
         //-----------------------------------------------------------------
         //pasamos la fecha actual y el paylimit y obtnemos los días
         var fechaactual = new Date(fechahoy).getTime();
         var fechapaylimit = new Date(paylimit).getTime();
         var diff = ((fechapaylimit - fechaactual) / (1000 * 60 * 60 * 24));
   
         const daysLeft = Math.trunc(diff);
          //truncamos los decimales es decir 72.9999 = 72
         return daysLeft > 0? daysLeft : 0;
      },
      //Arreglos
      toObject: (array = [], key = '', value = '') => {
         let temp = {};
         for (let i = 0; i < array.length; i++) {
            const element = array[i];
            temp[element[key]] = element[value];
         }
         return temp;
      },
      //Numeros
      randomNumber: (min, max) => {
         if (max == null || max == undefined) {
            max = min;
            min = 1;
         }
         return Math.floor(Math.random() * (max - min + 1)) + min;
      },
      //Colores
      randomColor: () => {
         const hex = ["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F"];
         let color = "#";
         for (let i = 0; i < 6; i++) {
            const random = parseInt(generator.randomNumber(0, hex.length));
            color += hex[random];
         }
         return color;
      },
      cssStyle: (element, styles = {}, pseudoStyles = '') => {
         const _sheetId = "cssStyles";
         const _head = document.head || document.getElementsByTagName('head')[0];
         const _sheet = document.getElementById(_sheetId) || document.createElement('style');
         const className = "style-" + Guid();
         var css = "";
         element.className += " " + className;
         _sheet.setAttribute('type', 'text/css');
         _sheet.id = _sheetId;
         for (const key in styles) {
            if (styles.hasOwnProperty(key)) {
               css += key + ': ' + styles[key] + ';';
            }
         }
         _sheet.innerHTML += "\n." + className + (pseudoStyles ? ':' + pseudoStyles : '') + '{' + css + '}';
         _head.appendChild(_sheet);
         return className;
      }
   };
})();

export const regexp = (()=>{
   return {
      escapeString: (str, except) => {
         return str.replace(/([\.$?*|{}\(\)\[\]\\\/\+\-^])/g, (ch) => {
            if(except && except.indexOf(ch) != -1){
               return ch;
            }
            return "\\" + ch;
         });
      },

      buildGroupRE: (arr, re, nonCapture) => {
         // case 1: a is a single value.
         if(!(arr instanceof Array)){
            return re(arr); // String
         }

         // case 2: a is an array
         var b = [];
         for(var i = 0; i < arr.length; i++){
            // convert each elem to a RE
            b.push(re(arr[i]));
         }

         // join the REs as alternatives in a RE group.
         return regexp.group(b.join("|"), nonCapture);
      },

      group: (expression, nonCapture) => {
         return "(" + (nonCapture ? "?:":"") + expression + ")";
      },

      numberFormat: (flags) => {
         // assign default values to missing parameters
         flags = (typeof flags == "object") ? flags : {};
         if(typeof flags.format == "undefined"){ flags.format = "###-###-####"; }

         // Converts a number format to RE.
         var digitRE = function(format){
            // escape all special characters, except '?'
            return regexp.escapeString(format, "?")
               // Now replace '?' with Regular Expression
               .replace(/\?/g, "\\d?")
               // replace # with Regular Expression
               .replace(/#/g, "\\d")
            ;
         };

         // build RE for multiple number formats
         return regexp.buildGroupRE(flags.format, digitRE); //String
      }
   }
})();

export const validator = (() => {
   const _cards = {
      'mc':'((5[1-5][0-9]{2})|2(22[1-9]|2[3-9][0-9]|[3-6][0-9][0-9]|7[0-1][0-9]|720))[0-9]{12}', //Mastercard
      'ec':'5[1-5][0-9]{14}', //Eurocard
      'vi':'4(?:[0-9]{12}|[0-9]{15})', //Visa
      'ax':'3[47][0-9]{13}', //American Express
      'dc':'3(?:0[0-5][0-9]{11}|[68][0-9]{12})', //Diners Club
      'bl':'3(?:0[0-5][0-9]{11}|[68][0-9]{12})', //Carte Blanch
      'di':'6011[0-9]{12}', //Discover
      'jcb':'(?:3[0-9]{15}|(2131|1800)[0-9]{11})', //JCB
      'er':'2(?:014|149)[0-9]{11}' //Enroute
   };

   const opts = Object.prototype.toString;

   return {
      isValidCreditCard: (value, type) => {
         return (((type != null && type != undefined && type.toLowerCase() == 'er') || validator.isValidLuhn(value)) &&
			validator.isValidCreditCardNumber(value, type != null && type != undefined ? type.toLowerCase() : undefined));
      },
      isValidCreditCardNumber: (value, type) => {
         value = String(value).replace(/[- ]/g,'');
         const cardTypes = _cards, results = [];
         if(type){
            const expr = '^' + cardTypes[type.toLowerCase()] + '$';
            return expr ? !!value.match(expr) : false; // boolean
         }

         for(let p in cardTypes){
            if(value.match('^' + cardTypes[p] + '$')){
               results.push(p);
            }
         }
         return results.length ? results.join('|') : false;
      },
      isValidCVC: (value, type) => {
         let format;
         if (!validator.isString(value)) {
            value = String(value);
         }
         switch(type.toLowerCase()){
            case 'mc':
            case 'ec':
            case 'vi':
            case 'di':
               format = '###'
               break;
            case 'ax':
               format = '####'
               break;
            default:
               break;
         }
         return !!format && value.length && validator.isNumberFormat(value, { format: format });
      },
      isString: (value) => {
         return (typeof value == "string" || value instanceof String);
      },
      isArray: Array.isArray || function(value){
			return opts.call(value) == "[object Array]";
		},
		isFunction: (value) => {
			return opts.call(value) === "[object Function]";
		},
		isObject: (value) => {
			return value !== undefined &&
				(value === null || typeof value == "object" || validator.isArray(value) || validator.isFunction(value));
      },
      isNumberFormat: (value, flags) => {
         const re = new RegExp("^" + regexp.numberFormat(flags) + "$", "i");
         return re.test(value);
      },
      isValidLuhn: (value) => {
         let sum = 0, parity, curDigit;

         if(!validator.isString(value)){
            value = String(value);
         }

         value = value.replace(/[- ]/g,'');
         parity = value.length % 2;
         
         for(var i = 0; i < value.length; i++){
            curDigit = parseInt(value.charAt(i));
            if(i % 2 == parity){
               curDigit *= 2;
            }
            if(curDigit > 9){
               curDigit -= 9;
            }
            sum += curDigit;
         }
         return !(sum % 10); // Boolean
      },
      validateDate: (date = '') => {
         if (date == '' || date == null || date == undefined) return new Date();
         if (typeof date === 'number' || date instanceof Date) return date;

         if (date.match(/\d{4}([\.\-\/])\d{2}([\.\-\/])\d{2}/)) {
            if (!date.match(/\s\d{2}([\.\:])\d{2}([\.\:])\d{2}/)) {
               date = date.concat(' ', '00:00:00');
            }
            date = date.replace(/\-/g, '/');
            return new Date(date);
         }
         return new Date;
      }
   }
})();

export const slideToggle = (element, initHeight = 120) => {
	let _toggle = null;
	if (element.hasAttribute('data-toggle')) {
		const attr = element.getAttribute('data-toggle');
		if (attr == 'true') {
			element.setAttribute('data-toggle', 'false');
		}else{
			element.setAttribute('data-toggle', 'true');
		}
		toggle(!formatter.parseBoolean(attr));
	}else{
		element.setAttribute('data-toggle', 'true');
		toggle();
	}

	function toggle(open = true){
		if (open) {
			let h = initHeight;
			_toggle = setInterval(() => {
				h--;
				element.style.height = h + 'px';
				if (h <= 0) {
					clearInterval(_toggle);
				}
			}, 1);
		}else{
			let h = 0;
			_toggle = setInterval(() => {
				h++;
				element.style.height = h + 'px';
				if (h >= initHeight) {
					clearInterval(_toggle);
				}
			}, 1);
		}
	}
};

export const getToken = (props = { location: { hash: ''}}) => {
   const hash = props.location.hash;
   if (hash) {
      return hash.substr(1);
   }

   return '';
};

export const countries = [
   {"abbreviation":"AFG","country":"Afghanistan"},
   {"abbreviation":"ALB","country":"Albania"},
   {"abbreviation":"DZA","country":"Algeria"},
   {"abbreviation":"ASM","country":"American Samoa"},
   {"abbreviation":"AND","country":"Andorra"},
   {"abbreviation":"AGO","country":"Angola"},
   {"abbreviation":"AIA","country":"Anguilla"},
   {"abbreviation":"ATA","country":"Antarctica"},
   {"abbreviation":"ATG","country":"Antigua and Barbuda"},
   {"abbreviation":"ARG","country":"Argentina"},
   {"abbreviation":"ARM","country":"Armenia"},
   {"abbreviation":"ABW","country":"Aruba"},
   {"abbreviation":"AUS","country":"Australia"},
   {"abbreviation":"AUT","country":"Austria"},
   {"abbreviation":"AZE","country":"Azerbaijan"},
   {"abbreviation":"BHS","country":"Bahamas (the)"},
   {"abbreviation":"BHR","country":"Bahrain"},
   {"abbreviation":"BGD","country":"Bangladesh"},
   {"abbreviation":"BRB","country":"Barbados"},
   {"abbreviation":"BLR","country":"Belarus"},
   {"abbreviation":"BEL","country":"Belgium"},
   {"abbreviation":"BLZ","country":"Belize"},
   {"abbreviation":"BEN","country":"Benin"},
   {"abbreviation":"BMU","country":"Bermuda"},
   {"abbreviation":"BTN","country":"Bhutan"},
   {"abbreviation":"BOL","country":"Bolivia (Plurinational State of)"},
   {"abbreviation":"BES","country":"Bonaire, Sint Eustatius and Saba"},
   {"abbreviation":"BIH","country":"Bosnia and Herzegovina"},
   {"abbreviation":"BWA","country":"Botswana"},
   {"abbreviation":"BVT","country":"Bouvet Island"},
   {"abbreviation":"BRA","country":"Brazil"},
   {"abbreviation":"IOT","country":"British Indian Ocean Territory (the)"},
   {"abbreviation":"BRN","country":"Brunei Darussalam"},
   {"abbreviation":"BGR","country":"Bulgaria"},
   {"abbreviation":"BFA","country":"Burkina Faso"},
   {"abbreviation":"BDI","country":"Burundi"},
   {"abbreviation":"CPV","country":"Cabo Verde"},
   {"abbreviation":"KHM","country":"Cambodia"},
   {"abbreviation":"CMR","country":"Cameroon"},
   {"abbreviation":"CAN","country":"Canada"},
   {"abbreviation":"CYM","country":"Cayman Islands (the)"},
   {"abbreviation":"CAF","country":"Central African Republic (the)"},
   {"abbreviation":"TCD","country":"Chad"},
   {"abbreviation":"CHL","country":"Chile"},
   {"abbreviation":"CHN","country":"China"},
   {"abbreviation":"CXR","country":"Christmas Island"},
   {"abbreviation":"CCK","country":"Cocos (Keeling) Islands (the)"},
   {"abbreviation":"COL","country":"Colombia"},
   {"abbreviation":"COM","country":"Comoros (the)"},
   {"abbreviation":"COD","country":"Congo (the Democratic Republic of the)"},
   {"abbreviation":"COG","country":"Congo (the)"},
   {"abbreviation":"COK","country":"Cook Islands (the)"},
   {"abbreviation":"CRI","country":"Costa Rica"},
   {"abbreviation":"HRV","country":"Croatia"},
   {"abbreviation":"CUB","country":"Cuba"},
   {"abbreviation":"CUW","country":"Curaçao"},
   {"abbreviation":"CYP","country":"Cyprus"},
   {"abbreviation":"CZE","country":"Czechia"},
   {"abbreviation":"CIV","country":"Côte d'Ivoire"},
   {"abbreviation":"DNK","country":"Denmark"},
   {"abbreviation":"DJI","country":"Djibouti"},
   {"abbreviation":"DMA","country":"Dominica"},
   {"abbreviation":"DOM","country":"Dominican Republic (the)"},
   {"abbreviation":"ECU","country":"Ecuador"},
   {"abbreviation":"EGY","country":"Egypt"},
   {"abbreviation":"SLV","country":"El Salvador"},
   {"abbreviation":"GNQ","country":"Equatorial Guinea"},
   {"abbreviation":"ERI","country":"Eritrea"},
   {"abbreviation":"EST","country":"Estonia"},
   {"abbreviation":"ETH","country":"Ethiopia"},
   {"abbreviation":"FLK","country":"Falkland Islands (the) [Malvinas]"},
   {"abbreviation":"FRO","country":"Faroe Islands (the)"},
   {"abbreviation":"FJI","country":"Fiji"},
   {"abbreviation":"FIN","country":"Finland"},
   {"abbreviation":"FRA","country":"France"},
   {"abbreviation":"GUF","country":"French Guiana"},
   {"abbreviation":"PYF","country":"French Polynesia"},
   {"abbreviation":"ATF","country":"French Southern Territories (the)"},
   {"abbreviation":"GAB","country":"Gabon"},
   {"abbreviation":"GMB","country":"Gambia (the)"},
   {"abbreviation":"GEO","country":"Georgia"},
   {"abbreviation":"DEU","country":"Germany"},
   {"abbreviation":"GHA","country":"Ghana"},
   {"abbreviation":"GIB","country":"Gibraltar"},
   {"abbreviation":"GRC","country":"Greece"},
   {"abbreviation":"GRL","country":"Greenland"},
   {"abbreviation":"GRD","country":"Grenada"},
   {"abbreviation":"GLP","country":"Guadeloupe"},
   {"abbreviation":"GUM","country":"Guam"},
   {"abbreviation":"GTM","country":"Guatemala"},
   {"abbreviation":"GGY","country":"Guernsey"},
   {"abbreviation":"GIN","country":"Guinea"},
   {"abbreviation":"GNB","country":"Guinea-Bissau"},
   {"abbreviation":"GUY","country":"Guyana"},
   {"abbreviation":"HTI","country":"Haiti"},
   {"abbreviation":"HMD","country":"Heard Island and McDonald Islands"},
   {"abbreviation":"VAT","country":"Holy See (the)"},
   {"abbreviation":"HND","country":"Honduras"},
   {"abbreviation":"HKG","country":"Hong Kong"},
   {"abbreviation":"HUN","country":"Hungary"},
   {"abbreviation":"ISL","country":"Iceland"},
   {"abbreviation":"IND","country":"India"},
   {"abbreviation":"IDN","country":"Indonesia"},
   {"abbreviation":"IRN","country":"Iran (Islamic Republic of)"},
   {"abbreviation":"IRQ","country":"Iraq"},
   {"abbreviation":"IRL","country":"Ireland"},
   {"abbreviation":"IMN","country":"Isle of Man"},
   {"abbreviation":"ISR","country":"Israel"},
   {"abbreviation":"ITA","country":"Italy"},
   {"abbreviation":"JAM","country":"Jamaica"},
   {"abbreviation":"JPN","country":"Japan"},
   {"abbreviation":"JEY","country":"Jersey"},
   {"abbreviation":"JOR","country":"Jordan"},
   {"abbreviation":"KAZ","country":"Kazakhstan"},
   {"abbreviation":"KEN","country":"Kenya"},
   {"abbreviation":"KIR","country":"Kiribati"},
   {"abbreviation":"PRK","country":"Korea (the Democratic People's Republic of)"},
   {"abbreviation":"KOR","country":"Korea (the Republic of)"},
   {"abbreviation":"KWT","country":"Kuwait"},
   {"abbreviation":"KGZ","country":"Kyrgyzstan"},
   {"abbreviation":"LAO","country":"Lao People's Democratic Republic (the)"},
   {"abbreviation":"LVA","country":"Latvia"},
   {"abbreviation":"LBN","country":"Lebanon"},
   {"abbreviation":"LSO","country":"Lesotho"},
   {"abbreviation":"LBR","country":"Liberia"},
   {"abbreviation":"LBY","country":"Libya"},
   {"abbreviation":"LIE","country":"Liechtenstein"},
   {"abbreviation":"LTU","country":"Lithuania"},
   {"abbreviation":"LUX","country":"Luxembourg"},
   {"abbreviation":"MAC","country":"Macao"},
   {"abbreviation":"MKD","country":"Macedonia (the former Yugoslav Republic of)"},
   {"abbreviation":"MDG","country":"Madagascar"},
   {"abbreviation":"MWI","country":"Malawi"},
   {"abbreviation":"MYS","country":"Malaysia"},
   {"abbreviation":"MDV","country":"Maldives"},
   {"abbreviation":"MLI","country":"Mali"},
   {"abbreviation":"MLT","country":"Malta"},
   {"abbreviation":"MHL","country":"Marshall Islands (the)"},
   {"abbreviation":"MTQ","country":"Martinique"},
   {"abbreviation":"MRT","country":"Mauritania"},
   {"abbreviation":"MUS","country":"Mauritius"},
   {"abbreviation":"MYT","country":"Mayotte"},
   {"abbreviation":"MEX","country":"Mexico"},
   {"abbreviation":"FSM","country":"Micronesia (Federated States of)"},
   {"abbreviation":"MDA","country":"Moldova (the Republic of)"},
   {"abbreviation":"MCO","country":"Monaco"},
   {"abbreviation":"MNG","country":"Mongolia"},
   {"abbreviation":"MNE","country":"Montenegro"},
   {"abbreviation":"MSR","country":"Montserrat"},
   {"abbreviation":"MAR","country":"Morocco"},
   {"abbreviation":"MOZ","country":"Mozambique"},
   {"abbreviation":"MMR","country":"Myanmar"},
   {"abbreviation":"NAM","country":"Namibia"},
   {"abbreviation":"NRU","country":"Nauru"},
   {"abbreviation":"NPL","country":"Nepal"},
   {"abbreviation":"NLD","country":"Netherlands (the)"},
   {"abbreviation":"NCL","country":"New Caledonia"},
   {"abbreviation":"NZL","country":"New Zealand"},
   {"abbreviation":"NIC","country":"Nicaragua"},
   {"abbreviation":"NER","country":"Niger (the)"},
   {"abbreviation":"NGA","country":"Nigeria"},
   {"abbreviation":"NIU","country":"Niue"},
   {"abbreviation":"NFK","country":"Norfolk Island"},
   {"abbreviation":"MNP","country":"Northern Mariana Islands (the)"},
   {"abbreviation":"NOR","country":"Norway"},
   {"abbreviation":"OMN","country":"Oman"},
   {"abbreviation":"PAK","country":"Pakistan"},
   {"abbreviation":"PLW","country":"Palau"},
   {"abbreviation":"PSE","country":"Palestine, State of"},
   {"abbreviation":"PAN","country":"Panama"},
   {"abbreviation":"PNG","country":"Papua New Guinea"},
   {"abbreviation":"PRY","country":"Paraguay"},
   {"abbreviation":"PER","country":"Peru"},
   {"abbreviation":"PHL","country":"Philippines (the)"},
   {"abbreviation":"PCN","country":"Pitcairn"},
   {"abbreviation":"POL","country":"Poland"},
   {"abbreviation":"PRT","country":"Portugal"},
   {"abbreviation":"PRI","country":"Puerto Rico"},
   {"abbreviation":"QAT","country":"Qatar"},
   {"abbreviation":"ROU","country":"Romania"},
   {"abbreviation":"RUS","country":"Russian Federation (the)"},
   {"abbreviation":"RWA","country":"Rwanda"},
   {"abbreviation":"REU","country":"Réunion"},
   {"abbreviation":"BLM","country":"Saint Barthélemy"},
   {"abbreviation":"SHN","country":"Saint Helena, Ascension and Tristan da Cunha"},
   {"abbreviation":"KNA","country":"Saint Kitts and Nevis"},
   {"abbreviation":"LCA","country":"Saint Lucia"},
   {"abbreviation":"MAF","country":"Saint Martin (French part)"},
   {"abbreviation":"SPM","country":"Saint Pierre and Miquelon"},
   {"abbreviation":"VCT","country":"Saint Vincent and the Grenadines"},
   {"abbreviation":"WSM","country":"Samoa"},
   {"abbreviation":"SMR","country":"San Marino"},
   {"abbreviation":"STP","country":"Sao Tome and Principe"},
   {"abbreviation":"SAU","country":"Saudi Arabia"},
   {"abbreviation":"SEN","country":"Senegal"},
   {"abbreviation":"SRB","country":"Serbia"},
   {"abbreviation":"SYC","country":"Seychelles"},
   {"abbreviation":"SLE","country":"Sierra Leone"},
   {"abbreviation":"SGP","country":"Singapore"},
   {"abbreviation":"SXM","country":"Sint Maarten (Dutch part)"},
   {"abbreviation":"SVK","country":"Slovakia"},
   {"abbreviation":"SVN","country":"Slovenia"},
   {"abbreviation":"SLB","country":"Solomon Islands"},
   {"abbreviation":"SOM","country":"Somalia"},
   {"abbreviation":"ZAF","country":"South Africa"},
   {"abbreviation":"SGS","country":"South Georgia and the South Sandwich Islands"},
   {"abbreviation":"SSD","country":"South Sudan"},
   {"abbreviation":"ESP","country":"Spain"},
   {"abbreviation":"LKA","country":"Sri Lanka"},
   {"abbreviation":"SDN","country":"Sudan (the)"},
   {"abbreviation":"SUR","country":"Suriname"},
   {"abbreviation":"SJM","country":"Svalbard and Jan Mayen"},
   {"abbreviation":"SWZ","country":"Swaziland"},
   {"abbreviation":"SWE","country":"Sweden"},
   {"abbreviation":"CHE","country":"Switzerland"},
   {"abbreviation":"SYR","country":"Syrian Arab Republic"},
   {"abbreviation":"TWN","country":"Taiwan (Province of China)"},
   {"abbreviation":"TJK","country":"Tajikistan"},
   {"abbreviation":"TZA","country":"Tanzania, United Republic of"},
   {"abbreviation":"THA","country":"Thailand"},
   {"abbreviation":"TLS","country":"Timor-Leste"},
   {"abbreviation":"TGO","country":"Togo"},
   {"abbreviation":"TKL","country":"Tokelau"},
   {"abbreviation":"TON","country":"Tonga"},
   {"abbreviation":"TTO","country":"Trinidad and Tobago"},
   {"abbreviation":"TUN","country":"Tunisia"},
   {"abbreviation":"TUR","country":"Turkey"},
   {"abbreviation":"TKM","country":"Turkmenistan"},
   {"abbreviation":"TCA","country":"Turks and Caicos Islands (the)"},
   {"abbreviation":"TUV","country":"Tuvalu"},
   {"abbreviation":"UGA","country":"Uganda"},
   {"abbreviation":"UKR","country":"Ukraine"},
   {"abbreviation":"ARE","country":"United Arab Emirates (the)"},
   {"abbreviation":"GBR","country":"United Kingdom of Great Britain and Northern "},
   {"abbreviation":"UMI","country":"United States Minor Outlying Islands (the)"},
   {"abbreviation":"USA","country":"United States of America (the)"},
   {"abbreviation":"URY","country":"Uruguay"},
   {"abbreviation":"UZB","country":"Uzbekistan"},
   {"abbreviation":"VUT","country":"Vanuatu"},
   {"abbreviation":"VEN","country":"Venezuela (Bolivarian Republic of)"},
   {"abbreviation":"VNM","country":"Viet Nam"},
   {"abbreviation":"VGB","country":"Virgin Islands (British)"},
   {"abbreviation":"VIR","country":"Virgin Islands (U.S.)"},
   {"abbreviation":"WLF","country":"Wallis and Futuna"},
   {"abbreviation":"ESH","country":"Western Sahara*"},
   {"abbreviation":"WWD","country":"WorldWide"},
   {"abbreviation":"YEM","country":"Yemen"},
   {"abbreviation":"ZMB","country":"Zambia"},
   {"abbreviation":"ZWE","country":"Zimbabwe"},
   {"abbreviation":"ALA","country":"Åland Islands"}
];