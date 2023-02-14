package com.bangbang.dto.sign;

import com.bangbang.domain.sign.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class UserDto {
    private User user;
    private String user_roles;

    public UserDto(User user, String user_roles) {
        this.user = user;
        this.user_roles = user_roles;
    }
}
