package com.bangbang.domain.interest;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InterestitemRepository extends JpaRepository<Interestitem, Long>{
    List<Interestitem> findByUserId(Long userId);
}
