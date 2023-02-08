package com.bangbang.domain.sign;

import com.bangbang.domain.sign.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface UserRepository extends JpaRepository<User, Integer> {
    User findByUserEmail(String email);
    Optional<User> findByUserNickname(String nickname);
    User findByUserId(Long uid);
}
