import { useEffect, useState } from "react";
import FeedbackItem from "../components/Home/FeedbackItem";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllFeedback } from "../store/homeSlice";
import "./feedback.css";
import Footer from "../components/Footer";
import Header from "../components/Header";

const Feedback = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const feedbacksPerPage = 5;

  const { data, loading } = useSelector((state) => state.HOME);

  useEffect(() => {
    dispatch(fetchAllFeedback());
  }, [dispatch]);

  let feedbacks = data;

  if(!Array.isArray(data)){
    feedbacks = [];
  }
  const indexOfLastFeedback = currentPage * feedbacksPerPage;
  const indexOfFirstFeedback = indexOfLastFeedback - feedbacksPerPage;
  const currentFeedbacks = feedbacks.slice(
    indexOfFirstFeedback,
    indexOfLastFeedback
  );

  const totalPages = Math.ceil(feedbacks.length / feedbacksPerPage);

  return (
    <>
    <Header/>
    <div className="feedback-list">
      {loading ? (
        <p>Loading...</p>
      ) : (
        currentFeedbacks.map((feedback) => (
          <FeedbackItem
            key={feedback.id}
            feedbackData={feedback} 
          />
        ))
      )}
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={currentPage === index + 1 ? "active" : ""}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default Feedback;
