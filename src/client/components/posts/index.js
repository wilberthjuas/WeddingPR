import React, { Component } from 'react';
import { Titlesection, Iconwedd } from '../wirefragment';
import {Link} from 'react-router-dom'
import {Cell} from '../';

class Posts extends Component {
    constructor() {
        super();
        this.state = {

        };
    }


    render() {
        return <Cell >
            <section component="posts">
                <article>
                    <img alt={this.props.post.subtitle} className="movil" src={this.props.post.img}/>
                    <img alt={this.props.post.subtitle} className="desktop" src={this.props.post.imgDesktop}/>
                </article>
                <article>
                    <Titlesection title={this.props.post.title} subtitle={this.props.post.subtitle} description={this.props.post.shortDesc} ></Titlesection>
                </article>
                <article>
                <div className="read-more" ><Link className="linkalt" to={this.props.post.url}>{ this.props.lang === "es" ? "LEER MÁS" : "READ MORE" }</Link>&nbsp;<Iconwedd icon="chevron-right" color="pink" /></div>
                </article>
                </section>
            </Cell>            
    }
}

export default Posts;