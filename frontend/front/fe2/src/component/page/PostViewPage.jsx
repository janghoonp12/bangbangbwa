import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Button from "../ui/Button";
import data from "../../data.json";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Container = styled.div`
    width: 100%;
    max-width: 70%;
`;

const PostContainer = styled.div`
    padding: 8px 16px;
    border: 1px solid grey;
    border-radius: 8px;
`;

const TitleText = styled.p`
    font-size: 30px;
    font-weight: 500;
`;

const ContentText = styled.p`
    font-size: 20px;
    white-space: pre-wrap;
`;

function PostViewPage() {
    const navigate = useNavigate();
    const {postId} = useParams();
    const post = data.find((item) => {
        return parseInt(item.id) === parseInt(postId);
    });


    return (
        <Wrapper>
            <Container>
                <Button
                    title="뒤로 가기"
                    onClick={() => {
                        navigate("/mypage");
                    }}
                />
                <PostContainer>
                    <TitleText>{post.title}</TitleText>
                    <ContentText>{post.type}</ContentText>
                    <ContentText>{post.building_type}</ContentText>
                    <ContentText>{post.manage_fee}</ContentText>
                </PostContainer>

                <Button
                    title="방송 등록"
                    onClick={() => {
                        navigate(`/mypage/${post.id}/post-write`);
                    }}
                />
            </Container>
        </Wrapper>
    )
}

export default PostViewPage;