import React from "react";

function ConfirmModal(props) {
  const { show, onConfirm, onCancel, message } = props;
  if (!show) return null;

  return (
    <div className="payment-modal-overlay" onClick={onCancel}>
      <div
        className="payment-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="payment-form">
          <h4>Confirmation</h4>
          <div className="button-group">
            <p>{message}</p>
            <button onClick={onConfirm} className="submit-btn">
              Yes
            </button>
            <button onClick={onCancel} className="cancel-btn">
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
