package com.bangbang.domain.bookmark;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookmarkRepository extends JpaRepository<Bookmark, Long> {
  List<Bookmark> findAll();
  Optional<Bookmark> findByBookmarkId(Long bookmarkId);
  List<Bookmark> findByUserId(Long userId);
}
