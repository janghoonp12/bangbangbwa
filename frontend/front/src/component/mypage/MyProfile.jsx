import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import logosample from "../../assets/logosample.png";
import QuitModal from "../common/ui/QuitModal";
import nicknamelogo from "../../assets/nicknamelogo.png";
import passwordlogo from "../../assets/pwlogo.png";
import updatelogo from "../../assets/updatelogo.png";
import { useDispatch, useSelector } from 'react-redux';
import { searchMyInfoAsync, clearSearchMyInfoDone } from "../../reducers/userSlice"

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
  max-width: 40%;
  // justify-content: center;
  align-items: center;
  text-align: left;
  
`;

const SGridDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr 7fr 1fr;
  align-items: center;
`;

const SLogoDiv = styled.div`
  display: flex;
  justify-content: center;
`;

const SLogoImg = styled.img`
  width: 20px;
  height: 20px;
`;

const SInfoP = styled.p`
  margin-bottom: 0px;
`;

const SQuitDiv = styled.div`
  margin-top: 3rem;
  float: right;
`;

function MyProfile(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.userSlice);

  useEffect(() => {
    dispatch(searchMyInfoAsync())
    dispatch(clearSearchMyInfoDone())
  },[])

  return (
    <Wrapper>
      <Container>
        <SProfileDiv>
          <SImg1 alt="이미지" src={logosample} />
          <SNameP>{ userInfo.userNickname }</SNameP>
          <SEmailP>{ userInfo.userEmail}</SEmailP>
          <SNowMenuP
            style={{ marginTop: "10rem" }}
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
            <div>
              <p>{ userInfo.userNickname }</p>
              <p>{ userInfo.userEmail}</p>
            </div>

          </SFlexDiv>
          <hr />
          <SGridDiv>
            <SLogoDiv>
            < SLogoImg src={nicknamelogo} alt="닉네임로고" />
            </SLogoDiv>
            <SInfoP>닉 네 임 : </SInfoP>
            <SInfoP>{ userInfo.userNickname }</SInfoP>
            <SLogoDiv>
            < SLogoImg src={updatelogo} alt="수정로고" />
            </SLogoDiv>
          </SGridDiv>
          <SGridDiv style={{ marginTop: "5px" }}>
          <SLogoDiv>
            < SLogoImg src={passwordlogo} alt="비밀번호로고" />
            </SLogoDiv>
            <SInfoP>비밀번호: </SInfoP>
            <SInfoP>zx************</SInfoP>
            <SLogoDiv>
            < SLogoImg src={updatelogo} alt="수정로고" />
            </SLogoDiv>
          </SGridDiv>
          <SQuitDiv>
            <QuitModal />
          </SQuitDiv>
        </SItemDiv>
      </Container>
    </Wrapper>
    )
}

export default MyProfile;