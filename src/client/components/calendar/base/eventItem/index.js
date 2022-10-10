/**
 * @class CalendarEventDetail
 * @version 0.1.2
 * @author alanjimenez
 * @summary Tarjeta con información del evento seleccionado en el calendario
 */
import React from 'react';

export default class EventItem extends React.Component {
   constructor() {
      super();
      this.baseEventDetail = React.createRef();
      this.state = {
         eventName: 'event name'
      }
      this.close = this.close.bind(this);
      this.open = this.open.bind(this);
      this.setInformation = this.setInformation.bind(this);
   }

   componentDidMount() {
      this.props.onRef(this);
   }

   componentWillUnmount() {
      this.props.onRef(undefined);
   }

   open(e) {
      // console.log('event', e)
      // console.log(this.baseEventDetail.current)
      // try {
      this.baseEventDetail.current.showModal();
      // } catch (error) {

      // }
   }

   close() {
      this.baseEventDetail.current.close();
   }

   setInformation(data) {
      this.setState({
         data: data
      });
   }

   render() {
      return (

         <dialog ref={this.baseEventDetail} className="detail-view" open={false}>
            <div className="grid">
               <header>
                  <button className="btn right" onClick={this.close}>
                     <i className="material-icons">close</i>
                  </button>
                  <h5>Event detail</h5>
               </header>
               <main>
                  <h3>Weddings</h3>
                  {this.props.weddings.map((wed, i) =>
                     <table key={i}>
                        <tbody>
                           <tr>
                              <td>{wed.descripcion}</td>
                              <td>Blockcode: {wed.blockcode}</td>
                           </tr>
                           <tr>
                              <td>Wedding date:</td>
                              <td>{wed.fecha_boda}</td>
                           </tr>
                           <tr>
                              <td>Email</td>
                              <td>{wed.email}</td>
                           </tr>
                           <tr>
                              <td>Couple</td>
                              <td>{wed.nombre_novia} &amp; {wed.nombre_novio}</td>
                           </tr>
                           <tr>
                              <td>PAX</td>
                              <td>{wed.pax}</td>
                           </tr>
                           <tr>
                              <td>Event date</td>
                              <td>From {wed.fecha_inicia_evento} to {wed.fecha_fin_evento}</td>
                           </tr>
                        </tbody>
                     </table>
                  )}
                  <hr />
                  <h3>Groups</h3>
                  {this.props.groups.map((group, i) =>
                     <table key={i}>
                        <tbody>
                           <tr>
                              <td>{group.descripcion}</td>
                              <td>Blockcode: {group.blockcode}</td>
                           </tr>
                           <tr>
                              <td>Wedding date:</td>
                              <td>{group.fecha_boda}</td>
                           </tr>
                           <tr>
                              <td>Email</td>
                              <td>{group.email}</td>
                           </tr>
                           <tr>
                              <td>Couple</td>
                              <td>{group.nombre_novia} &amp; {group.nombre_novio}</td>
                           </tr>
                           <tr>
                              <td>PAX</td>
                              <td>{group.pax}</td>
                           </tr>
                           <tr>
                              <td>Event date</td>
                              <td>From {group.fecha_inicia_evento} to {group.fecha_fin_evento}</td>
                           </tr>
                        </tbody>
                     </table>
                  )}
               </main>
               <footer>
                  <span className="blue-text badge">
                     Press <b>ESC</b> to close
                  </span>
               </footer>
            </div>
         </dialog>

      );
   }

}

EventItem.defaultProps = {
   onRef: (context) => { }
}