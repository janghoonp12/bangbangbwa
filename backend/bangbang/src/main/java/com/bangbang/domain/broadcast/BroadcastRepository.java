package com.bangbang.domain.broadcast;

import com.bangbang.domain.broadcast.Broadcast;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

public interface BroadcastRepository extends JpaRepository<Broadcast, Long> {
    List<Broadcast> findAll();
    Optional<Broadcast> findByBroadcastId(Long broadcastId);

}
