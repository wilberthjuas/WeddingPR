/**
* @name: offers.js
* @description: Página de /offers
* @author: Diego, Julian, Bruno, Wilberth , Sergio Trejo
* @version: 1.1.0*/

import React, { Component } from 'react';
import Layout from '../../components/layout';
import { Sliderprincipal } from '../../components'
import offers from './data';
import { Titlesection } from '../../components/wirefragment';
import Wemakeuniquegalery from '../../components/wemakeuniquegalery';

class Offers extends Component {

	state = {
		lang: "en",
		slider:[]
	};

	componentDidMount(){
		const { match: { params } } = this.props;
        switch (params.lang) {
           case "es":
           	this.setState({
				lang: 			"es",
				slider:			offers.es.slider,
				Title:			offers.es.Title,
				Subtitle:		offers.es.Subtitle,
				Description:	offers.es.Description,
				offerslist:		offers.es.offerslist
			});
        	break;
           default:
           this.setState({
				slider:			offers.en.slider,
				Title:			offers.en.Title,
				Subtitle:		offers.en.Subtitle,
				Description:	offers.en.Description,
				offerslist:		offers.en.offerslist
			});
           break;
        }
	}

	render(){

		let { lang, slider } = this.state;
		
		return(
			<Layout title={ lang === "en" ? "Offers" : "Ofertas" } cID={"weddi00i"}
			description={"Explore the value of love with exclusive destination wedding and honeymoon offers. "}
			>
				{ slider.length > 0 &&
					<section page="Offers">
						<Sliderprincipal slides = { slider }/>
						<Titlesection header title={this.state.Title} subtitle={this.state.Subtitle} 
						description={this.state.Description} />
						<section component="wemakeunique">
							<div className="wemakwuniqueContent">
								<div className="separadorwemake-ttl-cont"></div>
								<div className="container">
									<div className="content-galery flex">
										<Wemakeuniquegalery galery={this.state.offerslist} take={true} btn={false}/>
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
export default Offers;