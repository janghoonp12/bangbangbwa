package com.bangbang.domain.item;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ItemPriceRepository extends JpaRepository<ItemPrice, Long> {
    @Query(value = "select i from ItemPrice i where i.item_id=:itemId")
    ItemPrice findByItemId(long itemId);
}