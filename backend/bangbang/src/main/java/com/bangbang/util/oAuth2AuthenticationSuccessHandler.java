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
    OAuth2UserInfo oAuth2UserInfo = null;

    if (oAuth2User.getAttributes().get("kakao_account") != null) {
      oAuth2UserInfo = new KakaoUserInfo(oAuth2User.getAttributes());
    } else {
      oAuth2UserInfo = new NaverUserInfo(oAuth2User.getAttributes());
    }

    User user = userRepository.findByUserEmail(oAuth2UserInfo.getEmail());

    String accessToken = jwtTokenProvider.createToken(user.getUserId(), user.getUser_roles());
    String refreshToken = jwtTokenProvider.createRefresh(user.getUserId(), user.getUser_roles());
    user.setUser_refresh_token(refreshToken);
    userRepository.save(user);

    String url = makeRedirectUrl(accessToken, refreshToken, user.getUserEmail(), user.getUserNickname());
    System.out.println(url);
    getRedirectStrategy().sendRedirect(request, response, url);

  }

  private String makeRedirectUrl(String accessToken, String refreshToken, String email, String nickname) {
    return UriComponentsBuilder.fromUriString("http://localhost:3000/oauth2/redirect?accessToken="+accessToken +"&refreshToken=" + refreshToken +"&email=" + email + "&nickname=" +nickname)
        .build().toUriString();
  }
}