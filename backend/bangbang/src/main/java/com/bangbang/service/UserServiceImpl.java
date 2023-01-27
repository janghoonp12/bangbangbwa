package com.bangbang.service;

import com.bangbang.dto.sign.SignIn;
import com.bangbang.domain.sign.User;
import com.bangbang.domain.sign.UserRepository;
import com.bangbang.exception.BaseException;
import com.bangbang.exception.ErrorMessage;
import com.bangbang.util.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service("UserService")
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final JwtTokenProvider jwtTokenProvider;

    private final PasswordEncoder passwordEncoder;

    @Autowired
    private UserRepository userRepository;

    @Override
    public void signUp(User user) throws Exception {
        if (userRepository.findByUserEmail(user.getUserEmail()).isPresent()) {
            throw new BaseException(ErrorMessage.EXIST_ID);
        }

        if (userRepository.findByUserNickname(user.getUserNickname()).isPresent()) {
            throw  new BaseException(ErrorMessage.EXIST_EMAIL);
        }

        user.setUser_password(passwordEncoder.encode(user.getUser_password()));
        user.setUser_status("1");
        user.setUser_role("ROLE_USER");
        userRepository.save(user);

    }

    @Override
    public Map<String, Object> login(SignIn signIn) throws Exception {
        User user = userRepository.findByUserEmail(signIn.getId()).orElseThrow(() -> new BaseException(ErrorMessage.NOT_EXIST_ID));

        if (user.getUser_status() == "0") {
            throw new BaseException(ErrorMessage.DONT_EXIST_ACCOUNT);
        }

        if (!passwordEncoder.matches(signIn.getPw(), user.getUser_password())) {
            throw new BaseException(ErrorMessage.NOT_PASSWORD);
        }

        // 존재할시
        String accessToken = jwtTokenProvider.createToken(user.getUserId(), Collections.singletonList(user.getUser_role()));
        String refreshToken = jwtTokenProvider.createRefresh(user.getUserId(), Collections.singletonList(user.getUser_role()));
        user.setUser_refresh_token(refreshToken);
        userRepository.save(user);

        return new HashMap<String, Object>() {{
            put("nickname", user.getUserNickname());
            put("access-token", accessToken);
            put("refresh-token", refreshToken);
            put("email", user.getUserEmail());
            put("id", user.getUserId());
        }};
    }

    @Override
    public String refreshToken(Long uid, String token) throws Exception {
        Optional<User> object = userRepository.findByUserId(uid);
        if (object.isPresent()) {
            User user = object.get();
            if (token.equals(user.getUser_refresh_token())) {
                if (jwtTokenProvider.validateToken(token)) {
                    return jwtTokenProvider.createToken(user.getUserId(), Collections.singletonList(user.getUser_role()));
                } else {
                    throw new BaseException(ErrorMessage.ACCESS_TOKEN_EXPIRE);
                }
            } else {
                throw new BaseException(ErrorMessage.REFRESH_TOKEN_NOT_MATCH);
            }
        } else {
            throw new BaseException(ErrorMessage.NOT_USER_INFO);
        }
    }
}
