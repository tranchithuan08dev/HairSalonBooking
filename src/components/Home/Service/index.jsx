import React, { useEffect, useState } from "react";
import Item from "../CardItem";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostService } from "../../../store/dashbroadSlice";
import { fetchHomeService } from "../../../store/homeSlice";

function Service() {
  const dispatch = useDispatch();
  const [itemsPerPage, setItemsPerPage] = useState(3);

  const total = useSelector((state) => state.DASHBOARD.postService);
  const dataService = useSelector((state) => state.HOME.service);
  console.log("dataService", dataService);
  useEffect(() => {
    dispatch(fetchPostService());
    dispatch(fetchHomeService({ perpage: itemsPerPage }));
  }, [dispatch, itemsPerPage]);

  const loadMore = () => {
    setItemsPerPage((prev) => prev + 3);
  };

  return (
    <>
      <div className="service" style={{ backgroundColor: "#2e2d2d" }}>
        <div className="text-center">
          <h2 className="service-title text-white">Service</h2>
        </div>
        <div className="container mx-auto">
          {/* Row 1 */}
          <div className="row d-flex justify-content-center flex-wrap">
            <div className="row d-flex justify-content-center flex-wrap">
              {dataService.map((item) => (
                <Item key={item.id} data={item} slug="service" />
              ))}
            </div>
          </div>
        </div>
        {total.length > itemsPerPage && (
          <div className="d-flex justify-content-center p-5">
            <button onClick={loadMore} className="loading">
              MORE
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default Service;
