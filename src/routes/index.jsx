import PrivateRoutes from "../components/PrivateRoutes";
import Layout from "../components/StaffLayout";
import BookingDetail from "../pages/Staff/BookingDetail";
import Home from "../pages/Staff/Home";
import Profile from "../pages/Staff/Profile";
import Salary from "../pages/Staff/Salary";

export const routes = [
  {
    element: <PrivateRoutes />,
    children: [
      {
        path: "/staff",
        element: <Layout />,
        children: [
          {
            path: "home",
            element: <Home />,
            children: [
              {
                path: "bookingDetail/:id",
                element: <BookingDetail />,
              },
            ],
          },
          {
            path: "profile",
            element: <Profile />,
          },
          {
            path: "salary",
            element: <Salary />,
          },
        ],
      },
    ],
  },
];
