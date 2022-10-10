/**
* @name: personaliyourday.js
* @description: Página de /destinationweddings/personaliyourday
* @author: Diego, Julian, Bruno, Wilberth , Sergio Trejo
* @version: 1.1.0*/
// TODO: Traducir

import React, { Component } from 'react';
import Layout from '../../components/layout';
import { Sliderprincipal, Personalizeyoureedding } from '../../components';
import api from '../../app/index';
import { withRouter } from 'react-router-dom';
import WithContext from "../../app/Context";

// JSON Data
import json from '../../../../state';
import jsones from '../../../../state_es';
import { ServiceProvider } from '../../app/Context';

class Comppersonaliyourday extends Component {

    constructor() {
        super();
        this.getUnidadesNegocio = this.getUnidadesNegocio.bind(this)
        this.refTabsTwo = React.createRef()
        this.state = {
            sliderpersonalizeyourwedd: [],
            PersonalizeYourWedding: [],
            otherguest: [],
            unidades : [],
            servicios : [],
            tab_active : 0
        };
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

        const { getData, setData } = this.props.app.currentPage;

        /*if (localStorage.fromCollections){
            this.setState({
                tab_active : 1
            })
        } */

        const { match: { params } } = this.props;
        switch (params.lang) {
            case "es":
                this.setState({
                    sliderpersonalizeyourwedd:  json.sliderpersonalizeyourwedd,
                    PersonalizeYourWedding:     jsones.PersonalizeYourWedding,
                    otherguest:                 json.otherguest
                });
            break;
            default:
                this.setState({
                    sliderpersonalizeyourwedd:  json.sliderpersonalizeyourwedd,
                    PersonalizeYourWedding:     json.PersonalizeYourWedding,
                    otherguest:                 json.otherguest
                });
            break;
        }

        this.getUnidadesNegocio();
    }

   /* componentDidUpdate(){
       if (localStorage.fromCollections){
            //este cllick no funciona a full, revisar
            this.refTabsTwo.current.querySelectorAll(".head-tabs ")[0].children[1].click()
            localStorage.removeItem("fromCollections")
        }
    }*/

    getUnidadesNegocio() {
        api.getBusinessUnits()
        .then( res =>{
            let unidades_nosort = res.data.filter((e, i) => { return e.orden_comercial != "9" })
            this.setState({
                unidades: unidades_nosort.sort(this.compare)
            })
        }).catch( e => console.error(e));
    }

    compare(a, b) {
        const unidadA = a.orden_comercial;
        const unidadB = b.orden_comercial;

        let comparison = 0;
        if (unidadA > unidadB) {
          comparison = 1;
        } else if (unidadA < unidadB) {
          comparison = -1;
        }
        return comparison;
      }

    render (){
        /*if (this.refTabsTwo.current != null){
            if (localStorage.fromCollections){
                this.refTabsTwo.current.querySelectorAll(".head-tabs ")[0].children[1].click()
                //localStorage.setItem('fromCollections', false);
            }
        } */


        let { sliderpersonalizeyourwedd } = this.state;
        const { match: { params } } = this.props;

        return (
            <ServiceProvider value={{lang: params.lang}}>
                <Layout title = { params.lang === "en" ? "Wedding Inspirations" : "Inspiraciones de boda" }
                description={"Personalize the destination wedding of your dreams with our inspiring wedding collections."} >
                    { sliderpersonalizeyourwedd.length > 0 &&
                        <div page="personaliyourday" ref={this.refTabsTwo}>
                            <Sliderprincipal slides = { sliderpersonalizeyourwedd }/>
                            <Personalizeyoureedding state = { this.state.PersonalizeYourWedding } unidades={this.state.unidades} lang={params.lang} tab_active={this.state.tab_active} />
                        </div>
                    }
                </Layout>
            </ServiceProvider>
        );
    }
}

export default withRouter(WithContext(Comppersonaliyourday));
