package com.bangbang.service;

import com.bangbang.domain.sign.User;
import com.bangbang.dto.sign.OAuth2UserInfo;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Map;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;

public class PricipalDetails implements OAuth2User, UserDetails {

  private User user;
  private OAuth2UserInfo oAuth2UserInfo;

  public PricipalDetails(User user) {
    this.user = user;
  }

  public PricipalDetails(User user, OAuth2UserInfo oAuth2UserInfo) {
    this.user = user;
    this.oAuth2UserInfo = oAuth2UserInfo;
  }

  @Override
  public String getName() {
    return oAuth2UserInfo.getProviderId();
  }

  @Override
  public Map<String, Object> getAttributes() {
    return oAuth2UserInfo.getAttributes();
  }

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    Collection<GrantedAuthority> collect = new ArrayList<>();
    collect.add(new GrantedAuthority() {
      @Override
      public String getAuthority() {
        return user.getUser_roles().toString();
      }
    });
    return collect;
  }

  @Override
  public String getPassword() {
    return user.getPassword();
  }

  @Override
  public String getUsername() {
    return oAuth2UserInfo.getProviderId();
  }

  @Override
  public boolean isAccountNonExpired() {
    return true;
  }

  @Override
  public boolean isAccountNonLocked() {
    return true;
  }

  @Override
  public boolean isCredentialsNonExpired() {
    return true;
  }

  @Override
  public boolean isEnabled() {
    return true;
  }
}
