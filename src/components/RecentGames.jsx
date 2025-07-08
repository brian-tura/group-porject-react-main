import axios from "axios";

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const RecentGames = () => {

    const [videogames, setVideogames] = useState([]);

    const fetchVideogames = () => {
        axios.get('http://127.0.0.1:3000/api/videogames/').then((resp) => {
            setVideogames(resp.data);
        }).catch((err) => {
            console.log(err);
        });
    }

    useEffect(() => {
        fetchVideogames();
    }, []);

    return (
        <div className="container mt-5 recent-games-w">
            <div className="row">
                <div className="col-12">
                    <h2 className="text-light">Ultime uscite &#11167;</h2>
                    <div id="carouselExampleIndicators" className="carousel slide d-flex justify-content-center" data-bs-ride="carousel">
                        <div className="carousel-indicators">
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3" aria-label="Slide 4"></button>
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="4" aria-label="Slide 5"></button>
                        </div>
                        <div className="carousel-inner">
                            {videogames.sort((a, b) => new Date(b.release_date) - new Date(a.release_date)).slice(0, 5).map((videogame, index) => (
                                <div key={`recentGames-${videogame.id}`} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                                    <Link to={`/videogames/${videogame.slug}`}>
                                        <img src={videogame.image} className="d-block w-100" alt={videogame.name} />
                                    </Link>
                                </div>
                            ))}
                        </div>
                        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RecentGames