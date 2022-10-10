import React, {Component} from 'react';
import { Iconwedd } from '../../components/wirefragment';

class CompLandingItems extends Component{

    constructor(props){
        super(props);

        this.arrowTerms = this.arrowTerms.bind(this);
        this.arrowShare = this.arrowShare.bind(this);

        this.state={
            activeTab: [
                "active","",""
                ],
            activeCont : [
                "active","deactivate","deactivate"
                ],
            ulCollapse: [
                "uncollapse","uncollapse","uncollapse",
            ],
            ulCollapseArrow: [
                "chevron-down","chevron-down","chevron-down",
            ],
            arrowShare: "chevron-down",
            arrowTerms: "chevron-down",
            displayTerms: "collapse",
            displayShare:"collapse",
            displayButtons: "none",
        }
    }

    arrowTerms (){
        this.setState ({ 
            arrowTerms: this.state.arrowTerms == "chevron-down" ? "chevron-up" : "chevron-down",
            displayTerms: this.state.displayTerms=="collapse"?"uncollapse":"collapse",
            displayShare: "collapse",
            displayButtons: this.state.displayButtons=="none"?"":"none",
            arrowShare:"chevron-down",
            
        })
    }

    arrowShare (){
        this.setState ({
            arrowTerms:"chevron-down",
            displayTerms: "collapse",
            displayShare: this.state.displayShare=="collapse"?"uncollapse":"collapse",
            
            displayButtons:"none",
            arrowShare: this.state.arrowShare == "chevron-down" ? "chevron-up" : "chevron-down",
            
        })
    }

    handleScroll = (scroll,e,click) => {
        this.divElement.scrollBy({
            top: scroll,
            left: 0,
            behaviour: 'smooth'
         });
    }
        
    
    render() {

        return(
            <section component="complandingintems"> 
                <div>
                
                    <section className="landing-item">
                        <img src="https://e-commercepr.s3.amazonaws.com/Produccion/landing/pruebas/movil/exclusive-for-the-bride.jpg"></img>
                        <section className="landing-info">
                            
                            <ul className="landing-list">
                                <li>l1</li>
                                <li>l2</li>
                                <li>l3</li>
                            </ul>
                            
                            <section className="content-controller">
                                <section className="terms-txt">
                                    <span className="txts" onClick={this.arrowTerms}>Terms & Conditions</span>
                                        <Iconwedd icon={this.state.arrowTerms} color={"pink chevorn-gral"}/>
                                </section>
                                <section className="share-txt">
                                    <span className="txts" onClick={this.arrowShare}>Share Offer</span>
                                        <Iconwedd icon={this.state.arrowShare} color={"pink chevorn-gral"}/>
                                </section>
                            </section> {/* END content-controller */}
                           
                            <section className={"terms-content "+this.state.displayTerms}  >
                                <section className="fade" ref={div => this.divElement = div}>
                                    <ul className="">
                                        <li>l1</li>
                                        <li>l2</li>
                                        <li>l1</li>
                                        <li>l2</li>
                                        <li>l1</li>
                                        <li>l2</li>
                                        <li>l1</li>
                                        <li>l2</li>
                                        <li>l1</li>
                                        <li>l2</li>
                                        <li>l1</li>
                                        <li>l2</li>
                                        <li>l1</li>
                                        <li>l2</li>
                                     </ul>
                                </section>
                                <section className="tabstermsbuttons">
                                    <a onClick={this.handleScroll.bind(this,-100)}> <Iconwedd icon={"scroll-up"} color={"pink"}/></a>
                                    <a onClick={this.handleScroll.bind(this,100)}> <Iconwedd icon={"scroll-down"} color={"pink"}/></a>
                                </section>
                                </section> {/* END terms-content */}
                        
                            <section className={"share-content "+this.state.displayShare}>
                                share form
                            </section> {/* END share-content */}

                        </section> {/* END landing-info */}
                    </section> {/* END landing-item */}
                
                </div>
            </section>
        )
    }
}

export default CompLandingItems;