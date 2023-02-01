import React from "react";
import data from "../../data.json";
import RecentViewList from "./RecentViewList";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

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

  return (
    <div>
      <SH3>최근 본 매물</SH3>
      <SDiv>
        <RecentViewList
            posts={data}
            onClickItem={(item) => {
                navigate(`/items/${item.id}`);
            }}
          />
      </SDiv>
    </div>
  )
}

export default RecentView;