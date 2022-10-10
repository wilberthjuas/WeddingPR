/**
 * @class RadioButton
 * @version 1.0.0
 * @author alanjimenez
 * @summary Componente de radio button
 */
import React from 'react';

export default class RadioButton extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         checked: props.checked,
         value: props.value,
         label: props.label,
         group: props.group
      };
   }

   toggle = (e) => {
      this.setState({ checked: !this.state.checked }, this.handleChange, () => {
         if (typeof this.props.updater == 'function') {
            console.log('llamando función updater');
            this.props.onChange(this.state);
         }
      });
   }

   /**
    * Se invoca al marcar o desmarcar el componente y se envía la información
    * del control al evento onChange
    */
   handleChange = () => {
      // Si existe la función onChange le enviamos los datos para recuperar
      if (typeof this.props.onChange === 'function') {
         // Información a enviar al evento onChange
         return this.props.onChange(this.state);
      }
   }
/*
   static getDerivedStateFromProps(props, state) {
      let newProps = {};
      Object.keys(props).forEach(key => {
         if (props[key] != state[key]) {
            newProps[key] = props[key];
            // Útil para permitir los cambios de estados del radio/check button
            if ([key] == 'checked' && props[key] != state[key]) {
               newProps[key] = state[key];
            }
         }
      });
      return Object.keys(newProps).length > 0 ? newProps : null;
   }*/

   renderChecked = () => {
      return (
         <div style={{ display: 'inline-block', clear: 'both' }}
            onClick={this.toggle}>
            <div style={{
               border: '1em double #ffffff',
               backgroundColor: '#f86290',
               borderRadius: '50%',
               userSelect: 'none',
               width: '5rem',
               height: '5rem',
               zoom: '0.3',
               display: 'inline-block',
               clipPath: 'circle(50% at 50% 50%)'
            }}
               onClick={this.toggle}
            >&nbsp;</div>
            <label style={{
               float: 'right',
               display: 'block',
               //lineHeight: '2.5em',
               paddingLeft: '.2em',
               
               fontFamily: 'Miso',
               fontSize: '14px',
               fontWeight: 'normal',
               fontStretch: 'normal',
               fontStyle: 'normal',
               //lineHeight: '1', 
               letterSpacing: 'normal',  
               textAlign: 'center',

            }}
               onClick={this.toggle}
            >{this.props.label}</label>
         </div>)
   }

   renderUnChecked = () => {
      return (
         <div style={{ display: 'inline-block', clear: 'both' }}
         >
            <div style={{
               border: '.5em solid #f86290',
               backgroundColor: 'transparent',
               borderRadius: '50%',
               userSelect: 'none',
               width: '4.5rem',
               height: '4.5rem',
               zoom: '0.3',
               display: 'inline-block',
               clipPath: 'circle(50% at 50% 50%)'
            }}
               onClick={this.toggle}
            >&nbsp;</div>
            <label className={"_input-radio-text-bottom"}
               onClick={this.toggle}
            >{this.props.label}</label>
         </div>
      )
   }

   render() {
      return !!this.state.checked ? this.renderChecked() : this.renderUnChecked();
   }

}

RadioButton.defaultProps = {
   checked: false,
   value: '',
   label: '',
   group: ''
};