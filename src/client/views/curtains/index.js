import React from 'react';
import { Grid, Cell } from '../../components';


export default class Curtains extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <section component="curtains">
                <section className="content-quiz open">
                    <div className="left-curtain"></div>
                    <div className="right-curtain"></div>
                </section>
            </section>
        );
    }
}
