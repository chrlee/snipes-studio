import React from 'react';
import Img from "gatsby-image"

const ProductBox = props => {
    const product = props.product
    return (
        <div className="productBox" key={product.node.title}>
            <a href={`/product/${product.node.handle}`} >
                <Img
                    fluid={{ ...product.node.images[0].localFile.childImageSharp.fluid, aspectRatio: 1 / 1}}
                    imgStyle={{ objectFit: "contain" }}
                    key={product.node.images[0].localFile.id}
                    fadeIn={true} 
                    loading="lazy"
                    alt={product.node.title}
                />
                <p className="has-text-weight-semibold has-text-black">{product.node.title}</p>
                <p className="has-text-weight-light has-text-grey-dark">
                    ${product.node.variants[0].price}
                </p>
            </a>
        </div>
    );
};

export default ProductBox;