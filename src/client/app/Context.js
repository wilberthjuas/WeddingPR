import React, { createContext } from 'react';

const ServiceContext = createContext();

const ServiceProvider = ServiceContext.Provider;

const ServiceConsumer = ServiceContext.Consumer;

const WithContext = (Component) => {
   return (props) => (
      <ServiceConsumer>
         { value => <Component {...props} app={value}/>}
      </ServiceConsumer>
   );
}

export default WithContext;
export { ServiceContext, ServiceProvider, ServiceConsumer };