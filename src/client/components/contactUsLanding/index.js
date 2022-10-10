import React, { Component } from 'react';

import { Cell } from '../grid';
import { Grid } from '../../components';
import { Input } from '../../components/wirefragment';
import ReactHtmlParser from 'react-html-parser';
import WithContext from '../../app/Context';


class contactUsLanding extends Component {


    constructor(props) {
        super(props);
    }

    componentDidMount() {
        /*if (this.chat.current.querySelector("a")!=null) {
            this.chat.current.querySelector("a").addEventListener("click", () => { acquireIO.max();});
            this.chat.current.querySelector("a").style="cursor:pointer;"
        }*/
    }
    handleChat() {
        acquireIO.max();
    }

    render() {

    const parents = this.props.galery.map((element, index) => {
        return (
            <section className="Grid-Row" key={index}>
                <section className="wemakeuniq-itmes-content">

                    <article className="img-wemake-contact">
                        <img alt={element.title} src={element.imageDesk} className="desktop" />
                        <img alt={element.title} src={element.imageMov} className="movil" />
                    </article>
                    <article className="img-wemake-contact-info">
                        {element.title != null ? <h2 className="imgcaptions bg-caption">{ReactHtmlParser(element.title)}</h2> : null}
                        <div className="info-item-contact">
                            <div className="desctiption-contact">
                                <span className="paragraph-contact" >{ReactHtmlParser(element.description)}</span>
                            </div>
                            <div className="inputgallery-contact">
                                <center>

                                    {
                                        element.btnChat ?
                                            <div component="inputwedd">
                                                <a class="btn pink galery-wemakeunique" onClick={this.handleChat}>{element.buttonTxt}</a> 
                                            </div>:
                                            
                                                element.ishref ?
                                                    <Input type={"href"} value={element.buttonTxt} to={element.urlBtn} color={"pink galery-wemakeunique"} /> :
                                                    <Input to={element.urlBtn} type={"button"} value={element.buttonTxt} color={"pink galery-wemakeunique"} />
                                    }
                                </center>
                            </div>
                        </div>
                    </article>


                </section>
                <div className="separadorwemake"></div>
            </section>
        )
    }



    );
    return <>
        {parents}
        {(this.props.galery.length % 2) ? <div className="Grid-Row take-the-next desktop" ><div className="wemakeuniq-itmes-content"><img src="https://e-commercepr.s3.amazonaws.com/assets/images/offers/Main+Offers+Desktop/take-the-next-step.jpg"></img></div></div> : null}
    </>
}

}

export default WithContext(contactUsLanding);


