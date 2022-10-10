import React, {Component} from 'react';
import { Iconwedd } from '../../components/wirefragment';
import { Cell } from '../grid';
import { Grid } from '../../components';
class CheckL extends Component{
	state={}

    constructor(props){
        super();
      	this.state = {
      		list: props.list
      	}
      	this.showList = this.showList.bind(this);
      	this.hidelist = this.hidelist.bind(this);

    }

    showList(orden){
    	let newList = this.state.list
    	newList[orden].isOpen = 1;
    	this.setState({
    		list:newList
    	}) 
    }

    hidelist(orden){
    	let newList = this.state.list
    	newList[orden].isOpen = 0;
    	this.setState({
    		list:newList
    	}) 
    }
    

   render(){ return(
    <section component="checkl">
        <article className="movil">
           {this.state.list.map((element,index) => {
           	return(
           			<section key={index} component="titlesection">
           				{/*element.imagenMobile!=""?
           					<img alt={element.title} src={element.imagenMobile} />:""*/
           				}
         					{element.isOpen?
                  <article  className="openList">
       							<h2 className="subtitle subtitleS" onClick={this.hidelist.bind(element,index)}>
       								{element.orden}. {element.title}&nbsp;
       								<Iconwedd  icon={"chevron-up"} color={"pink"} />
       							</h2>
     							  <div className="listContainer">
    								  <ul>
      								{element.list.map((element,index) => {
      									return (
      										<li key={index}><p className="paragraph">{element.text}</p></li>
      									)
      								})}
      								</ul>
                    </div>
                  </article>:
       						<article  className="openList">
           							<h2 className="subtitle subtitleS" onClick={this.showList.bind(element,index)}>
           							{element.orden}. {element.title}
           							&nbsp;<Iconwedd  icon={"chevron-down"} color={"pink"} />
           						</h2>
       						</article>
         					}
           			</section>
           		)
           })}
        </article>
        <article className="container">
        <Grid type="x">
          <Cell large="6" small="6"> 
            <article className="desktop">
          {this.state.list.map((element,index) => {
            return(
            <section key={index}>
              {element.orden<5?
                <article>
                  {/*element.imagenMobile!=""?
                    <img alt={element.title} src={element.imagenMobile} />:""*/
                  }
                  {element.isOpen?
                  <article  className="openList">
                    <h2 className="subtitle subtitleS" onClick={this.hidelist.bind(element,index)}>
                      {element.orden}. {element.title}&nbsp;
                      <Iconwedd  icon={"chevron-up"} color={"pink"} />
                    </h2>
                    <div className="listContainer">
                      <ul>
                      {element.list.map((element,index) => {
                        return (
                          <li key={index}><p className="paragraph">{element.text}</p></li>
                        )
                      })}
                      </ul>
                    </div>
                  </article>:
                  <article  className="openList">
                      <h2 className="subtitle subtitleS" onClick={this.showList.bind(element,index)}>
                        {element.orden}. {element.title}&nbsp;
                        <Iconwedd  icon={"chevron-down"} color={"pink"} />
                      </h2>
                  </article>
                  }
                  </article>:""

              }
              </section>)
          })}
            </article>
          </Cell>
          <Cell large="6" small="6" className="leftColumn">
            <article className="desktop">
          {this.state.list.map((element,index) => {
            return(
            <section key={index}>
              {element.orden>4?
                <article>
                  {/*element.imagenMobile!=""?
                    <img alt={element.title} src={element.imagenMobile} />:""*/
                  }
                  {element.isOpen?
                  <article  className="openList">
                    <h2 className="subtitle subtitleS" onClick={this.hidelist.bind(element,index)}>
                      {element.orden}. {element.title}  &nbsp;
                      <Iconwedd  icon={"chevron-up"} color={"pink"} />
                    </h2>
                    <div className="listContainer">
                      <ul>
                      {element.list.map((element,index) => {
                        return (
                          <li key={index}><p className="paragraph">{element.text}</p></li>
                        )
                      })}
                      </ul>
                    </div>
                  </article>:
                  <article  className="openList">
                      <h2 className="subtitle subtitleS" onClick={this.showList.bind(element,index)}>
                        {element.orden}. {element.title}&nbsp;
                        <Iconwedd  icon={"chevron-down"} color={"pink"} />
                      </h2>
                  </article>
                  }
                  </article>:""

              }
              </section>)
          })}
            </article>
          </Cell>
        </Grid>
        </article>
      </section>
    )

}};

export default CheckL;