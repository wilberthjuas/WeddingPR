import React, { Component } from 'react';
import { Iconwedd } from '../wirefragment';


class ModalVideo extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }

    componentDidMount(){
        window.addEventListener("scroll", this.disableScroll);

        this.setState({
            scrollX:window.scrollX,
            scrollY:window.scrollY,
        })
    }

    disableScroll = () => {
        window.scrollTo(this.state.scrollX,this.state.scrollY);
     }
 
     componentWillUnmount(){
         window.removeEventListener("scroll",this.disableScroll);
     }
    render() {
        return (
            <div component="modalvideo">
                <div className="container closecontainer">
                    <span className="btn" onClick={this.props.close}><Iconwedd icon="close-menu" color="pink position">></Iconwedd></span>
                </div>
                {this.props.children}
            </div>
        );
    }
}

export default ModalVideo;