import React from "react";
import { Link } from "react-router-dom";

const CancelPage = () => {
  return (
    <div className="container mt-5">
      <div className="alert alert-warning text-center">
        <h2>Pagamento annullato</h2>
        <p>Il pagamento non è andato a buon fine!</p>
        <Link to="/checkoutpage" className="btn btn-danger mt-3">
          Torna al checkout
        </Link>
      </div>
    </div>
  );
};

export default CancelPage;
