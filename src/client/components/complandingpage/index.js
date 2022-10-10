import React, {Component} from 'react';
import {Cintilla, CompLandingItems } from '../../components';
import { Titlesection} from '../../components/wirefragment';
import { Sliders } from '../../components';


class Complandingpage extends Component{
    constructor(props){
        super(props);

        


    }

    

	render() { 

       return(
                <section component="complandingpage">
                   
					<section className="container">
                        <section className="buttons">
                            <button className="button-white">PACKAGE DETAILS</button>
                            <button className="button-pink">START PROPOSAL</button>
                        </section>

                        <Titlesection title={this.props.heading[0].title} subtitle={this.props.heading[0].title2} description={this.props.heading[0].description} />
                        <Cintilla txt1={"Exclusive"} txt2={"For the bride"} />

                        <section className="slider-landing">
                            <Sliders nameSlide={"landing-offers"} viewItems={1}>
                              <div>
                            <CompLandingItems   />
                            </div>  
                            <div>
                            <CompLandingItems   />
                            </div>
                            </Sliders> 
                    </section>


                        
                        
                    </section>
                </section>
            )
        }
    }

export default Complandingpage;
