import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import WishList from "./WishList";

const Header = ({ isCartOpen, setIsCartOpen, showCartToggle }) => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/SearchPage?q=${encodeURIComponent(search)}`);
  };

  return (
    <header>
      <nav className="navbar m-0">
        <div className="container-fluid">
          <div className="navbar-brand">
            <div className="d-flex align-items-center">
              <Link className="p-2 text-white fs-3" to="/">
                <img src="./src/assets/logo.png" alt="" className="logo-design" />
                BOOGAMING
              </Link>
              <div className="me-">
                <WishList />
              </div>
              {showCartToggle && (
                <button
                  className="btn btn-outline-light cart-btn ms-2"
                  onClick={() => setIsCartOpen(!isCartOpen)}
                  aria-label={isCartOpen ? "Nascondi carrello" : "Mostra carrello"}
                >
                  {isCartOpen ? (
                    <i className="bi bi-x-lg" style={{ fontSize: "1.1rem" }}></i> // icona X per chiudere
                  ) : (
                    <i className="bi bi-cart3" style={{ fontSize: "1.1rem" }}></i> // icona carrello per aprire
                  )}
                </button>
              )}
            </div>
          </div>
          <div className="d-flex justify-content-end align-items-center m-1">
            <form className="search-form-header" onSubmit={e => e.preventDefault()}>
              <input
                type="text"
                className="search-input m-1"
                placeholder="cerca"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              <button className="btn-search mt-1 mb-2" onClick={handleSearch} type="button">
                Ricerca
              </button>
            </form>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
