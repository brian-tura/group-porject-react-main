import React from "react";
import axios from "axios";
import ModalPayment from "../components/ModalPayment";

import { useCart } from "../contexts/CartContext";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import { use } from "react";

const CheckoutPage = () => {
  const { savedCheckoutDatas, isLoaded } = useCart();
  const [discountCode, setDiscountCode] = useState("");
  const [savedDiscountedDatas, setSavedDiscountedDatas] = useState([]);
  const [discountApplied, setDiscountApplied] = useState(false);
  // const [showPayment, setShowPayment] = useState(false);

  const handleChange = (e) => {
    setDiscountCode(e.target.value);
  };

  const sendCheckoutDiscount = (e) => {
    e.preventDefault();
    const checkoutGames = savedCheckoutDatas.items.map((item) => ({
      id: item.id,
      quantity: item.quantity,
    }));

    axios
      .post("http://127.0.0.1:3000/api/orders/preview", {
        videogames: checkoutGames,
        discount_code: discountCode,
      })
      .then((resp) => {
        if (resp.data.discount) {
          setSavedDiscountedDatas(resp.data);
          setDiscountApplied(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (discountCode === "") {
      setDiscountApplied(false);
    }
  }, [discountCode]);

  console.log("saved", savedDiscountedDatas);

  const handlePayment = async () => {
    const checkoutGames = savedCheckoutDatas.items.map((item) => ({
      id: item.id,
      quantity: item.quantity,
    }));

    try {
      const response = await axios.post(
        "http://127.0.0.1:3000/api/orders/payments",
        {
          videogames: checkoutGames,
          discount_code: discountApplied ? discountCode : null,
        }
      );

      if (response.data.url) {
        window.location.href = response.data.url;
      } else {
        console.error("URL di pagamento non ricevuto");
      }
    } catch (err) {
      console.error("Errore nel pagamento:", err);
    }
  };

  return (
    <>
      <div className="container">
        {/* RIGA CON I TITOLI */}
        <div className="row align-items-center mt-5 mb-3">
          <div className="col-md-8">
            <h3>Carrello</h3>
          </div>
          <div className="col-md-4">
            <h3>Sommario</h3>
          </div>
        </div>

        {/* RIGA CON I CONTENUTI */}
        <div className="row">
          {/* Colonna dei prodotti */}
          <div className="col-md-8">
            {isLoaded &&
              savedCheckoutDatas.items.map((data) => (
                <div
                  key={`data-${data.id}`}
                  className="card bg-secondary p-3 mb-3 d-flex flex-row align-items-center"
                >
                  <img
                    src={data.image}
                    className="w-25 rounded-2"
                    alt={data.name}
                  />
                  <div className="mx-3">
                    <h4 className="text-light fs-5 m-0">{data.name}</h4>
                    <p className="text-light m-0">{data.basePrice}&euro;</p>
                    <p className="text-light m-0">Quantità: {data.quantity}</p>
                  </div>
                </div>
              ))}
          </div>

          {/* Colonna del sommario */}
          <div className="col-md-4">
            <div className="card bg-secondary text-light p-3">
              {isLoaded && (
                <>
                  {savedCheckoutDatas.items.map((product) => (
                    <div key={`product-${product.id}`} className="mb-2">
                      <div className="fw-bold">{product.name}</div>
                      <div>Prezzo: {product.unit_price}&euro;</div>
                    </div>
                  ))}
                  {/* form */}
                  <form onSubmit={sendCheckoutDiscount}>
                    <div className="form-floating mb-3 text-center">
                      <input
                        type="text"
                        name="discount"
                        className="form-control"
                        id="floatingInput"
                        value={discountCode}
                        onChange={handleChange}
                        placeholder="Inserisci Sconto"
                      />
                      <label htmlFor="floatingInput">Codice Sconto</label>
                      <button
                        className="btn btn-primary-color text-light mt-3 w-100"
                        disabled={discountApplied}
                      >
                        Applica
                      </button>
                    </div>
                  </form>

                  {/* alert per sconto */}
                  {discountApplied && (
                    <div className="alert alert-success">
                      Sconto applicato:{" "}
                      <strong>{savedDiscountedDatas.discount_code}</strong> (-
                      {savedDiscountedDatas.discount_value * 100}%)
                    </div>
                  )}

                  {/* totale ordine */}
                  <hr />
                  <h5>
                    Totale:{" "}
                    {discountApplied
                      ? savedDiscountedDatas.discounted_total
                      : savedCheckoutDatas.total}
                    &euro;
                  </h5>
                </>
              )}
              <div className="btn btn-primary-color text-light" onClick={handlePayment}>
                Pagamento{" >"}
              </div>
              <span className="text-center my-2">{"-"} oppure {"-"}</span>
              <Link className="text-center btn btn-secondary-color text-light m-0" to="/SearchPage">
                {"< "}Continua gli acquisti
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* modale per pagamento */}
      {/* <ModalPayment showPayment={showPayment} setShowPayment={setShowPayment} /> */}
    </>
  );
};

export default CheckoutPage;
