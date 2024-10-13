import { useEffect, useState } from "react";
import {
  Button,
  Drawer,
  Form,
  Input,
  Space,
  Table,
  Upload,
  Image,
  InputNumber,
  TimePicker,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPostService,
  fetchPostServiceById,
} from "../../../store/dashbroadSlice";
import dayjs from "dayjs";
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const Service = () => {
  const [open, setOpen] = useState(false);
  const [size, setSize] = useState();
  const [avatarUrl, setAvatarUrl] = useState("");
  const [selectServiceId, setSelectServiceId] = useState(null);
  const timeFormat = "HH:mm";
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPostService());
  }, [dispatch]);
  const dataService = useSelector((state) => state.DASHBOARD.postService);
  const dataServiceDetail = useSelector(
    (state) => state.DASHBOARD.postServiceById
  );

  if (dataService == null) return <></>;
  if (dataServiceDetail == null) return <></>;
  console.log(dataServiceDetail);

  const showLargeDrawer = (serviceID) => {
    setSize("Detail");
    setSelectServiceId(serviceID);
    dispatch(fetchPostServiceById(serviceID));
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
    setSelectServiceId(null);
  };

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      console.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      console.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };

  const handleChangeImage = (info) => {
    if (info.file.status === "done") {
      const reader = new FileReader();
      reader.onload = (e) => setAvatarUrl(e.target.result);
      reader.readAsDataURL(info.file.originFileObj);
    }
  };

  const onFinish = (values) => {
    console.log("Form values:", values);
  };

  const columns = [
    {
      title: "Service Name",
      dataIndex: "servicename",
      key: "servicename",
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <Button
          style={{ color: "blue" }}
          onClick={() => showLargeDrawer(record.key)}
        >
          Details
        </Button>
      ),
    },
  ];

  const data = dataService.map((index) => ({
    key: index.id,
    servicename: index.serviceName,
    duration: index.duration,
    price: index.price,
  }));

  return (
    <>
      <Table columns={columns} dataSource={data} />
      <Drawer
        title={`${size} Service`}
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
          {...layout}
          name="service-form"
          onFinish={onFinish}
          style={{ maxWidth: 600 }}
        >
          <Form.Item
            wrapperCol={{
              offset: 4,
              span: 20,
            }}
          >
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
              <Upload
                name="file"
                beforeUpload={beforeUpload}
                onChange={handleChangeImage}
              >
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
              </Upload>
            </Space>
          </Form.Item>
          <Form.Item name="serviceName" label="Service Name">
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input.TextArea />
          </Form.Item>
          <Form.Item name="price" label="Price">
            <InputNumber addonAfter="VND" />
          </Form.Item>
          <Form.Item name="duration" label="Duration">
            <TimePicker format={timeFormat} />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              ...layout.wrapperCol,
              offset: 8,
            }}
          >
            <Button type="primary" htmlType="submit">
              Edit service
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
};

export default Service;
