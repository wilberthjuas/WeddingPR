import React, {Component} from 'react';
import Nowdreamslide from '../nowdreamslide';
import { Titlesection } from '../../components/wirefragment';

class Nowdream extends Component {

    render() {
        return(
            <section component="nowdream">
                <article className="now-the-dream movil">
                <Titlesection title={this.props.data.title} description={this.props.data.description} />
                    <Nowdreamslide slide={this.props.data.slide} lazy = { this.props.lazy } />
                    <article className="divicion-section"></article>
                </article>
            </section>
        )
    }
}
export default Nowdream;