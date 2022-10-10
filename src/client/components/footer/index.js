import React,{Component} from 'react';
import { FormNewsletter , CommonLinks,Awardsandlinks ,Privacylinks } from '../../components';
import { Iconwedd } from '../wirefragment';

class Footer extends Component {
    constructor(props) {
        super(props);

        this.handleChat = this.handleChat.bind(this)


    }

    handleChat() {
        acquireIO.max();
    }

    render(){
        return(
            <footer component="Footer" className="container">
                {this.props.landing?null:<FormNewsletter type={2}/>}
                <Awardsandlinks/>
                <CommonLinks/>
                <Privacylinks/>
                {/*<button className="btn-chat-floating" onClick = { this.handleChat.bind(this) }><img src="https://e-commercepr.s3.amazonaws.com/assets/images/home/Desktop/wedding-chat.png" /></button>*/}
            </footer>
        )
    }

}

export default Footer;
