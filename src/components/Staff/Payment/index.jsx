function PaymentComponent(props) {
  const {
    showForm,
    setShowForm,
    handlePaymentSubmit,
    paymentMethod,
    setPaymentMethod,
  } = props;
  return (
    <>
      {showForm && (
        <div
          className="payment-modal-overlay"
          onClick={() => setShowForm(false)}
        >
          <div
            className="payment-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <form onSubmit={handlePaymentSubmit} className="payment-form">
              <label htmlFor="payment-method">Select Payment Method:</label>{" "}
              <br />
              <select
                id="payment-method"
                value={paymentMethod || ""}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <option value="Cash">Cash</option>
                <option value="Banking">Banking</option>
              </select>
              <br />
              <div className="button-group">
                <button type="submit" className="submit-btn">
                  Submit Payment
                </button>
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default PaymentComponent;
