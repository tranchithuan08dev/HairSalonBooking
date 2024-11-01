import { Rate, Input } from "antd";
import React, { useState } from "react";

function FeedBack() {
  const [rating, setRating] = useState(1);
  const [feedback, setFeedback] = useState("");

  const handleSubmit = () => {
    console.log("Rating:", rating);
    console.log("Feedback:", feedback);
    // Add any further logic, like sending data to an API
  };
  return (
    <div style={styles.container}>
      <div style={styles.innerContainer}>
        <h2 style={styles.heading}>Rate our Service</h2>
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
          class="btn btn-success mt-3"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
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
