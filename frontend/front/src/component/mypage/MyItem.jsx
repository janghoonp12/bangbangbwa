import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import PostList from "./PostList";
import Button from "../common/ui/Button";
import data from "../../data.json";
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
  border: 1px solid grey;
  border-radius: 8px;
  // overflow: auto;
`;

const ImgTag = styled.img`
  width: 80%;
  margin-top: 2rem;
  margin-bottom: 1rem;
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

function MyItem(props) {

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
          <MenuPTag
            onClick={() => {
              navigate("/mypage/newbroker")
            }}
          >중개사 등록</MenuPTag>
          <NowMenuPTag
            onClick={() => {
              navigate("/mypage/myitem")
            }}
          >나의 매물정보</NowMenuPTag>
          <MenuPTag
            onClick={() => {
              navigate("/mypage/mybroadcast")
            }}
          >나의 방송정보</MenuPTag>
        </ProfileDiv>
        <ItemDiv>
          <Button
            style={{position: 'absolute', right: 0, marginRight: "30px"}}
            title="필터"
            onClick={() => {
            navigate("/");
            }}
          />
          <PostList
            posts={data}
            onClickItem={(item) => {
              navigate(`/mypage/myitem/${item.id}`);
            }}
          />
        </ItemDiv>
      </Container>
    </Wrapper>
  )
}

export default MyItem;