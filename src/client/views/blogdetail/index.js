/**
 * @name: blogdetail.js
 * @version: 1.1.0
 * @author: alanjimenez, Sergio Trejo
 * @description: Página de /blog/:string
*/
import React, { Component } from 'react';
import Layout from '../../components/layout';
import blogdetail from './data';
import { Sliderprincipal, Grid, Cell } from '../../components';
import { Titlesection, Iconwedd } from '../../components/wirefragment';
import ReactHtmlParser from 'react-html-parser'; 
import { Link } from 'react-router-dom';

class BlogDetail extends Component {
    
    state = {
        slider:[],
        entries:[],
        thumbails:[]
    };

    componentDidMount() {

        const { match: { params } } = this.props;
        let cleanUri = params.blogid.replace(/-/g, "");
        this.setState({
            slider:             blogdetail[cleanUri].slider,
            Title:              blogdetail[cleanUri].title,
            Subtitle:           blogdetail[cleanUri].subtitle,
            description:        blogdetail[cleanUri].description,
            mainImage:          blogdetail[cleanUri].mainImage,
            mainImageDesktop:   blogdetail[cleanUri].mainImageDesktop,
            quote:              blogdetail[cleanUri].quote,
            principalContent:   blogdetail[cleanUri].principalContent,
            entries:            blogdetail[cleanUri].entries,
            readmore:           blogdetail[cleanUri].readmore,
            thumbails:           blogdetail[cleanUri].thumbails
        });  
    }

    UNSAFE_componentWillReceiveProps (){
        window.location.reload();
    }

    render() {

        const { slider, Title } = this.state;

        const entries = this.state.entries.map((element, index) => {
            return <article key={index} className="entry">
                {element.title==""?"":<h2 className={index%2?"entryTitleleft":"entryTitleright"}>{element.title}</h2>}
                
                    <img alt={this.state.Title} className="movil" src={element.Image}></img>
                    <img alt={this.state.Title} className={index%2?"left desktop":"right desktop"} src={element.ImageDesktop}></img>
                    <p className={index%2?"bannerleft":"bannerright"}>{element.ImageBanner}</p>
                    
                    {ReactHtmlParser(element.entryContent)}
                    
            </article>
    })

    const previewsThumbails = this.state.thumbails.map((element, index) => {
        return <article key={index} className={index>1?"desktop thumbailcontent":"thumbailcontent"}>
       
                <img src={element.image} alt={element.title} className="movil"></img>
                <img src={element.imageDesktop} alt={element.title} className="desktop"></img>
       
            <div className="thumbailinfo">
                <p className="description">{element.title+" "+element.subtitle}</p>
                    <div className="readmore">
                        <div className="enviaabajo">
                            <Link  className="linkalt" to={element.readmore}>{this.props.match.params.lang === "es" ? "LEER MÁS" : "READ MORE"}</Link>&nbsp;<Iconwedd color="pink" icon="chevron-right"></Iconwedd>
                    </div>
                </div>
            </div>
        </article>
    })

        return (
            <Layout title = { Title }>
                { slider.length > 0 && 
                    <section page="blogdetail">
                        <Sliderprincipal slides={this.state.slider}/>
                        <Titlesection title={this.state.Title} subtitle={this.state.Subtitle} 
                            description={this.state.description} urlBtnBack={this.props.match.params.lang === "es" ? ["/es/blog","REGRESAR"] : ["/en/blog","BACK"]} 
                        />
                        <section className="introPost container">
                            <article>
                            <img className="movil" alt={this.state.Title} src={this.state.mainImage}></img>
                            <img className="desktop" alt={this.state.Title} src={this.state.mainImageDesktop}></img>
                            </article>
                            <article className="quote">
                                <div className="quotes">“</div>
                                <p className="paragraph contentquote">{this.state.quote}</p>
                                <div className="quotes2 movil">”</div>
                            </article>
                            <article>
                                <p className="paragraph"> {ReactHtmlParser(this.state.principalContent)} </p>
                            </article>
                            <section className="entries">
                                {entries}
                            </section>
                            <section className="movil"> 
                                <p className="shareblock"> <span className="share">{this.props.match.params.lang === "es" ? "Compartir: " : "Share:"}</span> <Iconwedd icon="facebook-circled" color="pink"/>&nbsp; <Iconwedd icon="twitter-circled" color="pink"/> &nbsp; <Iconwedd icon="envelope-circled" color="pink"/></p>
                                <div className="readblock"> 
                                   <div className="read"  ><p className="paragraph">{this.props.match.params.lang === "es" ? "Leer más: " : "Read more:"}</p></div> 
                                   <div className="link"><Link className="linkalt"to={this.state.readmore[1]}>{this.state.readmore[0]}</Link></div>
                                </div>
                            </section>
                            <section className="desktop">
                                <div className="readblock"> <p className="paragraph read">{this.props.match.params.lang === "es" ? "Leer más: " : "Read more:"}</p> <Link className="linkalt" to={this.state.readmore[1]}>{this.state.readmore[0]}</Link></div>
                                <p className="shareblock"> <p className="description">{this.props.match.params.lang === "es" ? "Compartir: " : "Share:"}</p> <Iconwedd icon="facebook-circled" color="pink"/>&nbsp; <Iconwedd icon="twitter-circled" color="pink"/> &nbsp; <Iconwedd icon="envelope-circled" color="pink"/></p>
                            </section>
                            <section className="postsPreview">
                            <h1 className="title">{this.props.match.params.lang === "es" ? "Te Puede Interesar" : "This May Interest You"}</h1>
                                <section className="contenedorThumb">
                                    {previewsThumbails}
                                </section>
                            </section>
                        </section>
                    </section>
                }
            </Layout>
        );
    }
}

export default BlogDetail;