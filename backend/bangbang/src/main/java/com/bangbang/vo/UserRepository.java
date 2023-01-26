package com.bangbang.vo;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByUserEmail(String email);
    Optional<User> findByUserNickname(String nickname);
    Optional<User> findByUserId(Long uid);
}
