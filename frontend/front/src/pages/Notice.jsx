import React from "react";
import { Routes, Route } from "react-router-dom";
import NoticeAll from "../component/notice/NoticeAll";
import NoticeDetail from "../component/notice/NoticeDetail";
import NoticeNew from "../component/notice/NoticeNew";

export default function Notice() {
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