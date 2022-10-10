/**
 * Lista de serviciosdevConfig
 */
import { getData, sendData, sendHubSpot } from './Methods';

const formatt = (...url) => typeof url.join === 'function' ? url.join("/") : url;
export const local = (...d) => formatt('api', ...d);

// ////////////////////////////////////////////////////////////
//                Servicios con promesas                     //
// ////////////////////////////////////////////////////////////

export const services = {
   // Realiza el login del usuario y devuelve los datos relacionados con la información enviada
   AuthRequest: (data) => sendData(local('login'), data),
   HashRequest: (data) => sendData(local('validator'), data),
   ResetPassword: (data) => sendData(local('reset-password'), data, 'PUT'),
   SkipPassword: (data) => sendData(local('skip-password'), data, 'PUT'),
   getMenu:(data) => sendData(local('getMenu'),data,'POST'),
   sendEmail: (data) =>  sendData(local('sendEmail'),data,'POST'),
   loginEmail: (data) => sendData(local('loginEmail'),data,'POST'),
   //getSingleContent:(data) => sendData('http://localhost:5200/api/getSingleContent'),data,'POST'),
   sendCRM: (data) => sendData(local('sendCRM'),data,'POST'),
   getCountries: (data) => sendData(local('getCountries'),data,'POST'),
   getStatesByCountry: (data) => sendData(local('getStatesByCountry'),data,'POST'),
   sendHubspot: (data,idForm) => sendHubSpot(data,idForm),
   getBusinessUnits: () => getData(local('getBusinessUnits')),
   getBusinessUnit: (id) => getData(local('getBusinessUnit', id)),
   sendNextStep: (data) => sendData(local('sendNextStep'),data,'POST'),
   getServiceByProperty: (property, service) => getData(local('getServiceByProperty', property, service)),
   getProperties: (property) => getData(local('getProperties')),
   getServicesByCategory: (idCategory, property) => getData(local('categories/services', idCategory, property)),
   getCountrybyLang : (lang) => getData(local('getCountrybyLang',lang)),
   getStatesbyLang : (iso,lang) => getData(local('getStatesbyLang',iso,lang)),
   getCountrybyIP : (ip) => getData(local('getCountrybyIP',ip)),

   sendDataCRM : (data) => sendData(local('sendDataCRM'),data,'POST'),

   //Shopping Cart
   sendShoppingCart: (data) => sendData(local("sendShoppingCart"), data, "POST"),
   getShoppingCart: (idevent, hotel) => getData(local('getShoppingCart',idevent, hotel)),
   postComment: (data) => sendData(local("postComment"), data, "POST"),
};



export default services;