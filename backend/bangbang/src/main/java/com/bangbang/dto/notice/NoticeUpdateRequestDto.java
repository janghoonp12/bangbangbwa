package com.bangbang.dto.notice;

import com.bangbang.domain.notice.Notice;
import java.time.LocalDateTime;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class NoticeUpdateRequestDto {
  private long notice_id; //PK
  private long user_id; //FK
  private String notice_title;
  private String notice_type;
  private String notice_comment;
  private int notice_status;  //0 비활성화 1 활성화, db에서 1로 default

  @Builder
  public NoticeUpdateRequestDto(long notice_id, long user_id, String notice_title, String notice_type, String notice_comment) {
    this.notice_id = notice_id;
    this.user_id = user_id;
    this.notice_title = notice_title;
    this.notice_type = notice_type;
    this.notice_comment = notice_comment;
  }

  public Notice toEntity() {
    return Notice.builder()
        .notice_id(notice_id)
        .user_id(user_id)
        .notice_title(notice_title)
        .notice_type(notice_type)
        .notice_comment(notice_comment)
        .build();
  }
}
