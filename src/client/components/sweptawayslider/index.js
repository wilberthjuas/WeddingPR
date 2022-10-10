import React from 'react';

import { Input, Titlesection } from '../../components/wirefragment';
import { Sliders } from '../../components';
import LazyImage from "react-lazy-progressive-image";

const Sweptawayslider = (props) => {

    const handleClick = (e) =>{
        e.preventDefault();
        e.target.parentElement.children[3].select();
        e.target.parentElement.children[3].setSelectionRange(0, 99999); 
        document.execCommand("copy");
        alert("URL Copied");
    }

    const content = props.slide.map((element,index) => {
        return (
            <section className="elementSwep" key = { index }>
                 {element.resource ? <div>
                    { props.lazy ? 
                    <LazyImage placeholder = "https://via.placeholder.com/400x400/fedfda/fedfda&text="
                    src = { element.ImageDesk } >
                        { (src) => <img alt = { element.textAlt } src = { src } /> }
                    </LazyImage> 
                    : <img alt = { element.textAlt } src = { element.ImageDesk } />
                }
                <div className="content-article">
                    <Titlesection title = { element.title } subtitle = { element.title2 }
                   />
                      {element.resource ? 
                        <Input type = {"href"} target={"_blank"} value = { element.buttonTxt } to = { element.urlBtn } name = "link" />
                        :null}
                         <p >or</p>
                         <input style={{opacity:"0",position:"absolute",top:"0px",cursor:"default"}} type="text"value={element.urlBtn}></input>
                        <a href={element.urlBtn} onClick={(e) => handleClick(e)}>Copy URL to Clipboard</a>

                </div>
                <center>
                    {
                        element.resource ? null
                            :
                        <Input type = {"button"} value = { element.buttonTxt } to = { element.urlBtn } name = "link" />
                         
                    }                    
                </center>
                 </div> 
                 : 
                 <a href={element.urlBtn}>
                 { props.lazy ? 
                    <LazyImage placeholder = "https://via.placeholder.com/400x400/fedfda/fedfda&text="
                    src = { element.ImageDesk } >
                        { (src) => <img alt = { element.textAlt } src = { src } /> }
                    </LazyImage> 
                    : <img alt = { element.textAlt } src = { element.ImageDesk } />
                }
                <div className="content-article">
                    <Titlesection title = { element.title } subtitle = { element.title2 }
                   />
                      {element.resource ? 
                        <Input type = {"href"} target={"_blank"} value = { element.buttonTxt } to = { element.urlBtn } name = "link" />
                        :null}
                </div>
                <center>
                    {
                        element.resource ? null
                            :
                        <Input type = {"button"} value = { element.buttonTxt } to = { element.urlBtn } name = "link" />
                         
                    }                    
                </center>
                </a>
                }
            </section>
        );
    });
  
    return (
        <div className="gallery">
            <div className="gallery-bg"/>
            {
               props.resource ? 
                <section component="swepslider">
                    { content }
                </section> 
            : 
                <Sliders nameSlide={"slider-swept-away"} viewItems = { 3 }>
                    { content }
                </Sliders>
            }            
        </div>
    );
}
export default Sweptawayslider;