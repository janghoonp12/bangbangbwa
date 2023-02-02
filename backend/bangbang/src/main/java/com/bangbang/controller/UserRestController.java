package com.bangbang.controller;


import com.bangbang.dto.SignIn;
import com.bangbang.dto.sign.FindPassword;
import com.bangbang.dto.sign.SignUp;
import com.bangbang.service.UserServiceImpl;
import com.bangbang.domain.sign.User;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.web.bind.annotation.RequestBody;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@Api(value="UserRestController-Version 1")
public class UserRestController {

  @Autowired
  private UserServiceImpl userService;

  @GetMapping({"", "/"})
  public String index() {
    return "index";
  }

  @ApiOperation(value = "회원 등록", notes = "회원을 등록합니다.")
  @PostMapping("/users/new")
  public ResponseEntity<?> signUp(@RequestBody SignUp SignUpInfo) throws Exception {
    System.out.println(SignUpInfo);

    userService.signUp(SignUpInfo);

    return new ResponseEntity<Object>(new HashMap<String, Object>() {{
      put("result", true);
      put("msg", "회원가입을 성공하였습니다.");
    }}, HttpStatus.OK);

  }

  @ApiOperation(value="로그인", notes = "req_data : [id, pw]")
  @PostMapping("/login")
  public ResponseEntity<?> login(@RequestBody SignIn user) throws Exception {
    Map<String, Object> token = userService.login(user);
    return new ResponseEntity<Object>(new HashMap<String, Object>() {{
      put("result", true);
      put("msg", "로그인을 성공하였습니다.");
      put("access-token", token.get("access-token"));
      put("refresh-token", token.get("refresh-token"));
      put("nickname", token.get("nickname"));
      put("email", token.get("email"));
      put("id", token.get("id"));

    }}, HttpStatus.OK);
  }

  @ApiOperation(value = "Access Token 재발급", notes = "만료된 access token을 재발급받는다.")
  @PostMapping("/refresh")
  public ResponseEntity<?> refreshToken(@RequestBody Long uid, HttpServletRequest request) throws Exception {
    HttpStatus status = HttpStatus.ACCEPTED;
    String token = request.getHeader("refresh-token");
    String result = userService.refreshToken(uid, token);
    if (result != null && !result.equals("")) {
      // 발급 성공
      return new ResponseEntity<Object>(new HashMap<String, Object>() {{
        put("result", true);
        put("msg", "토큰이 발급되었습니다.");
        put("access-token", result);
      }}, status);
    } else {
      // 발급 실패
      throw new RuntimeException("리프레시 토큰 발급에 실패하였습니다.");
    }
  }

  @ApiOperation(value = "비밀번호 찾기", notes = "회원의 임시 비밀번호를 메일로 전송합니다.")
  @PostMapping("/users/find/password")
  public ResponseEntity<?> findPassword(@RequestBody FindPassword findPasswordEmail) throws Exception {
    userService.findPassword(findPasswordEmail);
    return new ResponseEntity<Object>(new HashMap<String, Object>() {{
      put("result", true);
      put("msg", "이메일로 임시 비밀번호를 발급하였습니다.");
    }}, HttpStatus.OK);
  }

}
