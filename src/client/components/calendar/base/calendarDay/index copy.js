/**
 * @class CalendarDay
 * @version 0.1.2
 * @author alanjimenez
 * @summary Elemento para marcar el día en el calendario
 */
import './calendarDayStyle.css';
import React from 'react';
import Dialog from '../../dialog';
import DateUtils from '../dateUtils';

export default class CalendarDay extends React.Component {
   constructor(props) {
      super(props);
      this.baseCalendarDay = React.createRef();
      this.state = {
         date: this.props.date,
         disabled: this.props.disabled,
         title: this.props.title,
         info: this.props.info,
         detail: this.props.showDetailButton,
         mode: this.props.mode
      };

      this.detail = React.createRef();
   }

   componentDidUpdate(prevProps, prevState) {
      // Agregar la clase .today cuando es el día de hoy
      let curdate = this.state.date;
      if (DateUtils.formatDate(curdate, ''))
         if (toShortDate() == toShortDate(this.state.date)) {
            this.baseCalendarDay.current.classList.add('today');
         } else {
            this.baseCalendarDay.current.classList.remove('today');
         }
   }

   getDate = () => {
      let date = this.state.date;
      if (DateUtils.isValidDate(date) && typeof date.getDate === 'function') {
         return date.getDate();
      }
      return new Date().getDate();
   }

   componentWillReceiveProps(nextProps) {
      if (DateUtils.formatDate(new Date(), 'YYYYMMDD') == DateUtils.formatDate(this.state.date, 'YYYYMMDD')) {
         this.baseCalendarDay.current.classList.add('today');
      } else {
         this.baseCalendarDay.current.classList.remove('today');
      }

      if (this.state.date != nextProps.date) {
         this.setState({
            date: nextProps.date,
            disabled: nextProps.disabled,
            title: nextProps.title,
            showDetailButton: nextProps.showDetailButton == true && nextProps.detail != '' && nextProps.detail != null && nextProps.detail.length > 0,
            info: nextProps.info,
            detail: nextProps.detail,
            mode: nextProps.mode
         });
      }
   }

   /**
    * Abre el cuadro de diálogo con la información detallada del evento
    */
   showEventDetailView = (e) => {
      this.detail.current.open();
   }

   handleClickInDay = (e) => {
      if (typeof this.props.onDayClick === 'function') {
         this.props.onDayClick(e, this);
         this.getDate();
      }

   }

   modeIs_calendar = () => this.state.mode == 'calendar' || this.state.mode == '';
   modeIs_datepicker = () => this.state.mode == 'datepicker';

   render = () => (
      <td className="calendar-day" ref={this.baseCalendarDay} disabled={this.props.disabled} onClick={this.handleClickInDay}>
         <section className="controls-container">
            <div className="day-number"> <span>{this.getDate()}</span> </div>
         </section>
         {!this.modeIs_datepicker() ? (
            <section className="summary-info-container" hidden={this.props.disabled}> {this.state.info}
            </section> ,
            <section className="event-item-container" hidden={this.props.disabled}>
               <div> {this.state.info}</div>
               {this.state.detail != '' & this.state.detail != null ?
                  <a className="view-details light-green z-depth-2" onClick={this.showEventDetailView}>+</a>
                  : null}
            </section>
         ) : null}

         <Dialog header={this.state.title} content={this.state.detail} ref={this.detail} />
      </td>
   );
}

CalendarDay.defaultProps = {
   date: new Date(),
   disabled: false,
   title: null,
   showDetailButton: false,
   info: '',
   detail: null,
   mode: 'calendar'
}
