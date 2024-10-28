import { useNavigate, useSearchParams } from "react-router-dom";
import "../../../../assets/css/staff/home.css";
import { React, useEffect, useState } from "react";
import FilterStatus from "../../../../components/Staff/FilterStatus";
import Search from "../../../../components/Staff/Search";
import DayPicker from "../../../../components/Staff/DayPicker";
import { searchFilter } from "../../../../helpers/searchFilter";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBookings,
  updateStatus,
  setShowAlert,
} from "../../../../store/staffSlice/bookingSlice";
import { Pagination } from "antd";
import StatusDropdown from "../../../../components/Staff/Statusdropdown";

function Content() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredBookings, setFilteredBookings] = useState([]);
  const { data, all, loading, showAlert, error, message } = useSelector((state) => state.STAFF.booking);
  const [total, setTotal] = useState();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const handleClick = (id) => {
    navigate(`bookingDetail?bookingID=${id}`);
  };

  useEffect(() => {
    const fetch = async () => {
      console.log("currentPage", currentPage);

      await dispatch(
        fetchBookings({ page: currentPage, perPage: itemsPerPage })
      );
    };
    fetch();
  }, [dispatch, currentPage]);

  const handlePageChange = (newPage) => {
    const url = new URLSearchParams(searchParams.toString());
    if (newPage !== 1) {
      url.set("page", newPage);
    } else {
      url.delete("page");
    }
    setSearchParams(url);
    setCurrentPage(newPage);
  };

  useEffect(() => {
    if (data.bookings) {
      let updatedBookings = [...all.bookings]; // Dùng dữ liệu từ data
  
      const key = decodeURIComponent(searchParams.get("key") || "");
      const status = searchParams.get("status") || "All";
      const appointmentAt = searchParams.get("appointmentAt");
  
      // Lọc theo trạng thái
      if (status !== "All") {
        updatedBookings = updatedBookings.filter((item) => item.status === status);
      }
  
      // Lọc theo từ khóa tìm kiếm
      if (key) {
        const { filtered } = searchFilter(updatedBookings, key);
        updatedBookings = Array.isArray(filtered) ? filtered : updatedBookings;
      }
  
      // Lọc theo ngày hẹn
      if (appointmentAt) {
        updatedBookings = updatedBookings.filter((item) => {
          const itemDate = new Date(item.appointmentAt).toLocaleDateString("en-GB");
          return itemDate === appointmentAt;
        });
      }
  
      // Cập nhật state cho total và filteredBookings
      setTotal(updatedBookings.length);
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const paginatedBookings = updatedBookings.slice(startIndex, endIndex);
      setFilteredBookings(paginatedBookings);
    }
  }, [searchParams, data, currentPage]);
  

  useEffect(() => {
    setFilteredBookings(data.bookings || []);
  }, [data]);

  function formatDateTime(dateTimeString) {
    const date = new Date(dateTimeString);

    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${hours}:${minutes}:${seconds} ${day}-${month}-${year}`;
  }

  const handleStatusChange = async (bookingID, newStatus) => {
    console.log(bookingID, newStatus);
    const dataUpdate = {
      bookingID: bookingID,
      status: newStatus,
    };
    console.log(dataUpdate);
    const result = await dispatch(updateStatus(dataUpdate));
    if (result.payload.ok) {
      await dispatch(fetchBookings({ page: currentPage, perPage: itemsPerPage }));
    }
  };

  function formatDate(dateTimeString) {
    const date = new Date(dateTimeString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        dispatch(setShowAlert(false));
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  if (loading) {
    return <>Loading...</>;
  }

  return (
    <>
      {showAlert && (
        <div
          className={`alert ${message ? "alert-success" : "alert-danger"} mt-3`}
          role="alert"
        >
          {message || error || ""}
        </div>
      )}
      <div className="container">
        <div className="card mb-3 card-custom">
          <div className="card-header">Filter & Search</div>
          <div className="card-body row card-body-custom">
            <div className="col-md-6">
              <FilterStatus />
            </div>
            <div className="col-md-6">
              <Search bookings={all.bookings} />
            </div>
          </div>
        </div>
        <div className="row mt-3 justify-content-end align-items-center row-custom">
          <div className="col-md-6 result-found">
            <h6>{total} results found</h6>
          </div>
          <div className="col-md-6">
            <div className="input-group mb-3">
              <DayPicker />
            </div>
          </div>
        </div>
        <div className="mt-4 custom-mt">
          {Array.isArray(filteredBookings) && filteredBookings.length > 0 ? (
            filteredBookings.map((item, index) => (
              <div key={index}>
                <div
                  className="card mb-3 hover-card card-custom-booking"
                  onClick={() => handleClick(item.bookingID)}
                >
                  <div className="row g-0 custom-g0">
                    <div className="col-md-3">
                      <div className="card-body">
                        <h5 className="card-title">
                          BookingID: {item.bookingID}
                        </h5>
                        <p className="card-text">
                          Contact Phone: {item.phoneNumber}
                          <br />
                        </p>
                      </div>
                    </div>
                    <div className="col-md-7 text-center-test">
                      <div className="BookingDate">
                        <h6>Created At</h6>
                        <span className="block-span-edit">
                          {formatDateTime(item.createdAt)}
                        </span>
                      </div>
                      <div className="ServiceDate">
                        <h6>Appoinment At</h6>
                        <span className="block-span-edit">
                          {formatDate(item.appointmentAt)}
                        </span>
                      </div>
                      <div className="TotalPrice">
                        <h6>Total Price</h6>
                        <span className="block-span-edit">
                          {item.discountPrice}$
                        </span>
                      </div>
                      <div className="Status">
                        <h6>Status</h6>
                        <StatusDropdown
                          currentStatus={item.status}
                          onStatusChange={(newStatus) =>
                            handleStatusChange(item.bookingID, newStatus)
                          }
                        />
                      </div>
                    </div>
                    <div className="col-md-2 detailSee">
                      Click to see detail →
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div>No bookings found.</div>
          )}
        </div>
        <div>
          <Pagination
            style={{ display: "flex", justifyContent: "center" }}
            current={currentPage}
            pageSize={itemsPerPage}
            total={total}
            onChange={handlePageChange}
          />
        </div>
      </div>
    </>
  );
}

export default Content;
