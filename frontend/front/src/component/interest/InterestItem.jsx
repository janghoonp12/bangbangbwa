import React from "react";
import data from "../../data.json";
import InterestItemList from "./InterestItemList";
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

function InterestItem() {
  const navigate = useNavigate();

  return (
    <div>
      <SH3 align="center">관심 매물</SH3>
      <SDiv>
        <InterestItemList
            posts={data}
            onClickItem={(item) => {
                navigate(`/items/${item.id}`);
            }}
          />
      </SDiv>
    </div>
  )
}

export default InterestItem;