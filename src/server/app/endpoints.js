/**
 * @author Luis Enrique Huh Puc <lhuh@palaceresorts.com>
 * @description ENDPOINTS FILE
 */

/* * * * * * * * * * *
* Import Statements *
* * * * * * * * * * */
const env = require('node-env-file');
const _HOSTS = require('./hosts');

/* * * * * * * * * * **
*  Environment File  *
* * * * * * * * * * **/
env(__dirname + '/../.env');
const _SYSTEM_CONTEXT = process.env.ENV || 'dev';
const _SYSTEM_ID = process.env.SYSTEM_ID || 0;

/* * * **
* Apis *
* * * **/
const { apiAuth, apiFramework, apiEvents, apiProducts, apiCore, apiEmailGateway, apiCRM, apiBE } = _HOSTS(_SYSTEM_CONTEXT);

/* * * * * * *
* Endpoints *
* * * * * * */
const _ENDPOINTS = {
   //Get token from Auth API
   authenticateApp: () => apiAuth('v2/authenticate'),
   //Log in to the app
   requestLogin: () => apiEvents('auth/login'),
   //Password change
   requestResetPassword: () => apiEvents('eventgrupo/reset-password'),
   //Generate Token
   generateToken: () => apiAuth('sessiontoken'),
   //Decode token
   decodeToken: () => apiAuth('usuario/validatetoken'),
   //Payment
   payment: () => apiEvents('eventdetalleitem/payservices'),
   //Exchange Rate
   exchangeRate: () => apiEvents('grupopago/tipocambio'),
   //Upload cover
   uploadCover: () => apiEvents('eventgrupo/uploadcover'),
   //Get the language page (ES/EN)
   getLangPage: (code) => apiFramework('idioma/translate', _SYSTEM_ID, code),
   //Get hotel name
   getHotelName: (code) => apiCore('propiedad/bycode', code),
   //Get the business unit
   getBusinessUnit: (unit) => apiProducts('serviceunidadnegocio/getservicetypebybusinessunit', unit),
   //Get all the services from business unit
   getServicesFromBusinessUnit: (unit, propiedad) => apiProducts('serviceservicio/servicewithimagebycategory', unit, propiedad),
   //Get all the tags from service type
   getTagsFromServiceType: (unit) => apiProducts('tagtiposervicio/gettagbyservicetype', unit),
   //Get all services from idtag
   getServicesFromTag: (tag, unit) => apiProducts('tagservicio/getservicebytagandservicetype', tag, unit),
   //Get summary balance from events
   getEventsSummary: (idGroup) => apiEvents('eventevento/getsum3', idGroup),
   //Get dates from events
   getEventsDate: (idGroup) => apiEvents('eventgrupo/Getdate', idGroup),
   //Get events
   getEvents: (idGroup) => apiEvents('eventevento/geteventbygroup2', idGroup),
   //Get events
   getEventsRoomingList: (hotelcode, blockcode) => apiEvents('eventgrupo/roominglist', hotelcode, blockcode),
   //Get locations from event
   getLocationsEvent: (idEvent) => apiEvents('eventgrupo/getlocationsandservices', idEvent),
   //Get services per locations from event
   getServicesEvent: (idEvent, idLocation) => apiEvents('eventdetalleitem/gerservicebyeventandlocation', idEvent, idLocation),
   //Get the service per id
   getService: (idService) => apiProducts('serviceservicio/elementbyid', idService),
   //Get the custom services
   getCustomServices: () => apiProducts('serviceservicio/servicewithimagecustom'),
   //Get comment of the service
   getCommentService: (idDetails) => apiEvents('eventdetalleextrainfo/comments', idDetails),
   //Get history comment of the service
   getHistoryCommentService: (id) => apiEvents('eventdetalleextrainfo/itemall', id, '1'),
   //Add new comment of the service
   newCommentService: () => apiEvents('eventdetalleextrainfo/post'),
   //Update comment of the service
   updateCommentService: (idComment) => apiEvents('eventdetalleextrainfo/put', idComment),
   //Get customs services per business id
   getCustomServicesFromBusinessUnit: (unit) => apiProducts('serviceservicio/servicewithimagebycategorycustom', unit),
   //get details service per business id
   getCustomDetailsServicesFromBusinessUnit: (idService) => apiProducts('serviceservicio/servicewithimagebyId', idService),
   //add new customs service
   newCustomsService: () => apiEvents('eventdetalleitem/post'),
   //Get the service per id
   getTagsIdServices: (idEventGroup) => apiEvents('eventevento/getservicesgroup', idEventGroup),
   //Get the service per tag ids
   getServicesTerms: (lang, tag) => apiProducts('servicetermino/getTermByServicesLanguage', lang, tag),
   //Get the service per id
   getPromotions: (idEventGroup) => apiEvents('eventpromocion/getpromotionbygroup', idEventGroup),
   //Get summary of purchase
   getPurchase: (idEventGroup) => apiEvents('eventgrupo/getservicesbygropups', idEventGroup),
   // List Business Unit
   getBusinessUnits: () => apiProducts('serviceunidadnegocio/search'),
   // PDF Detail Sheet
   getDetailSheetPDF: (languageId, groupId) => apiEvents('eventgrupo/getdetailsheet', languageId, groupId),
   // Personalized Services With Images
   getPersonalizedServices: (limit, search) => apiProducts('serviceservicio/searchitemcustom', limit, search),
   // Personalized Services Search Word By Category
   searchServicesByCategory: (limit, word, category) => apiProducts('serviceservicio/searchitemcustomcategory', limit, word, category),
   // filterPersongetServicecustombycategoryword: (limit, word, category) => getData(environment.products.concat('serviceservicio/searchitemcustomcategory/',limit,'/', word,'/',category )),
   getMenu: () => ("http://127.0.0.1:5000/api/Menus/GetAll"),
   sendEmail: () => apiEmailGateway("emails"),
   loginEmail: () => apiEmailGateway("systems/login"),
   getSingleContent: () => ("http://127.0.0.1:5000/api/Contents/GetSingle"),
   sendCRM: () => apiCRM("api/postInterfaceContacto"),
   getCountries: () => apiCore("pais/listassoc/codigo/nombre"),
   getStatesByCountry: () => ("http://10.8.18.128/estados/searchidioma/1/"),
   // get service by property
   getServiceByProperty: (property, service) => apiProducts('serviceserviciopropiedad/getfamiliespropiety', property, service),
   // get all properties
   getProperties: () => apiCore('propiedad/dropdown/id_opera/nombre_comercial/1'),
   getCountrybyLang: (lang) => apiCore('pais/listassoc/codigo/nombre_largo', lang),
   getStatesbyLang: (iso,lang) => apiCore('estados/listassoc/clave_region/descripcion',iso,lang),
   getCountrybyIP: (ip) => apiBE('api/public/geo-ip',ip),
   sendDataCRM: () => apiCRM('api/postInterfaceContacto'),
   //ShoppingCart
   sendShoppingCart: (data) => apiEvents('eventdetalleitem/post', data),
   getShoppingCart: (idevent,hotel) => apiEvents('eventdetalleitem/getShoppingCart',idevent,hotel),
   postComment: (data) => apiEvents('eventdetalleextrainfo/post', data),
};

/* * * * * * * * * * * * * *
* Export Module Endpoints *
* * * * * * * * * * * * * */
module.exports = _ENDPOINTS;