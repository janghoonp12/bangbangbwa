package com.bangbang.service;

import com.bangbang.domain.sign.User;
import com.bangbang.domain.sign.UserRepository;
import com.bangbang.dto.sign.KakaoUserInfo;
import com.bangbang.dto.sign.NaverUserInfo;
import com.bangbang.dto.sign.OAuth2UserInfo;
import com.bangbang.exception.BaseException;
import com.bangbang.exception.ErrorMessage;
import java.util.Collections;
import java.util.Map;
import java.util.UUID;
import javax.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class OauthService extends DefaultOAuth2UserService {

  private UserRepository userRepository;
  private BCryptPasswordEncoder bCryptPasswordEncoder;

  OauthService(@Lazy UserRepository userRepository, BCryptPasswordEncoder bCryptPasswordEncoder) {
    this.userRepository = userRepository;
    this.bCryptPasswordEncoder = bCryptPasswordEncoder;
  }

  @Override
  public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
    OAuth2User oAuth2User = super.loadUser(userRequest);
    OAuth2UserInfo oAuth2UserInfo = null;

    String provider = userRequest.getClientRegistration().getRegistrationId();

    if (provider.equals("naver")) {
      oAuth2UserInfo = new NaverUserInfo(oAuth2User.getAttributes());
    } else if (provider.equals("kakao")) {
      oAuth2UserInfo = new KakaoUserInfo(oAuth2User.getAttributes());
    }

    String providerId = oAuth2UserInfo.getProviderId();
    String userName = provider + "_" + providerId;
    String passw = UUID.randomUUID().toString().substring(0, 6);
    String userPassword = bCryptPasswordEncoder.encode(passw);
    String email = oAuth2UserInfo.getEmail();

    User findUser = userRepository.findByUserEmail(email);

    if (findUser == null) {
      findUser = User.builder()
          .userEmail(email)
          .userNickname(userName)
          .userPassword(userPassword)
          .user_roles(Collections.singletonList("ROLE_USER"))
          .user_status("1").build();
      userRepository.save(findUser);

      findUser = userRepository.findByUserEmail(email);
    }
    return new PricipalDetails(findUser, oAuth2UserInfo);
  }
}
