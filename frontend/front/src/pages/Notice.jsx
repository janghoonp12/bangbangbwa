import React from "react";
import { Routes, Route } from "react-router-dom";
import NoticeAll from "../component/notice/NoticeAll";
import NoticeDetail from "../component/notice/NoticeDetail";

function Notice() {
  return (
    <div>
      <h1 align="center">
        공지사항
      </h1>
      <br />
      <Routes>
        <Route index element={<NoticeAll />} />
        <Route path=":postId" element={<NoticeDetail />} />
      </Routes>
    </div>
  )
}

export default Notice;