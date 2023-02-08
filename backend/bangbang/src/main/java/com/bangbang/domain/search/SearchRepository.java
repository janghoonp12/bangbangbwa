package com.bangbang.domain.search;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface SearchRepository extends JpaRepository<Search, Long> {
  @Query("SELECT s FROM Search s WHERE s.sidoCode LIKE %:keyword% OR s.gugunCode LIKE %:keyword% OR s.dongCode LIKE %:keyword%")
  List<Search> findByKeyword(@Param("keyword") String keyword);
}
