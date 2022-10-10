import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';

class Morethan extends Component {

    render() {
        return (
            <section component="more-than" style={{ display: "none" }}>
                <article className="Banner-Bg">
                    <article className="container">
                        <article className="container-movil-rigns">
                            <section>
                                <section className="row container-movil">
                                    <article className="">
                                        <img alt={"Image"} src={this.props.imgDesk} className="rings movil" />
                                        <img alt={"Image"} src={this.props.imgMov} className="rings desktop" />
                                    </article>
                                    <section className="text-right-ring">
                                        <article className="more-than text-desk-">{ReactHtmlParser(this.props.title)}</article>
                                        <article className="year-of-exp lista-div"><b>
                                            <h1 className="text8 margin-none">{ReactHtmlParser(this.props.description)}</h1></b>
                                            <h2 className="year-experience uppercase text6 margin-none">{ReactHtmlParser(this.props.description1)}</h2>
                                            <br className="br-moreThan" />
                                            <h2 className="making-dream uppercase text6 margin-none">{ReactHtmlParser(this.props.description2)}</h2>
                                        </article>
                                    </section>
                                </section>
                            </section>
                        </article>
                    </article>
                </article>
                <article className="divicion-section"></article>
            </section>
        )
    }
}
export default Morethan;