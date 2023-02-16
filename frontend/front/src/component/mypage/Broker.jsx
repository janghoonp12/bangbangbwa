import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useDispatch, useSelector } from 'react-redux';

import NewBroker from "./NewBroker";
import CheckBroker from "./CheckBroker";
import CompleteCheckBroker from "./CompleteCheckBroker";

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

function Broker() {

  const { myBrokerInfo } = useSelector((state) => state.userSlice);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  console.log(myBrokerInfo)

  return (
    <SItemDiv>
      {myBrokerInfo ? <></> : <NewBroker/>}
      {myBrokerInfo ? myBrokerInfo.brokerStatus === 0 ? <CheckBroker/> :<></> : <></>}
      {myBrokerInfo ? myBrokerInfo.brokerStatus === 1 ? <CompleteCheckBroker /> :<></> : <></>}
    </SItemDiv>
    )
}

export default Broker;