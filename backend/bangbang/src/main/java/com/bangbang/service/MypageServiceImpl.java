package com.bangbang.service;

import com.bangbang.domain.page.MypageRepository;
import com.bangbang.domain.sign.User;
import com.bangbang.domain.sign.UserRepository;
import com.bangbang.dto.broadcast.BroadcastListResponseDto;
import com.bangbang.dto.item.ItemDto;
import com.bangbang.exception.BaseException;
import com.bangbang.exception.ErrorMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MypageServiceImpl implements MypageService{

    @Autowired
    MypageRepository mypageRepository;
    @Autowired
    UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public User searchUser(Long userId) {
        return mypageRepository.findByUserId(userId);
    }

    @Override
    public List<ItemDto> searchMyItem(Long userId) {
        return mypageRepository.searchItemByBrokerId(userId);
    }

    @Override
    public List<BroadcastListResponseDto> searchMyBroadcast(Long userId) {
        return mypageRepository.searchBroadcastByBrokerId(userId);
    }

    @Transactional
    @Override
    public void modifyUserNickname(Long userId, String nickname) {
        mypageRepository.modifyUserNickname(userId, nickname);
    }

    @Transactional
    @Override
    public void modifyUserPassword(Long userId, String password) {
        password = passwordEncoder.encode(password);
        mypageRepository.modifyUserPassword(userId, password);
    }

    @Transactional
    @Override
    public void deactivateUser(Long userId) {
        mypageRepository.deactivateUser(userId);
    }
}
