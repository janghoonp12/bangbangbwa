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