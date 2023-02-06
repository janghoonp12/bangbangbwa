package com.bangbang.domain.page;

import com.bangbang.domain.broadcast.Broadcast;
import com.bangbang.domain.sign.User;
import com.bangbang.dto.broadcast.BroadcastListResponseDto;
import com.bangbang.dto.item.ItemDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MypageRepository extends JpaRepository <User, Long>{
    User findByUserId(Long userId);
    @Query(value = "select new com.bangbang.dto.broadcast.BroadcastListResponseDto(bc) " +
            "from Broadcast bc, Item i, Image im " +
            "where i.broker_id =:brokerId and i.item_id = bc.itemId and bc.broadcastStatus = 1 and im.imageId = bc.image.imageId " +
            "order by bc.broadcastId desc")
    List<BroadcastListResponseDto> searchBroadcastByBrokerId(Long brokerId);

    @Query("select new com.bangbang.dto.item.ItemDto(i, ip, m, o) " +
            "from Item i, ItemPrice ip, ManageOption m, Option o " +
            "where i.item_id = ip.item_id and i.item_id = m.item_id and i.item_id = o.item_id and i.broker_id =:brokerId " +
            "order by i.item_id desc")
    List<ItemDto> searchItemByBrokerId(Long brokerId);
}