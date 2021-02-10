import { Link } from "gatsby" /* eslint-disable */
import Img from "gatsby-image"
import PropTypes from "prop-types"
import React, { useContext, useState, useEffect } from 'react'
import StoreContext from '../../context/store'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

const countQuantity = lineItems => {
  let quantity = 0

  lineItems.forEach(item => {
    quantity = quantity + item.quantity
  });
  return quantity
}


const Header = ({ img }) => {
  const context = useContext(StoreContext)
  const { checkout } = context.store
  const [quantity, setQuantity] = useState(countQuantity(checkout ? checkout.lineItems : []))
  const [modal, setModal] = useState(false)
  const [search, setSearch] = useState("")


  useEffect(() => {
    setQuantity(countQuantity(checkout ? checkout.lineItems : []));
  }, [checkout]);

  const openSearchBar = () => {
    setModal(true)
  }
  const closeSearchBar = () => {
    setModal(false)
  }

  return (
    <>
      <nav className="navbar is-absolute" role="navigation" aria-label="main navigation">
        
          <div className="navbar-start">
            <div className="navbar-item">
              <Link aria-label="home" to="/">
                <h2 className="has-text-grey is-size-4-desktop is-size-5-mobile">perlin noise</h2>
              </Link>
            </div>
            <div className="navbar-item">
              <Link aria-label="cart" to="/about">
                <h2 className="is-size-6 has-text-grey">about</h2>
              </Link>
            </div>
            {
            modal === true ? 
              <form action="/search" method="GET">
                <div className="navbar-item" id="search-input">
                  <input class="is-normal" name="value" type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="search" />
                </div>
              </form>
              :
              <div className="navbar-item">
                <h2 className="has-text-grey is-size-6" onClick={openSearchBar}>search</h2>
              </div>
            }
            <div className="navbar-item">
              <Link aria-label="cart" to="/cart">
                {
                  quantity > 0 ?
                  <>
                    <h2 className="is-size-6 has-text-grey">cart <span className="hotpink">({quantity})</span></h2>
                  </>
                    :
                    <h2 className="is-size-6 has-text-grey">cart</h2>
                }
              </Link>
            </div>
          </div>
          
      
      </nav>
      

      <div className={` ${modal === true ? "modal" : "modal"}`}>
        <div className="modal-background" onClick={closeSearchBar}></div>
        <div className="modal-content">
          <div className="field">
            <div className="control has-icons-right">
              <form action="../search" method="GET">
                <input className="input is-large" name="value" type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search" />
                <span className="icon is-right">
                  <FontAwesomeIcon icon={faSearch} />
                </span>
              </form>
            </div>
          </div>
        </div>

        <button className="modal-close is-large" onClick={closeSearchBar} aria-label="close"></button>
      </div>
    </>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
