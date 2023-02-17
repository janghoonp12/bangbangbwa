import React from "react";
import styled from "styled-components";
import { useDispatch } from 'react-redux';
import { searchDetailNoticeAsync } from "../../reducers/noticeSlice"

const Std = styled.td`
  cursor: pointer;
  :hover {
    text-decoration: underline;
 }
`


function NoticeItem(props) {
  const dispatch = useDispatch();
  const data = props.notice
    const onClick = () => {
      dispatch(searchDetailNoticeAsync(data.notice_id))
    }

    return (
    <tr style={{fontSize: '20px'}}>
      <td style={{width: '10%'}}><center>{props.num}</center></td>
      <Std onClick={onClick} style={{width: '70%', fontWeight: '600', color: 'blue'}}>{data.notice_title}</Std>
      <td style={{width: '20%'}}><center>{data.notice_regidate}</center></td>
    </tr>
    )
  }
  
  export default NoticeItem;