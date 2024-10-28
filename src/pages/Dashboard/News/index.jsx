import {
  Button,
  Drawer,
  Space,
  Table,
  Tag,
  Form,
  Image,
  Radio,
  Input,
  message,
  Spin,
} from "antd";
import { LoadingOutlined, UploadOutlined } from "@ant-design/icons";
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPostNews,
  fetchPostNewsByID,
  fetchUpdateNews,
} from "../../../store/dashbroadSlice";
import TextArea from "antd/es/input/TextArea";

function News() {
  const dispatch = useDispatch();
  const [avatarUrl, setAvatarUrl] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [newId, setNewId] = useState(null);
  const fileInputRef = useRef(null);
  const [form] = Form.useForm();
  const [isSpin, setIsSpin] = useState(false);
  const dataNews = useSelector((state) => state.DASHBOARD.postNews);
  const auth = useSelector((state) => state.AUTH.currentUser);
  const dataDetailNews = useSelector(
    (state) => state.DASHBOARD.postNewsDetailId
  );
  console.log("dataDetailNews", dataDetailNews);
  // console.log("auth", auth);
  const [open, setOpen] = useState(false);

  if (!dataNews) return <></>;
  if (!dataDetailNews) return <></>;
  useEffect(() => {
    dispatch(fetchPostNews());
  }, [dispatch]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      const imageUrl = URL.createObjectURL(file);
      setAvatarUrl(imageUrl);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  useEffect(() => {
    if (dataDetailNews) {
      form.setFieldsValue({
        titleNews: dataDetailNews.title, // Adjusted from title to titleNews
        type: dataDetailNews.type,
        content: dataDetailNews.content,
        status: dataDetailNews.deleted,
      });
      setAvatarUrl(dataDetailNews.image);
    }
  }, [dataDetailNews, form]);

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
        <Button
          style={{ color: "blue" }}
          onClick={() => showDrawer(record.key)}
        >
          Detail
        </Button>
      ),
    },
  ];

  const data = dataNews.map((item) => ({
    key: item.newsID,
    title: item.title,
    type: item.type,
    status: item.deleted ? "Inactive" : "Active",
  }));

  const showDrawer = (id) => {
    dispatch(fetchPostNewsByID(id));
    setOpen(true);
    setNewId(id);
  };

  const onClose = () => {
    setOpen(false);
  };

  const onFinish = (values) => {
    console.log("values", values);

    setIsSpin(true);
    const updateNews = {
      managerID: auth?.actorByRole?.managerID,
      newsID: newId,
      type: values.type,
      title: values.titleNews,
      content: values.content,
      image: selectedFile,
    };
    console.log("update", updateNews);

    dispatch(fetchUpdateNews(updateNews))
      .then(() => {
        message.success("News updated successfully!");
        setIsSpin(false);
        onClose();
      })
      .catch((error) => {
        message.error(`Failed to update News: ${error.message}`);
        setIsSpin(false);
      });
  };

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  return (
    <>
      <Table columns={columns} dataSource={data} />
      <Drawer
        title="Detail News"
        placement="right"
        width={720}
        onClose={onClose}
        open={open}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
          </Space>
        }
      >
        <Form
          form={form}
          {...layout}
          name="new-service"
          onFinish={onFinish}
          style={{ maxWidth: 600 }}
        >
          <Form.Item wrapperCol={{ offset: 4, span: 20 }}>
            <Space size={12}>
              <Image
                width={200}
                src={avatarUrl || "https://via.placeholder.com/200"}
                style={{
                  borderRadius: "50%",
                  overflow: "hidden",
                  width: "200px",
                  height: "200px",
                }}
              />
              <div>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleImageUpload}
                />
                <Button icon={<UploadOutlined />} onClick={handleUploadClick}>
                  Upload Avatar
                </Button>
              </div>
            </Space>
          </Form.Item>
          <Form.Item
            name="titleNews"
            label="News Name"
            rules={[{ required: true, message: "Please input the News name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Type"
            name="type"
            rules={[{ required: true, message: "Please select the type!" }]}
          >
            <Radio.Group>
              <Radio value="Store News">Store News</Radio>
              <Radio value="combo">Combo</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item name="content" label="Content">
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item name="status" label="Status">
            <Radio.Group>
              <Radio value={true}>InActive</Radio>
              <Radio value={false}>Active</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button type="primary" htmlType="submit">
              {isSpin && (
                <Spin
                  indicator={
                    <LoadingOutlined spin style={{ color: "white" }} />
                  }
                  size="small"
                />
              )}
              Save Change
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
}

export default News;
