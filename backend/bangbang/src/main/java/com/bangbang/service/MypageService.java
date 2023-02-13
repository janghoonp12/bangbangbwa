package com.bangbang.service;

import com.bangbang.domain.broadcast.Broadcast;
import com.bangbang.domain.sign.User;
import com.bangbang.dto.broadcast.BroadcastListResponseDto;
import com.bangbang.dto.item.ItemDto;

import java.util.List;

public interface MypageService {
    User searchUser(Long userId);
    List<ItemDto> searchMyItem(Long userId);
    List<BroadcastListResponseDto> searchMyBroadcast(Long userId);
    void modifyUserNickname(Long userId, String nickname);
    void modifyUserPassword(Long userId, String password);
    void deactivateUser(Long userId);
}
