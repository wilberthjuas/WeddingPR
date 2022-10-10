/**
* @name: conctactus.js
* @description: Página de /contact-us
* @author: Diego, Julian, Bruno, Wilberth , Sergio Trejo
* @version: 1.1.0*/

import React, { Component } from 'react';
import Layout from '../../components/layout';
import { Sliderprincipal } from '../../components';

// JSON Data
import data from './data';
import dataES from './data_es';
import ContactUsLanding from '../../components/contactUsLanding';
import Wemakeuniquegalery from '../../components/wemakeuniquegalery';

class Contactusland extends Component {

   constructor(props) {
      super(props);
      this.state = {
         sliderContactUs: [],
         selectcountry: null,
         content:[]
      };
  }
   componentDidMount() {
      // Get the :lang param
      const { match: { params } } = this.props;
      switch (params.lang) {
         case "es":
            this.setState({
               lang: "es",
               sliderContactUs: dataES.sliderContactUs,
               content: dataES.data,
            });
            break;
         default:
            this.setState({
               sliderContactUs: data.sliderContactUs,
               content: data.data,
            });
            break;
      }
   }
   render() {
      let { sliderContactUs } = this.state;
      return (
         <Layout title={localStorage.langWeddings === "en" ? "Contact Us" : "Contactar" } cID={"weddi00w"}
         description={"There are a number of ways to contact Palace Resorts Weddings. Review the options here to get started. "} >
            {sliderContactUs.length > 0 &&
               <section page="contactus_landing">
                  <Sliderprincipal slides={sliderContactUs} />
                  {/*<ContactUsLanding data={this.state.content}/>*/}
                  <section component="wemakeunique">
							<div className="wemakwuniqueContent">
								<div className="separadorwemake-ttl-cont"></div>
								<div className="container">
									<div className="content-galery flex">
										<ContactUsLanding galery={this.state.content} take={true} btn={false}/>
									</div>
								</div>
							</div>
							<div className="divicion-section"></div>
						</section>
               </section>
            }
         </Layout>
      );

   }
}

export default Contactusland;