import React, { Component } from 'react';
import Sweptawayslider from '../sweptawayslider';
import { Titlesection } from '../../components/wirefragment';

class Sweptaway extends Component {
    render() {
        return (
            <section component="sweptaway">
                <section className="container desktop">
                    <center className="header">
                        <Titlesection title={this.props.data.title} subtitle={this.props.data.title2} description={this.props.data.description} />
                    </center>
                    <Sweptawayslider slide = { this.props.data.slide } lazy = { this.props.lazy } resource= {this.props.resource}/>
                </section>
                <article className="divicion-section"></article>
            </section>
        )
    }
}
export default Sweptaway;