import { useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { searchFilter } from "../../helpers/searchFilter";

function Search(props) {
  const { bookings, setFilteredBookings } = props;
  const [searchParams, setSearchParams] = useSearchParams();
  const searchRef = useRef(null);
  const handleSearch = () => {
    if (searchRef.current) {
      const value = searchRef.current.value;
      const { type, key, filtered } = searchFilter(bookings, value);

      const param = new URLSearchParams(searchParams);
      if (type) {
        param.set("type", type);
        param.set("key", encodeURIComponent(key));
        setSearchParams(param);
        setFilteredBookings(filtered);
      } else {
        alert("Please enter any word or number!");
      }
    }
  };

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch();
        }}
      >
        <input
          ref={searchRef}
          type="text"
          className="form-control"
          placeholder="Search by phone or name"
        />
        <input type="submit" className="searchSubmit" />
      </form>
    </>
  );
}

export default Search;
