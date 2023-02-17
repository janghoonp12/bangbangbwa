import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from 'react-redux';
import { searchInterestAllAsync } from "../../reducers/itemSlice";
import RecentViewList from "./RecentViewList";
import RecentViewListItem from "./RecentViewListItem";


const SDiv = styled.div`
  display: flex;
  justify-content: center;
`;

const SH3 = styled.h3`
  text-align: center;
  margin-bottom: 20px;
`;


function InterestItem() {
  const dispatch = useDispatch();


  const { myInterests } = useSelector((state) => state.itemSlice);

  useEffect(() => {
    dispatch(searchInterestAllAsync())
  },[])

  return (
    <div>
      <SH3 align="center">관심 매물</SH3>
      <SDiv>
      <RecentViewList>
        { myInterests ? myInterests.map((item, index) => (
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

export default InterestItem;