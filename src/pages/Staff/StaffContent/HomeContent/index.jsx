import { useNavigate, useSearchParams } from "react-router-dom";
import "../../../../assets/css/staff/home.css";
import { useEffect, useState } from "react";
import FilterStatus from "../../../../components/Staff/FilterStatus";
import { getBadgeClass } from "../../../../helpers/getBadgeClass";
import Search from "../../../../components/Staff/Search";
import DayPicker from "../../../../components/Staff/DayPicker";
import { searchFilter } from "../../../../helpers/searchFilter";
import Pagination from "../../../../components/Staff/Pagination";

function Content() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [itemOffset, setItemOffset] = useState(0);

  const handleClick = (id) => {
    navigate(`bookingDetail?bookingID=${id}`);
  };

  const [bookings, setBookings] = useState([
    {
      bookingID: "G001",
      name: "Nguyen Van A",
      phone: "0919888333",
      bookingDate: "24/09/2024",
      serviceDate: "28/09/2024",
      stylist: "Ho Van A",
      totalPrice: 99,
      status: "In-progress",
    },
    {
      bookingID: "C002",
      name: "Nguyen Van B",
      phone: "0912312334",
      bookingDate: "24/09/2024",
      serviceDate: "27/09/2024",
      stylist: "Ho Van B",
      totalPrice: 89,
      status: "In-progress",
    },
    {
      bookingID: "C003",
      name: "Nguyen Van C",
      phone: "0912312312",
      bookingDate: "25/09/2024",
      serviceDate: "29/09/2024",
      stylist: "Ho Van C",
      totalPrice: 79,
      status: "In-progress",
    },
    {
      bookingID: "G004",
      name: "Nguyen Van A",
      phone: "0973645892",
      bookingDate: "24/09/2024",
      serviceDate: "28/09/2024",
      stylist: "Ho Van A",
      totalPrice: 99,
      status: "Cancelled",
    },
    {
      bookingID: "G005",
      name: "Nguyen Van B",
      phone: "0973645789",
      bookingDate: "24/09/2024",
      serviceDate: "28/09/2024",
      stylist: "Ho Van A",
      totalPrice: 99,
      status: "Rejected",
    },
  ]);
  const [filteredBookings, setFilteredBookings] = useState(bookings);

  // const [currentPage, setCurrentPage] = useState(1);
  // const [totalPages, setTotalPages] = useState(1);
  // const limit = 4;

  // // Lấy dữ liệu bookings dựa trên trang hiện tại
  // useEffect(() => {
  //   fetchBookings(currentPage);
  // }, [currentPage]);

  // const fetchBookings = async (page) => {
  //   try {
  //     const response = await bookingDetailStaffService.getAll(page, limit);
  //     setBookings(response.data.items); // Dữ liệu từ backend
  //     setTotalPages(response.data.totalPages); // Số trang tổng cộng từ backend
  //   } catch (error) {
  //     console.error("Error fetching bookings:", error);
  //   }
  // };

  // Xử lý khi chuyển trang
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    console.log("--------------------------------------");
    console.log("Initial bookings:", bookings);
    console.log("useEffect is running");
    const type = searchParams.get("type");
    const key = decodeURIComponent(searchParams.get("key"));
    const status = searchParams.get("status") || "All";
    const bookingDate = searchParams.get("bookingDate");
    console.log("type: " + type);
    console.log("key: " + key);
    console.log("status: " + status);
    console.log("bookingDate: " + bookingDate);
    const page = parseInt(searchParams.get("page")) || 1;
    const newOffset = (page - 1) * 4;
    setItemOffset(newOffset);

    let filteredBookings = bookings;

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

    const endOffset = itemOffset + 4;
    const paginatedBookings = filteredBookings.slice(itemOffset, endOffset);

    setFilteredBookings(paginatedBookings);
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
          <div className="col-md-6">
            <div className="input-group mb-3">
              <DayPicker
                bookings={bookings}
                setFilteredBookings={setFilteredBookings}
              />
            </div>
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
