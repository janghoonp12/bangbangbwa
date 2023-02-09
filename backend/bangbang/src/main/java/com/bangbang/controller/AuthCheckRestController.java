package com.bangbang.controller;

import com.bangbang.domain.sign.User;
import com.bangbang.service.UserServiceImpl;
import com.bangbang.util.JwtTokenProvider;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import javax.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@Api(value="AlarmRestController-Version 1")
public class AuthCheckRestController {

  private final JwtTokenProvider jwtTokenProvider;
  private final UserServiceImpl userService;

  @ApiImplicitParams({
      @ApiImplicitParam(name = "X-AUTH-TOKEN", value = "로그인 성공 후 발급 받은 access_token", required = true, dataType = "String", paramType = "header")
  })
  @ApiOperation(value = "일반 사용자 판별", notes = "로그인 상태인지 아닌지 판별합니다.")
  @GetMapping(value = "/checks/{userId}")
  public ResponseEntity<Map<String, Object>> checkCommonUser(@PathVariable("userId") Long userId, HttpServletRequest request){
    Map<String, Object> resultMap = new HashMap<>();
    HttpStatus status = HttpStatus.UNAUTHORIZED;

    if(jwtTokenProvider.validateToken(request.getHeader("refresh-token"))){
      try {
        Optional<User> user = userService.findUser(userId);
        resultMap.put("userinfo", user.get().getUser_roles().equals("USER"));
        resultMap.put("message", "success");
        status = HttpStatus.ACCEPTED;
      } catch (Exception e){
        resultMap.put("info", "정보조회 실패");
        resultMap.put("message", e.getMessage());
        status = HttpStatus.INTERNAL_SERVER_ERROR;
      }
    }
    else {
      resultMap.put("info", "사용 불가능 토큰");
      resultMap.put("message", "fail");
      status = HttpStatus.UNAUTHORIZED;
    }
    return new ResponseEntity<Map<String, Object>>(resultMap, status);
  }

  @ApiImplicitParams({
      @ApiImplicitParam(name = "X-AUTH-TOKEN", value = "로그인 성공 후 발급 받은 access_token", required = true, dataType = "String", paramType = "header")
  })
  @ApiOperation(value = "중개사 판별", notes = "로그인 상태인지 아닌지 판별합니다.")
  @GetMapping(value = "/checks/broker")
  public String checkBrokerUser(){
    return "success";
  }

  @ApiImplicitParams({
      @ApiImplicitParam(name = "X-AUTH-TOKEN", value = "로그인 성공 후 발급 받은 access_token", required = true, dataType = "String", paramType = "header")
  })
  @ApiOperation(value = "관리자 판별", notes = "로그인 상태인지 아닌지 판별합니다.")
  @PostMapping(value = "/checks/admin")
  public String checkAdminUser(){
    return "success";
  }

}
