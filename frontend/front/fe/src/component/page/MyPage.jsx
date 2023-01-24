import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import PostList from "../list/PostList";
import Button from "../ui/Button";
import data from "../../data.json";

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
`;


function MyPage(props) {
    const {} = props;

    const navigate = useNavigate();

    return (
        <Wrapper>
            <Container>
                <ProfileDiv />
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
                            navigate(`/post/${item.id}`);
                        }}
                    />
                </ItemDiv>
            </Container>
        </Wrapper>
    )
}

export default MyPage;