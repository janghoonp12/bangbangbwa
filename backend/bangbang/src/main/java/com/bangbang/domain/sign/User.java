package com.bangbang.domain.sign;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import lombok.Data;

@Entity
@Data
public class User {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "user_id")
  private Long userId; //PK

  @Column(length = 40, nullable = false, name = "user_email")
  private String userEmail;       // 유저 이메일

  @Column(length = 100, nullable = false)
  private String user_password;               // 유저 비밀번호

  @Column(length = 10, nullable = false, name = "user_nickname")
  private String userNickname;             // 유저 닉네임

  @Column(length = 100, nullable = true)
  private String user_refresh_token; // 토큰

  @Column(length = 10, nullable = false)
  private String user_role;             // 유저 등급

  @Column(length = 1, nullable = false)
  private String user_status;             // 유저 상태

}
