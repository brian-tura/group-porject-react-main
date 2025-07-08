import React, { useState } from 'react';
import { useWishList } from '../contexts/WishListContext';

const WishList = () => {
    const { wishListProducts, clearWishList, removeFromWishList } = useWishList();
    const [showList, setShowList] = useState(false);

    const handleClick = () => {
        setShowList(prev => !prev);
    };

    return (
        <div className="wishlist-wrapper">
            <button type="button" className="btn btn-primary btn-wish" onClick={handleClick}>
                <i className="fa-solid fa-star"></i>
            </button>

            {showList && (
                <div className="wishlist-modal rounded shadow">
                    <div className="p-3">
                        <h1 className="fs-3">WishList</h1>
                        <hr />
                        {wishListProducts.length === 0 ? (
                            <p>La tua wishlist è vuota</p>
                        ) : (
                            <div className="wishlist-content scrollable">
                                {wishListProducts.map(product => (
                                    <div key={product.id} className="my-3">
                                        <div className="card cart-img mb-2">
                                            <img src={product.image} className="img-fluid my-1" alt={product.name} />
                                        </div>
                                        <div className="">
                                            <div className='d-flex'> Titolo: {product.name}</div>
                                            <div className='d-flex'>Prezzo: {product.price}&euro;</div>
                                        </div>
                                        <div className="d-flex align-items-center">
                                            <button
                                                type="button"
                                                className="btn btn-primary-color text-light mt-2"
                                                onClick={() => removeFromWishList(product)}
                                            >
                                                Rimuovi
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                <hr />
                                <div className="d-flex justify-content-center pb-3">
                                    <button type="button" className="btn btn-primary-color text-light" onClick={clearWishList}>
                                        Cancella Wishlist
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default WishList;
