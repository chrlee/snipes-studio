import React from 'react'
import SEO from "../components/seo"
import { graphql } from "gatsby"
import ProductList from '../components/productList';
import Scene from "../components/scene"
import ScrollButton from "../components/scrollButton"

const IndexPage = ({ data }) => {
  return (
    <>
      <SEO title="Home" />
      <Scene />
      <ScrollButton />
      <ProductList data={data} />
    </>
  )
}

export default IndexPage

export const query = graphql`
  query {
    allShopifyProduct {
      edges {
        node {
          id
          title
          handle
          createdAt
          publishedAt
          productType
          vendor
          priceRange {
            maxVariantPrice {
              amount
            }
          }
          images {
            originalSrc
            id
            localFile {
              childImageSharp {
                fluid(maxWidth: 910) {
                  ...GatsbyImageSharpFluid_withWebp_noBase64
                }
              }
            }
          }
          variants {
            id
            title
            compareAtPrice
            price
            availableForSale
          }
        }
      }
    }
  }
`
