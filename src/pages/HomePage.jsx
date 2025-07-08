import { useState, useEffect } from "react";
import Hero from "../components/Hero";
import RecentGames from "../components/RecentGames";
import PublisherSection from "../components/PublisherSection";
import axios from "axios";

const HomePage = () => {
  const [videogames, setVideogames] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/api/videogames/").then((response) => {
      setVideogames(response.data.data);
    });
  }, []);

  return (
    <>
      <Hero />
      <hr className="mt-0" />
      <RecentGames />
      <PublisherSection />
    </>
  );
};

export default HomePage;
