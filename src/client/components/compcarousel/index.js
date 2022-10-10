

import React, {Component} from 'react';
import { Sliders } from '../../components';
import { Titlesection, Input } from '../../components/wirefragment';

class Compcarousel extends Component{
    constructor(){
        super();
    }


    render() {
        
        const btn = this.props.carouselitems.map((element,index) => {
            return ( 

                /*<Link to={element.link} key={index}  className="nav-link-weddings-gral">
                    <button className="btn btn3 uppercase">{element.caption}</button>

                </Link>*/
                <center key={index}>
                
                {element.type == "2" ?
                    <Input type={"button"} typBtn={5} to={element.link} value={element.caption} color={"pink "} />
                    :
                      ""  
                }

                </center>
            )
        });

        const sliderTemplate = this.props.carouselitems[0].carouselItems.map((element,index) => {0
            return (
                <div className="galery" ref = { this.title } key={index}>
                    
                


                    {this.props.carouselitems[0].type == "1"  ?
                    <section>
                        <a href={element.link}> <img src={element.imageDesk} className="desktop img-other-guest" alt={element.title} /></a>
                        <a href={element.link}><img src={element.imageMov} className="movil img-other-guest" alt={element.title} /></a>
                    </section>
                    
                    :
                    <section>
                        <img src={element.imageDesk} className="desktop img-other-guest" alt={element.title} />
                        <img src={element.imageMov} className="movil img-other-guest" alt={element.title} />
                    </section>
                    }                   

                    <div className="uppercase titlesliderother">{element.title}</div>

                    {element.description != "" ?
                        <div className="description-glry">{element.description}</div>
                    :
                      ""  
                    }
                    
                    {this.props.carouselitems[0].type == "1" ?
                        
                        <Input type={"button"} typBtn={5} to={element.link} value={element.caption} color={"pink nav-link-weddings"} />
                        
                    :
                      ""  
                    }

                </div>                
            )
        });

        return(
            <section component="compcarousel">
                <div className="wemakwuniqueContent">

                {this.props.carouselitems[0].title ? 

                <Titlesection title={this.props.carouselitems[0].title} subtitle={this.props.carouselitems[0].title2} />

                    : "" }

                   <div className="divisor-title-slider"></div>
                    <div className="container">

                    
                        <div className="contentSliderPrinc">
                            <center><div className="bg-carousel"></div></center>
                            <Sliders nameSlide={"otherGuest"} viewItems={3}>
                                {sliderTemplate}
                            </Sliders>
                        </div>
                        <div className="divisor-points-botton"></div>
                            {btn} 
                            <div className="divisor-points-botton"></div>
                    </div>
                </div>
                {/*<div className="divicion-section"></div>*/}
            </section>
        )
    }
}
export default Compcarousel;