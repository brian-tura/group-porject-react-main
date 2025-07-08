import React from 'react'
import { useCart } from '../contexts/CartContext'

const AddCartAlert = () => {
    
    const { showAlert } = useCart()

    return (
        <>
            {showAlert && (<div className='col-3 p-2 m-2 alert global-alert alert-success position-fixed top-0 text-center opacity-75' role='alert' style={{ zIndex: 1050 }}>Aggiunto al carrello</div>)}
        </>
    )
}

export default AddCartAlert