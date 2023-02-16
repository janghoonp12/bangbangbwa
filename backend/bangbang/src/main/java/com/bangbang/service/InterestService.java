package com.bangbang.service;

import com.bangbang.domain.interest.Interestarea;
import com.bangbang.domain.interest.Interestitem;
import com.bangbang.domain.item.Item;
import com.bangbang.dto.interest.InterestareaSaveRequestDto;
import com.bangbang.dto.interest.InterestitemSaveRequestDto;

import java.util.List;

public interface InterestService {
    void newInterestArea(InterestareaSaveRequestDto area);
    void newInterestItem(InterestitemSaveRequestDto item);
    List<Interestarea> searchInterestArea(Long userId);
    List<Item> searchInterestItem(Long userId);
    void deleteInterestArea(Long interestareaId);
    void deleteInterestItem(Long userId, Long itemId);
    boolean interestItemStatus(Long userId, Long itemId);
}
