import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";


const Std = styled.td`
  cursor: pointer;
  :hover {
    text-decoration: underline;
 }
`


function NoticeItem(props) {
    const data = props.notice
    const navigate = useNavigate();
    const onClick = () => {
        navigate(`/notices/${data.id}`)
    }

    return (
    <tr style={{fontSize: '20px'}}>
      <td style={{width: '10%'}}><center>{data.id}</center></td>
      <Std onClick={onClick} style={{width: '70%', fontWeight: '600', color: 'blue'}}>[{data.type}] {data.title}</Std>
      <td style={{width: '20%'}}><center>{data.regidate}</center></td>
    </tr>
    )
  }
  
  export default NoticeItem;