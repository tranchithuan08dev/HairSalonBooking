import React, { useEffect, useState } from "react";
import Item from "../CardItem";
import { fetchPostNews } from "../../../store/dashbroadSlice";
import { fetchHomeNews } from "../../../store/homeSlice";
import { useDispatch, useSelector } from "react-redux";

function NewBlog() {
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const dispatch = useDispatch();
  const total = useSelector((state) => state.DASHBOARD.postNews);
  const dataNews = useSelector((state) => state.HOME.news);
  useEffect(() => {
    dispatch(fetchPostNews());
    dispatch(fetchHomeNews({ perpage: itemsPerPage }));
  }, [dispatch, itemsPerPage]);
  const loadMore = () => {
    setItemsPerPage((prev) => prev + 3);
  };
  return (
    <>
      <div className="service" style={{ backgroundColor: "#2e2d2d" }}>
        <div className="text-center">
          <h2 className="service-title text-white">News Blog</h2>
        </div>
        <div className="container mx-auto">
          {/* Row 1 */}
          <div className="row d-flex justify-content-center flex-wrap">
            {dataNews.map((item) => (
              <Item key={item.id} data={item} slug="news" />
            ))}
          </div>
        </div>
        {total?.length > itemsPerPage && (
          <div className="d-flex justify-content-center p-5">
            <button onClick={loadMore} className="loading">
              Xem thêm
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default NewBlog;
