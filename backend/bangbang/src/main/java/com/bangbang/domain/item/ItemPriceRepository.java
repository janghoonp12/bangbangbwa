package com.bangbang.domain.item;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface ItemPriceRepository extends JpaRepository<ItemPrice, Long> {

    @Transactional(readOnly = true)
    @Query(value = "select i from ItemPrice i where i.item_id=:itemId")
    ItemPrice findByItemId(@Param("itemId")long itemId);
}