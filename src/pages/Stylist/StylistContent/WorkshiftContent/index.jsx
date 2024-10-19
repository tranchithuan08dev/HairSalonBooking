import { useEffect, useState } from "react";
import "../../../../assets/css/stylist/workshift.css";
import { useDispatch, useSelector } from "react-redux";
import { getAll } from "../../../../store/stylistSlice/stylistWorkShiftSlice";

function Content() {
  // const [data, setData] = useState([]);
  // const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.AUTH);
  console.log("user", currentUser.actorByRole);

  useEffect(() => {
    dispatch(getAll);
  }, []);

  const handleClick = (e) => {
    console.log(e);
  }

  const timeSlots = [
    "9:00 - 10:00",
    "10:00 - 11:00",
    "11:00 - 12:00",
    "12:00 - 13:00",
    "13:00 - 14:00",
    "14:00 - 15:00",
    "15:00 - 16:00",
    "16:00 - 17:00",
    "17:00 - 18:00",
    "18:00 - 19:00",
  ];

  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  // useEffect(() => {
  //   setTimeout(() => {
  //     const fakeData = [
  //       ["booked", "booked", "", "", "", "", ""],
  //       ["", "booked", "", "booked", "", "", ""],
  //       ["", "", "booked", "booked", "", "", ""],
  //       ["booked", "", "", "booked", "", "", ""],
  //       ["", "booked", "", "booked", "", "", ""],
  //       ["", "", "", "", "booked", "", ""],
  //       ["", "", "booked", "", "", "booked", ""],
  //       ["", "", "booked", "booked", "", "", ""],
  //       ["booked", "", "", "", "booked", "", ""],
  //       ["", "", "", "", "", "booked", "booked"],
  //     ];
  //     setData(fakeData);
  //     setLoading(false);
  //   }, 1000);
  // }, []);

  // if (loading) {
  //   return <p>Đang tải dữ liệu...</p>;
  // }

  const getSlotClass = (content) => {
    if (content === "booked") return "booked";
    return "";
  };

  return (
    <>
      {/* <h2 className="header-cus">WorkShift</h2>
      <div className="container customContainer">
        <div className="calendar-view">
          <table className="table table-bordered customTable">
            <thead>
              <tr className="calendar-month-row dayWeek">
                <td className="calendar-prior-months-date dayWeek-date-not">
                  Time
                </td>
                {daysOfWeek.map((day, index) => (
                  <td
                    key={index}
                    className="calendar-prior-months-date dayWeek-date"
                  >
                    {day}
                  </td>
                ))}
              </tr>
            </thead>
            <tbody>
              {timeSlots.map((slot, rowIndex) => (
                <tr key={rowIndex} className="calendar-month-row slotDetail">
                  <td className="slotTime">{slot}</td>
                  {daysOfWeek.map((_, colIndex) => (
                    <td
                      onClick={handleClick}
                      key={colIndex}
                      className={`slotCell ${getSlotClass(
                        data[rowIndex]?.[colIndex]
                      )}`}
                    >
                      <div className="detail">see detail→</div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div> */}
    </>
  );
}

export default Content;
