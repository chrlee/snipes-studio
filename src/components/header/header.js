import { Link } from "gatsby" /* eslint-disable */
import PropTypes from "prop-types"
import React, { useContext, useState, useEffect } from 'react'
import StoreContext from '../../context/store'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingBag, faUser, faSearch } from '@fortawesome/free-solid-svg-icons'

const countQuantity = lineItems => {
  let quantity = 0

  lineItems.forEach(item => {
    quantity = quantity + item.quantity
  });
  return quantity
}


const Header = ({ siteTitle }) => {
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
      <nav className="navbar level is-vcentered is-absolute" role="navigation" aria-label="main navigation">
            <div className="navbar-start">
              <div className="navbar-item">
                <Link aria-label="home" to="/">
                  <h2 className="is-size-6 has-text-dark">home</h2>
                </Link>
              </div>
            </div>
            <div className="navbar-end">
              <div className="navbar-item">
                <h2 className="has-text-dark is-size-6" onClick={openSearchBar}>search</h2>
              </div>
              <div className="navbar-item">
                <Link aria-label="cart" to="/account/login">
                  <h2 className="is-size-6 has-text-dark">account</h2>
                </Link>
              </div>
              <div className="navbar-item">
                <Link aria-label="cart" to="/cart">
                  {
                    quantity > 0 ?
                    <>
                      <h2 className="is-size-6 has-text-dark">cart <span className="hotpink">({quantity})</span></h2>
                    </>
                      :
                      <h2 className="is-size-6 has-text-dark">cart</h2>
                  }
                </Link>
              </div>
        </div>
      
      </nav>

      <div className={` ${modal === true ? "modal is-active" : "modal"}`}>
        <div className="modal-background" onClick={closeSearchBar}></div>
        <div className="modal-content">
          <div className="field">
            <div className="control has-icons-right">
              <form action="../search" method="GET">
                <input className="input is-large" name="value" type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search" />
                <span className="icon is-right">
                  <FontAwesomeIcon icon={faSearch} />
                </span>
                <label className="has-text-white">ENTER ↵</label>
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