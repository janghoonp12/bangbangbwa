package com.bangbang.service;

import com.bangbang.domain.broadcast.Broadcast;
import com.bangbang.domain.sign.User;
import com.bangbang.dto.broadcast.BroadcastListResponseDto;
import com.bangbang.dto.item.ItemDto;

import java.util.List;

public interface MypageService {
    User searchUser(Long userId);
    List<ItemDto> searchMyItem(Long brokerId);
    List<BroadcastListResponseDto> searchMyBroadcast(Long brokerId);
}
