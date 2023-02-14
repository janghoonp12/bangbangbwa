package com.bangbang.domain.sign;

import javax.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Builder
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User implements UserDetails {
  @Id
  @GeneratedValue(strategy=GenerationType.IDENTITY)
  @Column(name = "user_id")
  private Long userId; //PK

  @Column(length = 40, nullable = false, name = "user_email")
  private String userEmail;       // 유저 이메일

  @Column(length = 100, nullable = false, name = "user_password")
  private String userPassword;               // 유저 비밀번호

  @Column(length = 10, nullable = false, name = "user_nickname")
  private String userNickname;             // 유저 닉네임

  @Column(length = 100, nullable = true)
  private String user_refresh_token; // 토큰
   // 유저 등급

  @Column(length = 1, nullable = true)
  private int user_status;             // 유저 상태

  @ElementCollection(fetch = FetchType.EAGER)
  @Builder.Default
  private List<String> user_roles = new ArrayList<>();

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return this.user_roles.stream()
            .map(SimpleGrantedAuthority::new)
            .collect(Collectors.toList());
  }

  @Override
  public String getPassword() {
    return this.userPassword;
  }

  @Override
  public String getUsername() {
    return this.userNickname;
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
