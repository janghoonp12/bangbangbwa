package com.bangbang.service;

import com.bangbang.vo.Notice;
import com.bangbang.vo.NoticeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("NoticeService")
public class NoticeServiceImpl implements NoticeService{
  @Autowired
  private NoticeRepository repository;

  @Override
  public String newNotice(Notice notice) {
    return null;
  }

  @Override
  public List<Notice> searchNoticeAll() {
    return null;
  }

  @Override
  public Notice modifyNotice(int noticeid, Notice notice) {
    final Notice notice_list = repository.findByNoticeid(noticeid);
    if(notice_list == null) return null;
    else{
      if(notice.getNoticeid() == noticeid){

        notice_list.setNotice_title(notice.getNotice_title());
        notice_list.setNotice_regidate(notice.getNotice_regidate());
        notice_list.setNotice_type(notice.getNotice_type());
        notice_list.setNotice_comment(notice.getNotice_comment());
        notice_list.setNotice_status(notice.getNotice_status());
      }
    }
//        repository.save(notice);
    return notice;
  }

//작성필요
  public boolean deleteNotice(int noticeid) {
    repository.deleteById(noticeid);
    return true;
  }
}
