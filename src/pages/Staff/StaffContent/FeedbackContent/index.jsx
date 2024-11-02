import { Rate, Input } from "antd";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { createFeedback, setShowAlert} from "../../../../store/staffSlice/feedbackSlice";
import { useDispatch, useSelector } from "react-redux";
function FeedBack() {
  const dispatch = useDispatch();
  const [rating, setRating] = useState(1);
  const [feedback, setFeedback] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const queryParams = new URLSearchParams(location.search);
  const bookingID = queryParams.get("bookingID");
  const {showAlert, message, error } = useSelector((state) => state.STAFF.feedback);

  const today = new Date();
  const formattedDate = today.toISOString().split('T')[0];

  const handleBack = () => {
    navigate(-1); 
  };

  const handleSubmit = async () => {
    console.log("Rating:", rating);
    console.log("Feedback:", feedback);
    console.log(bookingID);
    const objectCreate = {
        bookingID: bookingID,
        rating: rating,
        comment: feedback,
        feedbackDate: formattedDate 
    }
    const result = await dispatch(createFeedback(objectCreate));
    if (result.payload.ok) {
      setIsSubmitted(true);
    }
  };

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        dispatch(setShowAlert(false));
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showAlert]);
  return (
    <>
    {showAlert && (
      <div
        className={`alert ${
          message ? "alert-success" : "alert-danger"
        } mt-3`}
        role="alert"
      >
        {message || error}
      </div>
    )}
    <div style={styles.container}>
    <button 
          className="btn btn-secondary mb-3" 
          onClick={handleBack} 
          style={{ position: "absolute", top: 20, left: 20 }}
        >
          Turn back
        </button>
      <div style={styles.innerContainer}>
        <h2 style={styles.heading}>Rate our Service</h2>
        {!isSubmitted ? (
            <>
              <div style={styles.rateContainer}>
                <Rate style={styles.rate} defaultValue={1} onChange={setRating} />
              </div>
              <Input.TextArea
                style={styles.textArea}
                rows={4}
                placeholder="Leave your feedback here..."
                onChange={(e) => setFeedback(e.target.value)}
              />
              <button
                type="submit"
                className="btn btn-success mt-3"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </>
          ) : ( 
            <p style={{ color: "#fff", fontSize: "18px", marginTop: "20px" }}>
              Thank you for your feedback!
            </p>
          )}
      </div>
    </div>
    </>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    padding: "20px",
    backgroundImage:
      "url('https://images.unsplash.com/photo-1529445654487-3bde9b55e0b2?q=80&w=1989&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backdropFilter: "blur(5px)",
  },
  innerContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.7)", // Darker semi-transparent background for focus
    borderRadius: "12px",
    padding: "30px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
    textAlign: "center",
    maxWidth: "500px",
    width: "100%",
  },
  heading: {
    fontSize: "26px",
    color: "#fff",
    marginBottom: "16px",
    fontWeight: "bold",
  },
  rateContainer: {
    backgroundColor: "white", // Light overlay background for the rating
    padding: "10px 20px",
    borderRadius: "8px",
    display: "inline-block",
    marginBottom: "16px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)", // Slight shadow to lift the rating area
  },
  rate: {
    fontSize: "40px",
  },
  textArea: {
    width: "100%",
    maxWidth: "400px",
    marginTop: "20px",
    borderRadius: "8px",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
  },
};

export default FeedBack;
