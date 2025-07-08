import React from 'react';
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import AddCart from '../components/AddCart';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import AddWishList from '../components/AddWishList';


const SearchPage = () => {

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const navigate = useNavigate();

    const query = queryParams.get("q") || "";
    const offer = queryParams.get("offer") === "true";

    const [videogames, setVideogames] = useState([]);
    const [sort, setSort] = useState(queryParams.get("sort") || "");
    const [order, setOrder] = useState(queryParams.get("order") || "asc");

    const { cartProducts, removeFromCart, addToCart } = useCart()
    const cart = JSON.parse(localStorage.getItem("cart")) || {}
    const endpoint = "http://localhost:3000/api/videogames/"

    const updateQueryParams = (updatedOrder, updatedSort) => {
        const params = new URLSearchParams(location.search);

        updatedSort ? params.set("sort", updatedSort) : params.delete("sort");
        updatedOrder ? params.set("order", updatedOrder) : params.delete("order");
        navigate({
            pathname: location.pathname,
            search: params.toString(),
        }, { replace: true })
    };


    const handleSort = (e) => {
        setSort(e.target.value);
        updateQueryParams(e.target.value, sort);

    };
    const handleOrder = (e) => {
        setOrder(e.target.value);
        updateQueryParams(e.target.value, order);

    };

    useEffect(() => {
        axios.get(endpoint, {
            params: {
                q: query,
                sort: sort,
                order: order
            }

        }).then((response) => {
            let data = response.data;
            if (offer) {
                data = data.filter(videogame => videogame.offer !== null)
            }
            setVideogames(data);
        })
            .catch((err) => {
                console.log(err);
            })
    }, [query, sort, order, offer]);
    return (

        <>
            <form className="search-sort-form ms-3">
                <div className="select-group">
                    <select className="select-gaming" name="select-option" id="select-option" onChange={handleSort} defaultValue="">
                        <option value="" disabled>Seleziona per</option>
                        <option value="name">Nome</option>
                        <option value="release">Data di uscita</option>
                        <option value="price">Prezzo</option>
                    </select>
                    <span className="select-arrow">&#9662;</span>
                </div>
                <div className="select-group">
                    <select className="select-gaming" name="select-order" id="select-order" onChange={handleOrder} defaultValue="">
                        <option value="asc">Crescente</option>
                        <option value="desc">Decrescente</option>
                    </select>
                    <span className="select-arrow">&#9662;</span>
                </div>
            </form>

            <div className="container">
                <div className="row">

                    <div className="container">
                        <div className="row">
                            {videogames.map((videogame) => (
                                <div key={`videogame-${videogame.id}`} className="col-lg-4 col-md-6 col-sm-12 mb-4">
                                    <Link to={`/videogames/${videogame.slug}`} className="text-decoration-none text-dark">
                                        <div className="card-instant">
                                            <img
                                                src={videogame.image}
                                                alt={videogame.name}
                                                className="card-instant-img"
                                            />
                                            <div className="card-instant-body">
                                                <div className="d-flex">
                                                    <div className="card-instant-title short-videogame-text">{videogame.name}</div>
                                                    {videogame.offer !== null && (
                                                        <span className="badge-offer ms-2 align-self-center">
                                                            -{(videogame.offer * 100).toFixed(0)}%
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="card-instant-price">
                                                    {videogame.offer ? (videogame.price * (1 - videogame.offer)).toFixed(2) : videogame.price}€
                                                </div>
                                                <div className="card-instant-publisher">{videogame.publisher?.name || "Editore sconosciuto"}</div>
                                                <div className="card-instant-badges short-videogame-text">
                                                    <span className="badge-genre">{videogame.genres?.[0]?.name || "Genere non disponibile"}</span>
                                                    {videogame.platforms?.map((v, idx) => (
                                                        <span key={idx} className="badge-platform">{v.name}</span>
                                                    ))}
                                                </div>
                                                <div className='d-flex'>
                                                    {(cart[videogame.id]?.quantity || 0) > 0 ? (
                                                        <div className='d-flex'>
                                                            <p>Quantità: </p>
                                                            <div>
                                                                <button className='mx-2 btn btn-outline-secondary px-1 py-0 text-white btn-sm' type='button' onClick={(e) => { e.preventDefault(); removeFromCart(videogame) }}>-</button>
                                                            </div>
                                                            <p>{cart[videogame.id]?.quantity}</p>
                                                            <div>
                                                                <button className='mx-2 btn btn-outline-secondary px-1 py-0 text-white btn-sm' type='button' onClick={(e) => { e.preventDefault(); addToCart(videogame) }}>+</button>
                                                            </div>
                                                        </div>

                                                    ) : (
                                                        <div className={`${cart[videogame.id]?.quantity > 0 ? 'd-none' : ''}`}>
                                                            <AddCart product={videogame} />
                                                        </div>

                                                    )}
                                                    <div>
                                                        <AddWishList product={videogame} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </div >
            </div >


        </>
    )
}

export default SearchPage
