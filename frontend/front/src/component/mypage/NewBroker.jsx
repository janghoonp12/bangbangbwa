import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import logosample from "../../assets/logosample.png"

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  display: flex;    
  width: 100%;
  max-width: 70%;
`;

const SProfileDiv = styled.div`
  width: 100%;
  max-width: 30%;
  height: 700px;
  border: 1px solid grey;
  border-radius: 8px;
`;

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

const SImg1 = styled.img`
  width: 80%;
  margin-top: 2rem;
  margin-bottom: 1rem;
`;

const SNameP = styled.p`
  font-size: 20px;
`;

const SEmailP = styled.p`
  margin-bottom: 5rem;
  font-size: 10px;
`;

const SMenuP = styled.p`
  font-size: 15px;
  cursor: pointer;
`;

const SNowMenuP = styled.p`
  font-size: 15px;
  text-decoration-line: underline;
  cursor: pointer;
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

function NewBroker(props) {

  const navigate = useNavigate();

  const onClickSubmit = () => {
    alert('제출이 완료되었습니다.')
  }

  return (
    <Wrapper>
      <Container>
        <SProfileDiv>   
          <SImg1 alt="이미지" src={logosample} />
          <SNameP>UserName</SNameP>
          <SEmailP>abcde@gmail.com</SEmailP>
          <SMenuP
            style={{ marginTop: "10rem" }}
            onClick={() => {
              navigate("/mypage")
            }}
          >내 프로필</SMenuP>
          <SNowMenuP
            onClick={() => {
              navigate("/mypage/newbroker")
            }}
          >중개사 등록</SNowMenuP>
          <SMenuP
            onClick={() => {
              navigate("/mypage/myitem")
            }}
          >나의 매물정보</SMenuP>
          <SMenuP
            onClick={() => {
              navigate("/mypage/mybroadcast")
            }}
          >나의 방송정보</SMenuP>

        </SProfileDiv>
        <SItemDiv>
          <div>
            <p>기본정보</p>
          </div>
          <SFlexDiv>
            <div>
              <p>정진수</p>
              <p>abcde@gmail.com</p>
            </div>

          </SFlexDiv>
          <hr />
          <div>
            <p>중개사무소 정보</p>
            <SButton>중개사무소 찾기</SButton>
          </div>
          <hr />
          <div>
            <p>연락처</p>
            <SFlexDiv>
              <p><SPhoneInput type="text" /> - <SPhoneInput type="text" /> - <SPhoneInput type="text" /></p>
            </SFlexDiv>
          </div>
          <hr />
          <div>
            <p>대표 공인중개사 이메일</p>
            <p>
              <input style={{ width: "120px" }}type="text"
              /> @ <input style={{ width: "120px" }} type="text"
              />
            </p>
          </div>
          <hr />
          <div>
            <SAgreePTag><input type="checkbox" />개인정보 수집 동의</SAgreePTag>
            <SSubmitDiv>
              {/* <input type="button" value="신청하기"/> */}
              <SButton onClick={onClickSubmit}>신청하기</SButton>
            </SSubmitDiv>
          </div>
          
        </SItemDiv>
      </Container>
    </Wrapper>
    )
}

export default NewBroker;