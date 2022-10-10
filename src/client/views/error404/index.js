/**
* @name: error404.js
* @description: Página 404
* @author: Diego
* @version: 1.1.0*/

import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Layout from '../../components/layout';
import { Sliderprincipal, Sweptaway,Nowdream } from '../../components';
import { Titlesection, Input } from '../../components/wirefragment';

class Error404 extends Component {

   constructor(props) {
      super(props);

      this.state = {


        msg : "Oops! Seems like the page you’re looking for went for a long <br /> romantic walk on the beach.<br /><br />Let’s get back to planning your dream destination wedding.",
        btn : "KEEP PLANNING",
        link : "/en/take-next-step",
        msg404: "Page not found",
         slider404: [{
            imageDesk: "https://e-commercepr.s3.amazonaws.com/assets/images/contactus/Desktop/contact-us-desktop.jpg",
            imageMov: "https://e-commercepr.s3.amazonaws.com/assets/images/contactus/Movil/contact-us.jpg",
        },],
        nowthedream:{
         "title":"Other guests <span> loved these offers </span>",
         "title2":"",
          slide:[
            {
             "ImageDesk":"https://e-commercepr.s3.amazonaws.com/assets/images/Carruseles/Offers/preview-paradise-slide.jpg",
             "ImageMov":"https://e-commercepr.s3.amazonaws.com/assets/images/Carruseles/Offers/preview-paradise-slide.jpg",
             "title":"Preview <span> paradise </span>",
             "title2":"",
             "description":"The journey of a lifetime begins here.",
             "buttonTxt":"VIEW OFFER",
             "urlBtn":"/en/offers/preview-paradise",
             "textAlt":"Dream Weddings"
            },
            {
             "ImageDesk":"https://e-commercepr.s3.amazonaws.com/assets/images/Carruseles/Offers/wedding-day-extras-slide.jpg",
             "ImageMov":"https://e-commercepr.s3.amazonaws.com/assets/images/Carruseles/Offers/wedding-day-extras-slide.jpg",
             "title":"Wedding Day <span> Extras </span>",
             "title2":"",
             "description":"We vow to even make your wedding extras special! ",
             "buttonTxt":"VIEW OFFER",
             "urlBtn":"/en/offers/wedding-day-extras",
             "textAlt":"carrose"
            },
            {
              "ImageDesk":"https://e-commercepr.s3.amazonaws.com/assets/images/Carruseles/Offers/small-groups-slide.jpg",
              "ImageMov":"https://e-commercepr.s3.amazonaws.com/assets/images/Carruseles/Offers/small-groups-slide.jpg",
              "title":"Small <span> groups </span>",
              "title2":"",
              "description":"The perfect day in the perfect destination, and the moment you have always dreamed of.",
              "buttonTxt":"VIEW OFFER",
              "urlBtn":"/en/offers/small-groups",
              "textAlt":"Dream Weddings"
            },/*
            {
              "ImageDesk":"https://e-commercepr.s3.amazonaws.com/assets/images/offersinterna/Desktop/mid-week-special.jpg",
              "ImageMov":"https://e-commercepr.s3.amazonaws.com/assets/images/offersinterna/Desktop/mid-week-special.jpg",
              "title":"Mid Week <span> special</span>",
              "title2":"",
              "description":"The journey of a lifetime begins here.",
              "buttonTxt":"VIEW OFFER",
              "urlBtn":"/en/offers/mid-week-special",
              "textAlt":"Dream Weddings"
            },*/
          ]
        }

      };
  }
   componentDidMount() {
      const { match: { url } } = this.props;
      let urls = url.split("/")
      if (urls[1] == "es"){

        this.setState({
          msg : "Parece que la página que buscas fue a dar un largo y<br /> romántico paseo por la playa",
          btn : "SIGUE PLANIFICANDO AQUÍ",
          link : "/es/da-el-siguiente-paso",
          msg404: "Página no encontrada",
          nowthedream:{
            "title":"A nuestros huéspedes les encantaron estas ofertas:",
            "title2":"",
            slide:[
              {
                "ImageDesk":"https://e-commercepr.s3.amazonaws.com/assets/images/Carruseles/Offers/preview-paradise-slide.jpg",
                "ImageMov":"https://e-commercepr.s3.amazonaws.com/assets/images/Carruseles/Offers/preview-paradise-slide.jpg",
                "title":"Mirada <span>al Paraíso</span>",//"Preview <span> paradise </span>",
                "title2":"",
                "description":"Experimentar de primera mano antes de reservar vale oro.",
                "buttonTxt":"Ver Oferta",//"START QUIZ",
                "urlBtn":"/es/ofertas/conoce-el-paraiso",
                "textAlt":"Dream Weddings"
              },
              {
                "ImageDesk":"https://e-commercepr.s3.amazonaws.com/assets/images/Carruseles/Offers/wedding-day-extras-slide.jpg",
                "ImageMov":"https://e-commercepr.s3.amazonaws.com/assets/images/Carruseles/Offers/wedding-day-extras-slide.jpg",
                "title":"Tu boda <span>en cortesía</span>",//"Wedding Day <span> Extras </span>",
                "title2":"",
                "description":"Reciba $ 20 USD por habitación, por noche en créditos de boda",//:"We vow to even make your wedding extras special! ",
                "buttonTxt":"Ver Oferta",//"Learn more",
                "urlBtn":"/es/ofertas/tu-boda-en-cortesia",
                "textAlt":"carrose"
              },
              {
                "ImageDesk":"https://e-commercepr.s3.amazonaws.com/assets/images/Carruseles/Offers/small-groups-slide.jpg",
                "ImageMov":"https://e-commercepr.s3.amazonaws.com/assets/images/Carruseles/Offers/small-groups-slide.jpg",
                "title":"Beneficios <span>Grupos Pequeños</span>",//"Small <span> groups </span>",
                "title2":"",
                "description":"Celebra en grande sin importe el número de invitados.",//"The perfect day in the perfect destination, and the moment you have always dreamed of.",
                "buttonTxt":"Ver Oferta",//"View more",
                "urlBtn":"/es/ofertas/beneficios-grupos-pequeños",
                "textAlt":"Dream Weddings"
              },/*
              {
                "ImageDesk":"https://e-commercepr.s3.amazonaws.com/assets/images/offersinterna/Desktop/mid-week-special.jpg",
                "ImageMov":"https://e-commercepr.s3.amazonaws.com/assets/images/offersinterna/Desktop/mid-week-special.jpg",
                "title":"Especial <span>de entresemana</span>",//"Mid Week <span> special</span>",
                "title2":"",
                "description":"Habitaciones gratis para bodas entre semana.",//"The journey of a lifetime begins here.",
                "buttonTxt":"Ver Oferta",//"START QUIZ",
                "urlBtn":"/es/ofertas/especial-de-entresemana",
                "textAlt":"Dream Weddings"
              },*/
            ]
          }
        })
      }

      // localStorage.removeItem('langWeddings')

   }

   render() {
      let { sliderContactUs } = this.state;
      return (
         <Layout title={"404 - Weddings Palace Resorts "}>
             <div page="error404" className="page404">

               <Sliderprincipal slides={this.state.slider404} />
               <section className="title404">
                 <Titlesection title={this.state.msg404} color="pink"/>
                  <section className="section404">
                    <span>404</span>
                  </section>
              </section>

               <Titlesection description={this.state.msg} color="pink"/>
               <section className="section404">
                  <Input type={"button"} value={this.state.btn} to={this.state.link} name="link" id="link" />
                  <br />
                  <br />
                </section>
               <Nowdream data={this.state.nowthedream}/>
               <Sweptaway data={this.state.nowthedream}/>




             </div>
         </Layout>
      );

   }
}

export default withRouter(Error404);


