import React from "react";
import { Space, Table, Tag } from "antd";
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
const data = [
  {
    key: "1",
    name: "John Doe",
    status: "active",
    phone: "123-456-7890",
    point: 120,
    createat: "2023-10-01",
  },
  {
    key: "2",
    name: "Jane Smith",
    status: "active",
    phone: "098-765-4321",
    point: 250,
    createat: "2023-09-15",
  },
  {
    key: "3",
    name: "Michael Johnson",
    status: "unactive",
    phone: "234-567-8901",
    point: 300,
    createat: "2023-08-10",
  },
  {
    key: "4",
    name: "Emily Davis",
    status: "active",
    phone: "345-678-9012",
    point: 180,
    createat: "2023-07-20",
  },
  {
    key: "5",
    name: "David Lee",
    status: "unactive",
    phone: "456-789-0123",
    point: 90,
    createat: "2023-06-05",
  },
  {
    key: "6",
    name: "Sarah Miller",
    status: "active",
    phone: "567-890-1234",
    point: 75,
    createat: "2023-09-25",
  },
  {
    key: "7",
    name: "Chris Brown",
    status: "active",
    phone: "678-901-2345",
    point: 220,
    createat: "2023-05-17",
  },
  {
    key: "8",
    name: "Olivia Wilson",
    status: "active",
    phone: "789-012-3456",
    point: 315,
    createat: "2023-04-30",
  },
  {
    key: "9",
    name: "Lucas Garcia",
    status: "active",
    phone: "890-123-4567",
    point: 400,
    createat: "2023-03-11",
  },
  {
    key: "10",
    name: "Sophia Martinez",
    status: "active",
    phone: "901-234-5678",
    point: 270,
    createat: "2023-02-22",
  },
];

const User = () => <Table columns={columns} dataSource={data} />;
export default User;
