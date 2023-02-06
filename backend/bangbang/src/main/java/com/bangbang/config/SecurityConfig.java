package com.bangbang.config;

import com.bangbang.util.JwtTokenProvider;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.filter.CorsFilter;

@Configuration
@EnableWebSecurity
@AllArgsConstructor
public class SecurityConfig extends WebSecurityConfigurerAdapter {

  private final OAuthService oAuthService;
  private final CorsFilter corsFilter;
  private final JwtTokenProvider jwtTokenProvider;

  @Bean
  public BCryptPasswordEncoder encoderPwd() {
    return new BCryptPasswordEncoder();
  }
  @Override
  protected void configure(HttpSecurity http) throws Exception {
    http.csrf().disable();
    http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
    .and()
        .addFilter(corsFilter) // @CrossOrigin(인증x), 시큐리티 필터에 등록 인증(O)
        .formLogin().disable()
        .httpBasic().disable()
            .oauth2Login() // OAuth2 로그인 설정 시작점
            .userInfoEndpoint()
            .userService()
        .authorizeRequests()
        .antMatchers("/api/v1/user/**")
        .access("hasRole('ROLE_USER') or hasRole('ROLE_BROKER') or hasRole('ROLE_ADMIN')")
        .antMatchers("/api/v1/broker/**")
        .access("hasRole('ROLE_BROKER') or hasRole('ROLE_ADMIN')")
        .antMatchers("/api/v1/admin/**")
        .access("hasRole('ROLE_ADMIN')")
            .anyRequest().permitAll()
            .and()
            .addFilterBefore(new JwtFilter(jwtTokenProvider), UsernamePasswordAuthenticationFilter.class);
  }
}
