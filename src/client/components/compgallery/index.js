import React, {Component} from 'react';
import { PreviewBox, Morethan } from '../../components';
import { Titlesection } from '../../components/wirefragment';
import { Otherguest, Lestsplan } from '../../components';

class Compgallery extends Component{

	render() { 
        const head = this.props.heading.map((element,index) => {
            return (
                <Titlesection key={index} title={element.title} subtitle={element.title2} description={element.description} />
            )
        });
        let galery = { "galery":this.props.carousel[0].carouselItems }
		return(
            <section component="compgallery">
                <section>
                    { head }
                </section>
                <Otherguest data={{otherguest:galery}} />
                <Morethan state={this.props.morethan} />
                <PreviewBox content={this.props.heading[0].extras} section={"gallery"} />
                <section className="movil">
                <Lestsplan />
                </section>
            </section>
        )
    }
}

export default Compgallery;
