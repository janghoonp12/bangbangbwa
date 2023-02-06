package com.bangbang.service;

import com.bangbang.domain.interest.Interestarea;
import com.bangbang.domain.interest.InterestareaRepository;
import com.bangbang.domain.interest.Interestitem;
import com.bangbang.domain.interest.InterestitemRepository;
import com.bangbang.dto.interest.InterestareaSaveRequestDto;
import com.bangbang.dto.interest.InterestitemSaveRequestDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InterestServiceImpl implements InterestService{

    @Autowired
    InterestitemRepository interestitemRepository;
    @Autowired
    InterestareaRepository interestareaRepository;
    @Override
    public void newInterestArea(InterestareaSaveRequestDto area) {
        interestareaRepository.save(area.toEntity());
    }

    @Override
    public void newInterestItem(InterestitemSaveRequestDto item) {
        interestitemRepository.save(item.toEntity());
    }

    @Override
    public List<Interestarea> searchInterestArea(Long userId) {
        return interestareaRepository.findByUserId(userId);
    }

    @Override
    public List<Interestitem> searchInterestItem(Long userId) {
        return interestitemRepository.findByUserId(userId);
    }

    @Override
    public void deleteInterestArea(Long interestareaId) {
        interestareaRepository.deleteById(interestareaId);
    }

    @Override
    public void deleteInterestItem(Long interestitemId) {
        interestitemRepository.deleteById(interestitemId);
    }
}
