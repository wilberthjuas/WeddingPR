import React, { Component } from 'react';
import { Redirect, Route } from 'react-router-dom';

import { formatter } from '../core/helpers';

const Auth = {
   isAuthenticated: () => {
      return formatter.parseBoolean(sessionStorage.logged_in);
   },
   authenticate(data, callback) {
      sessionStorage.setItem('logged_in', true);
      for (const key in data) {
         if (data.hasOwnProperty(key)) {
            sessionStorage.setItem(key, data[key]);
         }
      }
      setTimeout(callback, 100);
   },
   signout(callback) {
      sessionStorage.clear();
      sessionStorage.setItem('logged_in', false);
      setTimeout(callback, 100);
   }
};


const PrivateRoute = (props) => {
   const newProps = Object.assign({}, props);
   const Component = newProps.component;
   delete newProps.component;
   
   return (
      <Route {...newProps} render={
         (propsRoute) => {
            if (Auth.isAuthenticated()) {
               return (<Component {...propsRoute}/>);
            }else{
               return (
                  <Redirect to={{
                     pathname: '/login',
                     state: { from: propsRoute.location }
                  }}/>
               );
            }
         }
      }/>
   );
};
class Logout extends Component{
   constructor(props){
      super(props);
      this.state = {
         redirectToReferrer: false
      }
   }

   componentDidMount(){
      Auth.signout(() => {
         this.setState({
            redirectToReferrer: true
         })
      });
   }

   render(){
      const { redirectToReferrer } = this.state;
      if (redirectToReferrer === true) {
         return <Redirect to="/login" />
      }

      return (
         <div>Logout...</div>
      )
   }
}

export { Auth, Logout ,PrivateRoute };