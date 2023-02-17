import React from "react";
import styled from "styled-components";
import { Input, Button } from 'antd';
import useInput from "../../hooks/useInput";
import { useDispatch } from 'react-redux';
import { submitBrokerInfo } from "../../reducers/userSlice"
import Swal from "sweetalert2";


const SFlexDiv = styled.div`
  display: flex;
  height: 100%;
  max-height: 40%;
  width: 100%;
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

function NewBroker() {

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
    Swal.fire({
      icon: 'success',
      title: '중개사 신청 성공!',
      showConfirmButton: false,
      timer: 500
    })
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
