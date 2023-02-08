package com.bangbang.domain.search;

import com.bangbang.domain.item.SidoCode;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface SearchSidoRepository extends JpaRepository<SidoCode, String> {
  @Query("SELECT s FROM SidoCode s WHERE s.sidoName LIKE %?1%")
  List<SidoCode> findBySidoNameContaining(String keyword);
}