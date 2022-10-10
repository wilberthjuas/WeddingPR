import React, { Component } from 'react';
import { Titlesection } from '../../../components/wirefragment';
import WithContext from '../../../app/Context';

class Step11 extends Component {

    render(){

        let { title, subtitle } = this.props;

        return(
            <article className="item-loader-container animated slideInRightFade">
                <div className="content-text-padding-10-10">
                    <Titlesection icon="palace-crown" color="pink" title = { title+" <span>"+ subtitle + "</span>" } />
                </div>
            </article>
        );
    }

    componentDidMount() {

        const { getData, setData } = this.props.app.currentPage;
        setData('currentStep', 0);
        setData('mounted', true);

    }

};

export default WithContext(Step11);