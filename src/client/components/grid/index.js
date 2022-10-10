import React from 'react';

export const Grid = React.forwardRef(({ type = 'container', children, ...rest }, ref) => {
   const component = type ? `grid-${type}` : null;
   return (
      <div ref={ref} component={component} {...rest}>
         {children}
      </div>
   );
});

export const Cell = React.forwardRef((props, ref) => {
   return (
      <div ref={ref} component="cell" {...props}>
         {props.children}
      </div>
   );
});