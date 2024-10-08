import { useNavigate } from "react-router-dom";
import "../../../../assets/css/createBooking.css";

function CreateBookingContent() {
  const navigate = useNavigate();

    const navigateHome = () => {
        navigate("/staff/home");
    }
  return (
    <>
      <button className="back-button" onClick={navigateHome}><span>← go back</span></button>
    </>
  );
}

export default CreateBookingContent;
