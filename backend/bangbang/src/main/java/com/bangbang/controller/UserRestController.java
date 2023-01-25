package com.bangbang.controller;

import com.bangbang.vo.User;
import com.bangbang.vo.UserRepository;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@Api(value="UserRestController-Version 1")
public class UserRestController {

  @Autowired
  private UserRepository userRepository;

  @Autowired
  private BCryptPasswordEncoder bCryptPasswordEncoder;

  @GetMapping({"", "/"})
  public String index() {
    return "index";
  }

  @ApiOperation(value = "회원 등록", notes = "회원을 등록합니다.")
  @PostMapping("/joinForm")
  @ResponseBody
  public String join(User user) {
    user.setUser_role("user");
    user.setUser_status("1");
    String rawPassword = user.getUser_password();
    String encPassword = bCryptPasswordEncoder.encode(rawPassword);
    user.setUser_password(encPassword);
    userRepository.save(user);
    return "redirect:/loginForm";
  }


}
