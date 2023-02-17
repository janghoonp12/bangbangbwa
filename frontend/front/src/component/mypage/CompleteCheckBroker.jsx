import React from "react";
import styled from "styled-components";
import { useSelector } from 'react-redux';



const SFlexDiv = styled.div`
  display: flex;
  height: 100%;
  max-height: 40%;
  width: 100%;
  align-items: center;
  text-align: left;
`;


function CompleteCheckBroker() {

  const { myBrokerInfo } = useSelector((state) => state.userSlice);

  return (
    <>
    <div>
        <p>중개사무소 상호명</p>
        <h2>{myBrokerInfo.brokerName}</h2>
      </div>
      <hr />
      <div>
        <p>연락처</p>
        <SFlexDiv>
          <p><h2>{myBrokerInfo.brokerContact}</h2></p>
        </SFlexDiv>
      </div>
      <hr />
      <div>
        <p>대표 공인중개사 이메일</p>
        <p>
        {myBrokerInfo.brokerEmail}
        </p>
      </div>
    </>
    )
}

export default CompleteCheckBroker;