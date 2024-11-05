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
    return <div>Not found</div>;
  }

  const formattedDate = dayjs(feedbackData.feedbackDate).format("DD-MM-YYYY");
  const hasMoreThan50Chars = feedbackData.comment.length > 50;

  return (
    <div className="feedback">
      <h4>{feedbackData.fullName}</h4>
      <span className="date">{formattedDate}</span>
      <div className="rating">
        {"★".repeat(Math.round(feedbackData.rating))}
        {"☆".repeat(5 - Math.round(feedbackData.rating))}
      </div>
      <div className="services">
        <h6>Services</h6>
        {feedbackData.services.map((service, index) => (
          <span key={index} className="service-tag">
            {service}
          </span>
        ))}
      </div>
      <p className="comment">
        {isExpanded || !hasMoreThan50Chars ? (
          <span dangerouslySetInnerHTML={{ __html: feedbackData.comment }} />
        ) : (
          <span>
            {feedbackData.comment.substring(0, 50) + "... "}
            <span className="show-more" onClick={handleToggleExpand}>
              See more
            </span>
          </span>
        )}
        {hasMoreThan50Chars && isExpanded && (
          <span className="show-more" onClick={handleToggleExpand}>
            See less
          </span>
        )}
      </p>
    </div>
  );
};

export default FeedbackItem;
