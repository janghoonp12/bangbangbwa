import React from "react";
import styled from "styled-components";
import { useSelector } from 'react-redux';



const SItemDiv = styled.div`
  width: 100%;
  max-width: 70%;
  height: 100%;
  max-height: 50%;
  border: 1px solid grey;
  border-radius: 8px;
  text-align: left;
  padding: 10px;
  margin-left: 10px;
`;

const SFlexDiv = styled.div`
  display: flex;
  height: 100%;
  max-height: 40%;
  width: 100%;
  // max-width: 40%;
  // justify-content: center;
  align-items: center;
  text-align: left;
`;

const SAgreePTag = styled.p`
  font-size: 5px;
  margin-bottom: 0px;
`;

const SPhoneInput = styled.input`
  width: 60px;
`;

const SSubmitDiv = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
`;

const SButton = styled.button`
  border: 0.5px solid grey;
  :hover {
    background: lightgrey;
  }
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