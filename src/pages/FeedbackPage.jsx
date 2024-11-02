import { useEffect, useState } from "react";
import FeedbackItem from "../components/Home/FeedbackItem";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllFeedback } from "../store/homeSlice";
import "../assets/css/feedback.css";
import Footer from "../components/Footer";
import Header from "../components/Header";

const Feedback = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const feedbacksPerPage = 5;
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedRating, setSelectedRating] = useState(null);

  const { data, loading } = useSelector((state) => state.HOME);

  useEffect(() => {
    dispatch(fetchAllFeedback());
  }, [dispatch]);

  let feedbacks = data;
  console.log(feedbacks);

  if (!Array.isArray(data)) {
    feedbacks = [];
  }

  const uniqueRatings = Array.from(
    new Set(feedbacks.map((feedback) => feedback.rating))
  );

  const filteredFeedbacks = feedbacks.filter((feedback) => {
    const matchesService =
      selectedServices.length > 0
        ? selectedServices.every((service) =>
            feedback.services.includes(service)
          )
        : true;

    const matchesRating =
      selectedRating !== null ? feedback.rating === selectedRating : true;

    return matchesService && matchesRating;
  });

  const indexOfLastFeedback = currentPage * feedbacksPerPage;
  const indexOfFirstFeedback = indexOfLastFeedback - feedbacksPerPage;
  const currentFeedbacks = filteredFeedbacks.slice(
    indexOfFirstFeedback,
    indexOfLastFeedback
  );

  const totalPages = Math.ceil(filteredFeedbacks.length / feedbacksPerPage);

  const uniqueServices = Array.from(
    new Set(feedbacks.flatMap((feedback) => feedback.services))
  );

  const toggleServiceSelection = (service) => {
    setSelectedServices((prevState) =>
      prevState.includes(service)
        ? prevState.filter((item) => item !== service)
        : [...prevState, service]
    );
  };

  return (
    <>
      <Header />
      <div style={{ paddingTop: "30px", backgroundColor: "#4d4d4d" }}>
        <div className="feedback-container">
          <div className="filter-search d-flex flex-column align-items-start mb-4">
            <div className="d-flex flex-wrap mb-2">
              <h6 className="text-light">Filter by Rating: </h6>
              {uniqueRatings.map((rating) => (
                <span
                  key={rating}
                  className={`badge ${
                    selectedRating === rating ? "bg-primary" : "bg-secondary"
                  } me-2`}
                  onClick={() =>
                    setSelectedRating(selectedRating === rating ? null : rating)
                  }
                  style={{ cursor: "pointer" , marginLeft: "5px"}}
                >
                  {rating}
                </span>
              ))}
            </div>
            <div className="d-flex flex-wrap">
              <h6 className="text-light">Filter by Services:</h6>
              <div className="service-container">
                {uniqueServices.map((service, index) => (
                  <span
                    key={index}
                    className={`badge ${
                      selectedServices.includes(service)
                        ? "bg-primary"
                        : "bg-warning"
                    } me-2 service-badge`}
                    onClick={() => toggleServiceSelection(service)}
                    style={{ cursor: "pointer" }}
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {loading ? (
            <p>Loading...</p>
          ) : (
            currentFeedbacks.map((feedback, index) => (
              <FeedbackItem key={index} feedbackData={feedback} />
            ))
          )}
          <div className="pagination">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`btn ${
                  currentPage === index + 1
                    ? "btn-primary"
                    : "btn-outline-primary"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Feedback;
