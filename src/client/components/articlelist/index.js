import React, {Component} from 'react'
import Posts from '../posts';
import {Grid, Cell} from '../grid';
import { Input } from '../wirefragment';

class ArticleList extends Component {
    
    constructor(){
        super();
    }    

    render(){
        const posts = this.props.bloglist.map((element,e) => {
            return <Posts key={e} lang = { this.props.lang } post={element}></Posts>
        });

        return <section className="container" component="articlelist"><Grid type="x" large-up="2" small-up="1" >
            {posts}

            {this.props.bloglist.length%2?<Cell className="desktop"><img style={{width: "95%",float: "right"}} src="https://e-commercepr.s3.amazonaws.com/assets/images/blog/Desktop/bg-btnplan.jpg"></img><div className="lets"><Input type="button" to={this.props.lang === "es"?"/es/da-el-siguiente-paso":"/en/take-next-step"} value={ this.props.lang === "es" ? "EMPEZAR" : "LET'S PLAN"}></Input></div></Cell>:""}
        </Grid>
        </section>
    }
}

export default ArticleList;