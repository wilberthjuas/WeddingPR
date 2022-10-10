import React, {Component} from 'react';
import {Grid,Cell} from '../../components';
import Sliders from '../sliders';
import { Input, Iconwedd } from '../../components/wirefragment';

class Tab extends Component {

    constructor(){
        super();
        this.handleCollapse = this.handleCollapse.bind(this);
        this.handleTerms = this.handleTerms.bind(this);

        this.state={
            collapseTab: (115/16)+"rem",
            titleCollapse:{},
            marginimg:"-"+(34/16)+"rem",
            chevronTab:"chevron-down",
            chevronTabColor:"white",
            chevronTerms:"chevron-down",
            refs:[],
            tabToCollapse:0,
            fadedisplay:"none"
        }
    }


    handleCollapse(tab){

        this.setState({
            collapseTab: this.state.collapseTab==(115/16)+"rem"?"auto":(115/16)+"rem",
            titleCollapse: this.state.titleCollapse.backgroundColor=="rgba(255,255,255,0.8)"?{}:{backgroundColor:"rgba(255,255,255,0.8)",color: "var(--light-melon)",top: "72%"},
            chevronTab: this.state.chevronTab=="chevron-up"?"chevron-down":"chevron-up",
            chevronTabColor: this.state.chevronTabColor=="white"?"pink":"white",
            fadedisplay:this.state.fadedisplay=="block"?"none":"none",
            termsdisplay:this.state.fadedisplay=="block"?"none":"none",
            buttondisplay:this.state.fadedisplay=="grid"?"none":"none",
            chevronTerms:this.state.chevronTerms=="chevron-up"?"chevron-down":"chevron-down",
        });
    }

    handleTerms(tab){
        this.setState({
            chevronTerms:this.state.chevronTerms=="chevron-down"?"chevron-up":"chevron-down",
            fadedisplay:this.state.fadedisplay=="none"?"block":"none",
            termsdisplay:this.state.fadedisplay=="none"?"block":"none",
            buttondisplay:this.state.fadedisplay=="none"?"grid":"none",
        });
    }

    handleScroll = (scroll,e,click) => {
        this.state.refs[0].current.scrollBy({
            top: e,
            left: 0,
            behaviour: 'smooth'
         });
    }

    componentDidMount(){

        let ref = this.index = React.createRef()
          this.setState(state => {
                const refs = state.refs.push(ref);
                return refs;
          })

    }



    render(){
        let acumulador = [];

        let check = [];
        if(this.props.tabs.Benefits){
           this.props.tabs.Benefits.map((element,e)=>{
                if(acumulador.length==2){
                    acumulador=[]
                }
                acumulador.push(<div  key={e}><h2 className="title">{element.Title}</h2><p className="paragraph">{element.Content}</p></div>);
                if(acumulador.length==2||this.props.tabs.Benefits.length<2){
                    check.push (<div key={e}>{acumulador}</div>)
                }else{
                    check.push (<span></span>);
                }
            })
        }

        if(this.props.tabs.Events){
            this.props.tabs.Events.map((element, e)=>{
                if(acumulador.length==2){
                    acumulador=[]
                }

                acumulador.push(<div  key={e}><p className="titlebenefit">{element.eventTitle}</p><p className="titlebenefit2">{element.eventContent}</p></div>);
                if(acumulador.length==2||this.props.tabs.Events.length<2){
                    check.push( <div key={e}>{acumulador}</div>)
                }else{
                    check.push (<span></span>)
                }
            })
        }



            return(
                <div>
                {this.props.tabs.isTour?
                    <div  component="tabs"className="singletab" style={{height:this.state.collapseTab}}>
                        <div className="agrupados">
                            <img alt={this.props.tabs.Title} onClick={this.handleCollapse.bind(this)} src={this.props.tabs.ImgMobile} style={{top:this.state.marginimg,marginTop: "0vw",display:"block"}}></img>
                            <div className="tabtitle" style={this.state.titleCollapse} onClick={this.handleCollapse.bind(this)}>
                                <h2 className="imgcaptions tabtitletext">{this.props.tabs.Title}&nbsp;&nbsp;</h2> <Iconwedd icon={this.state.chevronTab} color={this.state.chevronTabColor}></Iconwedd>
                            </div>
                        </div>
                        <div className="tourTextCont">
                            <p className="paragraph">{this.props.tabs.description}</p>
                        </div>
                    </div>:
                    <div  component="tabs"className="singletab" style={{height:this.state.collapseTab}}>
                        <div className="agrupados">
                            <img alt={this.props.tabs.Title} onClick={this.handleCollapse.bind(this)} src={this.props.tabs.ImgMobile} style={{top:this.state.marginimg,marginTop: "0vw",display:"block"}}></img>
                            <div className="tabtitle" style={this.state.titleCollapse} onClick={this.handleCollapse.bind(this)}>
                                <h2 className="imgcaptions tabtitletext">{this.props.tabs.Title}&nbsp;&nbsp;</h2> <Iconwedd icon={this.state.chevronTab} color={this.state.chevronTabColor}></Iconwedd>
                            </div>
                        </div>
                            <Sliders nameSlide={"events2"} viewItems={1}>
                             {check}
                            </Sliders>
                            { this.props.tabs.question==""?"":
                                <div className="tabquestion">
                                    <p className="paragraph">{this.props.tabs.question}</p>
                                    <Input to={this.props.tabs.btnUrl} type={"button"} value={this.props.tabs.btnCaption} color={"pink"} />
                                </div>
                            }
                        <div className="tabsterms">
                        {this.props.tabs.termsTitle!=null?<p onClick={this.handleTerms} className="tabstermscollapsable">{this.props.tabs.termsTitle} <Iconwedd color="pink" icon={this.state.chevronTerms}></Iconwedd></p>:null}
                            <p ref={this.state.refs[0]}  className="tabstermscontent" style={{display:this.state.termsdisplay}}>

                            <div className="fade" style={{display:this.state.fadedisplay}}></div>
                                {this.props.tabs.terms}
                            </p>
                            <div className="tabstermsbuttons" style={{display:this.state.buttondisplay}}>
                                <a onClick={this.handleScroll.bind(this,0,-100)}> <Iconwedd icon={"scroll-up"} color={"pink"}/></a>
                                <a onClick={this.handleScroll.bind(this,0,100)}style={{top: (15/16)+"rem"}}> <Iconwedd icon={"scroll-down"} color={"pink"}/></a>
                            </div>
                        </div>
                    </div>
                }
                </div>)

    }
}

export default Tab;
