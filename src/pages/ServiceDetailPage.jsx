import React, { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostServiceById } from "../store/dashbroadSlice";

function ServiceDetailPage() {
  const dataServiceDetail = useSelector(
    (state) => state.DASHBOARD.postServiceById
  );
  console.log("dataServiceDetail", dataServiceDetail);

  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    dispatch(fetchPostServiceById(id));
  }, [dispatch]);

  return (
    <>
      <Header />
      <div className="container my-5">
        <div className="card shadow-lg border-0 rounded-4 overflow-hidden">
          <div className="row g-0">
            <div className="col-md-6">
              <img
                src="https://images.unsplash.com/photo-1616367122346-335fcf806c76?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDB8fGJhYmVyfGVufDB8fDB8fHww"
                alt="Service Image"
                className="img-fluid w-100 h-100 object-fit-cover"
              />
            </div>
            <div className="col-md-6 d-flex align-items-center">
              <div className="card-body p-4">
                <h2 className="card-title fw-bold display-6 mb-3">
                  {dataServiceDetail.serviceName}
                </h2>
                <p className="text-success fs-4 fw-semibold mb-3">
                  Giá: {dataServiceDetail.price} VND
                </p>
                <p className="text-muted fs-5 mb-4">
                  Thời gian: {dataServiceDetail.duration} phút
                </p>
                <hr />
                <p className="card-text fs-6">
                  {dataServiceDetail.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ServiceDetailPage;
