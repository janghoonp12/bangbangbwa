package com.bangbang.domain.search;

import com.bangbang.domain.item.DongCode;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SearchDongRepository extends JpaRepository<DongCode, String> {
  List<DongCode> findByDongNameContaining(String keyword);
}