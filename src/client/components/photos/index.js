import React, {Component} from 'react';
import { Titlesection, Input } from '../wirefragment';
import { Lestsplan } from '../../components';
import { withRouter } from 'react-router-dom';

class CompPhotos extends Component{
    constructor(props){
        super(props);
        this.state={ 
            checkVersion : 1
        }
    }

    componentDidMount() {
        const { match: { params } } = this.props;   
        this.setState({ 
            checkVersion : window.innerWidth < 1025 ? 1 : 2,
            lang: params.lang
        })
    }

	render() { 
        let { lang } = this.state;
        const { match: { params } } = this.props;
        const head = this.props.heading.map((element,index) => {
            return (
                    <Titlesection key={index} 
                    title={element.title} 
                    subtitle={element.title2} 
                    description={element.description} 
                    urlBtnBack={[params.lang === "es" ? "/es/galeria" : "/en/gallery", params.lang === "es" ? "Regresar" : "Back"]}
                    />
                )
        });

        let acumuladorLeft = [];
        let acumuladorRight = [];

        const itemsMov = this.props.itemsPhotos.map((element,index) => {
            return (
               <div>
                { element.ordenM == "1" ?
                    acumuladorLeft.push(
                        <article className="photo-item" key={index}>
                            <a href={element.link}><img src={element.imageMov} alt={element.title}></img>
                                <section className="photo-title">
                                    <span className="bride">{element.title}</span><br />
                                    <span className="groom">{element.title2}</span>
                                </section>
                            </a>
                        </article>
                    )
                    :
                    acumuladorRight.push(
                        <article className="photo-item" key={index}>
                            <a href={element.link}><img src={element.imageMov} alt={element.title}></img>
                                <section className="photo-title">
                                    <span className="bride">{element.title}</span><br />
                                    <span className="groom">{element.title2}</span>
                                </section>
                            </a>
                        </article>
                    )
                }
                </div>
                )
        });


        let acumuladorLeft1 = [];
        let acumuladorLeft2 = [];
        let acumuladorLeft3 = [];
        let acumuladorRight1 = [];

        const itemsDesk = this.props.itemsPhotos.map((element,index) => {
            return (
               <div>
                   { element.ordenD == "1" ?
                            acumuladorLeft1.push(
                                <article className="photo-item" key={index}>
                                      <a href={element.link}><img src={element.imageDesk} alt={element.title}></img>
                                        <section className="photo-title">
                                            <span className="bride">{element.title}</span><br />
                                            <span className="groom">{element.title2}</span>
                                        </section>
                                    </a>
                                </article>
                            )
                    :""}
                    { element.ordenD == "2" ?
                            acumuladorLeft2.push(
                                <article className="photo-item" key={index}>
                                      <a href={element.link}><img src={element.imageDesk} alt={element.title}></img>
                                        <section className="photo-title">
                                            <span className="bride">{element.title}</span><br />
                                            <span className="groom">{element.title2}</span>
                                        </section>
                                    </a>
                                </article>
                            )
                    :""}
                    { element.ordenD == "3" ?
                            acumuladorLeft3.push(
                                <article className="photo-item" key={index}>
                                      <a href={element.link}><img src={element.imageDesk} alt={element.title}></img>
                                        <section className="photo-title">
                                            <span className="bride">{element.title}</span><br />
                                            <span className="groom">{element.title2}</span>
                                        </section>
                                    </a>
                                </article>
                            )
                    :""}
                    { element.ordenD == "4" ?
                            acumuladorRight1.push(
                                <article className="photo-item" key={index}>
                                      <a href={element.link}><img src={element.imageDesk} alt={element.title}></img>
                                        <section className="photo-title">
                                            <span className="bride">{element.title}</span><br />
                                            <span className="groom">{element.title2}</span>
                                        </section>
                                    </a>
                                </article>
                            )
                    :""}
                </div>
                )
        });

        const itemsPhotos = this.props.itemsPhotos.map((element,index) => {
            return(
                
                    <article className="photo-item" key={index}>
                        <a href={element.link}><img src={element.imageDesk} alt={element.title}></img>
                            <section className="photo-title">
                                <h2 className="title">{element.title} {element.title2}</h2>
                            </section>
                        </a>
                    </article>
            );
        });
           

		return(
                <section component="compphotos">
    				<section>
                        {head}
                    </section>
                    <section className="container">
                        <section className="photo-container">
                            <div className="photo-container-item">
                                { itemsPhotos }
                            </div>
                        </section>
                    </section>

                    <Lestsplan />

                </section>
                
            )
        }
    }

export default withRouter(CompPhotos);
