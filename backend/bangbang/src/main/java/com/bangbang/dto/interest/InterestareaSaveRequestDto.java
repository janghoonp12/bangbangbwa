package com.bangbang.dto.interest;

import com.bangbang.domain.interest.Interestarea;
import lombok.Builder;

public class InterestareaSaveRequestDto {
    private Long userId;
    private Long dongCode;
    @Builder
    public InterestareaSaveRequestDto(Long userId, Long dongCode) {
        this.userId = userId;
        this.dongCode = dongCode;
    }
    public Interestarea toEntity() {
        return Interestarea.builder()
                .userId(userId)
                .dongCode(dongCode)
                .build();
    }
}
