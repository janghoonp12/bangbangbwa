package com.bangbang.vo;

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
  private int userid; //PK

  @Column(length = 40, nullable = false)
  private String user_email;       // 유저 이메일

  @Column(length = 100, nullable = false)
  private String user_password;               // 유저 비밀번호

  @Column(length = 10, nullable = false)
  private String user_nickname;             // 유저 닉네임

  @Column(length = 50, nullable = true)
  private String user_access_token;             // 토큰

  @Column(length = 10, nullable = false)
  private String user_role;             // 유저 등급

  @Column(length = 1, nullable = false)
  private String user_status;             // 유저 상태

}
