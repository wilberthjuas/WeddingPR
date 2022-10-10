import React, { Component } from "react";
import WithContext from "../../../app/Context";
import { Titlesection } from '../../../components/wirefragment';
import { withRouter } from "react-router-dom"

class StepTwoOne extends Component { 

    state = {
        msg_txt : "Nice to meet you!",
        bride :  ""
    }
    
    static getDerivedStateFromProps(props, state) {
        let newProps = {};
        Object.keys(props).forEach(key => {
           if (props[key] != state[key]) {
              newProps[key] = props[key];
           }
        });
        return Object.keys(newProps).length > 0 ? newProps : null;
     }
    
     componentDidMount(){

        const { match: { params } } = this.props;
        switch (params.lang) {
            case "es":
                this.setState ({
                    msg_txt : "¡Mucho gusto!",
                    bride :  ""
                })
            break;
        }

        const { setData, getData } = this.props.app.currentPage;
        if (getData("youAre") == "The Beautiful Bride"){

            setData("brideFirstName", getData("contactName"));
            setData("brideLastName", getData("contactLastname"));

        } else if (getData("youAre") == "The Lucky Groom") {

            setData("groomeFirstName", getData("contactName"));
            setData("groomeLastName", getData("contactLastname"));

        }
        
        this.setState ({
            bride : getData("contactName")
        });
        
        setData('mounted', true);

        if (getData('mounted') === true) {
			setTimeout(() => {				
				const currentStep = getData('currentStep') + 1;
				setData('currentStep', currentStep);
				setData('mounted', false);
			}, 5000);
		}

    }

    render() {
        return (
            <article className="item-loader-container animated slideInRightFade">
                <div className="content-text-padding-10-10">
                    <div className={"Amazing-cursive-text-dark"}></div>
                    <Titlesection icon="palace-crown" color="pink" title={this.state.bride} />
                    </div>
                    <div className="content-text-padding-10-10">
                    <Titlesection color="pink" title={this.state.msg_txt} />
                </div>
            </article>
        );
    }
}


export default withRouter(WithContext(StepTwoOne));