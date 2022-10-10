/**
 * @name: layout.jsx 
 * @description: Layout general para para las páginas
 * @author: Sergio Trejo
 * @version: 1.0.0
*/

import React, { Component } from 'react';
import { Helmet } from 'react-helmet';

// Components
import NavBar from '../navbar/';
import Footer from '../footer';
import Footermobile from '../footermobile';

class Layout extends Component {

    state = {
        variable: ''
    };

    

    
    render() {

        const { title, description, keywords, children, disabledFooter, cID, cID2 } = this.props;

        return (
            <>
                <Helmet>
                    <title> {title ? title + " | Palace Resorts Weddings" : "The best destination weddings | Palace Resorts® Weddings"} </title>
                    <meta name="description" content={description || "Welcome to the ideal place for your destination wedding, a place with infinite options designed to make your dream wedding come true. Click now to learn more"} />
                    <meta name="keywords" content={keywords || "Bodas en cancun, bodas en la playa cancun, Coordinadores de bodas en cancun, planeación de bodas y eventos en cancun, casarse en cancun, Cancun Weddings, Weddings in Cancun"} />
                    {cID ?
                        <noscript>
                            {`<img
                                src="https://ad.doubleclick.net/ddm/activity/src=6696502;type=conte0;cat=`+ cID + `;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;ord=1?"
                                width="1" height="1" alt="" /> `
                            }
                        </noscript> : null
                    }
                    {cID ?
                        <script>
                            {`gtag('event', 'conversion', {
                        'allow_custom_scripts': true,
                        'send_to': 'DC-6696502/conte0/`+ cID + `+standard'
                        });` }
                        </script> : null
                    }
                {cID2 ?        
                <script> 
                    {`function gtag_report_conversion(url) { var callback = function () { if (typeof(url) != 'undefined') { window.location = url; } }; gtag('event', 'conversion', { 'send_to': 'AW-972865916/Pz6bCIyikgkQ_ILzzwM', 'event_callback': callback }); return false; } ` }
                 </script> : null }

                </Helmet>

                <div className="layout">
                    <div page="page" className="test">
                        <NavBar reference={this.handleClick} variable={this.state.variable} />
                        {children}
                        {
                            !disabledFooter &&
                            <>
                                <Footer />
                                <Footermobile />
                            </>
                        }
                    </div>
                </div>
            </>
        );
    }

    /**
     * @description: Referencia del onClick, activa los Dropdowns del Topbar
     * @author: Wilberth Sergio
     * @version: 1.1.0
    */
    handleClick = (check) => {
        const { variable } = this.state;
        if (variable !== check) {
            this.setState({
                variable: check === variable ? "" : check
            });
        }
    }

}

export default Layout;