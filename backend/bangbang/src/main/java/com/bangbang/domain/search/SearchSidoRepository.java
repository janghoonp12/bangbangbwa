package com.bangbang.domain.search;

import com.bangbang.domain.item.SidoCode;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SearchSidoRepository extends JpaRepository<SidoCode, String> {
  List<SidoCode> findBySidoNameContaining(String keyword);
}