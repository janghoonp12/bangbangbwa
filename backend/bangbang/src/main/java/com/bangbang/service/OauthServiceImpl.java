package com.bangbang.service;

import com.bangbang.domain.sign.User;
import com.bangbang.domain.sign.UserRepository;
import com.bangbang.dto.sign.KakaoUserInfo;
import com.bangbang.dto.sign.NaverUserInfo;
import com.bangbang.dto.sign.OAuth2UserInfo;
import java.util.Collections;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class OauthServiceImpl extends DefaultOAuth2UserService {

  @Autowired
  private UserRepository userRepository;
  @Autowired
  private BCryptPasswordEncoder bCryptPasswordEncoder;

  @Override
  public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
    OAuth2User oAuth2User = super.loadUser(userRequest);
    OAuth2UserInfo oAuth2UserInfo = null;
    System.out.println(oAuth2User.getAttributes());

    String provider = userRequest.getClientRegistration().getRegistrationId();

    if (provider.equals("naver")) {
      oAuth2UserInfo = new NaverUserInfo(oAuth2User.getAttributes());
    } else if (provider.equals("kakao")) {
      oAuth2UserInfo = new KakaoUserInfo(oAuth2User.getAttributes());
    }
    String providerId = oAuth2UserInfo.getProviderId();
    String userName = oAuth2UserInfo.getProvider() + oAuth2UserInfo.getName();
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
          .user_status(1).build();
      userRepository.save(findUser);

      findUser = userRepository.findByUserEmail(email);
    }
    return new DefaultOAuth2User (Collections.singleton(new SimpleGrantedAuthority(findUser.getUser_roles().get(0))),
            oAuth2UserInfo.getAttributes(), "id");
  }
}
