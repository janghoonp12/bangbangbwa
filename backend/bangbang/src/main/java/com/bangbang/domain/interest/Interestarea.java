package com.bangbang.domain.interest;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;

@Entity
@Table(name = "interestarea")
@Getter
@Setter
@SuperBuilder
@NoArgsConstructor
public class Interestarea {
    @Id
    @Column(name = "interestarea_id")
    private Long interestareaId;
    @JoinTable(name="user",
            joinColumns = @JoinColumn(name="user_id"),
            inverseJoinColumns = @JoinColumn(name="user_id"))
    @Column(name = "user_id", nullable = false)
    private Long userId;
    @JoinTable(name="dongcode",
            joinColumns = @JoinColumn(name="dongCode"),
            inverseJoinColumns = @JoinColumn(name="dongCode"))
    @Column(name="interest_dongcode", length = 10, nullable = false)
    private String dongCode;
}
