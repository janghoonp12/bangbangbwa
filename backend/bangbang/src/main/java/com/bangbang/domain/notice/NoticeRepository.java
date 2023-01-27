package com.bangbang.domain.notice;

import com.bangbang.domain.notice.Notice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NoticeRepository extends JpaRepository<Notice, Integer> {
  Notice findByNoticeid(Integer noticeid);

}
