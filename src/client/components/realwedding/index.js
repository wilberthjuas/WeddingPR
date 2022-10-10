import React, {Component} from 'react';
import Realweddingslide from '../realweddingslide';
import { Titlesection } from '../../components/wirefragment';

class Realwedding extends Component{

    render() {
        return(
            <section component="realwedding">
                <section className="real-wedd">
                    <Titlesection title={this.props.data.title} description={this.props.data.description}/>
                    <section className="gallery container">
                        <Realweddingslide slide={this.props.data.slide} btnTxt={this.props.data.buttonTxt} urlBtn={this.props.data.urlBtn} lazy = { this.props.lazy } />
                    </section>
                </section>
                <article className="divicion-section"></article>
            </section>
        )
    }
}
export default Realwedding;