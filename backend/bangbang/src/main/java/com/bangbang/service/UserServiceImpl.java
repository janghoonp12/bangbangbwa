package com.bangbang.service;

import com.bangbang.dto.SignIn;
import com.bangbang.dto.sign.FindPassword;
import com.bangbang.domain.sign.User;
import com.bangbang.domain.sign.UserRepository;
import com.bangbang.dto.sign.SignUp;
import com.bangbang.exception.BaseException;
import com.bangbang.exception.ErrorMessage;
import com.bangbang.util.EmailHandler;
import com.bangbang.util.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;

@Service("UserService")
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final EmailHandler emailHandler;
    private final JwtTokenProvider jwtTokenProvider;

    private final PasswordEncoder passwordEncoder;

    @Autowired
    private UserRepository userRepository;

    @Override
    public void signUp(SignUp SignUpInfo) throws Exception {
        if (userRepository.findByUserEmail(SignUpInfo.getUserEmail()).isPresent()) {
            throw new BaseException(ErrorMessage.EXIST_ID);
        }

        if (userRepository.findByUserNickname(SignUpInfo.getUserPassword()).isPresent()) {
            throw  new BaseException(ErrorMessage.EXIST_EMAIL);
        }
        User user = new User();
        user.setUserEmail(SignUpInfo.getUserEmail());
        user.setUserNickname(SignUpInfo.getUserNickname());
        user.setUserPassword(passwordEncoder.encode(SignUpInfo.getUserPassword()));
        user.setUser_role("ROLE_USER");
        userRepository.save(user);

    }

    @Override
    public Map<String, Object> login(SignIn signIn) throws Exception {
        User user = userRepository.findByUserEmail(signIn.getId()).orElseThrow(() -> new BaseException(ErrorMessage.NOT_EXIST_ID));

        if (user.getUser_status() == "0") {
            throw new BaseException(ErrorMessage.DONT_EXIST_ACCOUNT);
        }

        if (!passwordEncoder.matches(signIn.getPw(), user.getUserPassword())) {
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

    @Override
    public void findPassword(FindPassword findPasswordEmail) throws Exception {
        User signUser = userRepository.findByUserEmail(findPasswordEmail.getId()).get();

        if (signUser != null) {
            if (signUser.getUserEmail().equals(findPasswordEmail.getId())) {
                Random rnd = new Random();
                StringBuilder temp_pw = new StringBuilder();
                for (int i = 0; i < 20; i++) {
                    if (rnd.nextBoolean()) {
                        temp_pw.append((char) ((int) (rnd.nextInt(26)) + 97));
                    } else {
                        temp_pw.append((rnd.nextInt(10)));

                    }
                }
                String epw = passwordEncoder.encode(temp_pw);
                signUser.setUserPassword(epw);
                userRepository.save(signUser);

                emailHandler.sendMail(signUser.getUserEmail(), "임시 비밀번호입니다.", "임시 비밀번호는 " + temp_pw + " 입니다.", false);
            } else {
                throw new BaseException(ErrorMessage.NOT_USER_INFO_MATCH);
            }
        } else {
            throw new BaseException(ErrorMessage.NOT_USER_INFO);
        }
    }
}
