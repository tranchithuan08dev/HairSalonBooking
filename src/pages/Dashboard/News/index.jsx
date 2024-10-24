import { Button, Drawer, Space, Table, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostNews } from "../../../store/dashbroadSlice";

function News() {
  const dispatch = useDispatch();
  const dataNews = useSelector((state) => state.DASHBOARD.postNews);
  console.log("dataNews", dataNews.data);
  const [open, setOpen] = useState(false);
  if (!dataNews) return <></>;
  useEffect(() => {
    dispatch(fetchPostNews());
  }, [dispatch]);

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "Active" ? "green" : "red"}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <span>
          <Button
            style={{ color: "blue" }}
            onClick={() => showDrawer(record.key)}
          >
            Detail
          </Button>
        </span>
      ),
    },
  ];

  const data = dataNews.map((item) => ({
    key: item.newsID,
    title: item.title,
    type: item.type,
    status: item.deleted ? "Inactive" : "Active",
  }));

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Table columns={columns} dataSource={data} />
      <Drawer
        title="Detail Stylist"
        placement="right"
        width={720}
        onClose={onClose}
        open={open}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
          </Space>
        }
      ></Drawer>
    </>
  );
}

export default News;
