/**
 * @author Luis Enrique Huh Puc <lhuh@palaceresorts.com
 * @description COMMENTS CONTROLLER FILE
 */
"use strict";

 /* * * * * * * * * * * *
 *  Import Statements  *
* * * * * * * * * * * */
const Controller = require('../controllers/main');
const api = require('../app/endpoints');
const Logger = require('../libraries/Logger');
const { ResponseFormat, sendRequest } = require('../libraries/Helpers');

class CommentController extends Controller{

   getHistory(){
      this.url = api.getHistoryCommentService(this.params.code);
      this.listIgnore = [
         'usuario_creacion',
         'usuario_ultima_modificacion',
         'fecha_ultima_modificacion'
      ];
      this.get();
   }

   newComment(id, comment){
      this.url = api.newCommentService();
      this.post({
         idevent_detalle: id,
         extra_informacion: comment,
         tipo: 2, // Novia
         tipo_extrainfo: 1 // Notas
      });
   }
   
   saveComment(){
      const data = this.data;
      if (data.hasOwnProperty('old_id') && data.old_id > 0) {
         this.url = api.updateCommentService(data.old_id);
         this.put({ estado: 0 }, res => {
            this.newComment(data.id, data.comment);
         });
      }else{
         this.newComment(data.id, data.comment);
      }
   }
}

module.exports = CommentController;