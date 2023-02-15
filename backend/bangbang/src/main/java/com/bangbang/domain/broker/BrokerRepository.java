package com.bangbang.domain.broker;

import com.bangbang.dto.broker.BrokerResponseDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BrokerRepository extends JpaRepository<Broker, Long> {
    Broker findByUserId(Long userId);
    @Query("select new com.bangbang.dto.broker.BrokerResponseDto(b) " +
            "from Broker b, UserRoles u " +
            "where b.brokerStatus = 0 and u.pk.userUserId = b.userId and u.pk.userRoles = 'ROLE_USER'")
    List<BrokerResponseDto> findBrokerBefore();
}
