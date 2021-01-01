import React, { useContext } from 'react';
import ProductBox from "./ProductList/productBox"
import Sort from "./Filter/sort"
import Collection from './Filter/collection';
import StoreContext from '../context/store'
import { Element } from 'react-scroll'


const ProductList = ({ data }) => {
  const { edges: products } = data.allShopifyProduct
  const context = useContext(StoreContext);

  return (
    <section className="hero">
      <Element name="shop"></Element>
      <div className="hero-body">
        <div className="container">
          <div className="columns is-mobile level" style={{ marginBottom: "4rem", margin: "0", padding: "1rem 0" }}>
            <div className="column is-2-desktop is-6-mobile level-left">
              <Collection context={context} products={products} />
            </div>
            <div className="column is-2-desktop is-6-mobile level-right">
              <Sort context={context} />
            </div>
          </div>
          <div className="columns is-multiline is-mobile" style={{ margin: "0" }}>
            {
              products
                .filter(p => context.store.filteredType === 'all' ? p : (p.node.productType.includes(context.store.filteredType)))
                .sort(
                  context.store.filteredSort === "featured" ? ((a, b) => (b.node.variants[0].availableForSale - a.node.variants[0].availableForSale))
                    : context.store.filteredSort === "low" ? ((a, b) => a.node.variants[0].price - b.node.variants[0].price)
                      : context.store.filteredSort === "high" ? ((a, b) => b.node.variants[0].price - a.node.variants[0].price)
                        : context.store.filteredSort === "Z-A" ? ((a, b) => b.node.title.localeCompare(a.node.title))
                          : context.store.filteredSort === "A-Z" ? ((a, b) => a.node.title.localeCompare(b.node.title)) : null
                )
                .map((p, i) => {
                  let product = p
                  return (
                    <div className="column is-3-desktop is-4-tablet is-6-mobile mb-4" key={i}>
                      <ProductBox product={product} />
                    </div>
                  )
                })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductList;