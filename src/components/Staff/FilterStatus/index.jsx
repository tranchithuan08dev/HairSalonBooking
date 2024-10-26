import { useSearchParams } from "react-router-dom";

function FilterStatus() {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleFilterStatus = (status) => {
    const params = new URLSearchParams(searchParams);
    
      if (status === "All") {
        setSearchParams(new URLSearchParams());
      } else {
        params.set("status", status);
        setSearchParams(params);
      }
    
  };

  return (
    <>
      <button
        className="btn btn-sm ml-1 btn-outline-danger"
        onClick={() => handleFilterStatus("All")}
      >
        All
      </button>
      <button
        className="btn btn-sm ml-1 btn-outline-primary"
        onClick={() => handleFilterStatus("In-progress")}
      >
        In-progress
      </button>
      <button
        className="btn btn-sm ml-1 btn-outline-secondary"
        onClick={() => handleFilterStatus("Cancelled")}
      >
        Cancelled
      </button>
      <button
        className="btn btn-sm ml-1 btn-outline-warning" 
        onClick={() => handleFilterStatus("Done")}
      >
        Done
      </button>
      <button
        className="btn btn-sm ml-1 btn-outline-success"
        onClick={() => handleFilterStatus("Completed")}
      >
        Completed
      </button>
      
    </>
  );
}

export default FilterStatus;
