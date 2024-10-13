import React, { useEffect } from "react";
import { Space, Table, Tag } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostCustomer } from "../../../store/dashbroadSlice";
import customParseFormat from "dayjs/plugin/customParseFormat";
import dayjs from "dayjs";

const User = () => {
  dayjs.extend(customParseFormat);
  const dateFormat = "YYYY/MM/DD";
  const dataCustomer = useSelector((state) => state.DASHBOARD.postCustomer);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPostCustomer());
  }, [dispatch]);

  if (dataCustomer == null) return <></>;
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "active" ? "green" : "red"}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Point",
      dataIndex: "point",
      key: "point",
    },
    {
      title: "Create At",
      key: "create at",
      dataIndex: "createat",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a>Disable</a>
        </Space>
      ),
    },
  ];
  const data = dataCustomer.map((index) => ({
    key: index.id,
    name: index.customerName,
    status: index.deleted ? "Active" : "UnActive",
    phone: index.phone,
    point: index.loyaltyPoints,
    createat: dayjs(index.createdAt).format(dateFormat),
  }));

  return (
    <>
      <Table columns={columns} dataSource={data} />;
    </>
  );
};
export default User;
