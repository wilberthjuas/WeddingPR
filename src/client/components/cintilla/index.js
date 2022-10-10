import React, {Component} from 'react';
import ReactHtmlParser from 'react-html-parser'; 

class Cintilla extends Component{

    constructor(props){
        super(props);
    }

    render() {
        /*Estilos estan en morethan.scss*/
        return (
            <section component="cintilla">
                <section className="cintilla">
                <span className="txt1"> {this.props.txt1} </span><span className="txt2"> {this.props.txt2} </span>
                </section>
            </section>
        )


    }



}

export default Cintilla;