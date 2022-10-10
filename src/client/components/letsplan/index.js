import React, { Component } from 'react';
import { Input } from '../wirefragment';
import { withRouter } from 'react-router-dom';

class Letsplan extends Component {

    constructor(props){
        super(props);
        this.state={ 
            lang : ""
        }
    }

    componentDidMount() {
        const { match: { params } } = this.props;        
        this.setState({ 
            lang: params.lang
        });
    }


    render() {

        let { lang } = this.state;

        return (
            <section component="letsplan">
                <section className="cintilla">
                    <p className="bepart"> { lang === "es" ? "¿Quieres ser parte" : "Be part"} {lang === "es" ? "de la familia de Palace Resorts?" : "of the Palace Resorts family."}</p>
                    <Input type={"button"} value={lang === "es" ? "EMPECEMOS JUNTOS" : "LET'S PLAN TOGETHER"} 
                        to={lang === "es" ? "/es/da-el-siguiente-paso" : "/en/take-next-step"} name="link" id="link" />
                </section>
            </section>
        )
    }
}
export default withRouter(Letsplan);