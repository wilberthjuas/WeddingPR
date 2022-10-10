import React, {Component} from 'react';
import { Iconwedd } from '../../components/wirefragment';
import ReactHtmlParser from 'react-html-parser';


class Compreligioustabs extends Component{

	 constructor(props){
        super(props);
        this.changeArrow = this.changeArrow.bind(this);

        this.wdList = props.lista2 ? "45%" : "100%";

        this.state = {
            flecha: "chevron-down",
            colapsar: "none",
            widthlist: props.lista2 ? "45%" : "100%",
            floatlist: props.lista2 ? "left" : ""
        }

    }

    changeArrow(){
        this.setState({
            flecha : this.state.flecha === "chevron-down"?"chevron-up":"chevron-down",
            colapsar: this.state.colapsar === "none"?"block":"none"
        });
    }

     render() {
     	return (
            <section className="Compreligioustabs"> 
            <article className="ReligiousTabs"  onClick={() => {this.changeArrow();this.props.onClick()}}>
                    <span className="collapselink">
                        {this.props.titulo} 
                    </span>&nbsp; 
                    <Iconwedd icon={this.state.flecha} color={"pink"}/>
                </article>
                <ul className={"listCollapse "+this.props.titulo} style={{display:this.state.colapsar, width:this.state.widthlist, float:this.state.floatlist }}>
                    {this.props.lista.map((data,key) => {
                        return (
                            <li className="description"  key={key}>{ReactHtmlParser(data)}</li> 
                            )   
                    })}
                </ul>

                {this.props.lista2 ?
                <ul className="listCollapse" style={{display:this.state.colapsar, width:this.state.widthlist, float:this.state.floatlist }}>
                    {this.props.lista2.map((data,key) => {
                        return (
                            <li className="description" key={key}>{ReactHtmlParser(data)}</li> 
                            )   
                    })}
                </ul>
                : <span></span> }
            </section> 

     		)


     }


}

export default Compreligioustabs;