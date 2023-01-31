package com.bangbang.service;

import com.bangbang.domain.notice.Notice;
import com.bangbang.dto.notice.NoticeResponseDto;
import com.bangbang.dto.notice.NoticeSaveRequestDto;

import java.util.List;

public interface NoticeService {
    void newNotice(NoticeSaveRequestDto notice);
    List<NoticeResponseDto> searchNoticeAll();
    NoticeResponseDto noticeDetail(long noticeId);
    void modifyNotice(Notice notice);
    void deleteNotice(long noticeId);
}
