package com.bangbang.service;

import com.bangbang.vo.SignIn;
import com.bangbang.vo.User;

import java.util.Map;

public interface UserService {

    void signUp(User user) throws Exception;

    Map<String, Object> login(SignIn signInResult) throws Exception;

    String refreshToken(Long uid, String token) throws Exception;


}
