import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

const AuthLoader: React.FC = () => (
  <Spin indicator={<LoadingOutlined style={{color:"white" ,fontSize: 24 }} spin />} />
);

export default AuthLoader;
