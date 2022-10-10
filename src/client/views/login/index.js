/**
 * @class LoginView
 * @version 1.0.0
 * @author alanjimenez
 * @summary Vista de login para el sitio de weddings
 */
import React from 'react';
import WithContext from '../../app/Context';

class LoginView extends React.Component {
   constructor(props) {
      super(props);
      this.state = {};
   }

   render() {

      return (
         <div>
            Edit me on:<br />
            views/login/index.js
         </div>
      );
   }

}

LoginView.defaultProps = {
};

export default WithContext(LoginView);