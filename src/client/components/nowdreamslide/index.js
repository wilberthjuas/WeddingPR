import React from 'react';
import { Titlesection,Input } from '../wirefragment';
import { Sliders } from '../../components';
import LazyImage from "react-lazy-progressive-image";

const Nowdreamslide = (props) => {
        const parents = props.slide.map((element,index) => {
            return (
                <section key={index}>
                    <a href={element.urlBtn}>
                    { props.lazy ? 
                        <LazyImage placeholder = { element.ImageMovThumb }
                        src = { element.ImageMov } >
                            { (src) => <img className="movil img-now-dream " src = {  element.ImageMov }/> }
                        </LazyImage> 
                        : <img className="movil img-now-dream" src = { element.ImageMov }/>
                    }
                    { props.lazy ? 
                        <LazyImage placeholder = "https://via.placeholder.com/400x400/fedfda/fedfda&text="
                        src = { element.ImageDesk } >
                            { (src) => <img className="desktop" src = { src }/> }
                        </LazyImage> 
                        : <img className="desktop" src = { element.ImageDesk }/>
                    }
                    <div className="content-article">
                        <Titlesection subtitle={element.title} 
                        description={element.description}/>
                    </div>
                    <section className="link-dream">
                        {
                        element.resource ? 
                        <Input type = {"href"} target={"_blank"} value = { element.buttonTxt } to = { element.urlBtn } name = "link" />
                        :
                        <Input type={"button"} value={element.buttonTxt} to={element.urlBtn}/>
                    }
                    </section>
                    </a>
                </section>
            );
        })
    return (
        <div className="gallery">
        <div className="gallery-bg "/>
            <Sliders nameSlide={"now-dream-slide"} viewItems={3}>{parents}</Sliders>
        </div>
        );
}
export default Nowdreamslide;