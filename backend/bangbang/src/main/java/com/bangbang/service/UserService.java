package com.bangbang.service;

import com.bangbang.domain.sign.User;
import com.bangbang.dto.SignIn;
import com.bangbang.dto.sign.FindPassword;

import com.bangbang.dto.sign.SignUp;
import com.bangbang.dto.sign.UserDto;

import java.util.List;
import java.util.Map;
import java.util.Optional;

public interface UserService {

    void signUp(SignUp SignUpInfo) throws Exception;

    Map<String, Object> login(SignIn signInResult) throws Exception;

    String refreshToken(Long uid, String token) throws Exception;

    void findPassword(FindPassword signIn) throws Exception;

    User findUser(Long userId) throws Exception;

    Long findUserId(String token) throws  Exception;

    List<UserDto> findAllUsers() throws Exception;
}
