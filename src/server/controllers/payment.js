/**
 * @author Luis Enrique Huh Puc <lhuh@palaceresorts.com
 * @description PAYMENT CONTROLLER FILE
 */
"use strict";

 /* * * * * * * * * * * *
 *  Import Statements  *
* * * * * * * * * * * */
const Controller = require('./main');
const api = require('../app/endpoints');
const Logger = require('../libraries/Logger');
const { ResponseFormat, sendRequest, serializeObject, getValueObject } = require('../libraries/Helpers');

class PaymentController extends Controller{
   /**
    * Obtiene los datos del hash encriptado
    */
   getDataHash(){
      const format = new ResponseFormat;
      let data = this.locals.data || {};

      if (Object.values(data).length > 0) {
         const items = data.items || {};
         delete data.user;
   
         const newItems = {};
         for (const i in items) {
            if (items.hasOwnProperty(i)) {
               const item = items[i];
               newItems[`item_${item.idevent_detalle_item}`] = {
                  concept: item.concepto_ingreso,
                  idConcept: item.idconcepto_ingreso,
                  id: item.idevent_detalle_item,
                  amount: item.value
               }
            }
         }
         data['items'] = newItems;
   
         data = serializeObject(data, false, {
            idevent_grupo: 'id',
            divisa: 'currency',
            importe: 'amount'
         });
   
         format.set(data, 200, false, 'Resource Found');
         this.response = {
            message: format.get()
         };
      }else{
         format.set({}, 404, false, 'Resource Not Found');
         this.response = {
            status: 404,
            message: format.get()
         };
      }
   }

   getExchangeRate(){
      const format = new ResponseFormat;
      this.url = api.exchangeRate();
      this.get(null, response => {
         let data = getValueObject(response, 'Exchg_rtResponse', 'Data', 'Exchg_rt');
         if (data.hasOwnProperty('tc_fiscal')) {
            data = {
               country: data.country,
               exchange: data.tc_fiscal
            }
         }else{
            data = {};
         }
         format.set(data, 200, false, 'Resource Found');
         this.response = {
            message: format.get()
         }
      });
   }

   save(){
      this.url = api.payment();
      
      const { items } = this.data;
      const paymentlist = {};
      for (const key in items) {
         if (items.hasOwnProperty(key)) {
            const item = items[key];
            paymentlist['payment_amount_' + item.id] = {
               concepto_ingreso: item.concept,
               idconcepto_ingreso: item.idConcept,
               idevent_detalle_item: item.id,
               value: item.amount
            }
         }
      }

      const data = Object.assign({}, serializeObject(this.data, true));
      
      data['data'] = {
         paymentlist,
         idfin_forma_pago: 1,
         divisa: data.divisa,
         idevent_grupo: data.id,
         tipo_cambio: data.tipo_cambio
      }
      
      data['username'] = this.username;
      data['online'] = false;

      delete data.id;
      delete data.divisa;
      delete data.items;
      delete data.tipo_cambio;
      
      this.post(data, (res) => {
         this.response = {
            message: res
         };
      })
      
   }
}

module.exports = PaymentController;