/**
 * @class WizStep
 * @version 1.0.0
 * @author alanjimenez
 * @summary Control de pasos del asistente (adelante o atrás)
 */
import React from 'react';

export default class WizStep extends React.Component {
   constructor(props) {
      super(props);
      this.state = {};
      //console.log("button props",this.props)
   }

   static getDerivedStateFromProps(props, state) {
      let newProps = {};
      Object.keys(props).forEach(key => {
         if (props[key] != state[key]) {
            newProps[key] = props[key];
         }
      });
      return Object.keys(newProps).length > 0 ? newProps : null;
   }

   render = () => {
      return(
         <div component="inputwedd">
            {
               this.props.type === "button" ? <input className = { this.props.className } value = { this.props.value } type="button" onClick = { this.props.onClick } /> :
               <input className = { this.props.className } type="submit" value = { this.props.value } onClick = { this.props.onClick }  />
            }
         </div>
      )
   }
}
