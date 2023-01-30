package com.bangbang.service;

import com.bangbang.domain.bookmark.BookmarkRepository;
import com.bangbang.domain.dongcode.Dongcode;
import com.bangbang.domain.dongcode.DongcodeRepository;
import com.bangbang.domain.sign.User;
import com.bangbang.domain.sign.UserRepository;
import com.bangbang.dto.bookmark.BookmarkSaveRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BookmarkService {
  private final UserRepository userRepository;
  private final DongcodeRepository dongcodeRepository;
  private final BookmarkRepository bookmarkRepository;

  //즐겨찾기 등록
  public void newBookmark(BookmarkSaveRequestDto requestDto){
    Dongcode dongcode = dongcodeRepository.findByDongcodeId(requestDto.getDongcodeId())
        .orElseThrow(() -> new IllegalArgumentException("해당 동코드가 없습니다."));

    User user = userRepository.findByUserId(requestDto.getUserId())
        .orElseThrow(() -> new IllegalArgumentException("유저 정보가 존재하지 않습니다."));

    bookmarkRepository.save(requestDto.toEntity(user, dongcode));
  }
}
