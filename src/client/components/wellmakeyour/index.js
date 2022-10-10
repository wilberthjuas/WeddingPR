import React, { Component } from 'react';
import Wellmakeyourslide from '../wellmakeyourslide';
import { Titlesection } from '../../components/wirefragment';
import api from '../../app';
import { withRouter } from 'react-router-dom';

class Wellmakeyour extends Component {
    constructor() {
        super();
        this.state = { unidades: [] }

    }




    getUnidadesNegocio() {
        api.getBusinessUnits()
            .then(res => {
                let data = res.data.map((e, i) => {
                    return {
                        idservice_unidad_negocio: e.idservice_unidad_negocio,
                        cover: e.cover,
                        nombre: e.nombre,
                        descripcion: e.descripcion,
                        enable_online: e.enable_online,
                        //usuario_creacion: e.usuario_creacion,
                        //fecha_creacion: e.fecha_creacion,
                        //usuario_ultima_modificacion: e.usuario_ultima_modificacion,
                        //fecha_ultima_modificacion: e.fecha_ultima_modificacion,
                        estado: e.estado,
                        orden_comercial: e.orden_comercial,
                        direccion: e.direccion,
                        extra: JSON.parse(e.extra),
                        segmento_negocio: e.segmento_negocio
                    }
                })
                let unidades_nosort = data.filter((e, i) => { return e.orden_comercial != "9" })
                this.setState({
                    unidades: unidades_nosort.sort(this.compare)                
                });                

            }).catch(e => console.error(e));
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


    componentDidMount() {

        this.getUnidadesNegocio()
    }
    render() {

        const { match: { params } } = this.props;
        
        const wellmakeHead = this.props.state.map((element, index) => {
            return (
                <Titlesection title={element.title} key={index} description={element.description} typeElement={""} icon={""}></Titlesection>
            )
        });
        if (this.props.static){
            return(
                    <section component="wellmakeyour">
                        <section className="well-make">
                            {wellmakeHead}
                            <section className="">
                                <Wellmakeyourslide static={true} data={[]}slide={this.props.state}/>
                            </section>
                        </section>
                        <div className="divicion-section"></div>
                    </section>
                )
            
        }else{
        if (this.state.unidades.length > 0) {
            return (
                <section component="wellmakeyour">
                    <section className="well-make">
                        {wellmakeHead}
                        <section className="">
                            <Wellmakeyourslide  static={false} slide={this.props.state} data={this.state.unidades} lang={params.lang}/>
                        </section>
                    </section>
                    <div className="divicion-section"></div>
                </section>
            )
        } else {
            return (<section component="wellmakeyour"></section>)
        }
    }
    }
}
export default withRouter(Wellmakeyour);