package com.bangbang.service;

import com.bangbang.domain.notice.Notice;
import com.bangbang.domain.notice.NoticeRepository;
import com.bangbang.dto.notice.NoticeResponseDto;
import com.bangbang.dto.notice.NoticeSaveRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class NoticeServiceImpl implements NoticeService{

    @Autowired
    private NoticeRepository noticeRepository;

    @Transactional
    @Override
    public void newNotice(NoticeSaveRequestDto notice) {
        noticeRepository.save(notice.toEntity());
    }

    @Override
    public List<NoticeResponseDto> searchNoticeAll() {
        return noticeRepository.findAll().stream()
                .map(NoticeResponseDto::new)
                .collect(Collectors.toList());
    }

    @Override
    public NoticeResponseDto noticeDetail(long noticeId) {
        Notice notice = noticeRepository.findById(noticeId);
        return new NoticeResponseDto(notice);
    }

    @Transactional
    @Override
    public void modifyNotice(Notice notice) {
        noticeRepository.save(notice);
    }

    @Transactional
    @Override
    public void deleteNotice(long noticeId) {
        noticeRepository.deleteById(noticeId);
    }
}