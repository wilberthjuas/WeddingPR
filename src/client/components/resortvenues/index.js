import React, { Component } from 'react';
import { Iconwedd } from '../wirefragment';
import { Sliders } from '..';

class ResortVenues extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this)
        this.state = {
            qtyItems: window.innerWidth < 1025 ? 1 : 0,
            collapse: 1
        };
    }
    handleClick = () => {
        this.setState({
            collapse: this.state.collapse == 1 ? 2 : 1
        })
    }

    venues(element) {
        let contentvenues = []
        let index = 0
        element.forEach(element => {
            contentvenues.push(<section className="gazebositem" key={index} >
                <article className="sliderimage">
                    <img className="" src={element.imageDesk}></img>
                    <h2 className="banner">{element.title}</h2>
                </article>
                <article className="sliderinfo">
                    <div className="content">
                        {element.textoNormal.map((item, index) => {
                            return (<p className="paragraph" key={index}><Iconwedd icon="group-size" color="dark-melon"></Iconwedd>&nbsp;<span></span>{item}</p>)
                        })}
                    </div>
                </article>
            </section>)
            index++
        });
    return <Sliders nameSlide="venues-slider" >{contentvenues}</Sliders>;
    }
    render() {
        return (
            <section component="resortvenues" style={{ display: this.props.display }}>
                <p className="description">{this.props.venues.description}</p>
                <article className="sliderGazebos">
                    <div className="desktop"></div>
                        {this.venues(this.props.venues.venues)}
                </article>
                {this.props.venues.capcitychart ?
                    <article className="capacitychart">
                        <div className="bannerCapacity">
                            <button onClick={this.handleClick} className={this.state.collapse == 1 ? "btn-capacity" : "btn-capacity2"}>
                                {localStorage.langWeddings=="es"?"Capacidades":"Capacity Chart"  }
                                <Iconwedd icon={this.state.collapse == 1 ? "chevron-down" : "chevron-up"} color={this.state.collapse == 1 ? "white" : "pink"}></Iconwedd>
                            </button>
                        </div>
                        <table cellSpacing="0" style={{ display: this.state.collapse == 1 ? "none" : "" }}>
                            <thead>
                                <tr className="strong">
                                    <th>{localStorage.langWeddings=="es"?"Ubicación":"Space"  }</th>
                                    <th>{localStorage.langWeddings=="es"?"Área (m2)":"Area (Sq. ft)"  }</th>
                                    <th>{localStorage.langWeddings=="es"?"No. de Personas":"No. of people*"  }</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.props.venues.capcitychart.map((element, index) => {
                                    return <tr key={index} className={index % 2 ? "strong" : "ligth"}>
                                        <td>{element.space}</td>
                                        <td>{element.area}</td>
                                        <td>{element.nopeople}</td>
                                    </tr>
                                })}
                                <tr>
                                    <td className="advice">{localStorage.langWeddings=="es"?"* La capacidad máxima depende del tipo de montaje":"* Maximum capacity depends on room setup"}</td>
                                </tr>
                            </tbody>
                        </table>
                    </article> : ""
                }
            </section>
        );
    }
}

export default ResortVenues;