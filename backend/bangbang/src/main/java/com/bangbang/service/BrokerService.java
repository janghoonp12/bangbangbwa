package com.bangbang.service;

import com.bangbang.domain.broker.Broker;
import com.bangbang.dto.broker.BrokerResponseDto;
import com.bangbang.dto.broker.BrokerSaveRequestDto;

import java.util.List;

public interface BrokerService {
    void newBroker(BrokerSaveRequestDto broker);
    List<BrokerResponseDto> searchBrokerAll();
    void registerBroker(Long userId);
    void deactiveBroker(Long brokerId);
}
