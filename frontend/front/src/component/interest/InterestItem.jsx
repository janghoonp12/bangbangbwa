import React from "react";
import data from "../../data.json";
import RecentViewList from "./RecentViewList";
import { useNavigate } from "react-router-dom";

function InterestItem() {
  const navigate = useNavigate();

  return (
    <div>
      <h3 align="center">관심 매물</h3>
      <RecentViewList
          posts={data}
          onClickItem={(item) => {
              navigate(`/items/${item.id}`);
          }}
        />
    </div>
  )
}

export default InterestItem;