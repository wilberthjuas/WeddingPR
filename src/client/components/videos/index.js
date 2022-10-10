import React, {Component} from 'react';
import { Sliders, Lestsplan } from '../../components';
import { Titlesection,Input,Iconwedd } from '../wirefragment';
import { withRouter } from 'react-router-dom';

class CompVideos extends Component{
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

        
            const itemsVideos = this.props.videos.map((element,index) => {
                return (
                    <div key={index} className="section-slider-video">
                        <iframe src={element.link} class="frametour" width="100%" height="500px" frameborder="0" webkitallowfullscreen="" mozallowfullscreen="" allowfullscreen=""></iframe>
                        
                     
                    </div>
                      
                )   
            });

           

		return(
                <section component="compvideos">
    				<section>
                        {head}
                    </section>
                    
                   
                    
                    <section className="slider-videos">
                    <Sliders nameSlide={"videos-testimonials"} viewItems={1}>
                        {itemsVideos}
                    </Sliders> 
                    </section>
                  
                    <Lestsplan />

                </section>
                
            )
        }
    }

export default withRouter(CompVideos);
