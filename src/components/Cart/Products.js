import React from 'react';
import Product from './Product.js'

const Products = ({checkout}) => {

    return (
        <div>
            <h1 className="has-text-gray has-text-centered is-size-5 mb-4">checkout</h1>
            <table className="table is-fullwidth is-hoverable">
                <thead className="is-hidden-touch">
                    <tr align="center">
                        <th> </th>
                        <th> </th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
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
                <p className="has-text-right is-size-5 has-text-grey">Shipping costs excluded (tax may apply)</p>
                <br/>
                <a className="button is-medium is-dark" href={checkout.webUrl}>Checkout</a>
            </div>
        </div>
    );
};

export default Products;