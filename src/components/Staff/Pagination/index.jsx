import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { useSearchParams } from "react-router-dom";

export default function Pagination(props) {
  const { bookings, setFilteredBookings, itemsPerPage } = props;
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const page = parseInt(searchParams.get("page")) || 1; // Lấy giá trị page từ searchParams
    const newOffset = (page - 1) * itemsPerPage; // Tính offset dựa trên page
    setItemOffset(newOffset); // Cập nhật itemOffset
  }, [itemsPerPage, searchParams]);

  // Cập nhật currentItems và pageCount
  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(bookings.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(bookings.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, bookings]);

  // Cập nhật filteredBookings
  useEffect(() => {
    setFilteredBookings(currentItems);
  }, [currentItems, setFilteredBookings]);

  // Xử lý khi người dùng chuyển trang
  const handlePageClick = (event) => {
    const newPage = event.selected + 1; // Trang mới (1-based)
    const newOffset = (newPage - 1) * itemsPerPage; // Tính offset
    setItemOffset(newOffset);

    // Cập nhật searchParams nếu không phải trang đầu tiên
    if (newPage > 1) {
      setSearchParams({ page: newPage });
    } else {
      setSearchParams({}); // Xóa searchParams nếu quay lại trang 1
    }
  };

  return (
    <>
      <div
        style={{ display: "flex", justifyContent: "center", height: "38px" }}
      >
        <ReactPaginate
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel="< previous"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          renderOnZeroPageCount={null}
        />
      </div>
    </>
  );
}
