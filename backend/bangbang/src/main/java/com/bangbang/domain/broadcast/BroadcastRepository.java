package com.bangbang.domain.broadcast;

import com.bangbang.domain.broadcast.Broadcast;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface BroadcastRepository extends JpaRepository<Broadcast, Long> {
    List<Broadcast> findAll();
    Broadcast findByBroadcastid(Long broadcastId);

}
