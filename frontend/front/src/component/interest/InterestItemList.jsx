import React from "react";
import styled from "styled-components";
import InterestItemListItem from "./InterestItemListItem";

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;
    flex-wrap: wrap;

    & > * {
        :not(:last-child) {
            margin-bottom: 16px;
        }
    }
`;

function InterestItemList(props) {
    const { posts, onClickItem } = props;

    return (
        <Wrapper>
            {posts.map((post, index) => {
                return (
                    <InterestItemListItem
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

export default InterestItemList;