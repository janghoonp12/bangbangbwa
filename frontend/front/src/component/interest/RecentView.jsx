import React, { useState, useEffect } from "react";
// import data from "../../data.json";
import RecentViewList from "./RecentViewList";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ItemList from "../item/ItemList";
import ItemListItem from "../item/ItemListItem";
import RecentViewListItem from "./RecentViewListItem";

const SDiv = styled.div`
  display: flex;
  justify-content: center;
`;

const SH3 = styled.h3`
  text-align: center;
  margin-bottom: 20px;
`;

function RecentView() {
  const navigate = useNavigate();
  const [recentItemData, setRecentItemData] = useState(null);

  useEffect(() => {
    setRecentItemData(JSON.parse(sessionStorage.getItem("recentItemData")));
  },[])

  return (
    <div>
      <SH3>최근 본 매물</SH3>
      <SDiv>
      <RecentViewList>
        { recentItemData ? recentItemData.map((item, index) => (
        <RecentViewListItem
          posts={item}
        />
      )
        ) : <label>no data</label>}
        </RecentViewList>
        {/* <ItemList>
      {recentItemData ? recentItemData.map((item, index) => (
        <ItemListItem
          posts={item}
        />
      )
        ) : <label>no data</label>}
      </ItemList> */}
      </SDiv>
    </div>
  )
}

export default RecentView;