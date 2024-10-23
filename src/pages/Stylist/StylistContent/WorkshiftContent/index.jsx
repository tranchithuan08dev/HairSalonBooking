import { useEffect } from "react";
import "../../../../assets/css/stylist/workshift.css";
import { useDispatch, useSelector } from "react-redux";
import { getAll } from "../../../../store/stylistSlice/WorkShiftSlice";
import { useNavigate } from "react-router-dom";

function Content() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.AUTH);
  const { data, loading, error } = useSelector((state) => state.STYLIST.workshift);
  const stylistID = currentUser.actorByRole.stylistID;

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getAll(stylistID)).unwrap();
      } catch (e) {
        console.error("Error fetching data:", e);
      }
    };
    fetchData();
  }, [stylistID, dispatch]);

  const handleClick = (shift) => {
    if (shift) {
      navigate(`bookingDetail?id=${shift.bookingID}`);
    }
  };

  const timeSlots = [
    "08:00 - 09:00",
    "09:00 - 10:00",
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

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const formatTime = (time) => {
    const [hours, minutes] = time.split(":");
    return `${hours}:${minutes}`;
  };

  const getWorkshiftData = (day, slot) => {
    const startTime = slot.split(" - ")[0];
    const foundShift = data.find(
      (shift) =>
        shift.shiftDay === day &&
        formatTime(shift.startTime) === startTime &&
        !shift.deleted
    );
    return foundShift;
  };

  if (loading) {
    return <p>Đang tải dữ liệu...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <h2 className="header-cus">WorkShift</h2>
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
                  {daysOfWeek.map((day, colIndex) => {
                    const shift = getWorkshiftData(day, slot);
                    return (
                      <td
                        onClick={() => handleClick(shift)}
                        key={colIndex}
                        className={`slotCell ${shift ? "booked" : ""}`}
                      >
                        {shift ? (
                          <div className="detail">see detail →</div>
                        ) : null}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Content;
