package com.bangbang.service;

import com.bangbang.domain.bookmark.Bookmark;
import com.bangbang.domain.bookmark.BookmarkRepository;
import com.bangbang.domain.item.DongCodeRepository;
import com.bangbang.domain.sign.User;
import com.bangbang.domain.sign.UserRepository;
import com.bangbang.dto.bookmark.BookmarkListResponseDto;
import com.bangbang.dto.bookmark.BookmarkResponseDto;
import com.bangbang.dto.bookmark.BookmarkSaveRequestDto;
import com.bangbang.dto.item.SiGuDongDto;
import com.bangbang.dto.bookmark.BookmarkUpdateRequestDto;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BookmarkService {
  private final UserRepository userRepository;
  private final DongCodeRepository dongCodeRepository;
  private final BookmarkRepository bookmarkRepository;

  //즐겨찾기 전체 조회
  public List<BookmarkListResponseDto> searchBookmarkAll(){
    return bookmarkRepository.findAll().stream()
        .map(BookmarkListResponseDto::new)
        .collect(Collectors.toList());
  }

  //해당 즐겨찾기 조회
  public BookmarkResponseDto bookmarkDetail(Long bookmarkId){
    Bookmark entity = bookmarkRepository.findByBookmarkId(bookmarkId)
        .orElseThrow(() -> new IllegalArgumentException("해당 즐겨찾기가 없습니다."));
    return new BookmarkResponseDto(entity);
  }

  //즐겨찾기 등록
  @Transactional
  public void newBookmark(BookmarkSaveRequestDto requestDto){
   Optional<SiGuDongDto> dongcode = Optional.of(dongCodeRepository.getAddressName(requestDto.getDongCode()));
   dongcode.orElseThrow(() -> new IllegalArgumentException("해당 동코드가 없습니다."));

    User user = userRepository.findByUserId(requestDto.getUserId());

    if (user == null) {
      new IllegalArgumentException("유저 정보가 존재하지 않습니다.");
    }

    bookmarkRepository.save(requestDto.toEntity());
  }

  //즐겨찾기 수정
  @Transactional
  public void modifyBookmark(Long id, BookmarkUpdateRequestDto requestDto){
    Bookmark bookmark = bookmarkRepository.findByBookmarkId(id).orElseThrow(
        () -> new IllegalArgumentException("즐겨찾기가 없습니다."));
    bookmark.update(requestDto.getBookmarkTitle(), requestDto.getBookmarkComment(),
        requestDto.getBookmarkItemType(), requestDto.getBookmarkBuildingType(), requestDto.getBookmarkItemMinPrice(),
        requestDto.getBookmarkItemMaxPrice());
  }

  //즐겨찾기 삭제
  @Transactional
  public void deleteBookmark(Long id){
    Bookmark bookmark = bookmarkRepository.findByBookmarkId(id).orElseThrow(
        () -> new IllegalArgumentException("해당 즐겨찾기가 없습니다."));

    bookmarkRepository.delete(bookmark);
  }
}
