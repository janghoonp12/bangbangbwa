package com.bangbang.dto.notice;

import com.bangbang.domain.notice.Notice;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class NoticeResponseDto {
    private long notice_id; //PK
    private long user_id; //FK
    private String notice_title;
    private LocalDateTime notice_regidate;
    private String notice_type;
    private String notice_comment;
    private int notice_status;  //0 비활성화 1 활성화, db에서 1로 default

    private Long image_id;

    public NoticeResponseDto(Notice entity) {
        this.notice_id = entity.getNotice_id();
        this.user_id = entity.getUser_id();
        this.notice_title = entity.getNotice_title();
        this.notice_regidate = entity.getNotice_regidate();
        this.notice_type = entity.getNotice_type();
        this.notice_comment = entity.getNotice_comment();
        this.notice_status = entity.getNotice_status();
        this.image_id = entity.getImage().getImageId();
    }
}
