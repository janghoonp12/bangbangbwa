package com.bangbang.domain.notice;

import com.bangbang.dto.notice.NoticeResponseDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface NoticeRepository extends JpaRepository<Notice, Long> {

    @Query("select new com.bangbang.dto.notice.NoticeResponseDto(n) " +
        "from Notice n " +
        "order by n.notice_id desc")
    Page<NoticeResponseDto> findAllNotice(Pageable pageable);
    Notice findById(long noticeId);
}
