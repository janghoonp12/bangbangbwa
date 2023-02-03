package com.bangbang.dto.interest;

import com.bangbang.domain.interest.Interestitem;
import lombok.Builder;

public class InterestitemSaveRequestDto {
    private Long userId;
    private Long itemId;

    @Builder
    public InterestitemSaveRequestDto(Long userId, Long itemId) {
        this.userId = userId;
        this.itemId = itemId;
    }

    public Interestitem toEntity() {
        return Interestitem.builder()
                .userId(userId)
                .itemId(itemId)
                .build();
    }
}
