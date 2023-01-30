import React from "react";
import { Routes, Route } from "react-router-dom";
import NoticeAll from "../component/notice/NoticeAll";
import NoticeDetail from "../component/notice/NoticeDetail";

export default function Notice() {
  return (
    <div>
      <Routes>
        <Route index element={<NoticeAll />} />
        <Route path=":postId" element={<NoticeDetail />} />
      </Routes>
    </div>
  )
}

// export default Notice;