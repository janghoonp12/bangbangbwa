package com.bangbang.vo;

import java.time.LocalDateTime;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@EqualsAndHashCode(callSuper = true)
@SuperBuilder
@NoArgsConstructor
@Entity(name = "notice")
public class Notice extends Datetime{
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "notice_id")
  private int noticeid;                         //PK
  @Column(length = 40, nullable = true)
  private String notice_title;                  //공지사항 제목
  @Column(updatable = false, nullable = true)
  private LocalDateTime notice_regidate;        // 공지사항 등록일
  @Column(length = 20, nullable = true)
  private String notice_type;                   //공지사항 유형
  @Column(length = 100, nullable = true)
  private String notice_comment;                //공지사항 내용....100자로 부족하지 않을지
  @Column(length = 1, nullable = true)
  private int notice_status;                    //공지사항 상태
  @Column(length = 10, nullable = false)
  private int user_id;                          //FK
}
