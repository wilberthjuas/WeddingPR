import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Layout from '../../components/layout';
import { Grid, Cell, Planingslider, Sliderprincipal } from '../../components';
// JSON Data
import data from '../home/data';
import dataES from '../home/data_ES';

class thankyou extends Component {
    state = {
        lang: "en",
        letplanwedd: data.letplanwedd,
    };
    constructor(props) {
        super(props);
    }
    componentDidMount() {

        const { match: { params } } = this.props;
        if (params.lang === "es") {
            this.setState({
                lang: "es",
                letplanwedd: dataES.letplanweddES,
            });
        } else {
            this.setState({
                letplanwedd: data.letplanwedd,
            });
        }

    }

    render() {
        localStorage.succesquiz = true
        setTimeout(() => { localStorage.removeItem("succesquiz") }, 10000)
        let urlHome=(<><br/><div component="inputwedd"><a  style={window.innerWidth>1024?{margin: "auto"}:{position: "relative"}} class="btn pink gallery-real" href={"/"+localStorage.langWeddings}>
            {localStorage.langWeddings=="es"?"SIGUE PLANIFICANDO":"KEEP PLANNING"}            
            </a></div><br className="movil"/></>)
        return (
            <Layout title={"Thank You"}>
                <section page="home">
                    <Sliderprincipal class="filterImg" typeCaptionBg={"type1"} slides={[
                        {
                            imageDesk: "https://e-commercepr.s3.amazonaws.com/assets/images/planning/stepbystep/desktop/wedding-planning.jpg",
                            imageMov: "https://e-commercepr.s3.amazonaws.com/assets/images/planning/stepbystep/mobile/wedding-planning.jpg",
                            textAlt: "Thank you",
                        },
                    ]} />
                    <br className="desktop" />
                    <br className="desktop" />
                    <br className="desktop" />
                    <br className="desktop" />
                    <Planingslider items={this.state.letplanwedd} lazy={true} header urlHome={urlHome}/>
                </section>
            </Layout>
        );

    }
}

export default withRouter(thankyou);


