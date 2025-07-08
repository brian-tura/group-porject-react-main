import { useCart } from "../contexts/CartContext";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const SuccessPage = () => {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, []);

  return (
    <div className="container mt-5">
      <div className="alert alert-success text-center">
        <h2>Pagamento completato con successo!</h2>
        <p>Grazie per il tuo acquisto.</p>
      </div>

      <div className="text-center mt-4">
        <Link className="btn btn-primary-color text-light" to="/SearchPage">
          Continua a navigare
        </Link>
      </div>
    </div>
  );
};

export default SuccessPage;
