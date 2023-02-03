package com.bangbang.domain.interest;

import com.bangbang.dto.interest.InterestitemResponseDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InterestitemRepository extends JpaRepository<Interestitem, Long>{
    List<InterestitemResponseDto> findByUserId(Long userId);
}
