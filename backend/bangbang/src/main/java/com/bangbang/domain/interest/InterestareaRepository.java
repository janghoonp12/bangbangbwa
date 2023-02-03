package com.bangbang.domain.interest;

import com.bangbang.dto.interest.InterestareaResponseDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InterestareaRepository extends JpaRepository<Interestarea, Long> {
    List<InterestareaResponseDto> findByUserId(Long userId);
}
