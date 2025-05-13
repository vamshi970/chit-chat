import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
// import { RotatingLines } from "react-loader-spinner";
const DashboardLoader = () => {
  return (
    <Spin
      indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />}
      className="w-full h-full flex items-center justify-center my-10"
    />
    // <div className="w-full h-full flex items-center justify-center" >
    //   <RotatingLines
    //     visible={true}
    //     // height="96"
    //     width="96"
    //     // color="grey"
    //     strokeWidth="5"
    //     animationDuration="0.75"
    //     ariaLabel="rotating-lines-loading"
    //     // wrapperStyle={{}}
    //     // wrapperClass=""
    //   />
    // </div>
  );
};

export default DashboardLoader;
