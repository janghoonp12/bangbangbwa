package com.bangbang.domain.sign;

import com.bangbang.domain.sign.User;
import com.bangbang.dto.sign.UserDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;


public interface UserRepository extends JpaRepository<User, Integer> {
    @Transactional(readOnly = true)
    User findByUserEmail(String email);

    @Transactional(readOnly = true)
    Optional<User> findByUserNickname(String nickname);

    @Transactional(readOnly = true)
    User findByUserId(Long uid);

    @Query("select new com.bangbang.dto.sign.UserDto(u, r.pk.userRoles) " +
            "from User u, UserRoles r " +
            "where u.userId = r.pk.userUserId")
    List<UserDto> findAllUsers();
}
