package com.bangbang.service;

import com.bangbang.domain.bookmark.BookmarkRepository;
import com.bangbang.domain.item.DongCodeRepository;
import com.bangbang.domain.sign.User;
import com.bangbang.domain.sign.UserRepository;
import com.bangbang.dto.bookmark.BookmarkSaveRequestDto;
import com.bangbang.dto.item.SiGuDongDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BookmarkService {
  private final UserRepository userRepository;
  private final DongCodeRepository dongCodeRepository;
  private final BookmarkRepository bookmarkRepository;

  //즐겨찾기 등록
  public void newBookmark(BookmarkSaveRequestDto requestDto){
   Optional<SiGuDongDto> dongcode = Optional.of(dongCodeRepository.getAddressName(requestDto.getDongCode()));
   dongcode.orElseThrow(() -> new IllegalArgumentException("해당 동코드가 없습니다."));

    User user = userRepository.findByUserId(requestDto.getUserId())
        .orElseThrow(() -> new IllegalArgumentException("유저 정보가 존재하지 않습니다."));

    bookmarkRepository.save(requestDto.toEntity());
  }
}
