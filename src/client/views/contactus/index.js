import React, { Component } from 'react';
import Layout from '../../components/layout';
import { Contactus, Sliderprincipal } from '../../components';

// JSON Data
import data from './data';
import dataES from './data_es';


class ContactUs extends Component {
   state = {
      lang: "en",
      sliderContactUs: [],
      selectcountry: [],
      countryresidence: [],
      otherguest: [],
      hotelsinteres: [],
      formsContent: []
   };

   componentDidMount() {
      // Get the :lang param
      const { match: { params } } = this.props;
      switch (params.lang) {
         case "es":
            this.setState({
               lang: "es",
               sliderContactUs: dataES.sliderContactUs,
               selectcountry: dataES.selectcountry,
               countryresidence: dataES.countryresidence,
               otherguest: dataES.otherguest,
               hotelsinteres: dataES.hotelsinteres,
               formsContent: dataES.formsContent
            });
            break;
         default:
            this.setState({
               sliderContactUs: data.sliderContactUs,
               selectcountry: data.selectcountry,
               countryresidence: data.countryresidence,
               otherguest: data.otherguest,
               hotelsinteres: data.hotelsinteres,
               formsContent: data.formsContent
            });
            break;
      }
   }
   render() {

      let { lang, sliderContactUs } = this.state;

      return (
         <Layout title={lang === "en" ? "Contact Us" : "Contacto" }>
            {sliderContactUs.length > 0 &&
               <section page="contactus">
                  <Sliderprincipal slides={sliderContactUs} />
                  <Contactus
                     selectcountry={this.state.selectcountry}
                     countryresidence={this.state.countryresidence}
                     otherguest={this.state.otherguest}
                     hotelsinteres={this.state.hotelsinteres}
                     formsContent={this.state.formsContent}
                  />
               </section>
            }
         </Layout>
      );

   }
}

export default ContactUs;