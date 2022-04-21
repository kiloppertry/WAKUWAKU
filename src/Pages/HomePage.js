import React from "react";
import Banner from "../components/Banner/Banner";
import CoinsTable from "../components/CoinsTable";

const Homepage = () => {
  return (
    <>
    {/* 轮播图部分 */}
      <Banner />
      {/* 数字货币行情列表部分 */}
      <CoinsTable />
    </>
  );
};

export default Homepage;
