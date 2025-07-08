import React from 'react'
import { useCart } from '../contexts/CartContext'
import { Link } from 'react-router-dom'

const ShoppingCart = () => {

    const { cartProducts, clearCart, removeFromCart, addToCart, removeSingleProduct, price, sendCart } = useCart()

    return (
        <>
            <div className={`col-3 ${cartProducts.length === 0 ? 'd-none' : ''} position-fixed end-0 cart vh-100 shadow-lg cart-mobile`}>
                <div className='p-2'>
                    <h1>Carrello</h1>
                </div>
                <div className='overflow-hidden scrollable px-2'>
                    <div className='overflow-y-auto shopping-cart h-100 overflow-x-hidden'>
                        {cartProducts.map((product) => (
                            <div key={product.id} className='my-3'>
                                <div className='card cart-img'>
                                    <img src={product.image} className='img-fluid my-1' alt="" />
                                </div>
                                <div className='d-flex justify-content-between row'>
                                    <span className='short-videogame-text'>Titolo: {product.name}</span>
                                    <span>Prezzo: {product.price}&euro;</span>
                                    {product.offer > 0 && (<span>Sconto: {(product.price * product.offer).toFixed(2)}&euro;</span>)}
                                </div>
                                <div className='align-items-center'>
                                    <div className='d-flex'>
                                        <p>Quantità: </p>
                                        <div>
                                            <button className='mx-2 btn btn-outline-secondary px-1 py-0 text-white btn-sm' type='button' onClick={() => removeFromCart(product)}>-</button>
                                        </div>
                                        <p>{product.quantity}</p>
                                        <div>
                                            <button className='mx-2 btn btn-outline-secondary px-1 py-0 text-white btn-sm' type='button' onClick={() => addToCart(product)}>+</button>
                                        </div>
                                    </div>
                                    <div className='pb-2'>
                                        <button type='button' className='btn btn-primary-color text-light' onClick={() => removeSingleProduct(product)}>Rimuovi</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div>
                            <div className='py-3 total-fixed'>
                                <h3>Spesa Totale: {price}&euro;</h3>
                                <Link type='button' className='btn btn-success mb-1 w-100' to='/checkoutpage' onClick={sendCart}>Checkout</Link>
                                <button type='button' className='btn btn-primary-color text-light mt-1 w-100 short-videogame-text' onClick={clearCart}>Svuota Carrello</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ShoppingCart