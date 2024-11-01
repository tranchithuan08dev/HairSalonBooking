import React, { useEffect, useState } from "react";
import Item from "../CardItem";
import { useDispatch, useSelector } from "react-redux";

import { fetchHomeStylist } from "../../../store/homeSlice";
import { fetchPostStylist } from "../../../store/dashbroadSlice";

function Stylist() {
  const dispatch = useDispatch();
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const dataStylistFilter = useSelector((state) => state.HOME.stylist);
  const totalStylist = useSelector((state) => state.DASHBOARD.postStylist);

  const dataStylist = dataStylistFilter.filter(
    (stylist) => stylist.deleted === false
  );
  const total = totalStylist.filter((stylist) => stylist.deleted === false);
  console.log("dataStylist", dataStylist);
  console.log("totalStylist", total);

  useEffect(() => {
    dispatch(fetchPostStylist());
    dispatch(fetchHomeStylist({ perpage: itemsPerPage }));
  }, [dispatch, itemsPerPage]);

  const loadMore = () => {
    setItemsPerPage((prev) => prev + 3);
  };

  return (
    <>
      <div className="service" style={{ backgroundColor: "#2e2d2d" }}>
        <div className="text-center">
          <h2 className="service-title text-white">Stylist</h2>
        </div>
        <div className="container mx-auto">
          {/* Row 1 */}
          <div className="row d-flex justify-content-center flex-wrap">
            {dataStylist.map((item) => (
              <Item key={item.id} data={item} slug="stylist" />
            ))}
          </div>
        </div>
        {total.length > itemsPerPage && (
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

export default Stylist;
