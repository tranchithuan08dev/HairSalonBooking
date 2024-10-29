import React, { useState } from "react";
import "./feedback.css";
import dayjs from "dayjs";

const FeedbackItem = (props) => {
  const { feedbackData } = props;
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  if (!feedbackData) {
    return <div>Nothing</div>;
  } else {
    console.log("db", feedbackData);
  }
  const formattedDate = dayjs(feedbackData.feedbackDate).format("DD-MM-YYYY");

  return (
    <div className="feedback">
      <h4 className="feedbackCusName">{feedbackData.customerName || feedbackData.guestID}</h4>
      <span className="date">{formattedDate}</span>
      <div className="rating">
        {"★".repeat(Math.round(feedbackData.rating))}
        {"☆".repeat(5 - Math.round(feedbackData.rating))}
      </div>
      <div className="services">Service: {feedbackData.services.join(", ")}</div>
      <p className="comment">
        {isExpanded || feedbackData.comment.length <= 100
          ? feedbackData.comment
          : feedbackData.comment.substring(0, 100) + "... "}
        {feedbackData.comment.length > 100 && (
          <span className="show-more" onClick={handleToggleExpand}>
            {isExpanded ? "See less" : "See more"}
          </span>
        )}
      </p>
    </div>
  );
};

export default FeedbackItem;
