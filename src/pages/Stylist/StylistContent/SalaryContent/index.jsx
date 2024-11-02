import "../../../../assets/css/stylist/salary.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchData } from "../../../../store/stylistSlice/SalarySlice";

function Content() {
  const dispatch = useDispatch();
  const {data, loading} = useSelector((state) => state.STYLIST.salary);

  const { currentUser, token } = useSelector((state) => state.AUTH);
  const stylistID = currentUser?.actorByRole.stylistID;
  const userID = currentUser?.record.userID;

  useEffect(() => {
    const fetch = async () => {
      await dispatch(fetchData({userID: userID ,stylistID: stylistID, token: token}));
    }
    fetch();
  }, [dispatch, stylistID])

  const changeDate = (date) => {
    if (!date) return "";
    let year = date.slice(0, 4);
    let month = date.slice(5, 7);
    let day = date.slice(8, 10);
    return `${day}-${month}-${year}`;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="container test-container">
      <div className="row rowSalary row-cols-1 row-cols-md-2 row-cols-xl-4 custom-tumlum">
          <div className="col-6">
            <div className="card radius-10 border-start border-0 border-3 border-danger test-radius">
              <div className="card-body testcard-body">
                <div className="d-flex align-items-center">
                  <div>
                    <p className="mb-0 text-secondary">Total Appoinment</p>
                    <h2 className="my-1 text-danger">{data.count || 0}</h2>
                  </div>
                  <div className="widgets-icons-2 rounded-circle bg-gradient-bloody text-white ms-auto">
                    <i className="fa fa-dollar"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        
        <div className="col-6">
            <div className="card radius-10 border-start border-0 border-3 border-danger test-radius">
              <div className="card-body testcard-body">
                <div className="d-flex align-items-center">
                  <div>
                    <p className="mb-0 text-secondary">Total Revenue</p>
                    <h2 className="my-1 text-danger">{data.salary?.totalSalary || ""}VND</h2>
                  </div>
                  <div className="widgets-icons-2 rounded-circle bg-gradient-bloody text-white ms-auto">
                    <i className="fa fa-dollar"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>
        <div className="row rowPay rowSalary">
          <div className="col-12">
            <div
              className="card radius-10 border-start border-0 border-3 border-warning customPay"
              style={{ padding: "30px", minHeight: "250px" }}
            >
              <div className="card-body card-setting">
                <div className="d-flex align-items-center justify-content-between">
                  <h1
                    className="mb-0 text-secondary"
                    style={{ fontSize: "2.5rem" }}
                  >
                    Last Payday
                  </h1>
                  <h2
                    className="my-1 text-warning"
                    style={{ fontSize: "2rem" }}
                  >
                    {changeDate(data.salary?.receivedDate) || ""}
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Content;