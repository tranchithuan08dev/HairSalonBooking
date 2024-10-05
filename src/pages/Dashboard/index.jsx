import React, { useState } from "react";
import { FileDoneOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import { Outlet, Link } from "react-router-dom";
const { Header, Content, Footer, Sider } = Layout;

const DashBroad = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
          zIndex: 1,
          backgroundColor: "#1c1c1e", // Dark background for sidebar
          boxShadow: "2px 0 8px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
        }}
      >
        <div
          className="demo-logo-vertical"
          style={{
            padding: "20px",
            textAlign: "center",
            color: "#fff",
            fontSize: "24px",
            fontWeight: "bold",
          }}
        >
          {/* Adjust the logo section */}
          Haimony Admin
        </div>
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          style={{
            fontSize: "18px", // Larger font size for the menu items
            fontWeight: "bold",
          }}
          items={[
            {
              key: "1",
              icon: <FileDoneOutlined />,
              label: (
                <Link to={`/dashboard`} style={{ textDecoration: "none" }}>
                  Home
                </Link>
              ),
            },
            {
              key: "2",
              icon: <ShoppingCartOutlined />,
              label: (
                <Link
                  to={`/dashboard/service`}
                  style={{ textDecoration: "none" }}
                >
                  Service
                </Link>
              ),
            },
          ]}
        />
      </Sider>

      <Layout
        style={{
          marginLeft: collapsed ? 80 : 200, // Adjust margin based on the collapsed state
          transition: "margin-left 0.2s", // Smooth transition when collapsing the sidebar
        }}
      >
        <Header
          style={{
            display: "flex", // Use Flexbox for alignment
            justifyContent: "center", // Center the content horizontally
            alignItems: "center", // Center the content vertically
            padding: "20px 0",
            background: colorBgContainer,
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
            height: "100px", // Set a fixed height for proper centering
          }}
        >
          <h1
            style={{
              margin: 0,
              fontSize: "36px", // Increase font size for emphasis
              fontWeight: "bold",
              color: "#454548", // Custom text color
              textTransform: "uppercase", // Uppercase for a stylistic touch
            }}
          >
            Haimony Salon
          </h1>
        </Header>

        <Content
          style={{
            margin: "16px",
          }}
        >
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>

        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default DashBroad;
