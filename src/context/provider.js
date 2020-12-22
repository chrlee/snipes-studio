import React, { useState, useEffect } from 'react';
import { navigate } from "@reach/router"
import StoreContext, { defaultStoreContext } from '../context/store'
const isBrowser = typeof window !== 'undefined'


const Provider = ({ children }) => {
    const [store, updateStore] = useState(defaultStoreContext)
    const getlocalStorage = (value) => {
        try {
            return JSON.parse(localStorage.getItem(value))
        } catch (e) {
            return ''
        }
    }
    useEffect(() => {
        const initializeCheckout = async () => {
            // Check if card exits already
            const isBrowser = typeof window !== 'undefined'
            const existingCheckoutID = isBrowser ? localStorage.getItem('shopify_checkout_id') : null

            const setCheckoutInState = checkout => {
                if (isBrowser) {
                    localStorage.setItem('shopify_checkout_id', checkout.id)
                }

                updateStore(state => {
                    return { ...state, checkout }
                })
            }

            const createNewCheckout = () => store.client.checkout.create()
            const fetchCheckout = id => store.client.checkout.fetch(id)

            if (existingCheckoutID) {
                try {
                    const checkout = await fetchCheckout(existingCheckoutID)

                    // Make sure this cart hasn’t already been purchased.
                    if (!checkout.completedAt) {
                        setCheckoutInState(checkout)
                        return
                    }
                } catch (e) {
                    localStorage.setItem('shopify_checkout_id', null)
                    console.log(e)
                    const newCheckout = await createNewCheckout()
                    setCheckoutInState(newCheckout)
                }
            } else{
                const newCheckout = await createNewCheckout()
                setCheckoutInState(newCheckout)
            }
        }
        initializeCheckout()
    }, [store.client.checkout])
    return (
        <StoreContext.Provider
            value={{
                store,
                customerAccessToken: getlocalStorage('customerAccessToken'),
                addVariantToCart: (variantId, quantity, vendor, handle) => {
                    updateStore(state => {
                        return { ...state, adding: true }
                    })
                    const { checkout, client } = store
                    const checkoutId = checkout.id
                    const lineItemsToUpdate = [{
                        variantId: variantId,
                        quantity: parseInt(quantity, 10),
                        customAttributes: [{
                            key: 'handle',
                            value: handle
                        },
                        {
                            key: 'vendor',
                            value: vendor
                        }] 
                    },]
                    var inCart = false
                    checkout.lineItems.forEach(lineItem => {
                        if(lineItem.variant.id === variantId) {
                            inCart = true
                    }
                    })
                    if(!inCart){
                        return client.checkout
                            .addLineItems(checkoutId, lineItemsToUpdate)
                            .then(checkout => {
                                updateStore(state => {
                                    return { ...state, checkout, adding: true }
                                })
                            })
                    } else {
                        return false
                    }
                },
                addVariantToCartAndBuyNow: (variantId, quantity) => {
                    updateStore(state => {
                        return { ...state, adding: true }
                    })
                    const { checkout, client } = store
                    const checkoutId = checkout.id
                    const lineItemsToUpdate = [
                        { variantId, quantity: parseInt(quantity, 10) },
                    ]
                    var inCart = false
                    checkout.lineItems.forEach(lineItem => {
                        if(lineItem.variant.id === variantId) {
                            inCart = true
                        }
                    })
                    if(!inCart) {
                        return client.checkout
                            .addLineItems(checkoutId, lineItemsToUpdate)
                            .then(checkout => {
                                updateStore(state => {
                                    return { ...state, checkout, adding: false }
                                })
                                navigate(checkout.webUrl)
                            })
                    } else {
                        navigate(checkout.webUrl)
                    }
                },
                removeLineItem: (lineItemId) => {
                    const { checkout, client } = store
                    const checkoutId = checkout.id
                    return client.checkout
                        .removeLineItems(checkoutId, [lineItemId])
                        .then(resultat => {
                            updateStore(state => {
                                return { ...state, checkout: resultat }
                            })
                        })
                },
                updateLineItem: (lineItemId, quantity) => {
                    updateStore(state => {
                        return { ...state, adding: true }
                    })
                    const { checkout, client } = store
                    const checkoutId = checkout.id
                    const lineItemsToUpdate = [
                        { lineItemId, quantity: parseInt(quantity, 10) },
                    ]
                    return client.checkout
                        .updateLineItems(checkoutId, lineItemsToUpdate)
                        .then(resultat => {
                            updateStore(state => {
                                return { ...state, checkout: resultat }
                            })
                        })
                },
                updateFilterType: type => {
                    updateStore(state => {
                        return { ...state, filteredType: type }
                    })
                },
                updateFilterSort: sort => {
                    updateStore(state => {
                        return { ...state, filteredSort: sort }
                    })
                },
                setValue: value => {
                    isBrowser && localStorage.setItem('customerAccessToken', JSON.stringify(value))
                    updateStore(state => {
                        return { ...state, customerAccessToken: value }
                    })
                }
            }}>
            {children}
        </StoreContext.Provider>
    );
};

export default Provider;