package com.bangbang.domain.interest;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InterestareaRepository extends JpaRepository<Interestarea, Long> {
    List<Interestarea> findByUserId(Long userId);
}
