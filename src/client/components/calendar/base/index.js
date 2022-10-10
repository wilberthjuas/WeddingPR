/**
 * @className Calendar
 * @version 1.0.0
 * @author alanjimenez
 * @summary Calendario multiusos
 */
import './calendarStyle.css';

/*
   236 full
   flechitas 32 x 40, 21px font-size
   mes año / 89 x 40


*/



import React from 'react';

import CalendarDay from './calendarDay';
import DateUtils from './dateUtils';


/**
 * Genera un objeto tipo evento para enviar al calendario
 * @param {object} date La fecha del evento como tipo Date
 * @param {string} info La información a mostrar en el cuadro del día
 * @param {string} title El título a mostrar en la parte superior del Diálogo
 * @param {string} detail El contenido del cuadro de diálogo
 */
export const createEvent = (date, info = '', title = '', detail = '', disabled = false) =>
   ({ date: date, info: info, title: title, detail: detail, disabled: disabled });

export default class Calendar extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         today: this.props.today,
         currentDate: this.props.today,
         calendarDays: this.props.calendarDays,
         events: this.props.events,
         mode: this.props.mode
      };
      this.monthPicker = React.createRef();
      this.yearPicker = React.createRef();
   }

   componentDidMount() {
      this.drawCalendarDays();
   }

   componentWillReceiveProps = (nextProps) => {
      if (nextProps.currentDate != this.state.currentDate) {
         this.drawCalendarDays(nextProps.events);
      }
   }

   componentDidUpdate = (prevProps, prevState) => {
      if (prevState.currentDate != this.state.currentDate) {
         this.drawCalendarDays(this.props);
      }
   }

   drawCalendarDays = (events) => {
      events = Array.isArray(events) ? events : [];
      let currentDate = this.state.currentDate || this.state.today || new Date();
      // Fecha de inicio de mes
      let monthStart = DateUtils.getStartOfMonth(currentDate);
      // Fecha de fin del mes
      let monthEnd = DateUtils.getEndOfMonth(currentDate);
      // Primer día de la semana (empezando por domingo) donde inicia el mes
      let startDate = DateUtils.addDays(monthStart, -monthStart.getDay());
      // Último día de la semana (empezando por domingo) donde termina el mes
      let endDate = DateUtils.addDays(monthEnd, 6 - (monthEnd.getDay()));
      let calendarDays = Array(monthStart.getDay() + monthEnd.getDate() + (6 - (monthEnd.getDay())));
      for (let rowIndex = 0; rowIndex < calendarDays.length / 7; rowIndex++) {
         let cells = [];
         for (let cellIndex = 0; cellIndex < 7; cellIndex++) {
            let itemDate = DateUtils.addDays(startDate, ((rowIndex * 7) + cellIndex));
            cells[cellIndex] = {
               date: itemDate,
               dayNumber: itemDate.getDate()
            };
         }
         calendarDays[rowIndex] = cells;
      }
      this.setState({ calendarDays, events });
   }

   handleNextMonth = () => {
      this.setDate(DateUtils.addMonth(this.state.currentDate, 1));
   }

   handlePrevMonth = () => {
      this.setDate(DateUtils.addMonth(this.state.currentDate, -1));
   }

   getCurrentYear = () => this.state.currentDate ? this.state.currentDate.getFullYear() : new Date().getFullYear();

   getCurrentMonth = () => {
      let currentmonth = this.state.currentDate.getMonth();
      return currentmonth;
   }

   getYearList = () => {
      let yearList = Array(6).fill(this.getCurrentYear());
      //yearList[0] = parseInt(yearList[0]) - 3;
      //yearList[1] = parseInt(yearList[1]) - 2;
      yearList[0] = parseInt(yearList[0]) - 1;
      yearList[1] = parseInt(yearList[1]);
      yearList[2] = parseInt(yearList[2]) + 1;
      yearList[3] = parseInt(yearList[3]) + 2;
      yearList[4] = parseInt(yearList[4]) + 3;
      yearList[5] = parseInt(yearList[5]) + 4;
      return yearList;
   }

   /**
    * Actualizar la fecha a llamar
    */
   setDate = (newDate, actionAfterUpdate) => {
      this.setState({ currentDate: newDate }, () => {
         // Ejecutar la acción actionAfterUpdate
         if (typeof actionAfterUpdate === "function") {
            actionAfterUpdate();
         }
         if (typeof this.props.onDateChange === 'function') {
            this.props.onDateChange(newDate);
         }
      });
   }

   handleMonthChange = (e) => {
      this.setDate(DateUtils.setMonth(this.state.currentDate, e.target.value));
   };

   handleYearChange = (e) => {
      this.setDate(DateUtils.setYear(this.state.currentDate, e.target.value));
   }

   /**
    * Devuelve un objeto de evento con la información necesaria para el día
    */
   getEvent = (col) => {
      let indexFormat = 'YYYYMMDD';
      let todayDate = DateUtils.formatDate(col.date, indexFormat);
      let searchResult = this.state.events.filter((event) => DateUtils.formatDate(event.date, indexFormat) == todayDate);
      if (searchResult.length > 0) {
         return searchResult[0];
      }

      return createEvent(DateUtils.formatDate(col.date, 'YYYYMMDD'));
   }

   modeIs_calendar = () => this.state.mode == 'calendar' || this.state.mode == '';
   modeIs_datepicker = () => this.state.mode == 'datepicker';

   render() {
      // Tamaño del nombre del día de la semana
      let lang = window.location.pathname.split("/")
      let daynamesize = this.modeIs_datepicker() ? 3 : 0;
      let daysOfTheWeek = DateUtils.getWeekdayName(daynamesize,lang[1]);
      //daysOfTheWeek = daysOfTheWeek.toLocaleString("es-MX")

      return (
         <div component="fullcalendar">
            <div className="container">
               <div className="card">
                  <div className="form-inline containerbuttons">
                     <div className="">
                           <button type="button" className="btn btn-outline-primary calendar-control-arrows" id="previous" onClick={this.handlePrevMonth}>{"<"}</button>
                     </div>
                     <select className="browser-default calendar-control form-control search-out-text"
                        name="monthPicker"
                        ref={this.monthPicker}
                        value={this.getCurrentMonth()}
                        onChange={this.handleMonthChange}>
                        {DateUtils.getMonthName(3,lang[1]).map((m, i) => <option key={i} value={i}>{m}</option>)}
                     </select >
                     <select className="browser-default calendar-control form-control search-out-text"
                        name="yearPicker"
                        ref={this.yearPicker}
                        value={this.getCurrentYear()}
                        onChange={this.handleYearChange}>
                        {this.getYearList().map((y, i) => <option key={i} value={y}>{y}</option>)}
                     </select>
                     <div className="nextbutton">
                        <button type="button" className="btn btn-outline-primary calendar-control-arrows" id="next" onClick={this.handleNextMonth}>{">"}</button>
                     </div>
                  </div>
                  <div className="blue-grey-text form-inline text-darken-3 container-selects">
                     
                  </div>

                  <table component="calendar" className={"table table-bordered table-responsive-sm clever-calendar col s12 blue-grey-text card-panel calendar-" + this.state.mode || ""} id="calendar">
                     <thead className="blue-grey-text">
                        <tr>
                           {daysOfTheWeek.map((wd, i) => <th key={i}>{wd.substring(0, 2)}</th>)}
                       </tr>
                     </thead>

                     <tbody id="calendar-body">
                        {this.state.calendarDays.map((row, rowindex) =>
                           <tr key={rowindex}>
                              {row.map((col, colindex) => {
                                 let event = this.getEvent(col);

                                 event.title = event.title || '';
                                 event.date = col.date || event.date;
                                 event.info = event.info || '';
                                 event.detail = event.detail || '';
                                 event.disabled = event.disabled || false;

                                 return (<CalendarDay
                                    removeCss="calendar-day here"
                                    className="calendar-day-2 other extra class added here"
                                    key={colindex}
                                    date={event.date}
                                    title={event.title}
                                    disabled={this.state.today > (event.date - 1) || this.state.currentDate.getMonth() != event.date.getMonth()}
                                    info={""}
                                    detail={"event.detail"}
                                    mode={this.state.mode}
                                    onDayClick={this.props.onDateSelected}
                                    cleaner={this.props.cleaner}
                                 ></CalendarDay>
                                 )
                              }
                              )}
                           </tr>
                        )}
                     </tbody>
                  </table>
               </div>
            </div>
         </div >

      );
   }

}

Calendar.defaultProps = {
   today: new Date(),
   calendarDays: [],
   events: [],
   mode: 'normal'
};