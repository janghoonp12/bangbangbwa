package com.bangbang.service;

import com.bangbang.domain.item.Item;
import com.bangbang.domain.search.SearchBroadcastRepository;
import com.bangbang.domain.search.SearchItemRepository;
import com.bangbang.dto.broadcast.BroadcastResponseDto;
import com.bangbang.dto.search.SearchResultDto;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SearchService {
  private final SearchItemRepository searchItemRepository;
  private final SearchBroadcastRepository searchBroadcastRepository;

  public SearchResultDto search(String dongCode, String keyword) {
    List<Item> dataA = searchItemRepository.findByItemDongcode(dongCode);

    List<Item> dataB = searchItemRepository.findByItemDongcodeAndKeyword(dongCode, keyword);

    List<String> itemIds = dataA.stream().map(Item::getItemId).map(String::valueOf)
        .collect(Collectors.toList());

    try {
      List<Long> itemIdsLong = itemIds.stream().map(Long::valueOf).collect(Collectors.toList());

      List<BroadcastResponseDto> dataD = searchBroadcastRepository.findByKeywordAndItemIds(keyword, itemIdsLong);

      return new SearchResultDto(dataB, dataD);
    } catch (Exception e) {
      return new SearchResultDto(dataB, Collections.emptyList());
    }
  }
}
