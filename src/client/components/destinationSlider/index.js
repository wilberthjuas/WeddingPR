import React from 'react';

import { Input,Titlesection } from '../../components/wirefragment';
import { Sliders } from '../../components';
const destinationSlider = (props) => {
    const content = props.slide.map((element,index) => {
        return (
            <section key={index}>
            <img alt={element.textAlt}src={element.ImageDesk}/>
                <div className="content-article">
                    <Titlesection title={element.title} subtitle={element.title2}
                    description={element.description}/>
                </div>
                <center>
                    <Input type={"button"} value={element.buttonTxt} to={"/link"} name="link" id="link"/>
                </center>
            </section>
        )
    });
  
    return (
        <div className="gallery">
            <div className="gallery-bg"/>
            <Sliders nameSlide={"slider-swept-away"} viewItems={3}>
                {content}
            </Sliders>
         </div>
    );
}
export default destinationSlider;