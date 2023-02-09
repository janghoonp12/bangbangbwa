import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import NoticeAll from "../component/notice/NoticeAll";
import NoticeDetail from "../component/notice/NoticeDetail";
import NoticeNew from "../component/notice/NoticeNew";
import { useDispatch } from "react-redux";
import {searchAllNoticeAsync} from "../reducers/noticeSlice";

export default function Notice() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(searchAllNoticeAsync())
    // console.log(notices)
  }, [])

  return (
    <div>
      <Routes>
        <Route index element={<NoticeAll />} />
        <Route path="new" element={<NoticeNew />} />
        <Route path=":postId" element={<NoticeDetail />} />
      </Routes>
    </div>
  )
}

// export default Notice;