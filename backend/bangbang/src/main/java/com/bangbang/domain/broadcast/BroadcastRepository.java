package com.bangbang.domain.broadcast;

import com.bangbang.dto.broadcast.BroadcastListResponseDto;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

public interface BroadcastRepository extends PagingAndSortingRepository<Broadcast, Long> {
    Page<Broadcast> findByBroadcastStatusOrderByBroadcastIdDesc(Pageable pageable, Integer broadcastStatus);
    Page<Broadcast> findAllByOrderByBroadcastIdDesc(Pageable pageable);
    Optional<Broadcast> findByBroadcastId(Long broadcastId);
    @Query("SELECT new com.bangbang.dto.broadcast.BroadcastListResponseDto(b) FROM Broadcast b WHERE b.itemId = :itemId")
    BroadcastListResponseDto findByItemId(@Param("itemId") Long itemId);

    String findByBroadcastRoomId(String broadcastRoomId);
}
