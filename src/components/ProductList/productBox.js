import React from 'react';
import Img from "gatsby-image"

const ProductBox = props => {
    const product = props.product
    const soldOut = !product.node.variants[0].availableForSale
    const compareAtPrice = product.node.variants[0].compareAtPrice
    const price = product.node.variants[0].price
    return (
        <div className={"productBox " + (soldOut ? "out-of-stock" : "")} key={product.node.title}>
            <a href={`/product/${product.node.handle}`} >
                <Img
                    fluid={{ ...product.node.images[0].localFile.childImageSharp.fluid, aspectRatio: 5 / 7}}
                    imgStyle={{ objectFit: "contain" }}
                    key={product.node.images[0].localFile.id}
                    fadeIn={true} 
                    loading="lazy"
                    alt={product.node.title}
                />
                <p className="has-text-weight-semibold has-text-black mt-2">{product.node.vendor}</p>
                <p className="has-text-weight-semibold has-text-black">{product.node.title}</p>
                <p className="has-text-weight-light has-text-grey-dark">
                    <span className="has-text-danger strike-through">{ compareAtPrice ? "$" + compareAtPrice : "" }</span> 
                    {compareAtPrice ? " " : ""}
                    { soldOut ? "sold" : '$' + price }
                </p>
                
            </a>
        </div>
    );
};

export default ProductBox;