package com.bangbang.domain.notice;

import com.bangbang.domain.NoticeDatetime;
import com.bangbang.domain.image.Image;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Entity
@Table(name = "notice")
@NoArgsConstructor
public class Notice extends NoticeDatetime {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private long notice_id; //PK
    @Column(nullable = false)
    @JoinTable(name="user",
            joinColumns = @JoinColumn(name="user_id"),
            inverseJoinColumns = @JoinColumn(name="user_id"))
    private long user_id; //FK

    @Column(nullable = false, length = 40)
    private String notice_title;
    @Column(name="noticeRegidate", insertable = false, updatable = false)
    private LocalDateTime notice_regidate;
    @Column(nullable = false, length = 20)
    private String notice_type;
    @Column(nullable = false, length = 100)
    private String notice_comment;
    @Column(nullable = false)
    private int notice_status;

    @Builder
    public Notice(long notice_id, long user_id, String notice_title, String notice_type, String notice_comment) {
        this.notice_id = notice_id;
        this.user_id = user_id;
        this.notice_title = notice_title;
        this.notice_type = notice_type;
        this.notice_comment = notice_comment;
    }
}
