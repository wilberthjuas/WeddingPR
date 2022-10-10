import React, { Component } from "react";
import WithContext from "../../../app/Context";
import { Titlesection } from '../../../components/wirefragment';
import { withRouter } from "react-router-dom"

class StepThreeOne extends Component {     

    state = {
        couple: "",
        msg_txt: "Congratulations <br /> on your engagement!",
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
        const { setData, getData } = this.props.app.currentPage;
        const { match: { params } } = this.props;
        switch (params.lang) {
            case "es":
                this.setState ({
                    couple: "",
                    msg_txt: "¡FELICITACIONES <br /> POR SU COMPROMISO!",
                });
            break;
        }

        let couple = getData("brideFirstName")+" & "+getData("groomeFirstName");
        this.setState({
            couple : couple
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
                    <Titlesection icon="palace-crown"  color="pink" title={this.state.couple}/>

                </div>
                <div className="content-text-padding-10-10">
                    <Titlesection color="pink" title={this.state.msg_txt}/>
                </div>
            </article>
        );
    }
}


export default withRouter(WithContext(StepThreeOne));