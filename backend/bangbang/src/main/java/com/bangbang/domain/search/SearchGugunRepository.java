package com.bangbang.domain.search;

import com.bangbang.domain.item.GugunCode;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SearchGugunRepository extends JpaRepository<GugunCode, String> {
  List<GugunCode> findByGugunNameContaining(String keyword);
}