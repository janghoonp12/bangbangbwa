package com.bangbang.config;

import com.bangbang.exception.BaseException;
import com.bangbang.util.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.GenericFilterBean;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

@RequiredArgsConstructor
public class JwtFilter extends GenericFilterBean {

    private static final Logger logger = LoggerFactory.getLogger(JwtFilter.class);
    private final JwtTokenProvider jwtTokenProvider;

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {

        String token = jwtTokenProvider.resolveToken((HttpServletRequest) servletRequest);//jwt토큰을 통해 토큰을 추출함
        String requestURI = ((HttpServletRequest) servletRequest).getRequestURI();
        try {
            if (StringUtils.hasText(token) && jwtTokenProvider.validateToken(token)) {//토큰에 대한 유효성을 검사를 함
                Authentication authentication = jwtTokenProvider.getAuthentication(token);//토큰이 유효할시 Authentication객체를 생성해서 SecurityContextHolder에 추가함
                SecurityContextHolder.getContext().setAuthentication(authentication);
                logger.info("Security context에 인증 정보를 저장했습니다, uri: {}", requestURI);
            } else {
                logger.debug("유효한 Jwt 토큰이 없습니다, uri: {}", requestURI);
            }
        } catch (BaseException e) {
            logger.info(e.getErrorMessage().toString());
        }

        filterChain.doFilter(servletRequest, servletResponse);

    }
}
