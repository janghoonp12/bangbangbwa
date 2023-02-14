package com.bangbang.domain.search;

import com.bangbang.domain.item.Item;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface SearchItemRepository extends JpaRepository<Item, Long> {
  @Query("SELECT i FROM Item i WHERE i.item_dongcode LIKE :dongCode" )
  List<Item> findByItemDongcode(@Param("dongCode") String dongCode);
  @Query("SELECT i FROM Item i WHERE i.item_dongcode LIKE :dongCode AND (i.item_title like %:keyword% OR i.item_description like %:keyword% OR i.item_building_name like %:keyword%)" )
  List<Item> findByItemDongcodeAndKeyword(@Param("dongCode") String dongCode, @Param("keyword") String keyword);
}
