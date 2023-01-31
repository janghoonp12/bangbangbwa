package com.bangbang.domain.notice;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;

@Getter
@Entity
@Table(name = "notice")
@SuperBuilder
@NoArgsConstructor
public class Notice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long notice_id; //PK
    @Column(nullable = false)
    @JoinTable(name="user",
            joinColumns = @JoinColumn(name="user_id"),
            inverseJoinColumns = @JoinColumn(name="user_id"))
    private long user_id; //FK
    @Column(nullable = false, length = 40)
    private String notice_title;
    @Column(nullable = false)
    private String notice_regidate;
    @Column(nullable = false, length = 20)
    private String notice_type;
    @Column(nullable = false, length = 100)
    private String notice_comment;
    @Column(nullable = false)
    private int notice_status;
}
