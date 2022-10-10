/**
 * @class EventCalendar
 * @version 1.0.0
 * @author alanjimenez
 * @summary Calendario con eventos
 */
import './custom.css';

import React from 'react';

import apiRequest from '../../../node/apiRequest';
import urlPrefixer from '../../../node/urlPrefixer';
import Calendar, { createEvent } from '../../calendar/base';
import DateUtils from '../../calendar/base/dateUtils';

export default class EventCalendar extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         calendarDate: new Date(),
         events: [],
      };
   }

   componentDidMount = () => {
      this.getEventList(this.state.calendarDate);
   }

   componentWillReceiveProps = (nextProps) => {
      if (this.state.date != nextProps.date) {
         this.setState({ date: nextProps.date }, () => {
            this.getEventList(nextProps.date);
         });
      }
   }

   //#region GENERACIÓN DE HTML PARA LAS VISTAS DE INFO Y DETAIL
   getEventInfo = (allevents) => {
      let thisdate = DateUtils.formatDate(allevents[0].date, 'YYYYMMDD');
      let todayEvents = allevents.filter(ev => ev.date ? DateUtils.formatDate(ev.date, 'YYYYMMDD') == thisdate : null);
      let weddings = todayEvents.filter(we => we.descripcion.startsWith('W ') ? we : null);
      let groups = todayEvents.filter(ge => !ge.descripcion.startsWith('W ') ? ge : null);
      return (<React.Fragment>
         {groups.length > 0 ? <React.Fragment><span className="purple-text text-darken-4">{groups.length} Groups </span><br /></React.Fragment> : null}
         {weddings.length > 0 ? <span className="indigo-text text-darken-3">{weddings.length} Weddings</span> : null}
      </React.Fragment>);
   }

   getEventDetail = (allevents) => {

      event = allevents[0];
      let eventstoday = event.isWedding ? this.renderWeddingDetail(event) : this.renderGroupDetail(event);

      return (
         <React.Fragment>
            {allevents.map((event, i) => event.isWedding ? this.renderWeddingDetail(event) : this.renderGroupDetail(event))}
         </React.Fragment>
      );
   }

   getEventDate = (allevents) => allevents[0].date;

   getEventTitle = (allevents) => {
      let date = new Date();
      date = DateUtils.formatDate(allevents[0].fecha_boda, 'MMMM DD, YYYY', true);
      return <h4>Events for {date}</h4>
   }

   // #region FORMATO DE DETALLE DE EVENTO
   renderGroupDetail = (data) => {
      return (
         <div className="col s12 m6" eventcalendar="wedding-detail">
            <div className="card" eventcalendar="group-detail-card-content">
               {/* <div className="card-image" style={{ backgroundImage: data.path }}></div> */}
               <div className="card-content">
                  <div className="card-action">
                     <div className="card-title" eventcalendar="wedding-detail-card-title">
                        <span title="Id Opera">{data.id_opera}</span>
                        <span title="Block code"> - {data.blockcode}</span>
                     </div>
                     <small>Last modified by {data.usuario_ultima_modificacion} on {DateUtils.formatDate(data.fecha_ultima_modificacion, 'MMM DD, YYYY')}</small>
                  </div>
                  <div eventcalendar="wedding-detail-description">
                     {data.descripcion}<br />
                     <div>
                        {data.pax} PAX<br /> Group at {data.idclv_propiedad}<br />
                        From {DateUtils.formatDate(data.fecha_inicia_evento, 'DD MMM, YYYY')} to {DateUtils.formatDate(data.fecha_fin_evento, 'DD MMM, YYYY')}</div>
                     <div>{data.email}</div>
                  </div>
               </div>
            </div>
         </div>
      );
   }

   renderWeddingDetail = (data) => {
      return (
         <div className="col s12 m6" eventcalendar="wedding-detail">
            <div className="card" eventcalendar="wedding-detail-card-content" style={{ backgroundImage: "url(" + data.path + ")" }}>
               <div className="card-content">
                  <div className="card-action">
                     <div className="card-title" eventcalendar="wedding-detail-card-title">
                        <span title="Id Opera">{data.id_opera}</span>
                        <span title="Block code"> - {data.blockcode}</span>
                     </div>
                     <small>Last modified by {data.usuario_ultima_modificacion} on {DateUtils.formatDate(data.fecha_ultima_modificacion, 'MMM DD, YYYY')}</small>
                  </div>
                  <div eventcalendar="wedding-detail-description">
                     {data.descripcion}<br />
                     {data.nombre_novia} &amp; {data.nombre_novio} Wedding ({data.pax} PAX)<br />
                     {DateUtils.formatDate(data.fecha_boda, 'MMM D, YYYY h:m')} {data.idclv_propiedad}<br />
                     <div>From {DateUtils.formatDate(data.fecha_inicia_evento, 'DD MMM, YYYY')} to {DateUtils.formatDate(data.fecha_fin_evento, 'DD MMM, YYYY')}</div>
                     <div>{data.email}</div>
                  </div>
               </div>
            </div>
         </div>
      );
   };
   // #endregion FORMATO DE DETALLE DE EVENTO
   //#endregion / GENERACIÓN DE HTML PARA LAS VISTAS DE INFO Y DETAIL

   /**
    * Carga la lista de eventos desde la api de event grupo
    */
   getEventList = (date) => {
      if (DateUtils.isValidDate(date)) {
         let eventType = 0;
         let dateForEvents = DateUtils.isValidDate(date) ? date : this.state.calendarDate;
         let startDate = DateUtils.formatDate(new Date(DateUtils.formatDate(DateUtils.getStartOfMonth(dateForEvents), 'YYYY-M-D')), 'YYYY-MM-DD');
         let endDate = DateUtils.formatDate(new Date(DateUtils.formatDate(DateUtils.getEndOfMonth(dateForEvents), 'YYYY-M-D')), 'YYYY-MM-DD');

         let url = urlPrefixer.apiPrefix('qa', 'events', 'eventgrupo/getGruposBodas', eventType, startDate, endDate);

         return apiRequest(url)
            .then((result) => !result.error ? Promise.resolve(result.data) : Promise.reject(result.error))
            .then(data => {
               let eventList = [];

               let events = data.map((event, i) => {
                  // Añadir campo para saber si es evento o boda
                  event.isWedding = event.descripcion.startsWith('W ');
                  // Tomar [fecha_boda] como date cuando es boda y [fecha_inicio_evento] cuando es evento
                  let date = event.isWedding ? event.fecha_boda : event.fecha_inicia_evento;
                  // Formatear [date]
                  if (DateUtils.isValidDate(date)) {
                     event.date = new Date(DateUtils.formatDate(date, 'YYYY-MM-DD h:m:s'));
                     let indexdate = DateUtils.formatDate(event.date, 'YYYYMMDD');
                     let events = eventList[indexdate] || [];

                     events.push(event);
                     eventList[indexdate] = events;
                     return event;
                  }
               });

               // Recorrer los eventos encontrados y generar un evento por día
               let allevents = eventList.map((eventItems, i) => {
                  let todayevent = createEvent(this.getEventDate(eventItems),
                     this.getEventInfo(eventItems),
                     this.getEventTitle(eventItems),
                     this.getEventDetail(eventItems),
                     true);
                  return todayevent;
               });

               return this.setState({ events: allevents }, () => allevents);
            })
            .catch(error => {
               console.error(':GET EVENT ERROR:', error);
               console.warn(':CALENDAR: ', 'Could not find events for this month');
            });
      }
   }

   handleCalendarDateChange = (newDate) => {
      this.getEventList(newDate);
   }

   render() {
      return (
         <div>
            <Calendar date={this.state.calendarDate} events={this.state.events} onDateChange={this.handleCalendarDateChange} />
         </div>
      );
   }

}

EventCalendar.defaultProps = {
   calendarDate: new Date()
};
