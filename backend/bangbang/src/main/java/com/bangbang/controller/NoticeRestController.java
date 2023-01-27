package com.bangbang.controller;

import com.bangbang.service.NoticeService;
import com.bangbang.service.NoticeServiceImpl;
import com.bangbang.domain.notice.Notice;
import com.bangbang.domain.notice.NoticeRepository;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@Api(value="NoticeRestController-Version 1")
public class NoticeRestController {
  private final NoticeRepository repository;

  @Autowired
  NoticeServiceImpl service;

  @ApiOperation(value = "공지사항 등록", notes = "공지사항을 등록합니다.")
  @PostMapping(value = "/notices/new")
  public Notice newNotice(@RequestBody Notice notice) {
    final Notice params = Notice.builder()
        .notice_title(notice.getNotice_title())
        .notice_regidate(notice.getNotice_regidate())
        .notice_type(notice.getNotice_type())
        .notice_comment(notice.getNotice_comment())
        .notice_status(notice.getNotice_status())
        .user_id(notice.getUser_id())
        .build();

    return repository.save(params);
  }

  @ApiOperation(value = "공지사항 전체검색", notes = "공지사항을 모두 검색합니다.")
  @GetMapping(value = "/notices")
  public ResponseEntity<?> searchNoticeAll(){
    List<Notice> noticeList = repository.findAll();
    if(noticeList != null && !noticeList.isEmpty()) {
      ResponseEntity<List<Notice>> response = new ResponseEntity<List<Notice>>(noticeList, HttpStatus.OK);
      return response;
    }
    else {
      return extracted();
    }
  }

  @ApiOperation(value = "공지사항 상세정보", notes = "공지사항 하나의 정보를 상세하게 보여줍니다.")
  @GetMapping(value = "/notices/{notice_id}")
  public ResponseEntity<?> noticeDetail(@PathVariable("notice_id") int noticeid){
    Notice notice_list = repository.findByNoticeid(noticeid);
    if(notice_list != null) {
      ResponseEntity<Notice> response = new ResponseEntity<Notice>(notice_list, HttpStatus.OK);
      return response;
    }
    else {
      return extracted();
    }
  }

  @ApiOperation(value = "공지사항 내용수정", notes = "수정이 필요한 공지사항을 수정합니다.")
  @Transactional
  @PatchMapping(value = "/notices/modify/{notice_id}")
  public ResponseEntity<?> modifyNotice(@PathVariable("notice_id") int noticeid, @RequestBody Notice notice){
    Notice noticeList = repository.findByNoticeid(noticeid);
    if(noticeList != null) {
      noticeList.setNotice_title(notice.getNotice_title());
      noticeList.setNotice_regidate(notice.getNotice_regidate());
      noticeList.setNotice_type(notice.getNotice_type());
      noticeList.setNotice_comment(notice.getNotice_comment());
      noticeList.setNotice_status(notice.getNotice_status());
      ResponseEntity<Notice> response = new ResponseEntity<Notice>(noticeList, HttpStatus.OK);
      return response;
    }
    else {
      return extracted();
    }
  }

  @ApiOperation(value = "공지사항 삭제", notes = "공지사항 하나를 삭제합니다.")
  @DeleteMapping(value = "/notices/{notice_id}")
  public ResponseEntity<?> deleteNotice(@PathVariable("notice_id") int noticeid) {
    NoticeService.deleteNotice(noticeid);
    return new ResponseEntity<>("", HttpStatus.OK);
  }

  private ResponseEntity extracted() {
    return new ResponseEntity(HttpStatus.NO_CONTENT);
  }
}
