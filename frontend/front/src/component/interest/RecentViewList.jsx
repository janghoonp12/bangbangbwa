import React from "react";
import styled from "styled-components";
import RecentViewListItem from "./RecentViewListItem";

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;
    width: 80%;

    & > * {
        :not(:last-child) {
            margin-bottom: 16px;
        }
    }
`;

function RecentViewList(props) {
    const { posts, onClickItem } = props;

    return (
        <Wrapper>
            {posts.map((post, index) => {
                return (
                    <RecentViewListItem
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

export default RecentViewList;