package com.bangbang.util;

import com.bangbang.domain.sign.User;
import com.bangbang.domain.sign.UserRepository;
import com.bangbang.dto.sign.KakaoUserInfo;
import com.bangbang.dto.sign.NaverUserInfo;
import com.bangbang.dto.sign.OAuth2UserInfo;
import java.io.IOException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

@Component
public class oAuth2AuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
  @Autowired
  JwtTokenProvider jwtTokenProvider;

  @Autowired
  private UserRepository userRepository;

  @Override
  public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
      Authentication authentication) throws IOException {
    OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
    Object userEmail = null;
    if (oAuth2User.getAttributes().get("kakao_account") != null) {
      KakaoUserInfo oAuth2UserInfo;
      oAuth2UserInfo = new KakaoUserInfo(oAuth2User.getAttributes());
      userEmail = oAuth2UserInfo.getEmail();
    } else {
      userEmail = oAuth2User.getAttributes().get("email");
    }
    User user = userRepository.findByUserEmail((String)userEmail);

    String accessToken = jwtTokenProvider.createToken(user.getUserId(), user.getUser_roles());
    String refreshToken = jwtTokenProvider.createRefresh(user.getUserId(), user.getUser_roles());
    user.setUser_refresh_token(refreshToken);
    userRepository.save(user);

    String level = "";

    if (user.getUser_roles().get(0).equals("ROLE_USER")) {
      level = "1";
    } else if (user.getUser_roles().get(0).equals("ROLE_BROKER")) {
      level = "2";
    } else if (user.getUser_roles().get(0).equals("ROLE_ADMIN")) {
      level = "3";
    }

    String url = makeRedirectUrl(accessToken, refreshToken, user.getUserEmail(), user.getUserNickname(), user.getUser_roles().get(0), level );

    getRedirectStrategy().sendRedirect(request, response, url);
  }

  private String makeRedirectUrl(String accessToken, String refreshToken, String email, String nickname, String role, String level) {
    return UriComponentsBuilder.fromUriString("https://i8a405.p.ssafy.io/oauth2/redirect?accessToken="+accessToken +"&refreshToken=" + refreshToken +"&email=" + email + "&nickname=" + nickname + "&role=" + role + "&level=" +level)
        .build().toUriString();
  }
}