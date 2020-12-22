import React from 'react';

const Buttons = ({ context, available, product, productVariant,  quantity}) => {
    const handleAddToCart = () => {
        context.addVariantToCart(productVariant.shopifyId, quantity, product.vendor, product.handle)
    }

    const handleAddToCart_BuyNow = () => {
        context.addVariantToCartAndBuyNow(productVariant.shopifyId, quantity)
    }

    return (
        <div className="columns">
            <div className="column">
                <button
                    className="button is-medium is-fullwidth"
                    disabled={!available}
                    onClick={handleAddToCart}
                >
                    Add to Cart
                </button>
            </div>
            <div className="column">
                <button
                    className="button is-dark is-medium is-fullwidth"
                    disabled={!available}
                    onClick={handleAddToCart_BuyNow}
                >
                    Buy It Now
                </button>
            </div>
        </div>
    );
};

export default Buttons;