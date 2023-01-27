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
`;

const SImg1 = styled.img`
  width: 80%;
  margin-top: 2rem;
  margin-bottom: 1rem;
`;

const SImg2 = styled.img`
  width: 100%;
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
  max-width: 40%;
  // justify-content: center;
  align-items: center;
  text-align: left;
  
`;

const SInfoDiv = styled.div`
  width: 100%;
  max-width: 20%;
`;

function MyProfile(props) {

  const navigate = useNavigate();

  return (
    <Wrapper>
      <Container>
        <SProfileDiv>   
          <SImg1 alt="이미지" src={logosample} />
          <SNameP>UserName</SNameP>
          <SEmailP>abcde@gmail.com</SEmailP>
          <SNowMenuP
            onClick={() => {
              navigate("/mypage")
            }}
          >내 프로필</SNowMenuP>
          <SMenuP
            onClick={() => {
              navigate("/mypage/newbroker")
            }}
          >중개사 등록</SMenuP>
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
            <SInfoDiv>
              <SImg2 alt="이미지" src={logosample} />
            </SInfoDiv>
            <div>
              <p>정진수</p>
              <p>abcde@gmail.com</p>
            </div>

          </SFlexDiv>
          <hr />
          <SFlexDiv>
            <p>닉네임: </p>
            <p>정진츄</p>
          </SFlexDiv>
          <SFlexDiv>
            <p>비밀번호: </p>
            <p>zx************</p>
          </SFlexDiv>
        </SItemDiv>
      </Container>
    </Wrapper>
    )
}

export default MyProfile;