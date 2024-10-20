import { useNavigate, useSearchParams } from "react-router-dom";
import "../../../../assets/css/staff/home.css";
import React, { useEffect, useState } from "react";
import FilterStatus from "../../../../components/Staff/FilterStatus";
import { getBadgeClass } from "../../../../helpers/getBadgeClass";
import Search from "../../../../components/Staff/Search";
import DayPicker from "../../../../components/Staff/DayPicker";
import { searchFilter } from "../../../../helpers/searchFilter";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookings } from "../../../../store/staffSlice/bookingSlice";
import { Pagination } from "antd";

function Content() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredBookings, setFilteredBookings] = useState([]); // Mặc định là mảng
  const { data, loading } = useSelector((state) => state.STAFF.booking);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const handleClick = (id) => {
    navigate(`dataDetail?dataID=${id}`);
  };

  useEffect(() => {
    const fetchBookingsData = async () => {
      const response = await dispatch(
        fetchBookings({ page: currentPage - 1, perPage: itemsPerPage })
      ).unwrap();

      
      if (response && response.data) {
        setFilteredBookings(response.data || []); 
      }
    };
    fetchBookingsData();

  }, [dispatch, currentPage]);

  useEffect(() => {
    const type = searchParams.get("type");
    const key = decodeURIComponent(searchParams.get("key") || "");
    const status = searchParams.get("status") || "All";
    const appoinmentAt = searchParams.get("appoinmentAt");

    let updatedBookings = data;

    // Lọc theo trạng thái
    if (status !== "All") {
      updatedBookings = updatedBookings.filter(
        (item) => item.status === status
      );
    }

    // Lọc theo tìm kiếm
    if (type && key) {
      const { filtered } = searchFilter(updatedBookings, key);
      updatedBookings = Array.isArray(filtered) ? filtered : []; // Đảm bảo filtered là mảng
    }

    // Lọc theo ngày
    if (appoinmentAt) {
      updatedBookings = updatedBookings.filter(
        (item) => item.appoinmentAt === appoinmentAt
      );
    }

    setFilteredBookings(updatedBookings);
  }, [searchParams, data, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setSearchParams({
      page,
      type: searchParams.get("type"),
      key: searchParams.get("key"),
      status: searchParams.get("status"),
      appoinmentAt: searchParams.get("appoinmentAt"),
    });
  };

  function formatDateTime(dateTimeString) {
    const date = new Date(dateTimeString);
  
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
  
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const year = date.getFullYear();
  
    return `${hours}:${minutes}:${seconds} ${day}-${month}-${year}`;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="container">
        <div className="card mb-3 card-custom">
          <div className="card-header">Filter & Search</div>
          <div className="card-body row card-body-custom">
            <div className="col-md-6">
              <FilterStatus
                bookings={data}
                setFilteredBookings={setFilteredBookings}
              />
            </div>
            <div className="col-md-6">
              <Search
                bookings={data}
                setFilteredBookings={setFilteredBookings}
              />
            </div>
          </div>
        </div>
        <div className="row mt-3 justify-content-end align-items-center row-custom">
          <div className="col-md-6 result-found">
            <h6>{filteredBookings.length} results found</h6>
          </div>
          <div className="col-md-6">
            <div className="input-group mb-3">
              <DayPicker
                bookings={data}
                setFilteredBookings={setFilteredBookings}
              />
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
                        Contact Phone: 0912313131232
                        <br />
                      </p>
                    </div>
                  </div>
                  <div className="col-md-7 text-center">
                    <div className="Stylist">
                      <h6>Stylist</h6>
                      <span className="block-span">{item.stylist}</span>
                    </div>
                    <div className="BookingDate">
                      <h6>Created At</h6>
                      <span className="block-span">{formatDateTime(item.createdAt)}</span>
                    </div>
                    <div className="ServiceDate">
                      <h6>Appoinment At</h6>
                      <span className="block-span">{item.appoinmentAt}</span>
                    </div>
                    <div className="TotalPrice">
                      <h6>Total Price</h6>
                      <span className="block-span">{item.totalPrice}$</span>
                    </div>
                    <div className="Status">
                      <h6>Status</h6>
                      <span className={`badge ${getBadgeClass(item.status)}`}>
                        {item.status}
                      </span>
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
            total={filteredBookings.length}
            onChange={handlePageChange}
          />
        </div>
      </div>
    </>
  );
}

export default Content;
