import React from "react";
import data from "../../data.json";
import RecentViewList from "./RecentViewList";
import { useNavigate } from "react-router-dom";

function RecentView() {
  const navigate = useNavigate();

  return (
    <div>
      <h3 align="center">최근 본 매물</h3>
      <RecentViewList
          posts={data}
          onClickItem={(item) => {
              navigate(`/items/${item.id}`);
          }}
        />
    </div>
  )
}

export default RecentView;