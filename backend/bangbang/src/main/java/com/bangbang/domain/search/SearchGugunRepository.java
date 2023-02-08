package com.bangbang.domain.search;

import com.bangbang.domain.item.GugunCode;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface SearchGugunRepository extends JpaRepository<GugunCode, String> {

  @Query("SELECT g FROM GugunCode g WHERE g.gugunName LIKE %?1%")
  List<GugunCode> findByGugunNameContaining(String keyword);
}