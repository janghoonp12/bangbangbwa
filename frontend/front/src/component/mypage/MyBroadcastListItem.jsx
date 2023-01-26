import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Button from "../common/ui/Button";

const Wrapper = styled.div`
  width: calc(100% - 32px);
  padding: 16px;
  display: flex;
  flex-direction: column;
  // align-items: center;
  justify-content: center;
  border: 1px solid grey;
  border-radius: 8px;
  cursor: pointer;
  background: white;
  :hover {
    background: lightgrey;
  }
`;

const TitleDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ButtonDiv = styled.div`
  float: right;
`;

const TitleText = styled.p`
font-size: 20px;
font-weight: 500;
  justify-content: center;
  align-items: center;
`;

const ContentDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;
const ContentText = styled.p`
  display: flex;
  font-size: 15px;
  margin-right: 20px;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

// TitleText를 이용해서 props로 받은 post객체내의 title문자열을 표시해준다
function MyBroadcastListItem(props) {
  const { myBroadcast, onClick } = props;
  const navigate = useNavigate();

  return (
    <Wrapper onClick={onClick}>
      <TitleDiv>
        <TitleText>{myBroadcast.title}</TitleText>
        <ButtonDiv>
          <Button
            style={{position: 'absolute', right: 0, marginRight: "0px"}}
            title="Go Live"
            onClick={() => {
              navigate("/");
            }}
          />
        </ButtonDiv>
      </TitleDiv>
      <ContentDiv>
        <ContentText>{myBroadcast.description}</ContentText>
        <ContentText>{myBroadcast.reservation_time}</ContentText>
      </ContentDiv>
    </Wrapper>
  );
}

export default MyBroadcastListItem