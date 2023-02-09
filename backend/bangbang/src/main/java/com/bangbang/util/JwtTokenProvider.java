package com.bangbang.util;

import com.bangbang.domain.sign.User;
import com.bangbang.exception.BaseException;
import com.bangbang.exception.ErrorMessage;
import com.bangbang.service.CustomUserDetailsService;
import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.ObjectMapper;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import java.security.Key;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.Base64;
import java.util.Date;
import java.util.List;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class JwtTokenProvider {
  private final CustomUserDetailsService customUserDetailsService;
  private final Logger logger = LoggerFactory.getLogger(JwtTokenProvider.class);

  @Value("A405SUNSUSUNGBINHUNNEUONGASDSADASDASDASSAFYA405")
  private String secretKey;

  @Value("10000")
  private long tokenValidMinutes;

  @Value("100000")
  private long refreshValidMinutes;


  @PostConstruct
  protected  void init() {

  }

  public String create(Long uid, List<String> roles, long expire) {
    Claims claims = Jwts.claims().setSubject(Long.toString(uid));//jwt의 토큰의 내용에 값을 넣기 위해 claims객체를 생성을 합니다.,
    // setsubject 메서드를 통하여 sub속성에 값을 추가하고자 할시에 User의 uid를 사용합니다
    claims.put("roles", roles);//해당 부분은 해당 토큰을 사용하는 사용자의 권한을 확인 할수 있는 role값을 추가한 부분입니다.
    Date now = new Date();

    byte[] keyBytes = Decoders.BASE64URL.decode(secretKey);
    Key key = Keys.hmacShaKeyFor(keyBytes);

    return Jwts.builder()//Jwts.builder를통해서 토큰을 생성합니다.
        .setClaims(claims)
        .setIssuedAt(now)
        .setExpiration(new Date(now.getTime() + expire)) // 토큰 만료일 설정
        .signWith(key) // 암호화
        .compact();
  }

  // JWT 토큰 생성
  public String createToken(Long uid, List<String> roles) {
//        return create(uid, roles, 1000 * 5);
    return create(uid, roles, 1000 * 10 * tokenValidMinutes);
  }

  public String createRefresh(Long uid, List<String> roles) {
//        return create(uid, roles, 1000 * 10 * 60);
    return create(uid, roles, 1000 * 10 * refreshValidMinutes);
  }

  // JWT 토큰에서 인증 정보 조회
  //해당 부분은 필터에서 인증이 성공을 하였을시에, securitycontextholder에 저장할 authentication을 생성하여 줍니다.
  //usernamePasswordAuthenticationToken을 사용하여 Authentication을 구현 하였습니다.
  public Authentication getAuthentication(String token) {
    User user = (User) customUserDetailsService.loadUserByUserId(Long.valueOf(this.getUserId(token)));

    return new UsernamePasswordAuthenticationToken(user, "", user.getAuthorities());
  }

  // 유저 이름 추출
  //토큰 기반으로 회원 정보를 추출하는 메서드 입니다.
  public String getUserId(String token) {
    return Jwts.parser()//jwt parser를 통해 secretkey를 설정하고 클레임을 추출해서 토큰을 생성할시 넣었던 sub값을 추출합니다.
        .setSigningKey(secretKey)
        .parseClaimsJws(token)
        .getBody()
        .getSubject();
  }

  // Request header에 Authorization 의 값에서 token 꺼내옴
  //즉 클라이언트가 헤더를 통해 jwt토큰값을 제대로 전달 했는지 파악 가능한 메서드
  public String resolveToken(HttpServletRequest request) {
    return request.getHeader("X-AUTH-TOKEN");

    // 가져온 Authorization Header 가 문자열이고, Bearer 로 시작해야 가져옴
//    if (StringUtils.hasText(token) && token.startsWith("X-AUTH-TOKEN")) {
//      return token.substring(7);
//    }
//
//    return null;
  }

  // JWT 토큰 유효성 체크

  public boolean validateToken(String token) {
    try {
      Jws<Claims> claims = Jwts.parserBuilder().setSigningKey(secretKey).build().parseClaimsJws(token);

      return !claims.getBody().getExpiration().before(new Date());
    } catch (SecurityException | MalformedJwtException | IllegalArgumentException exception) {
      logger.info("잘못된 Jwt 토큰입니다");
    } catch (ExpiredJwtException exception) {
      logger.info("만료된 Jwt 토큰입니다");
    } catch (UnsupportedJwtException exception) {
      logger.info("지원하지 않는 Jwt 토큰입니다");
    }

    return false;
  }

  private Long getUid(String token) throws RuntimeException {
    try {
      if (token.chars().filter(c -> c == '.').count() != 2)
        throw new BaseException(ErrorMessage.ACCESS_TOKEN_INVALID);

      Map<?, ?> map;
      map = new ObjectMapper().readValue(Base64.getDecoder().decode(token.split("\\.")[1]), Map.class);
      if (map.get("sub") == null)
        throw new BaseException(ErrorMessage.ACCESS_TOKEN_INVALID_PAYLOADS);

      return Long.parseLong(map.get("sub").toString());
    } catch (JsonParseException ex) {
      throw new BaseException(ErrorMessage.ACCESS_TOKEN_INVALID_STRUCT);
    } catch (IOException e) {
      throw new BaseException(ErrorMessage.UNDEFINED_EXCEPTION);
    }
  }

}
