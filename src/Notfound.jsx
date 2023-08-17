import React from "react";
import { Button, Result } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
const Notfound = () => {
  const navigate = useNavigate();
  return (
    <Result
      style={{ width: "76rem" }}
      status="403"
      title="403"
      subTitle="Sorry, you are not authorized to access this page."
      extra={
        <Button type="primary" onClick={() => navigate("/")}>
          Back Home
        </Button>
      }
    />
  );
};
export default Notfound;
