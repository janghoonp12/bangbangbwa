package com.bangbang.service;

import com.bangbang.domain.notice.Notice;
import java.util.List;

public interface NoticeService {

  String newNotice(Notice notice);                        //공지사항 등록


  List<Notice> searchNoticeAll();                         //공지사항 전체검색


  Notice modifyNotice(int noticeid, Notice notice);        //공지사항 수정


  static boolean deleteNotice(int noticeid)                //공지사항 삭제
  {
    return false;
  }

}
