import React, { Component } from "react";
// import Line_InputRange from "./line_inputrange";
import PropTypes from "prop-types";
// import './style.scss';

export default class TabContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //structure:[],
        };
        this.openCity = this.openCity.bind(this);
    }

    componentDidMount() {
        //console.log(this.props.structure);
    }
    
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.structure !== this.props.structure) {
            let items = this.props.structure;
            //console.log(items);
            
            this.setState({
                structure: items
            });
        }
    }

    openCity(evt, cityName) {
        // Declare all variables
        var i, tabcontent, tablinks;
        
        // Get all elements with class="tabcontent" and hide them
        tabcontent = document.getElementsByClassName("tabcontent");
        
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }
        //console.log(tabcontent);
        
        // Get all elements with class="tablinks" and remove the class "active"
        tablinks = document.getElementsByClassName("tablinks");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }
        
        // Show the current tab, and add an "active" class to the button that opened the tab
        document.getElementById(cityName).style.display = "block";
        evt.currentTarget.className += " active";
        /*
        */
    }

    render() {
        return (
            <div>
                <div component={"grid-x"} medium-up={this.props.extraclass} large-up={this.props.extraclass} className={" tab container "}>
                    {(this.props.structure).map((a,b)=>{
                        return(
                            <div key={'a'+b} component="cell" className={"back"}>
                                <button className={"tablinks"} onClick={(event) => this.openCity(event, a.title )}>{a.title}</button>
                                <div class="flechaDown_er"></div>
                            </div>
                        )
                    })}
                </div>
                {(this.props.structure).map((a,b)=>{
                    return(
                        <div key={'b'+b} id={a.title} className={"tabcontent"}>
                            {a.content}
                        </div>
                    )
                })}
            </div>
        );
    }
}
TabContent.defaultProps = {
    structure: null,
    extraclass: '3',
    //extraclass: 'medium-up-3 large-up-3',
};