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

const ProfileDiv = styled.div`
  width: 100%;
  max-width: 30%;
  border: 1px solid grey;
  border-radius: 8px;
`;

const ItemDiv = styled.div`
  width: 100%;
  max-width: 70%;
  height: 100%;
  max-height: 50%;
  border: 1px solid grey;
  border-radius: 8px;
  text-align: left;
  padding: 10px;
`;

const ImgTag = styled.img`
  width: 80%;
  margin-top: 2rem;
  margin-bottom: 1rem;
`;

const ImgTag2 = styled.img`
  width: 100%;
`;

const NamePTag = styled.p`
  font-size: 20px;
`;

const EmailPTag = styled.p`
  margin-bottom: 5rem;
  font-size: 10px;
`;

const MenuPTag = styled.p`
  font-size: 15px;
  cursor: pointer;
`;

const NowMenuPTag = styled.p`
  font-size: 15px;
  text-decoration-line: underline;
  cursor: pointer;
`;

const FlexDiv = styled.div`
  display: flex;
  height: 100%;
  max-height: 40%;
  width: 100%;
  max-width: 40%;
  // justify-content: center;
  align-items: center;
  text-align: left;
  
`;

const InfoDiv = styled.div`
  width: 100%;
  max-width: 20%;
`;

const AgreePTag = styled.p`
  font-size: 5px;
`;

function NewBroker(props) {

  const navigate = useNavigate();

  return (
    <Wrapper>
      <Container>
        <ProfileDiv>   
          <ImgTag alt="이미지" src={logosample} />
          <NamePTag>UserName</NamePTag>
          <EmailPTag>abcde@gmail.com</EmailPTag>
          <MenuPTag
            onClick={() => {
              navigate("/mypage")
            }}
          >내 프로필</MenuPTag>
          <NowMenuPTag
            onClick={() => {
              navigate("/mypage/newBroker")
            }}
          >중개사 등록</NowMenuPTag>
          <MenuPTag
            onClick={() => {
              navigate("/mypage/myItem")
            }}
          >나의 매물정보</MenuPTag>
          <MenuPTag
            onClick={() => {
              navigate("/mypage")
            }}
          >나의 방송정보</MenuPTag>

        </ProfileDiv>
        <ItemDiv>
          <div>
            <p>기본정보</p>
          </div>
          <FlexDiv>
            <InfoDiv>
              <ImgTag2 alt="이미지" src={logosample} />
            </InfoDiv>
            <div>
              <p>정진수</p>
              <p>abcde@gmail.com</p>
            </div>

          </FlexDiv>
          <hr />
          <div>
            <p>중개사무소 정보</p>
            <p>중개사무소 찾기</p>
          </div>
          <hr />
          <div>
            <p>연락처</p>
            <FlexDiv>
              <p>010 - </p>
              <p>1234 - </p>
              <p>1234</p>
            </FlexDiv>
          </div>
          <hr />
          <div>
            <p>대표 공인중개사 이메일</p>
            <p>abcde@gmail.com</p>
          </div>
          <hr />
          <div>
            <AgreePTag>개인정보 수집 동의</AgreePTag>
          </div>
        </ItemDiv>
      </Container>
    </Wrapper>
    )
}

export default NewBroker;