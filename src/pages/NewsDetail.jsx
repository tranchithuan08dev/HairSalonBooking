import React, { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../assets/css/news.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostNewsByID } from "../store/dashbroadSlice";
function NewsDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const dataDetailNews = useSelector(
    (state) => state.DASHBOARD.postNewsDetailId
  );
  console.log("dataDetailNews", dataDetailNews);

  useEffect(() => {
    dispatch(fetchPostNewsByID(id));
  }, [dispatch]);
  return (
    <>
      <Header />
      <div className="center mb-4">
        <div className="frame-container">
          <img
            src={dataDetailNews?.img}
            alt="Image Description"
            style={{
              width: "50%", // Adjust this percentage or use a fixed value like '300px'
              height: "auto",
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              marginBottom: "12px",
            }}
          />
          <div className="image-title">{dataDetailNews?.title}</div>
          <div className="image-type">Type: {dataDetailNews?.type}</div>
          <div className="image-content">{dataDetailNews?.content}</div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default NewsDetail;
