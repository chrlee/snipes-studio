import React from 'react';

const ProductInfo = ({ product, available }) => {
    return (
        <>
            <p className="has-text-weight-semibold is-size-5">{product.vendor}</p>
            <p className="has-text-grey-dark is-size-4">{product.title}</p>
            {available ? 
                <p className="is-size-4 has-text-grey-dark">${product.variants[0].price}</p>
                :
                <p className="is-size-4 has-text-grey-dark">Sold</p>
            }
            
        </>
    );
};

export default ProductInfo;