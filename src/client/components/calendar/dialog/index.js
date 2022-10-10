/**
 * @class Dialog
 * @version 0.1.1
 * @author alanjimenez
 * @summary Cuadro de diáligo implementado por el componente nativo de HTML5
 */
import React from 'react';
import './dialog.css';

export default class Dialog extends React.Component {
   constructor(props) {
      super(props);
      this.baseDialog = React.createRef();
      this.state = {
         header: props.header,
         content: props.content,
         footer: props.footer
      }
      // this.close = this.close.bind(this);
      // this.open  = this.open.bind(this => );
      // this.setHeader = this.setHeader.bind(this);
      // this.setContent = this.setContent.bind(this);
      // this.setFooter = this.setFooter.bind(this);
   }

   componentDidMount = () => {
      this.props.onRef(this);
   }

   componentWillReceiveProps = (nextProps) => {
      if (this.state.content != nextProps.content) {
         this.setState({
            header: nextProps.header,
            content: nextProps.content,
            footer: nextProps.footer
         });
      }
   }

   componentWillUnmount = () => {
      this.props.onRef(undefined);
   }

   open = (options) => {
      if (options) {
         this.setState({
            header: options.header || '',
            content: options.content || '',
            footer: options.footer || ''
         });
      }
      this.baseDialog.current.classList.remove('hide');
      this.baseDialog.current.showModal();
   }

   close = () => {
      this.baseDialog.current.classList.add('hide');
      this.baseDialog.current.close();
      this.baseDialog.current.classList.add('hide');
   }

   setHeader = (header, afterAction) => {
      this.setState({ header: header }, typeof afterAction ? afterAction : undefined);
   }

   setContent = (content, afterAction) => {
      this.setState({ content: content }, typeof afterAction ? afterAction : undefined);
   }

   setFooter = (footer, afterAction) => {
      this.setState({ footer: footer }, typeof afterAction ? afterAction : undefined);
   }

   render = () => {
      return (

         <dialog ref={this.baseDialog} component="dialog" className="grid grid-y hide">
            <div className="grid-frame grid-y">
               <header className="col s12">
                  <div className="dialog-controls">
                     <button className="btn right close-button float-right button" onClick={this.close}>
                        <i className="fa fa-times material-icons">close</i>
                     </button>
                  </div>
                  <div className="dialog-header grid-x">
                     {this.state.header}
                  </div>
               </header>
               <main className="col s12">
                  <div className="dialog-content grid grid-y">
                     {this.state.content}
                  </div>
               </main>
               <footer className="col s12">
                  <div className="dialog-footer grid-x">
                     {this.state.footer}
                  </div>
                  <div className="dialog-footer-controls">
                     <span className="blue-text badge">
                        Press <b>ESC</b> to close
                     </span>
                  </div>
               </footer>
            </div>
         </dialog>

      );
   }

}

Dialog.defaultProps = {
   header: '',
   content: '',
   footer: '',
   onRef: (context) => { }
}