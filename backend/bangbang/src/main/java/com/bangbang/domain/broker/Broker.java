package com.bangbang.domain.broker;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;

@Setter
@Getter
@NoArgsConstructor
@SuperBuilder
@Entity
@Table(name = "broker")
public class Broker {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "broker_id", nullable = false)
    private Long brokerId;
    @JoinTable(name="user",
            joinColumns = @JoinColumn(name="user_id"),
            inverseJoinColumns = @JoinColumn(name="user_id"))
    @Column(name = "user_id", nullable = false)
    private Long userId;
    @Column(name = "broker_name", length = 20, nullable = false)
    private String brokerName;
    @Column(name = "broker_email",length = 30, nullable = false)
    private String brokerEmail;
    @Column(name = "broker_contact",length = 20, nullable = false)
    private String brokerContact;
    @Column(name = "broker_status", nullable = false)
    private int brokerStatus; // 0 비활성화 1 활성화
}
