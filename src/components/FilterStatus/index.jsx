import { useSearchParams } from "react-router-dom";

function FilterStatus(props) {
  const { bookings, setFilteredBookings } = props;
  const [searchParams, setSearchParams] = useSearchParams();

  const handleFilterStatus = (status) => {
    const params = new URLSearchParams(searchParams);
  
    if (status === "All") {
      params.delete("status");
      setFilteredBookings(bookings); 
    } else {
      params.set("status", status);
      const filteredBookings = bookings.filter((item) => item.status === status);
      setFilteredBookings(filteredBookings);
    }
    setSearchParams(params);
  };

  return (
    <>
      <button
        className="btn btn-sm ml-1 btn-outline-success active"
        onClick={() => handleFilterStatus("All")}
      >
        All
      </button>
      <button
        className="btn btn-sm ml-1 btn-outline-warning"
        onClick={() => handleFilterStatus("Pending")}
      >
        Pending
      </button>
      <button
        className="btn btn-sm ml-1 btn-outline-primary"
        onClick={() => handleFilterStatus("Confirmed")}
      >
        Confirmed
      </button>
      <button
        className="btn btn-sm ml-1 btn-outline-danger"
        onClick={() => handleFilterStatus("Rejected")}
      >
        Rejected
      </button>
      <button
        className="btn btn-sm ml-1 btn-outline-info"
        onClick={() => handleFilterStatus("In-progress")}
      >
        In-progress
      </button>
      <button
        className="btn btn-sm ml-1 btn-outline-success"
        onClick={() => handleFilterStatus("Completed")}
      >
        Completed
      </button>
      <button
        className="btn btn-sm ml-1 btn-outline-secondary"
        onClick={() => handleFilterStatus("Cancelled")}
      >
        Cancelled
      </button>
    </>
  );
}

export default FilterStatus;
