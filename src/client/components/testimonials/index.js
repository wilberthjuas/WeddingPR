import React, {Component} from 'react';
import { Sliders, Lestsplan } from '../../components';
import { Titlesection,Input,Iconwedd } from '../../components/wirefragment';
import { withRouter } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';

class CompTestimonials extends Component{
    constructor(props){
        super(props);
        this.state={ 
            qtyItems : 1
        }
    }

    componentDidMount() {
        const { match: { params } } = this.props; 
        this.setState({ 
            qtyItems : window.innerWidth < 1025 ? 1 : 2,
            lang: params.lang
        })
    }

	render() { 
        let { lang } = this.state;
        const head = this.props.heading.map((element,index) => {
            return (
                    <Titlesection key={index} 
                    title={element.title} 
                    subtitle={element.title2} 
                    description={element.description} 
                    urlBtnBack={lang === "es" ?  ["/es/galeria","Regresar"] :["/en/gallery","Back"]}
                    />
                )
        });

        const itemsFB = this.props.facebook.map((element,index) => {
            return (
                    <div key={index} className="section-slider">
                        <div className="heading">
                            <p className="facebook">{element.body}</p>
                            <h3>{element.bodyBold}</h3>
                            <div className="read-more">
                                <Input type={"view-more"} to={element.link} value={element.linkTxt} color={"pink "} target="_blank"/> 
                            </div>
                        </div>
                        <div className="heading2">
                            <img className="movil" src={element.imageMov} alt={element.bodyBold}></img>
                            <img className="desktop" src={element.imageDesk} alt={element.bodyBold}></img>
                        </div>
                    </div>
                )
            });

            const itemsTA = this.props.tripadvisor.map((element,index) => {
                return (
                    <div key={index} className="section-slider">
                        <div className="heading">
                            <h2>{ReactHtmlParser(element.title1)}</h2>
                            <h1>{ReactHtmlParser(element.title2)}</h1>
                            <h2>{ReactHtmlParser(element.title3)}</h2>
                            <p>{ReactHtmlParser(element.body)}</p>
                            {element.link==null?null:<div className="read-more">
                                <Input type={"view-more"} to={element.link} value={element.linkTxt} color={"pink "} target="_blank"/> 
                            </div>}
                        </div>
                </div>
                )
            });

            const itemsVideos = this.props.videos.map((element,index) => {
                return (
                    <div className="section-slider-video" key = { index }>
                                                  
                            <iframe src={element.link} className="frametour" width="100%" height="500" frameBorder="0" allowFullScreen="" ></iframe>
                        
                        <section className="video-caption">
                            <span className="video-caption-title" > 
                                {element.title1}
                            </span>
                        </section>
                    </div>
                )   
            });

           

		return(
                <section component="comptestimonials">
    				<section>
                        {head}
                    </section>
                    
                 
                    <section className="slider-videos">
                    <Sliders nameSlide={"videos-testimonials"} viewItems={1}>
                        {itemsVideos}
                    </Sliders> 
                    </section>
                    
                    <section>
                        <header component="titlesection" className="palace-header testimonials">
                            <Iconwedd icon={"facebook-typo"} color={"dark-gray center"}/>    
                            {/*<h2 className="subtitle">STORIES</h2>*/}
                        </header>
                    </section> 

                    <section className="slider-testimonials">
                        <Sliders nameSlide={"facebook-testimonials"} viewItems={ this.state.qtyItems}>
                            {itemsFB}
                        </Sliders>
                    </section>

                    <section>
                        <header component="titlesection" className="palace-header">
                            <Iconwedd icon={"tripadvisor-typo"} color={"-gray center"}/>                                
                        </header>
                    </section>

                    <section className="slider-testimonials">
                        <Sliders nameSlide={"tripadvisor-testimonials"} viewItems={ this.state.qtyItems}>
                            {itemsTA}
                        </Sliders>
                    </section>
                    
                    
                    <Lestsplan />

                </section>
                
            )
        }
    }

export default withRouter(CompTestimonials);
