package com.bangbang.controller;

import com.bangbang.domain.notice.Notice;
import com.bangbang.domain.notice.NoticeRepository;
import com.bangbang.dto.notice.NoticeResponseDto;
import com.bangbang.dto.notice.NoticeSaveRequestDto;
import com.bangbang.service.NoticeService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Api(value="NoticeController Version 1")
@RequiredArgsConstructor
public class NoticeRestController {

    @Autowired
    private final NoticeService noticeService;

    @ApiImplicitParams({
            @ApiImplicitParam(name = "X-AUTH-TOKEN", value = "로그인 성공 후 발급 받은 access_token", required = true, dataType = "String", paramType = "header")
    })
    @ApiOperation(value="공지사항 등록")
    @PostMapping("/admin/notices/new")
    public ResponseEntity<?> newNotice(@RequestBody NoticeSaveRequestDto notice) {
        try {
            noticeService.newNotice(notice);
            return new ResponseEntity(HttpStatus.OK);
        } catch (Exception e) {
            System.out.println(e);
            return exceptionHandling();
        }
    }

    @ApiOperation(value="공지사항 전체검색")
    @GetMapping("/notices")
    public ResponseEntity<?> searchNoticeAll() {
        try {
            List<NoticeResponseDto> list =  noticeService.searchNoticeAll();
            return new ResponseEntity<List<NoticeResponseDto>>(list, HttpStatus.OK);
        } catch (Exception e) {
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
    @PatchMapping("/notices/modify")
    public ResponseEntity<?> modifyNotice(@RequestBody Notice notice) {
        try {
            noticeService.modifyNotice(notice);
            return new ResponseEntity(HttpStatus.OK);
        } catch (Exception e) {
            return exceptionHandling();
        }
    }

    @ApiOperation(value="공지사항 삭제")
    @DeleteMapping("/notices/{noticeId}")
    public ResponseEntity<?> modifyNotice(@PathVariable long noticeId) {
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
