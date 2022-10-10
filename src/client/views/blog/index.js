/**
 * @name: blog.js
 * @version: 1.1.0
 * @author: alanjimenez, Sergio Trejo
 * @description: Blog view component for showing custom content
*/
import React, { Component } from 'react';
import Layout from '../../components/layout';
import { Titlesection } from '../../components/wirefragment';
import blogprincipal from './data';
import blogprincipalES from './dataES';
import { Sliderprincipal, ArticleList} from '../../components';

class Blog extends Component {

   state = {
      slider:[]
   };

   componentDidMount(){
      const { match: { params } } = this.props;
      switch (params.lang) {
         case "es":
            this.setState({
               slider:        blogprincipalES.slider,
               Title:         blogprincipalES.title,
               Subtitle:      blogprincipalES.subtitle,
               Description:   blogprincipalES.description,
               bloglist:      blogprincipalES.bloglist
            });
            break;
         default:
            this.setState({
               slider:        blogprincipal.slider,
               Title:         blogprincipal.title,
               Subtitle:      blogprincipal.subtitle,
               Description:   blogprincipal.description,
               bloglist:      blogprincipal.bloglist
            });
            break;
      }
   }

   render() {

      let { slider } = this.state;
      const { match: { params } } = this.props;

      return (
         <Layout title={params.lang == "en" ? "Destination Weddings Blog" : "Blog"} cID={"weddi00u"}
         description={"Read our blog to learn all about destination wedding tips and trends for your big day."} >
            { slider.length > 0 &&
               <section page="blog">
                  <Sliderprincipal slides = { slider }/>
                     <Titlesection title={this.state.Title} subtitle={this.state.Subtitle} 
                     description={this.state.Description} />
                     <ArticleList bloglist={this.state.bloglist} lang = { this.props.match.params.lang }></ArticleList>
               </section>
            }
         </Layout>
      );
   }

}

export default Blog;