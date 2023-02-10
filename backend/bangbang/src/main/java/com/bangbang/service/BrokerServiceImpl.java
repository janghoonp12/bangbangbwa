package com.bangbang.service;

import com.bangbang.domain.broker.Broker;
import com.bangbang.domain.broker.BrokerRepository;
import com.bangbang.domain.sign.User;
import com.bangbang.domain.sign.UserRepository;
import com.bangbang.dto.broker.BrokerResponseDto;
import com.bangbang.dto.broker.BrokerSaveRequestDto;
import com.bangbang.dto.notice.NoticeResponseDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class BrokerServiceImpl implements BrokerService{

    @Autowired
    BrokerRepository brokerRepository;

    @Autowired
    UserRepository userRepository;

    @Transactional
    @Override
    public void newBroker(BrokerSaveRequestDto broker) {
        brokerRepository.save(broker.toEntity());
    }

    @Override
    public List<BrokerResponseDto> searchBrokerAll() {
        return brokerRepository.findAll().stream()
                .map(BrokerResponseDto::new)
                .collect(Collectors.toList());
    }

    @Transactional
    @Override
    public void registerBroker(Long userId) {
        //중개사 활성화
        Broker broker = brokerRepository.findByUserId(userId);
        broker.setBrokerStatus(1);
        brokerRepository.save(broker);

        //중개사 유저 역할 변경
        User user = userRepository.findByUserId(userId);
        List<String> s = user.getUser_roles();
        s.add("ROLE_BROKER");
        user.setUser_roles(s);
        userRepository.save(user);
    }

    @Transactional
    @Override
    public void deactiveBroker(Long userId) {
        Broker broker = brokerRepository.findByUserId(userId);
        broker.setBrokerStatus(0);
        brokerRepository.save(broker);
    }
}
