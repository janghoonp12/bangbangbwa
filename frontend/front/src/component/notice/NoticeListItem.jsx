import React, { useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { searchDetailNoticeAsync, clearSearchDetailNoticeDone } from "../../reducers/noticeSlice"
import { noticeGetFileAsync} from "../../reducers/fileSlice"


const Std = styled.td`
  cursor: pointer;
  :hover {
    text-decoration: underline;
 }
`


function NoticeItem(props) {
  const dispatch = useDispatch();
    const data = props.notice
  const navigate = useNavigate();
  const { searchDetailNoticeDone, noticeDetail } = useSelector((state) => state.noticeSlice);
  const { noticeGetImagesDone } = useSelector((state) => state.fileSlice);
  
  useEffect(() => {
    if (searchDetailNoticeDone) {
      dispatch(clearSearchDetailNoticeDone())
      dispatch(noticeGetFileAsync(noticeDetail.image_id))
    }
    if (noticeGetImagesDone) {
      navigate(`/notices/${data.notice_id}`)
    }
  }, [searchDetailNoticeDone, noticeGetImagesDone])
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