import React from "react";
import NonLiveBroadcastListItem from "./NonLiveBroadcastListItem";
import datas from "../../data.json";
import styled from "styled-components";
import Filter from "../common/Filter";

const Wrapper = styled.div`
    display: flex;
    margin-top: 20px;
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;

    & > * {
        :not(:last-child) {
            margin-bottom: 15px;
        }
    }
`;


function NonLiveBroadcastList() {

    return (
        <div>
        <Filter />
        <h2 style={{marginTop : '10px'}}>지난 방송 목록</h2>
          <Wrapper>
            {datas.map((data, index) => {
              return (
                <NonLiveBroadcastListItem
                key={data.id}
                data={data}
                />
                );
              })}
          </Wrapper>
        </div>
      )
}

export default NonLiveBroadcastList;