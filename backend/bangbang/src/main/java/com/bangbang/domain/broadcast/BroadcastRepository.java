package com.bangbang.domain.broadcast;

import com.bangbang.domain.broadcast.Broadcast;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

//public interface BroadcastRepository extends JpaRepository<Broadcast, Long> {
//    List<Broadcast> findAll();
//    Optional<Broadcast> findByBroadcastId(Long broadcastId);
//
//}

public interface BroadcastRepository extends PagingAndSortingRepository<Broadcast, Long> {
    Page<Broadcast> findByBroadcastStatus(Pageable pageable, Integer broadcastStatus);
    Page<Broadcast> findAll(Pageable pageable);
    Optional<Broadcast> findByBroadcastId(Long broadcastId);

    String findByBroadcastRoomId(String broadcastRoomId);

}
