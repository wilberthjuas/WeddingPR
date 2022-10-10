import React, {Component} from 'react';
import {Grid,Cell} from '../../components';
import Sliders from '../sliders';
import { Input } from '../../components/wirefragment';
import {Tab} from '../../components';

class Tabs extends Component {

    render(){
        let tabs = this.props.tabs.map((tabs, e)  => {
           return <Tab key={e} tabs={tabs}/>
        })

       return  <div component="tabs" style={{paddingBottom: "unset",marginBottom: "unset"}}>
            {tabs}
        </div>
    }

}

class TabsDesk extends Component {

    constructor(){
        super();
        this.state={
            refs:[],
            tab:0,
            styles:{
            backgroundColor: "var(--light-melon)",
            color: "var(--white)",
            },
            tabheigth:"60px",
            chevron:"bg-mini-chevron-down-pink"
        }
        this.hidetabs = this.hidetabs.bind(this);
        this.handleCollapse = this.handleCollapse.bind(this);
    }

    hidetabs = (tabRecive,e) => {
        e.preventDefault();
        this.setState({
            tab:tabRecive,
            tabheigth:"60px"
        });
        if(tabRecive==0){
            this.state.refs[tabRecive+1].current.style.display = "none"
            this.state.refs[tabRecive].current.style.display = "block"
            this.setState({
                chevron:this.state.chevron=="bg-mini-chevron-up-pink"?"bg-mini-chevron-down-pink": "bg-mini-chevron-down-pink"
            })
        }else if (tabRecive==1){
            this.state.refs[tabRecive-1].current.style.display = "none"
            this.state.refs[tabRecive].current.style.display = "block"
            this.setState({
                chevron:this.state.chevron=="bg-mini-chevron-up-pink"?"bg-mini-chevron-down-pink": "bg-mini-chevron-down-pink"
            })
        }

    }

    handleCollapse = (tab,e) => {
        let lang = localStorage.getItem('langWeddings');
        let altura = "550px";
        if(lang === "es"){
            altura = "300px";
        }
        this.setState({
            tabheigth: this.state.tabheigth==="60px"?altura:"60px",
            chevron:this.state.chevron=="bg-mini-chevron-down-pink"?"bg-mini-chevron-up-pink": "bg-mini-chevron-down-pink"
        })
    }



    componentDidMount(){
        for (let index = 0; index < this.props.tabs.length; index++) {
            let ref = this.index = React.createRef()
          this.setState(state => {
                const refs = state.refs.push(ref);
                return refs;
          })
        }
    }

    render(){
        let acumulador = [];
        let titles = this.props.tabs?this.props.tabs.map((tabs, e)  => {
            return <li key={e}className="tabtitle" style={this.state.tab==e?{}:this.state.styles}>
                <a className="" style={this.state.tab==e?{}:this.state.styles} onClick={this.hidetabs.bind(this,e)}>{tabs.Title}</a>
                <div className="blankspace" style={{display:this.state.tab==e?"block":"none"}}></div>
            </li>
        }):null;
        let content = this.props.tabs?this.props.tabs.map( (tabs,index) => {
            return(<Grid key={index} type="y" >
            <div ref={this.state.refs[index]}  style={{border:" solid 1px var(--pale-pink)",display:this.state.tab==index?"block":"none",marginTop:"-15px"}} >
            <Cell style={{paddingTop:"42px",paddingLeft:"21px"}}>
            <Grid type="x" small-up="2" key={index} className="content">
            <Cell>
                <img src={tabs.ImgMobile}></img>
            </Cell>
            <Cell>
                {tabs.Benefits.map((Benefits,index)=>{
                    return  (<Cell  key={index} className="content-tabs">
                    <h2 className="title">{Benefits.Title}</h2>
                    <p className="paragraph">{Benefits.Content}</p>
                </Cell>)
                })}
            </Cell>
        </Grid>
        </Cell>
            <Cell>{tabs.Events.length==0?"":<h2 className="title" style={{textAlign:"center"}}>{tabs.EventsTitle}</h2>}</Cell>
        <Cell style={{paddingLeft:"47px"}}>
            <Grid type="x" large-up="2">

                    {tabs.Events.map((event,index) => {
                    if (acumulador.length==3){
                        acumulador = [];
                    }

                    acumulador.push(<div key={index} >
                                        <p className="paragraph">
                                            {event.eventTitle}<br/>
                                            {event.eventContent}
                                        </p>
                                    </div>);

                    if (acumulador.length==3){
                        return <Cell key={index}>{acumulador}</Cell>
                    }
                })}
            </Grid>
        </Cell>
        <Cell>
           { tabs.extras.length==0?"":<h2 className="title" style={{textAlign:"center"}}>{tabs.extrasTitle}</h2>}
        </Cell>
        <Cell>
        <Grid type="x" large-up="3">
            {tabs.extras.map((extra,index) => {
                return <Cell key={index}>   <p className="description" style={{textAlign:"center"}}>{extra.extra}</p></Cell>
            })}
        </Grid>
        </Cell>
        <Cell className="questions">
               { tabs.question==""?"":<div style={{textAlign:"center"}}>
                    <p className="description" style={{display:"inline-block"}}>{tabs.question}&nbsp;&nbsp;&nbsp;</p>
                    <Input  type={"button"} typBtn={4} value={tabs.btnCaption} color={"pink"} to={tabs.btnUrl}/>
                </div>}
        </Cell>
        <Cell className="terms" style={{height:this.state.tabheigth,display:tabs.termsTitle==null?"none":""}}>
            <p >
                <span onClick={this.handleCollapse.bind(this,index)} className="termstext">{tabs.termsTitle}</span>&nbsp;<span className={"wedding-sprite-desktop "+this.state.chevron} ></span>
            </p>
            { typeof tabs.terms !== "undefined" &&
                tabs.terms.map((term, i) => {
                    return <p style={{padding:"5px",textAlign:"justify"}}> {term} </p>
                    })

            }
        </Cell>
        </div>
        </Grid>
        )
        }):null

        return (
            <section className="container" component="tabs" style={{paddingBottom: "unset"}}>
            <div className="tabsDesk">
                <ul className="tabtitles">{titles}</ul>
                <div>
                {content}
                </div>
                </div>
            </section>)
    }
}

export { Tabs, TabsDesk };
