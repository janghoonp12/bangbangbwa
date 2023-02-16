package com.bangbang.service;

import com.bangbang.domain.interest.Interestarea;
import com.bangbang.domain.interest.InterestareaRepository;
import com.bangbang.domain.interest.Interestitem;
import com.bangbang.domain.interest.InterestitemRepository;
import com.bangbang.domain.item.Item;
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
    public List<Item> searchInterestItem(Long userId) {
        return interestitemRepository.searchInterestItem(userId);
    }

    @Override
    public void deleteInterestArea(Long interestareaId) {
        interestareaRepository.deleteById(interestareaId);
    }

    @Override
    public void deleteInterestItem(Long userId, Long itemId) {
        Interestitem item = interestitemRepository.interestItemStatus(userId, itemId);
        interestitemRepository.deleteById(item.getInterestitemId());
    }

    @Override
    public boolean interestItemStatus(Long userId, Long itemId) {
        Interestitem item = interestitemRepository.interestItemStatus(userId, itemId);
        if (item != null) return true;
        return false;
    }
}
