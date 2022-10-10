import React, {Component} from 'react';
import { Sliders, Lestsplan } from '../../components';
import { Titlesection, Iconwedd } from '../wirefragment';
import { withRouter } from 'react-router-dom';

class CompPhotoCouple extends Component{

    constructor(props){
        super(props);
        this.modalShow = this.modalShow.bind(this);
        this.refSldPrn = React.createRef()
        
        this.state={ 
            checkVersion : 1,
            modal: "showModal",
        }
    }

    componentDidMount() {
        const { match: { params } } = this.props;        
        this.setState({ 
            checkVersion : window.innerWidth < 1025 ? 1 : 2,
            modal : this.state.modal == "hideModal" ? "showModal" : "hideModal",
            lang: params.lang
        });
    }

    modalShow(e,index) {
        console.log("ID Foto: ",index,this.refSldPrn.current)
        
        if(index!=null){
            this.refSldPrn.current.querySelectorAll(".controlPoints")[0].children[index].click()
            this.setState({ 
                modal : this.state.modal == "hideModal" ? "showModal" : "hideModal"
            });
        }else {
            this.setState({ 
                modal : this.state.modal == "hideModal" ? "showModal" : "hideModal"
            });
        }
    }

	render() {         
        let { lang } = this.state;
        const head = this.props.heading.map((element,index) => {
            return (
                <Titlesection key={index} 
                title={element.title} 
                subtitle={element.title2} 
                description={element.description} 
                urlBtnBack={[element.return, lang === "es" ? "Regresar" : "Back" ]}
                />
            )
        });

        

        let acumulador1 = [];
        let acumulador2 = [];
        let acumulador3 = [];

        const items = this.props.itemsPhotos.map((element,index) => {
            return (                
                <div key={index}>
                    { element.type == 1 ?
                        acumulador1.push(
                            <section className="item-lg" key={index}>
                                <a onClick={() => {this.modalShow(this,index) }}>
                                <img src={element.imageMov} alt={element.title} ></img>
                                </a>
                            </section> 
                        ) : ""}
                    { element.type == 2 ?
                        acumulador2.push(
                            <section className="item-sm" key={index}>
                                <a onClick={() => {this.modalShow(this,index) }}>
                                <img src={element.imageMov} alt={element.title} ></img>
                                </a>
                            </section> 
                        ) : ""}
                    { element.type == 3 ?
                        acumulador3.push(
                            <section className="item-lg" key={index}>
                                <a onClick={() => {this.modalShow(this,index) }}>
                                <img src={element.imageMov} alt={element.title} ></img>
                                </a>
                            </section> 
                        ) : ""}
             </div>   
            )
        });
        
        const itemsModal = this.props.itemsPhotos.map((element,index) => {
            return (
                <div key={index}>
                     <img src={element.imageSlide} alt={element.title}></img>
                </div> 
            )
        });

        return(
                <section component="compphotos">
    				{this.props.landing?null:<section>
                        {head}
                    </section>}
                    <section className="container">
                        <section className="photo-container-album">
                            <section className="photo-container-album-column">
                                {acumulador1}
                            </section>
                            <section className="photo-container-album-column">
                                {acumulador2}
                            </section>
                            <section className="photo-container-album-column">
                                {acumulador3}
                            </section>
                        </section>
                    </section>
                    {this.props.landing?null:<Lestsplan />}
                    <section className={this.state.modal+" modal-photos"} >
                        <section className="closeModal">
                            <a onClick={() => {this.modalShow() }}>
                                <Iconwedd icon={"alt-close"} color={"pink"} />  
                            </a>
                        </section>
                        <section className="slider-photos"ref={this.refSldPrn}>
                            <Sliders viewItems={1}>
                                {itemsModal}
                            </Sliders>
                        </section> 
                    </section>
                </section>
            )
        }
    }
export default withRouter(CompPhotoCouple);
