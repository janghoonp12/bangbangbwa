package com.bangbang.domain.broadcast;

import com.bangbang.domain.broadcast.Broadcast;
import com.bangbang.dto.broadcast.BroadcastListResponseDto;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

//public interface BroadcastRepository extends JpaRepository<Broadcast, Long> {
//    List<Broadcast> findAll();
//    Optional<Broadcast> findByBroadcastId(Long broadcastId);
//
//}

public interface BroadcastRepository extends PagingAndSortingRepository<Broadcast, Long> {
    Page<Broadcast> findByBroadcastStatusOrderByBroadcastIdDesc(Pageable pageable, Integer broadcastStatus);
    Page<Broadcast> findAllByOrderByBroadcastIdDesc(Pageable pageable);
    Optional<Broadcast> findByBroadcastId(Long broadcastId);
    @Query("SELECT new com.bangbang.dto.broadcast.BroadcastListResponseDto(b) FROM Broadcast b WHERE b.itemId = :itemId")
    BroadcastListResponseDto findByItemId(@Param("itemId") Long itemId);

    String findByBroadcastRoomId(String broadcastRoomId);

}
