import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Input, Button } from 'antd';
import useInput from "../../hooks/useInput";
import { useDispatch } from 'react-redux';
import { submitBrokerInfo } from "../../reducers/userSlice"


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

const SSubmitDiv = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
`;

function CheckBroker() {

  return (
    <>
      <div>
        <h2>중개사 정보를 체크하고 있습니다.</h2>
      </div>
      
    </>
    )
}

export default CheckBroker;