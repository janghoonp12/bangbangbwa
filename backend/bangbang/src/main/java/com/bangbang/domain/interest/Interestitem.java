package com.bangbang.domain.interest;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;

@Entity
@Table(name = "interestitem")
@Getter
@Setter
@SuperBuilder
@NoArgsConstructor
public class Interestitem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "interest_item_id")
    private Long interestitemId;
    @JoinTable(name="user",
            joinColumns = @JoinColumn(name="user_id"),
            inverseJoinColumns = @JoinColumn(name="user_id"))
    @Column(name = "user_id", nullable = false)
    private Long userId;
    @JoinTable(name="item",
            joinColumns = @JoinColumn(name="item_id"),
            inverseJoinColumns = @JoinColumn(name="item_id"))
    @Column(name="item_id", nullable = false)
    private Long itemId;
}
