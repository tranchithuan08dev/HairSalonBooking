import React, { useEffect } from "react";
import { Table, Tag } from "antd"; // Import Ant Design components
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { fetchHistoryBooking } from "../store/bookingSlice";

const BookingHistory = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.AUTH.currentUser);
  const dataHistory = useSelector((state) => state.BOOKING.historyBooking);
  console.log("auth", auth);
  console.log("dataHistory", dataHistory);

  useEffect(() => {
    if (auth?.actorByRole?.customerID) {
      dispatch(fetchHistoryBooking(auth.actorByRole.customerID));
    }
  }, [auth, dispatch]);

  const data = dataHistory.map((item, index) => {
    return {
      id: item.id || index + 1,
      date: item.createdAt,
      status: item.status || "Completed",
      originalPrice: item.originalPrice,
    };
  });

  const columns = [
    {
      title: "#",
      dataIndex: "id",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Date",
      dataIndex: "date",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status) => (
        <Tag color={status === "Completed" ? "green" : "orange"}>{status}</Tag>
      ),
    },
    {
      title: "Original Price",
      dataIndex: "originalPrice",
    },
  ];

  return (
    <div
      className="d-flex flex-column min-vh-100"
      style={{ backgroundColor: "#f8f9fa" }}
    >
      <Header />
      <div className="container my-4 flex-grow-1">
        <h2 className="text-center mb-4">Booking History</h2>
        <Table
          dataSource={data}
          columns={columns}
          rowKey="id"
          pagination={false}
        />
      </div>
      <Footer />
    </div>
  );
};

export default BookingHistory;
