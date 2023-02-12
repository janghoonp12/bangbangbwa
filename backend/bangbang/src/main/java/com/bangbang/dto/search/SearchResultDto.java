package com.bangbang.dto.search;

import com.bangbang.domain.item.Item;
import com.bangbang.dto.broadcast.BroadcastResponseDto;
import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SearchResultDto {
  private List<Item> dataB;
  private List<BroadcastResponseDto> dataD;

  public SearchResultDto(List<Item> dataB, List<BroadcastResponseDto> dataD) {
    this.dataB = dataB;
    this.dataD = dataD;
  }
}