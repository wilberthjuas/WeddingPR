/**
 * @name: catalog.js
 * @version: 1.1.0
 * @author: alanjimenez, Sergio Trejo
 * @description: Página de /catalog/:id
*/

import React, { Component, createRef } from "react";
import Layout from '../../components/layout';
import { Sliderprincipal } from '../../components';
import GradientBar from '../../views/catalog/gradientbar';
import { Titlesection } from "../../components/wirefragment";
import { ServiceProvider } from '../../app/Context';
import WithContext from "../../app/Context";
import { withRouter } from "react-router-dom";
import GalleryChecks from "../../components/clever/gallery";
import ViewDetailSpecial from "./ViewDetailSpecial";
import ViewDetailSpecialPlg from "./ViewDetailSpecialPlg";
import ViewDetail from "./ViewDetail";
import personalizeyourcatalog from "./Personalizeyourcatalog";


class WishList extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
        this.setState({
            list_service: [],
            wishList: [],
            dateFilterPack: [],
            values_checked: [0],
            show: false
        })
    }

    componentDidMount() {
        if (!sessionStorage.shopping_cart) {
            localStorage.removeItem("items_wish")
            localStorage.removeItem("wishList")
            localStorage.removeItem("dateFilterPack")
        }
        //const { getData, setData } = this.props.app;
        if (localStorage.items_wish) {
            let wishList = JSON.parse("[" + localStorage.items_wish + "]")
            let list_service = [...new Set(wishList.map(({ family }) => family))];
            let dateFilterPack = JSON.parse("[" + localStorage.dateFilterPack + "]")
            this.setState({
                list_service: list_service,
                wishList: wishList,
                dateFilterPack: dateFilterPack,
                values_checked: JSON.parse(sessionStorage.shopping_cart)
            })
        }
    }
    addShoppingCart(data, setData) {
        var session = window.sessionStorage;
        data = data && Object.keys(data).length > 0 ? data : [];
        //setData = setData == true || data.length > 0 ? true : false;
        //if (setData) {
            let dataString = JSON.stringify(data);
            session.setItem("shopping_cart", dataString);
        //} else if (session.getItem("shopping_cart")) {
            data = JSON.parse(session.getItem('shopping_cart'));
        //}
        return data;
    }
    addWishes(detail,dataFl,id_value){
        //let { setData,getData } = this.state.app;
        let data = Object.assign([], this.state.values_checked);

        if (data.includes(detail.value)){
            
            let removeItem=JSON.parse("["+localStorage.items_wish+"]")
            removeItem=removeItem.filter((e)=>{return e.value!==detail.value});
            localStorage.items_wish=JSON.stringify(removeItem).slice(0,-1).slice(1)

            let removeItemFilter=JSON.parse("["+localStorage.dateFilterPack+"]")
            removeItemFilter=removeItemFilter.filter((e)=>{
                return e.idservicio_agrupador!==detail.value
            });
            localStorage.dateFilterPack=JSON.stringify(removeItemFilter).slice(0,-1).slice(1)

            data = data.filter(e => e !== detail.value);
            this.setState({
                wishList:this.state.wishList.filter((e)=>{return e.value!==id_value})
            })
        }else{
            data.push(detail.value)

            localStorage.dateFilterPack+=JSON.stringify(dataFl).slice(0,-1).slice(1)
            localStorage.dateFilterPack=(localStorage.dateFilterPack+"").replace("undefined","").replace("}{","},{")
            //localstore para visualizar los servicios seleccionados
            localStorage.items_wish+=JSON.stringify(detail)
            localStorage.items_wish=(localStorage.items_wish+"").replace("undefined","").replace("}{","},{")
        }
        this.setState({ values_checked: data }, () => { this.addShoppingCart(data); });
        //setData('items_wish', data);
        this.addShoppingCart(data, true);
        this.setState({ values_checked: data });
        //this.props.onWishList(data);
        localStorage.wishList=data.length
    }
    html_services() {
        let services_html = []
        if (this.state.list_service) {

            services_html = this.state.list_service.map((e, i) => {
                let wishList = this.state.wishList.filter((elmn, ind) => {
                    return elmn.family == e
                })

                return (
                    <>
                        <section component="negocios" key={i}>
                            <section component="personalizeyoureedding">
                                <GradientBar><section className="container">
                                    <h1 className="title">{e}</h1>
                                </section></GradientBar>
                                <div component="personalizeyourcatalog">
                                    <div componet="cell" small="12" medium="12" large="12" className="waterfall">
                                        {
                                            wishList.map((element, index) => {
                                                return <GalleryChecks
                                                    quitFirtsClass
                                                    key={index}
                                                    item_list={[element]}
                                                    galleryClick={(value, id, item) => {
                                                        this.setState({ detail: item })
                                                        let dataResult = this.state.dateFilterPack.filter((res) => { return res.idservicio_agrupador == item.idservicio_agrupador })
                                                        let normal = ((item.coleccion == 0))
                                                        let special = ((item.coleccion == 1) && (item.idservicio_agrupador != 0) && (item.idservice_servicio_tipo != 22))
                                                        let specialPlPl = ((item.coleccion == 0) && (item.idservicio_agrupador != 0) && (item.idservice_servicio_tipo == 22))
                                                        this.setState({ value: item.value, show: true })
                                                        this.setState({ dataFilterSelect: dataResult, special: special, specialPlPl: specialPlPl, normal: normal })
                                                    }}
                                                    card={true}
                                                    values_checked={this.state.values_checked}
                                                    unidad_negocio={element.unidad_negocio}
                                                />
                                            })
                                        }

                                    </div>
                                </div>
                            </section>
                            <br />
                        </section>
                    </>
                )
            })
        }
        return services_html
    }
    onBack(id_value){
        this.setState({
            //wishList:this.state.wishList.filter((e)=>{return e.value!==id_value})
        })
    }
    render() {
        /*let { getData } = this.state.app.currentPage;
        let { setData } = this.state.app.currentPage;
        console.log(getData('items_wish'))*/
        return (
            <ServiceProvider value={{ lang: localStorage.langWeddings }} >
                <Layout title={localStorage.langWeddings === "en" ? "Wish List" : "Lista de deseos"}>
                    <div page="personalizeyourcatalog">
                        <Sliderprincipal slides={[{
                            imageDesk: "https://e-commercepr.s3.amazonaws.com/assets/images/personalize/make-the-day-yours-desk.jpg",
                            imageMov: "https://e-commercepr.s3.amazonaws.com/assets/images/personalize/make-the-day-yours-mob.jpg",
                            title: "", title2: "", description: "", buttonTxt: "", urlBtn: ""
                        }
                        ]} />
                        <div className={"container"}>
                            <section className={(!this.state.show ? "show" : "hide")}>
                                <Titlesection title="Wish List" urlBtnBack={["", localStorage.langWeddings == "es" ? "REGRESAR" : "BACK"]} />
                                {localStorage.items_wish ?
                                    this.html_services()
                                    :
                                    null
                                }
                            </section>
                            {/*--------------------------*/}
                            <div component="grid-x" style={{ width: "100%" }} className={this.state.show ? "show" : "hide"}>
                                <div component="cell" small="0" medium="2" large="3"></div>
                                <div component="cell" small="12" medium="8" large="6">
                                    {
                                        this.state.special ?
                                            <section >
                                                <ViewDetailSpecial
                                                    data={this.state.detail}
                                                    onBack={() => { this.setState({ detail: {},show: false });this.onBack(this.state.value); }}
                                                    onAdd={() => { this.addWishes(this.state.detail, this.state.dataFilterSelect,this.state.value) }}
                                                    onSelected={this.state.values_checked.includes(this.state.value)}
                                                    dataFilter={this.state.dataFilterSelect}
                                                    lang_site={localStorage.langWeddings}
                                                />
                                            </section>
                                            : this.state.specialPlPl ?
                                                <section>
                                                    <ViewDetailSpecialPlg
                                                        data={this.state.detail}
                                                        onBack={() => { this.setState({ detail: {},show: false });this.onBack(this.state.value); }}
                                                        onAdd={() => { this.addWishes(this.state.detail, this.state.dataFilterSelect,this.state.value) }}
                                                        onSelected={this.state.values_checked.includes(this.state.value)}
                                                        dataFilter={this.state.dataFilterSelect}
                                                        property_hotel={this.props.property_hotel}
                                                        lang_site={localStorage.langWeddings}
                                                    />
                                                </section>
                                                :
                                                <section>
                                                    <ViewDetail
                                                        thisIsLogin={false}
                                                        dataFilter={this.state.dataFilterSelect != null ? this.state.dataFilterSelect : []}
                                                        data={this.state.detail}
                                                        onBack={() => { this.setState({ detail: {}, show: false });this.onBack(this.state.value); }}
                                                        onAdd={() => { this.addWishes(this.state.detail, this.state.dataFilterSelect,this.state.value) }}
                                                        onSelected={this.state.values_checked ? this.state.values_checked.includes(this.state.value) : true}
                                                        unidad_negocio={this.props.unidad_negocio}
                                                        lang_site={localStorage.langWeddings}
                                                    />
                                                </section>
                                    }
                                </div>
                                <div component="cell" small="0" medium="2" large="3"></div>
                            </div>
                            {/*-------------------------*/}
                        </div>
                        <br/>
                        <br/>
                        <br/>
                    </div>
                </Layout>
            </ServiceProvider>
        );
    }
}

export default withRouter(WithContext(WishList));
//export default WithContext(WishList);