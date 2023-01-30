package com.bangbang.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class SignIn {

  @NotNull
  @Size(min = 6, max = 20, message = "아이디는 6글자이상 20글자 이하입니다.")
  @Pattern(regexp = "^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$",  message = "이메일만 사용 가능합니다.")
  private String id;

  @NotNull(message = "비밀번호는 공백일 수 없습니다.")
  @Size(min = 8, max = 30, message = "비밀번호는은 8글자 이상 30글자 이하입니다.")
  private String pw;

}
