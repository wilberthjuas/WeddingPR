import React, { Component } from 'react';
import { Cell, Grid } from '../grid';
import { Iconwedd } from '../../components/wirefragment';
import { withRouter, Link } from 'react-router-dom';
class CommonLinksMobile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isHidden: true
        };
    }

    handleOpen() {
        this.setState({ isHidden: false });
    }

    handleClose(event) {
        event.stopPropagation();
        this.setState({ isHidden: true });
    }

    render() {
        const { match: { params } } = this.props;

        return (
            <section component="commonlinks" className="commonlinks">

                <article component="awardsandlinks">
                    <div className="container" style={{ background: "var(--white)" }}>
                        <div className="container footer-ourawards">
                            <Grid type="y" small-up="2">
                                <Cell className="content-ourawards">
                                    <Grid type="x" >
                                        <Cell small="4">
                                            <hr className="margin-unset hr-white" />
                                        </Cell>
                                        <Cell small="4">
                                            <span className="center awards">
                                                { params.lang === "en" ? "OUR AWARDS" : "PREMIOS" }
                                            </span>
                                        </Cell>
                                        <Cell small="4">
                                            <hr className="margin-unset hr-white" />
                                        </Cell>
                                    </Grid>
                                </Cell>
                                <Cell className="other-logo-resorts">
                                    <Grid type="x">
                                        <Cell small="4">

                                        </Cell>
                                        <Cell small="2">
                                            <Iconwedd icon={"five-diamond"} color={"dark-gray-md five-content center"} />
                                        </Cell>
                                        {/*<Cell small="2">
                                            <Iconwedd icon={"tripadvisor-award"} color={"dark-gray-md center tripadvisor-content"} />
        </Cell>*/}
                                        <Cell small="2">
                                            <Iconwedd icon={"four-diamond"} color={"dark-gray-md four-content center"} />
                                        </Cell>
                                        <Cell small="4"></Cell>
                                    </Grid>
                                </Cell>
                            </Grid>
                        </div>
                    </div>
                </article>
                <article className="container footer-resorts">
                    <Grid type="x" large-up="1">
                        <Cell>
                            <Grid>
                                <div className="list-social">
                                    <div className="row">
                                        <div className="list-item-icon">
                                        <a href="https://co.pinterest.com/prweddings/" rel="noopener" target="_blank">
                                                <Iconwedd icon={"pinterest-circled"} style={{ marginRight: "8px" }} color={"white"} />
                                            </a>                                           
                                            <a href="https://www.facebook.com/PalaceResortsWeddings/" rel="noopener" target="_blank">
                                                <Iconwedd icon={"facebook-circled"} style={{ marginRight: "8px" }} color={"white"} />
                                            </a>
                                            <a href="https://www.instagram.com/palaceresortsweddings/?hl=es-la" target="_blank" rel="noopener">
                                                <Iconwedd icon={"instagram-circled"} style={{ marginRight: "8px" }} color={"white"} />
                                            </a>
                                            <a href="https://twitter.com/prweddings" target="_blank" rel="noopener">
                                                <Iconwedd icon={"twitter-circled"} style={{ marginRight: "8px" }} color={"white"} />
                                            </a>
                                            <a href="https://www.youtube.com/user/PalaceWeddings" target="_blank" rel="noopener">
                                                <Iconwedd icon={"youtube-circled"} style={{ marginRight: "8px" }} color={"white"} />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <Cell small-up="12" className="logo-resorts">
                                    <Grid type="x" small-up="3">
                                        <Cell >
                                            <Iconwedd icon={"palace-resorts"} color={"light-gray center icon-social"} />
                                        </Cell>
                                        <Cell>
                                            <Iconwedd icon={"le-blanc-resorts"} color={"light-gray center icon-social"} />
                                        </Cell>
                                        <Cell className="col-md-4">
                                            <Iconwedd icon={"moon-palace-awe-inclusive"} color={"light-gray center icon-social"} />
                                        </Cell>
                                    </Grid>
                                </Cell>
                                <Cell small-up="12" className="list-hotel-resorts">
                                    <Grid type="x" small-up="2">
                                        <Cell>
                                            <ul className="resort-list-ul">
                                                <li className="resort-list">
                                                <a href="https://palaceresorts.com" target="_blank" rel="noopener" className="footer-link">
                                                    PALACE RESORTS
                                                    <div className="line-rosy-horizontal-fot" ></div>
                                                    </a>
                                                    <Iconwedd icon={"chevron-right"} color={"white footer-chev-mob"} />
                                                </li>
                                                <li className="resort-list">  <a href="https://www.moonpalacecancun.com/" target="_blank" rel="noopener" className="footer-link">
                                                    MOON PALACE RESORTS
                                                    <div className="line-rosy-horizontal-fot" ></div></a>
                                                    <Iconwedd icon={"chevron-right"} color={"white footer-chev-mob"} />
                                                </li>
                                                <li className="resort-list">
                                                <a href="https://www.leblancsparesorts.com/" target="_blank"  rel="noopener" className="footer-link">
                                                    LE BLANC SPA RESORT
                                                    <div className="line-rosy-horizontal-fot"></div></a>
                                                    <Iconwedd icon={"chevron-right"} color={"white footer-chev-mob"} />
                                                </li>
                                            </ul>
                                        </Cell>
                                        <Cell >
                                            <ul className="resort-list-ul">
                                                <li className="resort-list">
                                                <a href="https://www.palaceelite.com" rel="noopener" target="_blank" className="footer-link">
                                                        PALACE ELITE
                                                    <div className="line-rosy-horizontal-fot"></div></a>
                                                    <Iconwedd icon={"chevron-right"} color={"white footer-chev-mob"} />
                                                </li>
                                                <li className="resort-list">
                                                <a href="https://meetings.palaceresorts.com" rel="noopener" target="_blank" className="footer-link">
                                                        MEETINGS
                                                    <div className="line-rosy-horizontal-fot" ></div> </a>
                                                    <Iconwedd icon={"chevron-right"} color={"white footer-chev-mob"} />
                                                </li>
                                                <li className="resort-list">
                                                <a href="https://www.palaceproagents.com" rel="noopener" target="_blank" className="footer-link">
                                                { params.lang === "en" ? "TRAVEL AGENTS" : params.lang === "es" ? "AGENCIAS" : "TRAVEL AGENTS"}
                                                    <div className="line-rosy-horizontal-fot"></div> </a>
                                                    <Iconwedd icon={"chevron-right"} color={"white footer-chev-mob"} />
                                                </li>
                                            </ul>
                                        </Cell>
                                    </Grid>
                                </Cell>
                            </Grid>
                        </Cell>
                    </Grid>
                </article>
                <address className="container-fluid privacy-policies">
                    <section className="row" >
                        <section className="col-6 pl-1 pr-0">
                            <h1 className="call">
                                { params.lang === "en" ? "CALL OUR WEDDING SPECIALISTS" : "LLAMAR A COORDINADORES" }
                            </h1>
                            <h1 className="phoneCall"><a href="tel:18777254933">1 (877) 725-4933</a></h1>
                            <span style={{ display: "none" }}>
                                <Iconwedd icon="chevron-right" color="white position"></Iconwedd><span className="privacy privacypolices float-right mt-2">PRIVACY POLICIES &nbsp; &nbsp; &nbsp;</span>
                            </span>
                            <div className="pointsFooter" onClick={this.handleOpen.bind(this)}>
                                <div className="point"></div>
                                <div className="point"></div>
                                <div className="point"></div>
                                {!this.state.isHidden &&
                                    <div className="modal-link-container">
                                        <div className="modal-link">
                                            <a rel="noopener" className="linkalt" href =  { params.lang === "en" ? "https://www.palaceresorts.com/en/privacy-users" : "https://www.palaceresorts.com/es/usuarios" }>
                                                { params.lang === "en" ? "PRIVACY POLICY" : "POLÍTICA DE PRIVACIDAD" }
                                            </a> 
                                            <a rel="noopener" className="linkalt" href = { params.lang === "en" ? "https://www.palaceresorts.com/en/other-privacy-notice" : "https://www.palaceresorts.com/es/noticia-de-privacidad" }>
                                                { params.lang === "en" ? "OTHER PRIVACY NOTICE" : "OTROS AVISOS"}
                                            </a> 
                                            <a rel="noopener" className="linkalt" href = { params.lang === "en" ? "https://www.palaceresorts.com/en/vehicle-lessees" : "https://www.palaceresorts.com/es/renta-de-vehiculos" }>
                                                { params.lang === "en" ? "VEHICLE LESSEES" : "ARRENDATARIO DE VEHÍCULOS" }
                                            </a>
                                            <a rel="noopener" className="linkalt" href = { params.lang === "en" ? "https://www.palaceresorts.com/en/privacy-vigilancy" : "https://www.palaceresorts.com/es/video-vigilancia" }>
                                                { params.lang === "en" ? "VIDEO SURVEILLANCE" : "VIDEO VIGILANCIA" }
                                            </a>
                                            <a rel="noopener" className="linkalt" href = { params.lang === "en" ? "https://www.palaceresorts.com/en/privacy-notice-clients-gdpr" : "https://www.palaceresorts.com/es/aviso-privacidad-clientes-rgpd" } >
                                                { params.lang === "en" ? "PRIVACY NOTICE FOR CLIENTS (GDPR)" : "AVISO DE PRIVACIDAD" }
                                            </a>
                                            <a rel="noopener" className="linkalt" href = { params.lang === "en" ? "https://www.palaceresorts.com/en/ccpa-privacy-policy" : "https://www.palaceresorts.com/es/ccpa-politica-privacidad" } >
                                                { params.lang === "en" ? "CCPA PRIVACY POLICY (CALIFORNIA)" : "POLÍTICA DE PRIVACIDAD CCPA (CALIFORNIA)" }
                                            </a>
                                            <Link rel="noopener" to={params.lang === "en" ? "/en/sitemap" : "/es/sitemap"} className="linkalt">
                                                { params.lang === "en" ? "SITE MAP" : "MAPA DEL SITIO" }
                                            </Link> 
                                            <div className="close-modal" onClick = { this.handleClose.bind(this) } >X</div>
                                        </div>
                                    </div>
                                }
                            </div>
                        </section>
                    </section>
                </address>
            </section>
        )
    }
}

export default withRouter(CommonLinksMobile);