package com.bangbang.domain.sign;

import lombok.*;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

@Getter
@Embeddable
@EqualsAndHashCode
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Pk implements Serializable {
    @Column(name = "user_user_id")
    private Long userUserId;
    @Column(name = "user_roles")
    private String userRoles;
}
