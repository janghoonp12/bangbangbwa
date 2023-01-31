package com.bangbang.service;

import com.bangbang.dto.SignIn;
import com.bangbang.dto.sign.FindPassword;
import com.bangbang.domain.sign.User;

import java.util.Map;

public interface UserService {

    void signUp(User user) throws Exception;

    Map<String, Object> login(SignIn signInResult) throws Exception;

    String refreshToken(Long uid, String token) throws Exception;

    void findPassword(FindPassword signIn) throws Exception;


}
