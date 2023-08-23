import React from "react";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { MenuOutlined, UserOutlined } from "@ant-design/icons";
import Users from "./Registration";
const { Header, Content, Footer } = Layout;
import { useLocation, useNavigate } from "react-router-dom";
import "./layout.css";
import { MenuItem } from "@mui/base";
const Nav = (props) => {
  const navigate = useNavigate();
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout className="layout">
      <Header>
        <Menu
          style={{
            display: "flex",
          }}
          theme="dark"
          mode="horizontal"
        >
          <span style={{ marginRight: "20px" }}>IPTV CRUD </span>

          <Menu.Item onClick={() => navigate("/")} key="/streams">
            Stream
          </Menu.Item>
          <Menu.Item onClick={() => navigate("/episodes")} key="/episodes">
            Episode
          </Menu.Item>
          <Menu.Item onClick={() => navigate("/seasons")} key="/seasons">
            Season
          </Menu.Item>
          <Menu.Item onClick={() => navigate("/series")} key="/series">
            Series
          </Menu.Item>
          <Menu.Item onClick={() => navigate("/genres")} key="/genres">
            Genre
          </Menu.Item>

          <Menu.Item
            style={{ marginLeft: "auto" }}
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/login");
            }}
          >
            {" "}
            Logout{" "}
          </Menu.Item>

          <Menu.Item disabled icon={<UserOutlined />}></Menu.Item>
        </Menu>
      </Header>
      <Content
        style={{
          padding: "0 50px",
        }}
      >
        <Breadcrumb
          style={{
            margin: "16px 0",
          }}
        >
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
        </Breadcrumb>
        <div
          className="site-layout-content"
          style={{
            background: colorBgContainer,
          }}
        ></div>
        {props.page}
      </Content>
      <Footer
        style={{
          textAlign: "center",
        }}
      >
        Ant Design ©2023 Created by Ant UED
      </Footer>
    </Layout>
  );
};
export default Nav;
