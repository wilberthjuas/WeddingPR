import React, {Component} from 'react';
import Wemakeuniquegalery from '../wemakeuniquegalery';
import { Titlesection } from '../../components/wirefragment';

class Wemakeunique extends Component{
    constructor(){
        super();
    }


    render() {


        const head = this.props.state.map((element,index) => {
            return (
                <Titlesection title={element.title} key={index} description={element.description} typeElement={""} icon={""}></Titlesection>
            )
        });

        return(
            <section component="wemakeunique">
                <div className="wemakwuniqueContent">
                    {head}
                    <div className="separadorwemake-ttl-cont"></div>
                    <div className="container">
                        <div className="content-galery flex">
                            <Wemakeuniquegalery galery={this.props.state[0].galery} />
                        </div>
                    </div>
                </div>
                <div className="divicion-section"></div>
            </section>
        )
    }
}
export default Wemakeunique;