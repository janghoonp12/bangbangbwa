package com.bangbang.dto.interest;

import com.bangbang.domain.interest.Interestarea;

public class InterestareaResponseDto {
    private Long interestareaId;
    private Long userId;
    private Long dongCode;

    public InterestareaResponseDto(Interestarea entity) {
        this.interestareaId = entity.getInterestareaId();
        this.userId = entity.getUserId();
        this.dongCode = entity.getDongCode();
    }
}
