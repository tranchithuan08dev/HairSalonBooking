import { useNavigate, useSearchParams } from "react-router-dom";
import "./style.css";
import { useEffect, useState } from "react";
import FilterStatus from "../../../../components/Staff/FilterStatus";
import { getBadgeClass } from "../../../../helpers/getBadgeClass";
import Search from "../../../../components/Staff/Search";
import DayPicker from "../../../../components/Staff/DayPicker";
import { searchFilter } from "../../../../helpers/searchFilter";
import Sort from "../../../../components/Staff/Sort";
import { sortBookings } from "../../../../helpers/sortBookings";
import Pagination from "../../../../components/Staff/Pagination";
// import axios from "axios";

function Content() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleClick = (id) => {
    navigate(`bookingDetail/${id}`);
  };

  // useEffect(() => {
  //   axios
  //     .get("src/api/v1/bookings")
  //     .then((response) => {
  //       console.log(response);
  //       setBookings(response);
  //     })
  //     .catch((error) => {
  //       console.error("There was an error fetching the bookings!", error);
  //     });
  // }, []);

  const [bookings, setBookings] = useState([
    {
      bookingID: "G001",
      name: "Nguyen Van A",
      phone: "0919888333",
      bookingDate: "24/09/2024",
      serviceDate: "28/09/2024",
      stylist: "Ho Van A",
      totalPrice: 99,
      status: "Pending",
    },
    {
      bookingID: "C002",
      name: "Nguyen Van B",
      phone: "0912312334",
      bookingDate: "24/09/2024",
      serviceDate: "27/09/2024",
      stylist: "Ho Van B",
      totalPrice: 89,
      status: "Completed",
    },
    {
      bookingID: "C003",
      name: "Nguyen Van C",
      phone: "0912312312",
      bookingDate: "25/09/2024",
      serviceDate: "29/09/2024",
      stylist: "Ho Van C",
      totalPrice: 79,
      status: "Pending",
    },
    {
      bookingID: "G004",
      name: "Nguyen Van A",
      phone: "0973645892",
      bookingDate: "24/09/2024",
      serviceDate: "28/09/2024",
      stylist: "Ho Van A",
      totalPrice: 99,
      status: "Pending",
    },
    {
      bookingID: "G005",
      name: "Nguyen Van B",
      phone: "0973645789",
      bookingDate: "24/09/2024",
      serviceDate: "28/09/2024",
      stylist: "Ho Van A",
      totalPrice: 99,
      status: "Pending",
    },
  ]);
  const [filteredBookings, setFilteredBookings] = useState(bookings);

  // accept/deny booking
  // const handleStatus = (status, id) => {
  //   setBookings((prevBookings) => {
  //     const updatedBookings = prevBookings.map((booking) => {
  //       if (booking.bookingID === id) {
  //         return {
  //           ...booking,
  //           status: status === "APROVE" ? "Confirmed" : "Rejected",
  //         };
  //       }
  //       return booking;
  //     });
  //     filterBooking(
  //       updatedBookings,
  //       status === "APROVE" ? "Confirmed" : "Rejected"
  //     );

  //     return updatedBookings;
  //   });
  // };

  // const filterBooking = (bookings, statusSet) => {
  //   const filtered = bookings.filter((item) => item.status === statusSet);
  //   setFilteredBookings(filtered);
  // };

  // end accept/deny

  useEffect(() => {
    console.log("--------------------------------------");
    console.log("Initial bookings:", bookings);
    console.log("useEffect is running");
    const type = searchParams.get("type");
    const key = decodeURIComponent(searchParams.get("key"));
    const status = searchParams.get("status") || "All";
    const bookingDate = searchParams.get("bookingDate");
    const sort = searchParams.get("sort");
    console.log("type: " + type);
    console.log("key: " + key);
    console.log("status: " + status);
    console.log("bookingDate: " + bookingDate);
    console.log("sort: " + sort);

    let filteredBookings = bookings;

    if (sort) {
      console.log("before update: ", filteredBookings);
      const sortedBookings = sortBookings(filteredBookings, sort);
      setFilteredBookings(sortedBookings);
      console.log("after update: ", filteredBookings);
    }

    if (status !== "All") {
      filteredBookings = filteredBookings.filter(
        (item) => item.status === status
      );
      console.log("filter by status: ");
      console.log(filteredBookings.length);
    }

    if (type && key) {
      const { filtered } = searchFilter(filteredBookings, key);
      filteredBookings = filtered;
    }

    if (bookingDate) {
      filteredBookings = filteredBookings.filter((item) => {
        return item.bookingDate === bookingDate;
      });
    }
    setFilteredBookings(filteredBookings);
    console.log("Filtered bookings:", filteredBookings);
  }, [searchParams, bookings]);

  return (
    <>
      <div className="container">
        <div className="card mb-3 card-custom">
          <div className="card-header">Filter & Search</div>
          <div className="card-body row card-body-custom">
            <div className="col-md-6">
              <FilterStatus
                bookings={bookings}
                setFilteredBookings={setFilteredBookings}
              />
            </div>
            <div className="col-md-6">
              <Search
                bookings={bookings}
                setFilteredBookings={setFilteredBookings}
              />
            </div>
          </div>
        </div>
        <div className="row mt-3 justify-content-end align-items-center row-custom">
          <div className="col-md-6 result-found">
            <h6>{filteredBookings.length} results found</h6>
          </div>
          <div className="col-md-3">
            <div className="input-group mb-3">
              <DayPicker
                bookings={bookings}
                setFilteredBookings={setFilteredBookings}
              />
            </div>
          </div>

          <div className="col-md-3">
            <Sort
              bookings={bookings}
              setFilteredBookings={setFilteredBookings}
            />
          </div>
        </div>
        <div className="mt-4 custom-mt">
          {filteredBookings.map((item, index) => (
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
                        Contact Phone: {item.phone}
                        <br />
                        Name: {item.name}
                      </p>
                    </div>
                  </div>
                  <div className="col-md-7 text-center">
                    <div className="Stylist">
                      <h6>Stylist</h6>
                      <span className="block-span">{item.stylist}</span>
                    </div>
                    <div className="BookingDate">
                      <h6>Booking Date</h6>
                      <span className="block-span">{item.bookingDate}</span>
                    </div>
                    <div className="ServiceDate">
                      <h6>Service Date</h6>
                      <span className="block-span">{item.serviceDate}</span>
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
          ))}
        </div>
        <Pagination
          bookings={bookings}
          setFilteredBookings={setFilteredBookings}
          itemsPerPage={4}
        />
      </div>
    </>
  );
}

export default Content;