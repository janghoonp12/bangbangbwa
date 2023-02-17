import React, { useState, useEffect } from "react";
import RecentViewList from "./RecentViewList";
import styled from "styled-components";
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
          item={item}
        />
      )
        ) : <label>no data</label>}
        </RecentViewList>
      </SDiv>
    </div>
  )
}

export default RecentView;