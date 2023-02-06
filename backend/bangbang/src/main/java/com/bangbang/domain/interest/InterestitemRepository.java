package com.bangbang.domain.interest;

import com.bangbang.dto.interest.InterestitemSaveRequestDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InterestitemRepository extends JpaRepository<Interestitem, Long>{
    List<Interestitem> findByUserId(Long userId);
}
