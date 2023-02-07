package com.bangbang.service;

import com.bangbang.domain.broadcast.Broadcast;
import com.bangbang.domain.page.MypageRepository;
import com.bangbang.domain.sign.User;
import com.bangbang.dto.broadcast.BroadcastListResponseDto;
import com.bangbang.dto.item.ItemDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MypageServiceImpl implements MypageService{

    @Autowired
    MypageRepository mypageRepository;
    @Override
    public User searchUser(Long userId) {
        return mypageRepository.findByUserId(userId);
    }

    @Override
    public List<ItemDto> searchMyItem(Long brokerId) {
        return mypageRepository.searchItemByBrokerId(brokerId);
    }

    @Override
    public List<BroadcastListResponseDto> searchMyBroadcast(Long brokerId) {
        return mypageRepository.searchBroadcastByBrokerId(brokerId);
    }
}
