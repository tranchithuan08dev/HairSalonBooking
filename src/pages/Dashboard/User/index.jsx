import { useEffect, useState } from "react";
import {
  Button,
  Drawer,
  Form,
  Input,
  Space,
  Table,
  Image,
  DatePicker,
  Radio,
  Tag,
} from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPostCustomer,
  fetchPostCustomerById,
} from "../../../store/dashbroadSlice";

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

const User = () => {
  const [open, setOpen] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const dataCustomer = useSelector((state) => state.DASHBOARD.postCustomer);
  const dataCustomerDetail = useSelector(
    (state) => state.DASHBOARD.postCustomerById
  );
  console.log(dataCustomerDetail);

  useEffect(() => {
    dispatch(fetchPostCustomer());
  }, [dispatch]);

  if (dataCustomer == null) return <></>;

  useEffect(() => {
    if (dataCustomerDetail) {
      form.setFieldsValue({
        fullName: dataCustomerDetail.fullName,
        point: dataCustomerDetail.loyaltyPoints,
        status: dataCustomerDetail.deleted,
      });
    }
  }, [dataCustomerDetail, form]);

  const showLargeDrawer = (customerId) => {
    setSelectedCustomer(customerId);
    dispatch(fetchPostCustomerById(customerId));
    setOpen(true);
  };

  const onClose = () => {
    setSelectedCustomer(null);
    setOpen(false);
  };

  const onFinish = (values) => {
    console.log(values);
  };

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
        <Tag color={status === "Active" ? "green" : "red"}>
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
      title: "Created At",
      key: "createAt",
      dataIndex: "createAt",
    },
    {
      title: "Action",
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

  const data = dataCustomer.map((index) => ({
    key: index.id,
    name: index.customerName,
    status: index.deleted ? "Active" : "UnActive",
    phone: index.phone,
    point: index.loyaltyPoints,
    createAt: dayjs(index.createdAt).format(dateFormat),
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
          form={form}
          {...layout}
          name="nest-messages"
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
            </Space>
          </Form.Item>
          <Form.Item name="fullName" label="Stylist Name">
            <Input />
          </Form.Item>

          <Form.Item name="point" label="Loyalty Points">
            <Input />
          </Form.Item>

          <Form.Item name="status" label="Status">
            <Radio.Group>
              <Radio value={true}>True</Radio>
              <Radio value={false}>False</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            wrapperCol={{
              ...layout.wrapperCol,
              offset: 8,
            }}
          >
            <Button type="primary" htmlType="submit">
              Update Customer
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
};

export default User;
