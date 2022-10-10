import React, { Component } from 'react';
import { Titlesection, Iconwedd, Input } from '../../components/wirefragment';
import HtmlParser from 'react-html-parser';
import Sliders from '../sliders';
import { TwitterShareButton, FacebookShareButton } from 'react-share';
import json from "./data_1";
import CheckboxButton from '../clever/checkbox';
import api from '../../app';
import { DatePK, CompPhotoCouple } from '..';
import InputRange from '../clever/inputrange';
import Nowdream from '../nowdream';
import Sweptaway from '../sweptaway';

class Landingmainscreenc extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            finish: false, 
        }
    }
  

    componentDidMount() {
      
    }

    
    render() {
        let dta = this.props.content
      
    
        return (
            <section className="landing_mains_creenc">
             <Titlesection title={dta.title} description={dta.description2}></Titlesection>
                <div className="iframe">
                    <Input type={"href"} to={dta.urlShare} color={"pink btn-nextwhitch_3"} value={dta.button1}  />
                    <iframe src="https://www.youtube.com/embed/-YNnt-TdUIY" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    <Input type={"href"} to={dta.urlShare} color={"pink btn-nextwhitch_3"} value={dta.button1}  />
                </div>

                <CompPhotoCouple landing={true} heading={dta.heading} itemsPhotos={dta.items} ></CompPhotoCouple>
                <CompPhotoCouple landing={true} heading={dta.heading} itemsPhotos={dta.items2} ></CompPhotoCouple>
            </section>
        );
    }
}
//onSubmit_prop(e) meotodo donde estan los resultados
export default Landingmainscreenc;