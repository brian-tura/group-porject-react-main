import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="herospace">
      <div className="container py-5">
        <div className="row">
          <div className="col-6 col-override-375 col-override-425">
            <div>
              <h2 className="fw-bold text-light">I TUOI VIDEOGIOCHI</h2>
              <h2 className="fw-bold text-light">LA TUA STORIA</h2>
              <p className="mt-3 text-light">Boogaming è dove puoi trovare i tuoi giochi preferiti, ad un prezzo vantaggioso!</p>
            </div>
            <Link className="btn btn-primary-color text-light fw-bold" to="/SearchPage">Dai un'occhiata</Link>
            <Link className="btn btn-secondary-color text-light fw-bold ms-1" to="/SearchPage?offer=true">Giochi in offerta</Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Hero;
