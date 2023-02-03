package com.bangbang.dto.interest;

import com.bangbang.domain.interest.Interestitem;

public class InterestitemResponseDto {
    private Long interestitemId;
    private Long userId;
    private Long itemId;

    public InterestitemResponseDto(Interestitem entity) {
        this.interestitemId = entity.getInterestitemId();
        this.userId = entity.getUserId();
        this.itemId = entity.getItemId();
    }
}
