import React from 'react';
import { Titlesection, Input } from '../../components/wirefragment';
import { Iconwedd } from '../../components/wirefragment';
import GradientBar from '../catalog/gradientbar';
export default class CakeDetails extends React.Component{
    constructor() {
        super();
        this.state={
            data:{},
        }
    }

    componentDidMount(){
    let id = this.props.id;
    /* Deberia recibir un props de tipo Entero para hacer una peticion y obtener
     * los datos del pastel o cake¿?
     *
    */
   let api = {
       desc:"Constantina Esplendor"
   }
   
    let title = api.desc.split(" ", 1)[0];
    let subtitle= api.desc.substring(api.desc.split(" ", 1)[0].length + 1);

        this.setState({
            data: {
                title,
                subtitle,
                src:"https://cdn.zeplin.io/5d39df6e623e1d5187c52734/assets/858C5FB6-C7EC-4619-BA5F-257F7C0C3835.png", 
                logo:"https://cdn.zeplin.io/5d39df6e623e1d5187c52734/assets/DA53F572-2AD1-4EFB-857F-FCD97B71C163.png",
                description:"Sleek masterpiece with stunning sugar flowers decor",
                cost:"2,800",
                detail:"FOUR - TIERS" 
            }
        });
        
    }

    render() {
        let data = this.state.data;
        return (
            <section component="cakeDetail" className="show">
                <div className={"padding-9em-0"}>
                    <div component="grid-x">
                        <GradientBar>
                            Your Wishes
                            <Iconwedd icon={"heart-empty"} color={"pink icon-check checked"}/>
                        </GradientBar>
                        <div component="cell" small="0" medium="2" large="3"></div>
                        <div component="cell" small="12" medium="8" large="6">
                            <div component="grid-x">
                                <div component="cell" small="2" medium="2" large="2" className={"border-20-20-f2f2f2 bor-right"}  >
                                    <a href={'/en/catalog'}>
                                        <Iconwedd icon={"chevron-carousel-left"} color={"pink"}/>
                                    </a>
                                </div>
                                {sessionStorage.logged_in=="true"?null:<div component="cell" small="10" medium="10" large="10" className={"grid-flex-20-20-f2f2f2"}  >
                                    <Input type={"submit"} value={"ADD TO WISH LIST"} widthIcon={"heart-full"} />
                                </div>}
                            </div>
                            <div component="grid-x" className={"border-20-20-f2f2f2 bor-top"}  >
                                <div component="cell" small="6" medium="6" large="6">
                                    <div className="_media_detail">
                                        <div className="_card_detail">
                                            
                                            <img src={data.src} alt="placeholder"/>
                                        </div>
                                    </div>
                                </div>
                                <div component="cell" small="6" medium="6" large="6">
                                    <div className="_content_detail">
                                        <div className="_logo_detail">
                                            <img src={data.logo} alt="placeholder"/>
                                        </div>
                                        <Titlesection
                                            title={data.title}
                                            subtitle={data.subtitle}
                                            description={data.description}
                                        /> 
                                        {
                                            data.hasOwnProperty('cost') ? 
                                            <div className="_description_detail">
                                                $ {data.cost} USD
                                            </div> 
                                            : null
                                        }
                                        
                                        <div>
                                            <hr className="divider"></hr>
                                        </div>
                                        {
                                            data.hasOwnProperty('description') ? 
                                            <div className="_description_detail">
                                                {data.detail}
                                            </div> 
                                            : null
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div component="cell" small="0" medium="2" large="3"></div>
                    </div>
                </div>
            </section>
        );
    }
}
