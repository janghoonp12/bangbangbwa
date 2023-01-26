import React from "react";
import { Routes, Route } from "react-router-dom";
import InterestNav from "../component/interest/InterestNav";
import RecentView from "../component/interest/RecentView";
import InterestItem from "../component/interest/InterestItem";
import InterestArea from "../component/interest/InterestArea";
import BookmarkAll from "../component/bookmark/BookmarkAll";



function Interests() {
  
  return (
    <div>
      <h1 align="center">관심 페이지</h1>
      <hr />
      <InterestNav />
      <br />
      <Routes>
        <Route path="/" element= {<RecentView />} />
        <Route path="items" element={<InterestItem />} />
        <Route path="areas" element={<InterestArea />} />
        <Route path="bookmarks" element={<BookmarkAll />}/>
      </Routes>
    </div>
  )
}

export default Interests;