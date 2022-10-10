import React, {Component} from 'react';
import { Footer, Sliderprincipal, Footermobile, Complandingpage, Morethan } from '../../components';
import { Titlesection } from '../../components/wirefragment';
import datos from './datos';

class ViewLandingPage extends Component {
    state={}

    constructor(){
        super();
        this.state={
            mainSlider:datos.MainSlider,
            mainHeading:datos.Heading,
            morethan:datos.morethan,
            mainHeading2:datos.Heading2,
            Items:datos.Items,
            
        }
    }

    componentDidMount(){
        

    } 

    render (){
        if(this.state.mainSlider.length){          
            return (
                <section page="LandingWeddings" className="container">
                    <Sliderprincipal slides={this.state.mainSlider} />
                    <Titlesection description={this.state.mainHeading[0].description} />
                    <Morethan state={this.state.morethan}/>
                    <Complandingpage heading={this.state.mainHeading2} items={this.state.Items}/>
                    <Footer/>
                    <Footermobile/>
                </section>
            );
        } else{
            return(<section page="LandingWeddings"> &nbsp; </section>);
        }
    }
}

export default ViewLandingPage;