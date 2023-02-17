package com.bangbang.service;

import com.bangbang.dto.notice.NoticeResponseDto;
import com.bangbang.dto.notice.NoticeSaveRequestDto;

import com.bangbang.dto.notice.NoticeUpdateRequestDto;
import org.springframework.data.domain.Page;

public interface NoticeService {
    void newNotice(NoticeSaveRequestDto notice);
    Page<NoticeResponseDto> searchNoticeAll(Integer page, Integer size);
    NoticeResponseDto noticeDetail(long noticeId);
    void modifyNotice(NoticeUpdateRequestDto notice);
    void deleteNotice(long noticeId);
}
