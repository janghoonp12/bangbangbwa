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
    public boolean registerBroker(Long brokerId, Long userId) {
        User user = userRepository.findByUserId(userId);

        if (user.getUser_roles().equals("ADMIN")) { //관리자인 경우에만
            //중개사 활성화
            Broker broker = brokerRepository.findByBrokerId(brokerId);
            broker.setBrokerStatus(1);
            brokerRepository.save(broker);

            //중개사 유저 역할 변경
            User bUser = userRepository.findByUserId(broker.getUserId());
//            bUser.get().setUser_roles("ROLE_BROKER");
            userRepository.save(bUser);
            return true;
        }
        else return false;
    }

    @Transactional
    @Override
    public void deactiveBroker(Long brokerId) {
        Broker broker = brokerRepository.findByBrokerId(brokerId);
        broker.setBrokerStatus(0);
        brokerRepository.save(broker);
    }
}
