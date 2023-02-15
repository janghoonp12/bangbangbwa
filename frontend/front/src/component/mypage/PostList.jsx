import React, { useEffect } from "react";
import styled from "styled-components";
import PostListItem from "./PostListitem";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { clearSearchDetailItemDone } from "../../reducers/itemSlice"

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
function PostList(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { posts, onClickItem } = props;
  const { searchDetailItemDone, itemDetail } = useSelector((state) => state.itemSlice);
  useEffect(() => {
    if (searchDetailItemDone) {
      dispatch(clearSearchDetailItemDone())
      navigate(`/items/${itemDetail.item_id}`)
    }
  }, [searchDetailItemDone])

  return (
    <Wrapper>
      {posts.map((post, index) => {
        return (
          <PostListItem
            key={post.item.item_id}
            post={post}
            onClick={() => {
              onClickItem(post);
            }}
          />
        );
      })}
    </Wrapper>
  );
}

export default PostList;