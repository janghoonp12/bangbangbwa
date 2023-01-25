import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import PostList from "./PostList";
import Button from "../common/ui/Button";
import data from "../../data.json";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Container2 = styled.div`
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


function Container(props) {

    const navigate = useNavigate();

    return (
        <Wrapper>
            <Container2>
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
                            navigate(`/mypage/${item.id}`);
                        }}
                    />
                </ItemDiv>
            </Container2>
        </Wrapper>
    )
}

export default Container;