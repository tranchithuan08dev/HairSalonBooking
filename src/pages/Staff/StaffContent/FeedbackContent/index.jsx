import { Rate } from "antd";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  createFeedback,
  setShowAlert,
  setError
} from "../../../../store/staffSlice/feedbackSlice";
import { useDispatch, useSelector } from "react-redux";
import { Editor } from "@tinymce/tinymce-react";

function FeedBack() {
  const dispatch = useDispatch();
  const [rating, setRating] = useState(1);
  const [feedback, setFeedback] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const queryParams = new URLSearchParams(location.search);
  const bookingID = queryParams.get("bookingID");
  const { showAlert, message, error } = useSelector(
    (state) => state.STAFF.feedback
  );

  const today = new Date();
  const formattedDate = today.toISOString().split("T")[0];

  const handleBack = () => {
    navigate(-1);
  };

  const handleSubmit = async () => {
    const objectCreate = {
      bookingID: bookingID,
      rating: rating,
      comment: feedback,
      feedbackDate: formattedDate,
    };
    const result = await dispatch(createFeedback(objectCreate));
    if (result.payload.ok) {
      setIsSubmitted(true);
    }
  };

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        dispatch(setShowAlert(false));
        dispatch(setError(null));
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  return (
    <>
      {showAlert && (
        <div
          className={`alert ${message ? "alert-success" : "alert-danger"} mt-3`}
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
                <Rate
                  style={styles.rate}
                  defaultValue={1}
                  onChange={setRating}
                />
              </div>
              <Editor
                onEditorChange={(content) => setFeedback(content)}
                apiKey="g78f7q7nisjzjjlapkhzc7a4d8sqlc88uhr237r6dj4yvifj"
                init={{
                  plugins: [
                    "anchor",
                    "autolink",
                    "charmap",
                    "codesample",
                    "emoticons",
                    "image",
                    "link",
                    "lists",
                    "media",
                    "searchreplace",
                    "table",
                    "visualblocks",
                    "wordcount",
                    "checklist",
                    "mediaembed",
                    "casechange",
                    "export",
                    "formatpainter",
                    "pageembed",
                    "a11ychecker",
                    "tinymcespellchecker",
                    "permanentpen",
                    "powerpaste",
                    "advtable",
                    "advcode",
                    "editimage",
                    "advtemplate",
                    "ai",
                    "mentions",
                    "tinycomments",
                    "tableofcontents",
                    "footnotes",
                    "mergetags",
                    "autocorrect",
                    "typography",
                    "inlinecss",
                    "markdown",
                    "importword",
                    "exportword",
                    "exportpdf",
                  ],
                  placeholder: "Leave your feedback here...",
                  toolbar:
                    "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
                  tinycomments_mode: "embedded",
                  tinycomments_author: "Author name",
                  mergetags_list: [
                    { value: "First.Name", title: "First Name" },
                    { value: "Email", title: "Email" },
                  ],
                  ai_request: (request, respondWith) =>
                    respondWith.string(() =>
                      Promise.reject("See docs to implement AI Assistant")
                    ),
                  exportpdf_converter_options: {
                    format: "Letter",
                    margin_top: "1in",
                    margin_right: "1in",
                    margin_bottom: "1in",
                    margin_left: "1in",
                  },
                  exportword_converter_options: {
                    document: { size: "Letter" },
                  },
                  importword_converter_options: {
                    formatting: {
                      styles: "inline",
                      resets: "inline",
                      defaults: "inline",
                    },
                  },
                }}
                initialValue=""
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
    backgroundColor: "rgba(0, 0, 0, 0.7)",
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
    backgroundColor: "white",
    padding: "10px 20px",
    borderRadius: "8px",
    display: "inline-block",
    marginBottom: "16px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
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
