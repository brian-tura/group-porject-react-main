import React, { useState } from 'react'
import { useCart } from '../contexts/CartContext'

const AddCart = ({ product }) => {

    const { addToCart } = useCart()

    const addCart = (e) => {
        e.preventDefault()
        addToCart(product)
    }

    return (
        <>
            <button type='button' className='btn btn-primary-color text-light' onClick={addCart}>Aggiungi al carrello</button>
        </>
    )
}

export default AddCart