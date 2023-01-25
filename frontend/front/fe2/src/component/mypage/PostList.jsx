import React from "react";
import styled from "styled-components";
import PostListItem from "./PostListitem";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;

    & > * {
        :not(:last-child) {
            margin-bottom: 16px;
        }
    }
`;

// props로 받은 posts에는 post객체들이 들어있다.
// posts 배열에 map함수를 이용하여 각 post 객체에 대해 PostListItem을 만들어서 렌더링한다
function PostList(props) {
    const { posts, onClickItem } = props;

    return (
        <Wrapper>
            {posts.map((post, index) => {
                return (
                    <PostListItem
                        key={post.id}
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