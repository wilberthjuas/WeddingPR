import React, { Component } from 'react';
import { Titlesection } from '../../../components/wirefragment';
import WithContext from '../../../app/Context';
import { withRouter } from "react-router-dom"

class Step41 extends Component {

    constructor(props) {
        super(props);
        this.state = {
            msg_txt : "You're almost there.<span> It's time to start planning an unforgettable event!</span>",
        }
    }   

    componentDidMount() {

        const { setData, getData } = this.props.app.currentPage;
        setData('mounted', true);
        
        if (getData('mounted') === true) {
			setTimeout(() => {				
				const currentStep = getData('currentStep') + 1;
				setData('currentStep', currentStep);
				setData('mounted', false);
			}, 3000);
        }
        
        const { match: { params } } = this.props;
        switch (params.lang) {
            case "es":
                this.setState ({
                    msg_txt : "¡El último paso <span> en la planificación de un evento inolvidable! </span>",
                })
            break;
        }
    }


    render(){        

        return(
            <article className="item-loader-container animated slideInRightFade">
                <div className="content-text-padding-10-10">
                    <Titlesection icon="palace-crown" color="pink" title={this.state.msg_txt}  />
                </div>
            </article>
        );
    }

   

};

export default withRouter(WithContext(Step41));