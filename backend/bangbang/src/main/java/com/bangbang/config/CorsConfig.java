package com.bangbang.config;

import java.util.Arrays;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
public class CorsConfig {

  @Bean
  public CorsFilter corsFilter() {
    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    CorsConfiguration config = new CorsConfiguration();

    config.setAllowedOriginPatterns(Arrays.asList("*"));
    config.setAllowedMethods(Arrays.asList("HEAD","POST","GET","DELETE","PATCH"));
    config.setAllowedHeaders(Arrays.asList("*"));

    source.registerCorsConfiguration("/**", config);
    return new CorsFilter(source);
  }
}
