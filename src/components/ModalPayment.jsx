import React from 'react'

const ModalPayment = ({ showPayment, setShowPayment }) => {
    if(!showPayment) return null;

    return (
        <div className="modal d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Dati di pagamento</h5>
                        <button type="button" className="btn-close" onClick={() => setShowPayment(false)}></button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input type="email" className="form-control" id="email" placeholder="Inserisci la tua email" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="cardNumber" className="form-label">Numero della carta</label>
                                <input type="text" className="form-control" id="cardNumber" placeholder="1234 5678 9012 3456" />
                            </div>
                            <div className="row">
                                <div className="col-6 mb-3">
                                    <label htmlFor="expiry" className="form-label">Data di scadenza</label>
                                    <input type="text" className="form-control" id="expiry" placeholder="MM/AA" />
                                </div>
                                <div className="col-6 mb-3">
                                    <label htmlFor="cvc" className="form-label">CVC</label>
                                    <input type="text" className="form-control" id="cvc" placeholder="123" />
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Nome Intestatario</label>
                                <input type="text" className="form-control" id="name" placeholder="Mario Rossi" />
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={() => setShowPayment(false)}>Chiudi</button>
                        <button type="button" className="btn btn-primary">Conferma pagamento</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalPayment