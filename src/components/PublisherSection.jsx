import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const PublisherSection = () => {

    const [publishers, setPublishers] = useState([])

    const fetchPublisherGames = () => {
        axios.get('http://127.0.0.1:3000/api/publishers/').then((resp) => {
            setPublishers(resp.data);
        }).catch((err) => {
            console.log(err);
        });
    }

    useEffect(() => {
        fetchPublisherGames();
    }, []);

    return (
        <div className="container my-5">
            <div className="row">
                <h2 className="text-light">Best Publishers &#11167;</h2>
                {publishers.map((publisher) => (
                    <div key={`publisherSection-${publisher.id}`}>
                        <h4 className="text-light my-3">{publisher.name}</h4>
                        <div className="row">
                            {publisher.videogames.slice(0, 3).map((videogame) => (
                                <div key={`publisherVideogames-${videogame.id}`} className="col-12 col-md-4">
                                    <div>
                                        <Link className="card" to={`/videogames/${videogame.slug}`}>
                                            <img src={videogame.image} alt={videogame.name} />
                                        </Link>
                                        <div className="mt-2 mb-4 d-flex justify-content-between">
                                            <p className="text-light short-videogame-text">{videogame.name}</p>
                                            <p className="text-light fw-bold">{videogame.price}&euro;</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PublisherSection