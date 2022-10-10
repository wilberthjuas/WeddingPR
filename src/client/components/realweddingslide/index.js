import React from 'react';
import { Input, Iconwedd } from '../../components/wirefragment';
import { Sliders } from '../../components';
import ReactHtmlParser from 'react-html-parser';
import LazyImage from "react-lazy-progressive-image";

const Realweddingslide = (props) => {
    const parentsDesk = props.slide.map((element, index) => {
        return (
            <section key={index}>
                { props.lazy ? 
                    <LazyImage placeholder = "https://via.placeholder.com/400x400/fedfda/fedfda&text="
                    src = { element.ImageDesk } >
                        { (src) => <img alt={element.textAlt} src={ src } className={"desktop" + " img-real-wedd"} /> }
                    </LazyImage> 
                    : <img alt={element.textAlt} src={element.ImageDesk} className={"desktop" + " img-real-wedd"} />
                }
                { props.lazy ? 
                    <LazyImage placeholder = "https://via.placeholder.com/400x400/fedfda/fedfda&text="
                    src = { element.ImageMov } >
                        { (src) => <img alt={element.textAlt} src={ src } className={"movil" + " img-real-wedd"} />}
                    </LazyImage> 
                    : <img alt={element.textAlt} src={element.ImageMov} className={"movil" + " img-real-wedd"} />
                }
                <section className="description-content">
                    <article className="artilce-real">
                        <center><Iconwedd icon={"palace-crown"} color={"dark-melon"} /></center>
                        <p className="paragraph title-img">{element.title}</p>
                        <p className="paragraph">
                            {ReactHtmlParser(element.description)}
                        </p>
                        <div className="line-pink" />
                    </article>
                </section>
            </section>
        );
    }
    )
    return (
        <article className="">
            <div className="gallery-bg" />
            <Sliders nameSlide={"real-wedding"} viewItems={3} extra={<Input type={"button"} to={props.urlBtn} value={props.btnTxt} color={"pink gallery-real movil"} />}>
                {parentsDesk}
            </Sliders>
            <center>
                <Input type={"button"} to={props.urlBtn} value={props.btnTxt} color={"pink gallery-real desktop"} />
            </center>
        </article>
    );
}
export default Realweddingslide;