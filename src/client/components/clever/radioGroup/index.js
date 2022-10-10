/**
 * @class RadioGroup
 * @version 1.0.0
 * @author alanjimenez
 * @summary Grupo de radio buttons
 */
import React from 'react';

import RadioButton from '../radioButton';

export default class RadioGroup extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         checkedValue: props.checkedValue
      };
      this.optionContainer = React.createRef();
   }

   setChecked = (c) => {
      if (c.checked == true) {
         // Desmarcar los demás
         this.setState({ checkedValue: c.value })
      }
      /*if (c) {
         console.log('click on ', c);
         if (c.checked == true) {
            this.setState({ checkedValue: c.value })
         }
      }*/
   }

   render() {
      return (
         <fieldset>
            {this.props.title ? <legend style={{ padding: '0 .2em' }}>{this.props.title}</legend> : null}
            <div ref={this.optionContainer}>
               {this.props.children.map((child, i) => {
                  return <RadioButton  {...child.props}
                     onChange={this.setChecked}
                     checked={this.state.checkedValue == child.props.value}
                     {...child.props} />
               }
               )}
            </div>
         </fieldset>
      );
   }

}

RadioGroup.defaultProps = {
   checkedValue: null
};