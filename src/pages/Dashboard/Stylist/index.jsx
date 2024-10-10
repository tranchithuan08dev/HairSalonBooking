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
  Tag,
  Radio,
  DatePicker,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostStylist } from "../../../store/dashbroadSlice";

dayjs.extend(customParseFormat);
const dateFormat = "YYYY/MM/DD";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const Stylist = () => {
  const [open, setOpen] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [selectedStylist, setSelectedStylist] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPostStylist());
  }, [dispatch]);

  const dataStylist = useSelector((state) => state.DASHBOARD.postStylist);

  if (dataStylist == null) {
    return <></>;
  }

  const showLargeDrawer = (stylist) => {
    setSelectedStylist(stylist); // Set the selected stylist's data
    setOpen(true);
  };

  const onClose = () => {
    setSelectedStylist(null); // Reset selected stylist
    setOpen(false);
  };

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      console.error("You can only upload JPG/PNG files!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      console.error("Image must be smaller than 2MB!");
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
    // Handle the submit logic here (e.g., update stylist data)
  };

  const columns = [
    {
      title: "Stylist Name",
      dataIndex: "stylistname",
      key: "stylistname",
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
      title: "Hire Date",
      dataIndex: "hiredate",
      key: "hiredate",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <span>
          <Button
            style={{ color: "blue" }}
            onClick={() => showLargeDrawer(record.key)}
          >
            Detail
          </Button>
        </span>
      ),
    },
  ];

  const data = dataStylist.map((index) => ({
    key: index.id,
    stylistname: index.fullName,
    status: index.deleted ? "Inactive" : "Active",
    phone: index.email,
    hiredate: index.hireDate,
  }));

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
      >
        <Form
          {...layout}
          name="nest-messages"
          onFinish={onFinish}
          style={{
            maxWidth: 600,
          }}
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
          <Form.Item
            name="stylistname"
            label="Stylist Name"
            // initialValue={selectedStylist?.fullName}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Gender">
            <Radio.Group defaultValue={selectedStylist?.gender}>
              <Radio value="male">Male</Radio>
              <Radio value="female">Female</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            name="birth"
            label="Date of birth"
            // initialValue={dayjs(selectedStylist?.birthDate, dateFormat)}
          >
            <DatePicker format={dateFormat} />
          </Form.Item>
          <Form.Item
            name="address"
            label="Address"
            // initialValue={selectedStylist?.address}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            name="level"
            label="Level"
            // initialValue={selectedStylist?.level}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item
            name="hiredate"
            label="Hire Date"
            initialValue={dayjs(selectedStylist?.hireDate, dateFormat)}
          >
            <DatePicker format={dateFormat} />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            // initialValue={selectedStylist?.description}
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              ...layout.wrapperCol,
              offset: 8,
            }}
          >
            <Button type="primary" htmlType="submit">
              Edit Service
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
};

export default Stylist;
