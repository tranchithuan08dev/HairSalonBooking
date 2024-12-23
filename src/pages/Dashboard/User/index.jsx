import { useEffect, useState } from "react";
import {
  Button,
  Drawer,
  Form,
  Input,
  Space,
  Table,
  Image,
  Radio,
  Tag,
  message,
} from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPostCustomer,
  fetchPostCustomerById,
  fetchUpdateCustomer,
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
  console.log("dataCustomer", dataCustomer);

  console.log("dataCustomerDetail", dataCustomerDetail);

  console.log(dataCustomerDetail);

  useEffect(() => {
    dispatch(fetchPostCustomer());
  }, [dispatch]);

  if (dataCustomer == null) return <></>;
  if (dataCustomerDetail == null) return <></>;
  useEffect(() => {
    if (dataCustomerDetail) {
      form.setFieldsValue({
        fullName: dataCustomerDetail?.customer?.fullName,
        point: dataCustomerDetail?.customer?.loyaltyPoints,
        status: dataCustomerDetail?.customer?.deleted,
        phoneNumber: dataCustomerDetail?.user?.phoneNumber,
        email: dataCustomerDetail?.user?.email,
      });
      setAvatarUrl(dataCustomerDetail.user?.avatar);
    }
  }, [dataCustomerDetail, form]);

  const showLargeDrawer = (customerId) => {
    setSelectedCustomer(customerId);
    dispatch(fetchPostCustomerById(customerId));
    setOpen(true);
  };

  const onClose = () => {
    setSelectedCustomer(null);
    dispatch(fetchPostCustomer());
    setOpen(false);
  };

  const onFinish = (values) => {
    const updateCustomer = {
      customerID: dataCustomerDetail?.customer.customerID,
      userID: dataCustomerDetail?.user?.userID,
      loyaltyPoints: values.point,
      deleted: values.status,
    };
    dispatch(fetchUpdateCustomer(updateCustomer))
      .then(() => {
        message.success("Customer updated successfully!");
        onClose();
      })
      .catch((error) => {
        message.error(`Failed to update Customer: ${error.message}`);
      });
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
    status: index.deleted ? "InActive" : "Active",
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
            <Input disabled />
          </Form.Item>
          <Form.Item label="Phone" name="phoneNumber">
            <Input type="text" disabled />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input type="email" disabled />
          </Form.Item>
          <Form.Item name="point" label="Loyalty Points">
            <Input />
          </Form.Item>

          <Form.Item name="status" label="Status">
            <Radio.Group>
              <Radio value={true}>Inactive</Radio>
              <Radio value={false}>Active</Radio>
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
