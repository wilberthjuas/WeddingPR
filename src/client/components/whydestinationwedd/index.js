import React, { Component } from 'react';
import Whydestinationweddgalery from '../whydestinationweddgalery';
import { Link } from "react-router-dom";
import { Titlesection } from '../../components/wirefragment';
import { CallUs } from '../../components';
class Whydestinationwedd extends Component {

    render() {

        const phons = this.props.state.footerwhydetwedd.phons.map((element, index) => {
            return (<div key={index}><b>{element.paisestado}</b> <Link to={"tel:" + element.numero}>{element.numero}</Link></div>)
        });

        return (
            <section component="whydestiwedd">
                <div className="">
                    <div className="titleWemake" >
                        <Titlesection title={this.props.state.title} description={this.props.state.description} header
                            urlBtnBack={[this.props.state.urlBtn, this.props.state.buttonTxt]}
                        ></Titlesection>
                    </div>
                    <div className="separadorwemake-ttl-cont"></div>
                    <div className="container">
                        <div className="content-galery flex">
                            <Whydestinationweddgalery galery={this.props.state.galery} />
                        </div>
                    </div>
                    <div>
                        <CallUs textTooltip={this.props.state.footerwhydetwedd.textCall} head={this.props.state.footerwhydetwedd.headFooter} phons={this.props.state.footerwhydetwedd.phons} />
                    </div>
                </div>
                <div className="divicion-section"></div>
            </section>
        )
    }
}
export default Whydestinationwedd;