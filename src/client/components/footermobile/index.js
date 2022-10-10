import React,{Component} from 'react';
import { FormNewsletter , FloatingMenu  } from '../../components';
import CommonLinksMobile from '../commonlinksmobile';


class Footermobile extends Component {

    render(){
        return(
            <footer component="Footermobile">
                {this.props.landing?null:<FormNewsletter type={1}/>}
                <CommonLinksMobile/>
                <div className="box2"></div>
                <FloatingMenu />
            </footer>
        )
    }

}

export default Footermobile;