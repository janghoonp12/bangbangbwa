package com.bangbang.controller;


import com.bangbang.service.UserServiceImpl;
import com.bangbang.dto.SignIn;
import com.bangbang.domain.sign.User;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
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
  @PostMapping("/signup")
  @RequestBody
  public ResponseEntity<?> signUp(User user) throws Exception {

    userService.signUp(user);

    return new ResponseEntity<Object>(new HashMap<String, Object>() {{
      put("result", true);
      put("msg", "회원가입을 성공하였습니다.");
    }}, HttpStatus.OK);

  }

  @ApiOperation(value="로그인", notes = "req_data : [id, pw]")
  @PostMapping("/login")
  @RequestBody
  public ResponseEntity<?> login(SignIn user) throws Exception {
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
  @RequestBody
  public ResponseEntity<?> refreshToken(Long uid, HttpServletRequest request) throws Exception {
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

}
