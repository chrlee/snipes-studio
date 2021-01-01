import React, { useContext } from 'react';
import { navigate } from "gatsby"
import StoreContext from "../../context/store"

const Product = ({ checkout, line_item }) => {

    const context = useContext(StoreContext)

    const imageItem = line_item.variant.image && (
        <>
        <figure className="image is-64x64 is-hidden-desktop" style={{margin: "auto"}}>
            <img
                src={line_item.variant.image.src}
                alt={line_item.variant.image.altText}
            />
        </figure>
        <figure className="image is-96x96 is-hidden-mobile" style={{margin: "auto"}}>
            <img
                src={line_item.variant.image.src}
                alt={line_item.variant.image.altText}
            />
        </figure>
    </>
    )

    const removeItem = () => {
        context.removeLineItem(line_item.id)
    }

    const navToProduct = () => {
        navigate("/product/"+line_item.customAttributes[0].value)
    }


    return (
        <>
            <tr>
                <th>
                    {imageItem}
                </th>
                {console.log(line_item)}
                <th style={{verticalAlign: "inherit"}}>
                <p className="is-size-6-desktop is-size-7-mobile has-text-gray has-text-weight-semibold">
                    <span style={{cursor: "pointer"}} role="button" onClick={((event) => navToProduct())}>
                        {line_item.customAttributes[1].value}
                    </span>
                </p>
                <p className="is-size-6-desktop is-size-7-mobile has-text-gray has-text-weight-medium">
                    <span style={{cursor: "pointer"}} role="button" onClick={((event) => navToProduct())}>
                        {line_item.title}
                    </span>
                </p>
                <p className="is-size-6-desktop is-size-7-mobile has-text-gray has-text-weight-light">
                    <span style={{cursor: "pointer"}} role="button" onClick={((event) => navToProduct())}>
                        ({line_item.variant.title})
                    </span>
                </p>
                </th>
                <th style={{verticalAlign: "inherit"}}>
                    <p className="is-size-6-desktop is-size-7-mobile has-text-gray has-text-weight-medium has-text-centered">${line_item.variant.price}</p>
                </th>
                <th style={{verticalAlign: "inherit"}}>
                    <p className="has-text-weight-normal is-size-6-desktop is-size-7-mobile has-text-gray has-text-centered" style={{cursor:'pointer'}} onClick={removeItem}>X</p>
                </th>
            </tr>
        </>
    );
};

export default Product;