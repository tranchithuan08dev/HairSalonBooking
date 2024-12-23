import React, { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchPostStylistDetailById } from "../store/dashbroadSlice";

function StylistDetailPage() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const dataStylistById = useSelector(
    (state) => state.DASHBOARD.postStylistDetailById
  );
  console.log("dataStylistById", dataStylistById);

  useEffect(() => {
    dispatch(fetchPostStylistDetailById(id));
  }, [dispatch]);
  return (
    <>
      <Header />
      <div className="container mx-auto py-5">
        <div className="card mx-auto shadow-lg" style={{ maxWidth: "900px" }}>
          <div className="row g-0">
            {/* Stylist Image */}
            <div className="col-md-4">
              <img
                src={
                  dataStylistById.avatar || "../public/assets/image/avatar.jpg "
                }
                className="img-fluid rounded-start"
                alt="Stylist"
                style={{ height: "100%", objectFit: "cover" }}
              />
            </div>
            {/* Stylist Details */}
            <div className="col-md-8">
              <div className="card-body d-flex flex-column justify-content-center text-center p-5">
                {/* Stylist Name */}
                <h2
                  className="card-title mb-3"
                  style={{
                    color: "#454548",
                    fontWeight: "bold",
                    fontSize: "2rem",
                  }}
                >
                  {dataStylistById.fullName}
                </h2>
                {/* Experience */}
                <h4 className="mb-3" style={{ color: "#6c757d" }}>
                  Level {dataStylistById.level}
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          backgroundImage: "url(https://4rau.vn/images/bg_main.jpg)",
          backgroundSize: "cover",
        }}
      >
        <div className="container mx-auto p-4">
          <h1
            className="text-center title mb-4"
            style={{ color: "black", fontWeight: "bold" }}
          >
            Certificate
          </h1>
          <div className="d-flex justify-content-center">
            <img
              src={dataStylistById.certificateURL}
              style={{
                maxWidth: "100%",
                height: "auto",
              }}
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default StylistDetailPage;
