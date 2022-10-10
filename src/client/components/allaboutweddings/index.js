import React, {Component} from 'react';
import Allaboutweddingsslide from '../allaboutweddingsslide';
import { Titlesection,Input } from '../../components/wirefragment';

class Allaboutweddings extends Component {
    
    render() {
        const allaboutRecomm = this.props.state.map((element,index) => {
            return (
                <article key={index}>
                    <section className="header container container-movil">
                    <Titlesection title={element.title} key={index} description={element.description}/>
                    <section className="imgae-prinicpla desktop">
                        <img alt="Nice to have" src={element.recommend[0].imageDesk}/>
                        <p className="recommend">{element.recommend[0].recommendTxt}</p>
                    </section>
                    <article className="head-selec desktop">
                            <p className="paragraph">{element.recommend[0].title}</p>
                            <div className="pink-line" />
                            <p className="description">{element.recommend[0].description}</p>
                            <div className="gray-line"/>
                    </article>
                </section>
            </article>
            )
        });

        return(
            <section component="allaboutweddings">
                {allaboutRecomm}
                <section className="reltivegalery">
                    <div className="gallery-bg" />
                        <section className="container container-movil">
                            <Allaboutweddingsslide allabout = { this.props.state } lazy = { this.props.lazy } />
                        </section>
                </section>
                <center className="view-all">
                    <Input type={"button"} value={this.props.state[0].buttonTxt} to={this.props.state[0].urlBtn} name="link" id="link"/>
                </center>
                <article className="divicion-section"></article>
            </section>
        );
    }
}
export default Allaboutweddings;