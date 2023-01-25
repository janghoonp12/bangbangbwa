package com;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

  @Bean
  public WebSecurityCustomizer webSecurityCustomizer(){
    return web -> {
      web.ignoring()
          .antMatchers(
              "/api-document/**",
              "/swagger-ui/**"
          );
    };
  }
  @Bean
  public SecurityFilterChain configure(HttpSecurity http) throws Exception {
    http.csrf().disable();
    return http.build();
  }

}
