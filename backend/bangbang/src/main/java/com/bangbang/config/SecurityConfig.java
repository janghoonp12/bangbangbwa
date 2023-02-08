package com.bangbang.config;

import com.bangbang.service.OauthServiceImpl;
import com.bangbang.util.CustomAccessDeniedHandler;
import com.bangbang.util.CustomAuthenticationEntryPoint;
import com.bangbang.util.JwtTokenProvider;
import lombok.AllArgsConstructor;
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

  private final OauthServiceImpl oauthServiceImpl;
  private final CorsFilter corsFilter;
  private final JwtTokenProvider jwtTokenProvider;

  private final BCryptBeanConfig authenticationProvider;

  private com.bangbang.util.oAuth2AuthenticationSuccessHandler oAuth2AuthenticationSuccessHandler;

  @Override
  protected void configure(HttpSecurity http) throws Exception {
    http.csrf().disable();
    http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            .and()
            .formLogin().disable()
            .httpBasic().disable()
        .authorizeRequests() // 경로에 권한, 인증 설정 한다.
        .antMatchers("/user/**")
        .access("hasRole('USER') or hasRole('BROKER') or hasRole('ADMIN')")
        .antMatchers("/broker/**")
        .access("hasRole('BROKER') or hasRole('ADMIN')")
        .antMatchers("/admin/**")
        .access("hasRole('ADMIN')")
            .anyRequest().permitAll()
        .and()
            .exceptionHandling().accessDeniedHandler(new CustomAccessDeniedHandler())//권한을 확인하는 과정에서 통과하지 못하는 예외가 발생할 경우 예외를 전달을 한다
            .and()
            .exceptionHandling().authenticationEntryPoint(new CustomAuthenticationEntryPoint())//인증과정에서 예외가 발생할 경우 예외를 전달한다.
            .and()
        .addFilter(corsFilter) // @CrossOrigin(인증x), 시큐리티 필터에 등록 인증(O)
            .addFilterBefore(new JwtFilter(jwtTokenProvider), UsernamePasswordAuthenticationFilter.class)
            .oauth2Login() // OAuth2 로그인 설정 시작점
            .defaultSuccessUrl("https://i8a405.p.ssafy.io/")
            .successHandler(oAuth2AuthenticationSuccessHandler)
            .userInfoEndpoint()
            .userService(oauthServiceImpl);
  }
}
