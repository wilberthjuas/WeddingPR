/**
 * @name: test.jsx 
 * @description: Página de pruebas /test
 * @author: Sergio Trejo
 * @version: 1.0.0
*/

import React from 'react';
import Layout from '../../components/layout';

const PageTest = () => {
    

    return(
        <Layout title = "Página de Testing" 
            description = "Descripción de la página" 
            keywords = "seo, tags, otras"
        >
            <h1>
                TEST
            </h1>
        </Layout>        
    );
}

export default PageTest;