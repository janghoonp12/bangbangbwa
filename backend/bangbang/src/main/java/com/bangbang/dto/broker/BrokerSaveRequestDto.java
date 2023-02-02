package com.bangbang.dto.broker;

import com.bangbang.domain.broker.Broker;
import lombok.Builder;
import lombok.Getter;

@Getter
public class BrokerSaveRequestDto {
    private Long userId;
    private String brokerName;
    private String brokerEmail;
    private String brokerContact;
    @Builder
    public BrokerSaveRequestDto(Long userId, String brokerName, String brokerEmail, String brokerContact) {
        this.userId = userId;
        this.brokerName = brokerName;
        this.brokerEmail = brokerEmail;
        this.brokerContact = brokerContact;
    }

    public Broker toEntity() {
        return Broker.builder()
                .userId(userId)
                .brokerName(brokerName)
                .brokerEmail(brokerEmail)
                .brokerContact(brokerContact)
                .build();
    }
}
