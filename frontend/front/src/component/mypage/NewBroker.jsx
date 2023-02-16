import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Input, Button } from 'antd';
import useInput from "../../hooks/useInput";
import { useDispatch } from 'react-redux';
import { submitBrokerInfo } from "../../reducers/userSlice"

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

function NewBroker() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [broker_name, onChangeBrokerName] = useInput('');
  const [broker_email, onChangeBrokerEmail] = useInput('');
  const [broker_contact, onChangeBrokerContact] = useInput('');

  const onClickSubmit = () => {
    dispatch(submitBrokerInfo(
      {
        "brokerName": broker_name,
        "brokerEmail": broker_email,
        "brokerContact": broker_contact
      }
    ))
    alert('제출이 완료되었습니다.')
  }

  return (
    <>
      <div>
        <p>중개사무소 상호명</p>
        <Input style={{width: "250px"}} value={broker_name} required onChange={onChangeBrokerName} placeholder="중개사무소명을 입력해주세요" />
      </div>
      <hr />
      <div>
        <p>연락처</p>
        <SFlexDiv>
          <p><Input style={{width: "250px"}} value={broker_contact} required onChange={onChangeBrokerContact} placeholder="010-0000-0000" /></p>
        </SFlexDiv>
      </div>
      <hr />
      <div>
        <p>대표 공인중개사 이메일</p>
        <p>
        <Input style={{width: "250px"}} value={broker_email} required onChange={onChangeBrokerEmail} placeholder="이메일을 입력해주세요!" />
        </p>
      </div>
      <hr />
      <div>
        <SAgreePTag><input type="checkbox" />개인정보 수집 동의</SAgreePTag>
        <SSubmitDiv>
          <Button onClick={onClickSubmit}>신청하기</Button>
        </SSubmitDiv>
      </div>
      
    </>
    )
}

export default NewBroker;