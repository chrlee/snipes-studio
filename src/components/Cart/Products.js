import React from 'react';
import Product from './Product.js'

const Products = ({checkout}) => {

    return (
        <div>
            <h1 className="has-text-gray has-text-centered has-text-weight-semibold is-size-5 mb-4">checkout</h1>
            <table className="table is-fullwidth is-hoverable">
                <thead>
                    <tr align="center">
                        <th> </th>
                        <th> </th>
                        <th className="has-text-weight-medium has-text-centered is-size-6-desktop is-size-7-mobile">price</th>
                        <th className="has-text-weight-medium has-text-centered is-size-6-desktop is-size-7-mobile">remove</th>
                    </tr>
                </thead>
                <tbody>
                    {checkout.lineItems.map(line_item => {
                        return <Product checkout={checkout} line_item={line_item} />
                    })}
                </tbody>
            </table>
            <div className="has-text-right">
                <p className="has-text-right has-text-weight-semibold is-size-5">$ {checkout.totalPrice}</p>
                <p className="has-text-right is-size-6-desktop is-size-7-mobile has-text-grey">+ Tax and Shipping</p>
                <br/>
                <a className="button is-medium is-dark" href={checkout.webUrl}>Checkout</a>
            </div>
        </div>
    );
};

export default Products;