import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import AddCart from '../components/AddCart'
import AddWishList from '../components/AddWishList'


const ProductPage = () => {

    const { slug } = useParams()

    const [product, setProduct] = useState({})

    useEffect(() => {
        axios.get(`http://127.0.0.1:3000/api/videogames/${slug}`).then((res) => {
            setProduct(res.data)
        })
            .catch(err => {
                console.log("Errore fetch:", err)
            })
    }, [])

    return (
        <div className="container my-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card bg-dark text-white shadow-lg">
                        {product.image && (
                            <img src={product.image} alt={product.name} className="card-img-top img-fluid" />
                        )}
                        <div className="card-body">
                            <h2 className="card-instant-title fs-2">{product.name}</h2>
                            <p className="card-instant-price">Prezzo: {product.price}€</p>

                            <p className="card-text">
                                <strong>Genere:</strong>{" "}
                                {product.genres?.map((g) => (
                                    <span key={g.id} className="badge-genre">{g.name}</span>
                                ))}
                            </p>

                            <p className="text-date-price fw-bold d-flex">
                                Data di rilascio:{" "}
                                <span className='my-0 mx-2 badge-date'>
                                    {product.release_date ? new Date(product.release_date).toLocaleDateString() : "N/D"}
                                </span>
                            </p>

                            <p className="card-text">
                                <strong>Piattaforme:</strong>{" "}
                                {product.platform?.map((p) => (
                                    <span key={p.id} className="badge-platform">{p.name}</span>
                                ))}
                            </p>

                            <p className="card-text">
                                <strong>Publisher:</strong>{" "}
                                {product.publisher?.map((pub) => (
                                    <span key={pub.id} className="badge-publisher-product">{pub.name}</span>
                                ))}
                            </p>
                            <div className="d-flex flex-wrap justify-content-center gap-2 mt-4">
                                <AddCart product={product} />
                                <AddWishList product={product} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}


export default ProductPage