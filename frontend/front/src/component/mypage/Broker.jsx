import React from "react";
import styled from "styled-components";
import { useSelector } from 'react-redux';

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


function Broker() {

  const { myBrokerInfo } = useSelector((state) => state.userSlice);

  return (
    <SItemDiv>
      {myBrokerInfo ? <></> : <NewBroker/>}
      {myBrokerInfo ? myBrokerInfo.brokerStatus === 0 ? <CheckBroker/> :<></> : <></>}
      {myBrokerInfo ? myBrokerInfo.brokerStatus === 1 ? <CompleteCheckBroker /> :<></> : <></>}
    </SItemDiv>
    )
}

export default Broker;