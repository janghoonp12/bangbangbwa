package com.bangbang.domain.search;

import com.bangbang.domain.broadcast.Broadcast;
import com.bangbang.dto.broadcast.BroadcastResponseDto;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface SearchBroadcastRepository extends JpaRepository<Broadcast, Long> {

  @Query("SELECT new com.bangbang.dto.broadcast.BroadcastResponseDto(b) FROM Broadcast b WHERE b.itemId IN (:itemIds) AND (b.broadcastTitle like %:keyword% OR b.broadcastDescription like %:keyword%)")
  List<BroadcastResponseDto> findByKeywordAndItemIds(@Param("keyword") String keyword,
      @Param("itemIds") List<Long> itemIds);
}