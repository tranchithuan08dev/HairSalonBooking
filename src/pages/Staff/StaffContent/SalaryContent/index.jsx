import "../../../../assets/css/staff/salary.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect} from "react";
import { fetchData } from "../../../../store/staffSlice/salarySlice";

function Content() {
  const dispatch = useDispatch();
  const {data, loading} = useSelector((state) => state.STAFF.salary);

  const { currentUser } = useSelector((state) => state.AUTH);
  const userID = currentUser?.record.userID;


  useEffect(() => {
    const fetch = async () => {
      console.log(userID);
      await dispatch(fetchData(userID));
    }
    fetch();
    console.log(data);

  }, [dispatch, userID])

  const formatSalary = (salary) => {
    if(salary === null) return "";
    const salaryString = salary.toString();
    let formattedSalary = '';
    const length = salaryString.length;
    for (let i = 0; i < length; i++) {
      formattedSalary = salaryString[length - 1 - i] + formattedSalary;
      if ((i + 1) % 3 === 0 && (i + 1) < length) {
        formattedSalary = ',' + formattedSalary;
      }
    }
    return formattedSalary;
  };
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
        <div className="row row-edit row-cols-1 row-cols-md-2 row-cols-xl-4 custom-tumlum">
          <div className="col-6">
            <div className="card radius-10 border-start border-0 border-3 border-danger test-radius">
              <div className="card-body testcard-body">
                <div className="d-flex align-items-center">
                  <div>
                    <p className="mb-0 text-secondary">Total Revenue of this month</p>
                    <h2 className="my-1 text-danger">{formatSalary(data?.totalSalary)}VND</h2>
                  </div>
                  <div className="widgets-icons-2 rounded-circle bg-gradient-bloody text-white ms-auto">
                    <i className="fa fa-dollar"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row row-edit rowPay">
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
                    {changeDate(data.receivedDate) || "None"}
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
