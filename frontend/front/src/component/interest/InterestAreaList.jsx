import React from "react";
import styled from "styled-components";
import InterestAreaListItem from "./InterestAreaListItem";
import data from '../../data.json';


const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  & > * {
      :not(:last-child) {
          margin-bottom: 16px;
      }
  }
`;

const H3 = styled.h3`
 text-align: center;
 margin-top: 20px;
`


const AreaDiv = styled.div`
 background-color: #DFD3C3;
 border-radius: 2em;
 margin-bottom: 100px;
`;


function InterestAreaList(props) {
  const area = props.area
  return (
    <AreaDiv>
      <H3>{area.si_name} {area.gugun_name} {area.dong_name}</H3>
      <hr />
      <Wrapper>
          {data.map((data, index) => {
              return (
                  <InterestAreaListItem
                      key={`${area.id}_${data.id}`}
                      area={area}
                      data={data}
                  />
              );
          })}
      </Wrapper>
    </AreaDiv>
  );
}

export default InterestAreaList;