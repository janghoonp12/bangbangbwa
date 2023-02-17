package com.bangbang.service;

import com.bangbang.domain.image.ImageRepository;
import com.bangbang.domain.notice.Notice;
import com.bangbang.domain.notice.NoticeRepository;
import com.bangbang.dto.notice.NoticeResponseDto;
import com.bangbang.dto.notice.NoticeSaveRequestDto;
import com.bangbang.dto.notice.NoticeUpdateRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@RequiredArgsConstructor
public class NoticeServiceImpl implements NoticeService{

    @Autowired
    private NoticeRepository noticeRepository;

    @Autowired
    private ImageRepository imageRepository;

    @Transactional
    @Override
    public void newNotice(NoticeSaveRequestDto notice) {
        noticeRepository.save(notice.toEntity());
    }

    @Override
    public Page<NoticeResponseDto> searchNoticeAll(Integer page, Integer size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("notice_id").descending());
        return noticeRepository.findAllNotice(pageable);
    }

    @Override
    public NoticeResponseDto noticeDetail(long noticeId) {
        Notice notice = noticeRepository.findById(noticeId);
        return new NoticeResponseDto(notice);
    }

    @Transactional
    @Override
    public void modifyNotice(NoticeUpdateRequestDto notice) {
        noticeRepository.save(notice.toEntity());
    }

    @Transactional
    @Override
    public void deleteNotice(long noticeId) {
        noticeRepository.deleteById(noticeId);
    }
}