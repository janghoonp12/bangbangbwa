package com.bangbang.dto.search;

import com.bangbang.domain.item.Item;
import com.bangbang.dto.broadcast.BroadcastListResponseDto;
import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SearchResultDto {
  private List<Item> dataB;
  private List<BroadcastListResponseDto> dataD;

  public SearchResultDto(List<Item> dataB, List<BroadcastListResponseDto> dataD) {
    this.dataB = dataB;
    this.dataD = dataD;
  }
}