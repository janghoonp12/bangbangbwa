import React from "react";
import styled from "styled-components";
import MyBroadcastListItem from "./MyBroadcastListItem";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;

// props로 받은 posts에는 post객체들이 들어있다.
// posts 배열에 map함수를 이용하여 각 post 객체에 대해 PostListItem을 만들어서 렌더링한다
function MyBroadcastList(props) {
  const { myBroadcasts, onClickItem } = props;
  console.log(myBroadcasts)

  return (
    <Wrapper>
      {myBroadcasts.map((myBroadcast, index) => {
        return (
          <MyBroadcastListItem
            key={myBroadcast.broadcast_id}
            myBroadcast={myBroadcast}
            onClick={() => {
              onClickItem(myBroadcast);
            }}
          />
        );
      })}
    </Wrapper>
  );
}

export default MyBroadcastList;