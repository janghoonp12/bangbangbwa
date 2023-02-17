package com.bangbang.controller;

import com.bangbang.domain.sign.User;
import com.bangbang.service.CustomUserDetailsService;
import com.bangbang.util.JwtTokenProvider;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import javax.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@Api(value="AlarmRestController-Version 1")
public class AuthCheckRestController {

  private final JwtTokenProvider jwtTokenProvider;

  private final CustomUserDetailsService customUserDetailsService;

  @ApiImplicitParams({
      @ApiImplicitParam(name = "X-AUTH-TOKEN", value = "로그인 성공 후 발급 받은 access_token", required = true, dataType = "String", paramType = "header")
  })
  @ApiOperation(value = "일반 사용자 판별", notes = "로그인 상태인지 아닌지 판별합니다.")
  @GetMapping(value = "/checks")
  public ResponseEntity<?> checkCommonUser(HttpServletRequest request){
    String re = "";
    HttpStatus status = HttpStatus.UNAUTHORIZED;

    System.out.println("액세스 토큰 : " + request.getHeader("X-AUTH-TOKEN"));
    String token = request.getHeader("X-AUTH-TOKEN");

    if(jwtTokenProvider.validateToken(token)){
      try {
        User user = (User) customUserDetailsService.loadUserByUserId(Long.valueOf(jwtTokenProvider.getUserId(token)));

        if(user.getUser_roles().get(0).equals("ROLE_USER")) {
          re = "/";
        }
        else if(user.getUser_roles().get(0) == "ROLE_BROKER"){
          re = "/broker";
        }
        else if(user.getUser_roles().get(0) == "ROLE_ADMIN"){
          re = "/admin";
        }
        status = HttpStatus.ACCEPTED;

      } catch (Exception e){
        re = "권한 없음";
        status = HttpStatus.INTERNAL_SERVER_ERROR;
      }
    }
    else {
      re = "사용 불가능 토큰";
      status = HttpStatus.UNAUTHORIZED;
    }
    return new ResponseEntity<>(re, status);
  }
}