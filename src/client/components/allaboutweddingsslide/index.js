import React from 'react';
import { Sliders } from '../../components';
import LazyImage from "react-lazy-progressive-image";

const Allaboutweddingsslide = (props) => {

        const contentD = props.allabout[0].slide.filter((element) => element.showDesktop == 1);
        const contentM = props.allabout[0].slide.filter((element) => element.showDesktop != 2);

        const content2  = contentD.map((element,index) => {
            return (
                <section key={index} className="content-itme">
                    { props.lazy ? 
                        <LazyImage placeholder = "https://via.placeholder.com/500x300/fedfda/fedfda&text="
                        src = { element.ImageDesk } >
                            { (src) => <img alt={element.textAlt || "All About"} src = { src } className="desktop img-all-about"/> }
                        </LazyImage> 
                        : <img alt={element.textAlt || "All About"} src={element.ImageDesk} className="desktop img-all-about"/>
                    }
                    { props.lazy ? 
                        <LazyImage placeholder = "https://via.placeholder.com/500x300/fedfda/fedfda&text="
                        src = { element.ImageDesk } >
                            { (src) => <img alt={element.textAlt || "All About"} src={ src } className="movil img-all-about"/> }
                        </LazyImage> 
                        : <img alt={element.textAlt || "All About"} src={element.ImageMov} className="movil img-all-about"/>
                    }
                    <article className="copy-bg">
                        <p className="paragraph">{element.title}</p>
                        <div className="in-line" />
                        <p className="description">{element.description}</p>
                        <div className="gray-line"/>
                    </article>
                </section>
            );
        });

        const content3  = contentM.map((element,index) => {
            return (
                <section key={index}>
                    <img alt={element.textAlt || "All About"} src={element.ImageDesk} className="desktop img-all-about"/>
                <img alt={element.textAlt || "All About"} src={element.ImageMov} className="movil img-all-about"/>
                    <section className="copy-bg">
                        <p className="paragraph">{element.title}</p>
                        <div className="in-line" />
                        <p className="description">{element.description}</p>
                        <div className="gray-line"/>
                    </section>
                </section>
            );
        });

   
    return (
        <section>
        <article className="desktop">
            <Sliders nameSlide={"all-about-slide"} viewItems={3}>{content2}</Sliders>
        </article>
        <article className="movil">
            <Sliders nameSlide={"all-about-slide"} viewItems={3}>{content3}</Sliders>
        </article>
        </section>
    );
}
export default Allaboutweddingsslide;