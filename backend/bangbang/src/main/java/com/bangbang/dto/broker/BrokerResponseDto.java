package com.bangbang.dto.broker;

import com.bangbang.domain.broker.Broker;
import lombok.Getter;

@Getter
public class BrokerResponseDto {
    private Long brokerId;
    private Long userId;
    private String brokerName;
    private String brokerEmail;
    private String brokerContact;
    private int brokerStatus; // 0 비활성화 1 활성화

    public BrokerResponseDto(Broker entity) {
        this.brokerId = entity.getBrokerId();
        this.userId = entity.getUserId();
        this.brokerName = entity.getBrokerName();
        this.brokerEmail = entity.getBrokerEmail();
        this.brokerContact = entity.getBrokerContact();
        this.brokerStatus = entity.getBrokerStatus();
    }
}