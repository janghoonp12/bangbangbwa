package com.bangbang.service;

import com.bangbang.dto.interest.InterestareaResponseDto;
import com.bangbang.dto.interest.InterestareaSaveRequestDto;
import com.bangbang.dto.interest.InterestitemResponseDto;
import com.bangbang.dto.interest.InterestitemSaveRequestDto;

import java.util.List;

public interface InterestService {
    void newInterestArea(InterestareaSaveRequestDto area);
    void newInterestItem(InterestitemSaveRequestDto item);
    List<InterestareaResponseDto> searchInterestArea(Long userId);
    List<InterestitemResponseDto> searchInterestItem(Long userId);
    void deleteInterestArea(Long interestareaId);
    void deleteInterestItem(Long interestitemId);
}
