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
            src="https://images.unsplash.com/photo-1593702295094-aea22597af65?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGJhcmJlcnxlbnwwfHwwfHx8MA%3D%3D"
            alt="Image Description"
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
