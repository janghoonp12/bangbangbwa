import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import MyBroadcastList from "./MyBroadcastList";
import data from "../../broadcastdata.json";
import Pagination from "../common/ui/Pagination";
import { useSelector } from 'react-redux';

const SItemDiv = styled.div`
  width: 100%;
  max-width: 70%;
  // height: 700px;
  // border: 1px solid grey;
  border-radius: 8px;
  margin-left: 10px;
  // overflow: auto;
`;

function MyBroadcast() {

  const navigate = useNavigate();

  // Pagination을 위한 작업
  // const [data, setData] = useState([]); // 총 매물 수
  const limit = 5 // 한 페이지에 나올 매물 수
  const [page, setPage] = useState(1); // 페이지
  const offset = (page - 1) * limit; // 페이지별 매물들을 받아오기 위한 index offset

  // useEffect로 BE에 data를 요청해야 하는 것 같음. 일단은 더미데이터로

  const { myBroadcast } = useSelector((state) => state.broadcastSlice);

  return (
    <SItemDiv>
      <MyBroadcastList
        myBroadcasts={myBroadcast.slice(offset, offset+limit)}
        onClickItem={(item) => {
          navigate(`/broadcasts/${item.broadcast_id}`);
        }}
      />
      <Pagination
        total={myBroadcast.length}
        limit={limit}
        page={page}
        setPage={setPage}
      />
    </SItemDiv>
  )
}

export default MyBroadcast;