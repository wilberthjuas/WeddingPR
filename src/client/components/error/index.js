import React, { Component } from "react";
import { Titlesection } from "../wirefragment";


export default class ErrorCatching extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            errorInfo: null,
        };
    }


    componentDidCatch(error, errorInfo) {
        this.setState({
            error: error,
            errorInfo: errorInfo,
        });
    }


    render() {
        const { errorInfo, error } = this.state;
        const { message } = this.props;
        if (errorInfo) {
            return (
                <div>
                    
                    <Titlesection icon="palace-crown" color="pink" title = { message } />
                    <details style={{ whiteSpace: "pre-wrap" }} className="error">
                        {error && error.toString()}
                        <br />
                        {errorInfo.componentStack}
                    </details>
                </div>
            );
        }


        return this.props.children;
    }
}


ErrorCatching.defaultProps = {
    message: "You have an error in your component :(",
};

