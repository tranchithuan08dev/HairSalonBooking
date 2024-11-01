import { useEffect, useRef, useState } from "react";
import {
  Button,
  Drawer,
  Form,
  Input,
  Space,
  Table,
  Image,
  InputNumber,
  Tag,
  Radio,
  message,
  Spin,
} from "antd";
import { LoadingOutlined, UploadOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPostService,
  fetchPostServiceById,
  fetchUpdateService,
} from "../../../store/dashbroadSlice";
import { formatPriceToUSD } from "../../../helpers";
import CurrencyFormat from "react-currency-format";

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
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const [selectServiceId, setSelectServiceId] = useState(null);
  const [isSpin, setIsSpin] = useState(false);
  const [form] = Form.useForm();

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
  console.log("dataServiceDetail", dataServiceDetail);

  useEffect(() => {
    if (dataServiceDetail) {
      form.setFieldsValue({
        serviceName: dataServiceDetail.serviceName,
        price: formatPriceToUSD(dataServiceDetail.price),
        type: dataServiceDetail.type,
        duration: dataServiceDetail.duration,
        description: dataServiceDetail.description,
        status: dataServiceDetail.deleted,
      });
      setAvatarUrl(dataServiceDetail.img);
    }
  }, [dataServiceDetail, form]);

  const showLargeDrawer = (serviceID) => {
    setSize("Detail");
    setSelectServiceId(serviceID);
    dispatch(fetchPostServiceById(serviceID));
    setOpen(true);
  };

  const onClose = () => {
    dispatch(fetchPostService());
    setOpen(false);
    setSelectServiceId(null);
  };

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

  const onFinish = (values) => {
    setIsSpin(true);
    const updateService = {
      serviceID: selectServiceId,
      serviceName: values.serviceName,
      type: values.type,
      price: values.price.replace(/,/g, ""),
      description: values.description,
      duration: values.duration,
      deleted: values.status,
      img: selectedFile,
    };
    console.log("updateService", updateService);

    dispatch(fetchUpdateService(updateService))
      .then(() => {
        setIsSpin(false);
        message.success("Service updated successfully!");
        onClose();
      })
      .catch((error) => {
        setIsSpin(false);
        message.error(`Failed to update service: ${error.message}`);
      });
  };

  const columns = [
    {
      title: "Service Name",
      dataIndex: "servicename",
      key: "servicename",
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
      title: "Duration(Mins)",
      dataIndex: "duration",
      key: "duration",
    },
    {
      title: "Price(USD)",
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
    status: index.deleted ? "Inactive" : "Active",
    servicename: index.serviceName,
    duration: index.duration,
    price: formatPriceToUSD(index.price),
  }));
  console.log("dataService", dataService);

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
          form={form}
          {...layout}
          name="service-form"
          onFinish={onFinish}
          style={{ maxWidth: 600 }}
        >
          <Form.Item wrapperCol={{ offset: 4, span: 20 }}>
            <Space size={12}>
              <Image
                width={200}
                src={avatarUrl}
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
                  Upload Image
                </Button>
              </div>
            </Space>
          </Form.Item>
          <Form.Item
            name="serviceName"
            label="Service Name"
            rules={[
              { required: true, message: "Please enter the service name" },
              {
                max: 100,
                message: "Service name cannot exceed 100 characters",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="price"
            label="Price"
            rules={[
              { required: true, message: "Please enter the price" },
              {
                validator: (_, value) => {
                  if (value && isNaN(value.replace(/[^0-9]/g, ""))) {
                    return Promise.reject(
                      new Error("Price must be a valid number")
                    );
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <CurrencyFormat
              customInput={Input}
              thousandSeparator={true}
              decimalScale={0}
              fixedDecimalScale={false}
              allowNegative={false}
            />
          </Form.Item>
          <Form.Item
            name="type"
            label="Type"
            rules={[{ required: true, message: "Please select a type" }]}
          >
            <Radio.Group>
              <Radio value={"single"}>Single</Radio>
              <Radio value={"combo"}>Combo</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            name="duration"
            label="Duration"
            rules={[
              { required: true, message: "Please enter the duration" },
              {
                type: "number",
                min: 1,
                message: "Duration must be a positive number",
              },
            ]}
          >
            <InputNumber />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[
              { required: true, message: "Please enter a description" },
              { max: 500, message: "Description cannot exceed 500 characters" },
            ]}
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: "Please select a status" }]}
          >
            <Radio.Group>
              <Radio value={false}>Active</Radio>
              <Radio value={true}>Inactive</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            wrapperCol={{
              ...layout.wrapperCol,
              offset: 8,
            }}
          >
            <Button type="primary" htmlType="submit">
              {isSpin && (
                <Spin
                  indicator={
                    <LoadingOutlined spin style={{ color: "white" }} />
                  }
                  size="small"
                />
              )}
              Save Changes
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
};

export default Service;
