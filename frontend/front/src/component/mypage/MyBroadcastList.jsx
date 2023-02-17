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


function MyBroadcastList(props) {
  const { myBroadcasts, onClickItem } = props;

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