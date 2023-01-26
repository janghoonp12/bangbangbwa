package com.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.filter.CorsFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig extends WebSecurityConfigurerAdapter {

  private final CorsFilter corsFilter;

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
        .authorizeRequests()
        .antMatchers("/api/v1/user/**")
        .access("hasRole('user') or hasRole('broker') or hasRole('admin')")
        .antMatchers("/api/v1/broker/**")
        .access("hasRole('broker') or hasRole('admin')")
        .antMatchers("/api/v1/admin/**")
        .access("hasRole('admin')")
        .anyRequest().permitAll();
  }
}
