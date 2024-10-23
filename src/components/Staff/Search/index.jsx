import { useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { searchFilter } from "../../../helpers/searchFilter";

function Search(props) {
  const { bookings } = props;
  const [searchParams, setSearchParams] = useSearchParams();
  const searchRef = useRef(null);
  const handleSearch = () => {
    if (searchRef.current) {
        const value = searchRef.current.value.trim();
        const { key } = searchFilter(bookings, value); 
        const param = new URLSearchParams(searchParams);
        param.set("key", encodeURIComponent(key));
        setSearchParams(param);
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
          placeholder="Search by phone"
        />
        <input type="submit" className="searchSubmit" />
      </form>
    </>
  );
}

export default Search;
