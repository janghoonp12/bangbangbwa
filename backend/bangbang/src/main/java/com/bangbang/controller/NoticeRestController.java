package com.bangbang.controller;

import com.bangbang.domain.notice.Notice;
import com.bangbang.domain.notice.NoticeRepository;
import com.bangbang.dto.notice.NoticeResponseDto;
import com.bangbang.dto.notice.NoticeSaveRequestDto;
import com.bangbang.dto.notice.NoticeUpdateRequestDto;
import com.bangbang.service.NoticeService;
import com.bangbang.service.UserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import java.time.LocalDateTime;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@Api(value="NoticeController Version 1")
@RequiredArgsConstructor
public class NoticeRestController {

    @Autowired
    private final NoticeService noticeService;
    @Autowired
    private final UserService userService;



    @ApiOperation(value="공지사항 등록")
    @PostMapping("/admin/notices/new")
    public ResponseEntity<?> newNotice(@RequestBody NoticeSaveRequestDto notice, HttpServletRequest request) {
        try {
            String token = request.getHeader("X-AUTH-TOKEN").substring(7);
            Long uid = userService.findUserId(token);
            notice.setUser_id(uid);
            noticeService.newNotice(notice);
            return new ResponseEntity(HttpStatus.OK);
        } catch (Exception e) {
            return exceptionHandling();
        }
    }

    @ApiOperation(value="공지사항 전체검색")
    @GetMapping("/notices")
    public ResponseEntity<Page<NoticeResponseDto>> searchNoticeAll(
        @RequestParam(defaultValue = "0") Integer page,
        @RequestParam(defaultValue = "10") Integer size) {
        try {
            Page<NoticeResponseDto> noticePage = noticeService.searchNoticeAll(page, size);
            return new ResponseEntity<Page<NoticeResponseDto>>(noticePage, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println(e.toString());
            return exceptionHandling();
        }
    }

    @ApiOperation(value="공지사항 상세정보")
    @GetMapping("/notices/{noticeId}")
    public ResponseEntity<?> noticeDetail(@PathVariable long noticeId) {
        try {
            NoticeResponseDto notice = noticeService.noticeDetail(noticeId);
            return new ResponseEntity<NoticeResponseDto>(notice, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println(e.toString());
            return exceptionHandling();
        }
    }


    @ApiOperation(value="공지사항 수정")
    @PatchMapping("/admin/notices/modify")
    public ResponseEntity<?> modifyNotice(@RequestBody NoticeUpdateRequestDto notice, HttpServletRequest request) {
        try {
            String token = request.getHeader("X-AUTH-TOKEN").substring(7);
            Long uid = userService.findUserId(token);
            notice.setUser_id(uid);
            noticeService.modifyNotice(notice);
            return new ResponseEntity(HttpStatus.OK);
        } catch (Exception e) {
            return exceptionHandling();
        }
    }


    @ApiOperation(value="공지사항 삭제")
    @DeleteMapping("/admin/notices/{noticeId}")
    public ResponseEntity<?> deleteNotice(@PathVariable long noticeId) {
        try {
            noticeService.deleteNotice(noticeId);
            return new ResponseEntity(HttpStatus.OK);
        } catch (Exception e) {
            return exceptionHandling();
        }
    }

    private ResponseEntity exceptionHandling() {
        return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
