package com.bangbang.domain.item;

import java.util.List;

import com.bangbang.dto.item.ItemDto;
import com.bangbang.dto.item.ItemResponseDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {
    Item findById(long itemId);
    @Query("select new com.bangbang.dto.item.ItemDto(i, ip, m, o) " +
            "from Item i, ItemPrice ip, ManageOption m, Option o " +
            "where i.item_id = ip.item_id and i.item_id = m.item_id and i.item_id = o.item_id " +
            "order by i.item_id desc")
    List<ItemDto> findAllItem100();

    @Query("select new com.bangbang.dto.item.ItemDto(i, ip, m, o) " +
            "from Item i, ItemPrice ip, ManageOption m, Option o " +
            "where i.item_id = ip.item_id and i.item_id = m.item_id and i.item_id = o.item_id and i.item_dongcode=:dongCode " +
            "order by i.item_id desc")
    List<ItemDto>findByDongCode(String dongCode);
}