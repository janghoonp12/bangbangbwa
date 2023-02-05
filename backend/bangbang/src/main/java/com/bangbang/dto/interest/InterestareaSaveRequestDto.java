package com.bangbang.dto.interest;

import com.bangbang.domain.interest.Interestarea;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class InterestareaSaveRequestDto {
    private Long userId;
    private String dongCode;
    @Builder
    public InterestareaSaveRequestDto(Long userId, String dongCode) {
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
