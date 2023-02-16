import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { useDispatch, useSelector } from 'react-redux';
import { clearSearchDetailItemDone } from "../../reducers/itemSlice"

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

function RecentViewList({ children }) {
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const { searchDetailItemDone, itemDetail } = useSelector((state) => state.itemSlice);

    useEffect(() => {
      if (searchDetailItemDone) {
        dispatch(clearSearchDetailItemDone())
        navigate(`/items/${itemDetail.item_id}`)
      }
    })

    return (
        <Wrapper>
            {children}
        </Wrapper>
    );
}

export default RecentViewList;