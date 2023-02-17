package com.bangbang.dto.sign;


import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SignUp {

  @NotNull
  @Size(min = 6, max = 20, message = "이메일은 6글자이상 20글자 이하입니다.")
  @Pattern(regexp = "^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$",  message = "이메일만 사용 가능합니다.")
  private String userEmail;

  @NotNull(message = "비밀번호는 공백일 수 없습니다.")
  @Size(min = 8, max = 30, message = "비밀번호는은 8글자 이상 30글자 이하입니다.")
  private String userPassword;

  @NotNull(message = "닉네임은 공백일 수 없습니다.")
  @Size(min = 1, max = 10, message = "닉네임은 1글자 이상 10글자 이하입니다.")
  private String userNickname;


}
