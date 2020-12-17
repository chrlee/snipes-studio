import React from 'react';
import { StaticQuery, graphql } from 'gatsby'
import Header from "../components/header/header"
import Provider from "../context/provider"
import "./layout.sass"


const Layout = ({ children }) => {
    
    return (
        <Provider>
            <StaticQuery
                query={graphql`
                query LogoQuery {
                    logo: file(relativePath: {eq: "logo.png"}) {
                        childImageSharp {
                            fluid(maxWidth: 300) {
                            ...GatsbyImageSharpFluid
                            }
                        }
                    }
                }
            `}
                render={data => (
                    <>
                        <Header img={data.logo.childImageSharp.fluid} />
                        {children}
                    </>
                )}
            />
        </Provider>
    );
};

export default Layout;