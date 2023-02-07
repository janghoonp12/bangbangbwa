package com.bangbang.domain.item;

import com.bangbang.dto.item.ItemDto;
import com.bangbang.dto.item.ItemFilterRequestDto;
import com.bangbang.dto.item.QItemDto;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;
import static com.bangbang.domain.item.QItem.item;
import static com.bangbang.domain.item.QItemPrice.itemPrice;
import static com.bangbang.domain.item.QManageOption.manageOption;
import static com.bangbang.domain.item.QOption.option;

@Repository
public class ItemQueryRepository {
    private final EntityManager em;
    private final JPAQueryFactory queryFactory;

    public ItemQueryRepository(EntityManager em) {
        this.em = em;
        this.queryFactory = new JPAQueryFactory(em);
    }

    public List<ItemDto> searchItemByFilter(ItemFilterRequestDto filter) {
        BooleanBuilder builder = new BooleanBuilder();

        //매물 종류
        for (int i = 0; i < filter.getItem_type().length; i++) {
            builder.and(item.item_type.eq(filter.getItem_type()[i]));
        }
        //거래 종류
        for (int i = 0; i < filter.getItem_deal_type().length; i++) {
            builder.and(item.item_deal_type.eq(filter.getItem_deal_type()[i]));
        }

        //매매가
        if (filter.getItem_price_buy_house() != null)
            builder.and(itemPrice.item_price_buy_house.between(filter.getItem_price_buy_house()[0],filter.getItem_price_buy_house()[1]));
        //보증금
        if (filter.getItem_price_house_deposit() != null)
            builder.and(itemPrice.item_price_house_deposit.between(filter.getItem_price_house_deposit()[0],filter.getItem_price_house_deposit()[1]));
        //월세
        if (filter.getItem_price_month_rent() != null)
            builder.and(itemPrice.item_price_month_rent.between(filter.getItem_price_month_rent()[0],filter.getItem_price_month_rent()[1]));
        //방 크기
        if (filter.getItem_exclusive_area() != null)
            builder.and(item.item_exclusive_area.between(filter.getItem_exclusive_area()[0],filter.getItem_exclusive_area()[1]));

        return queryFactory
                .select(new QItemDto(
                        item,itemPrice,manageOption, option
                ))
                .from(item, itemPrice, manageOption, option)
                .leftJoin(item.itemPrice, itemPrice)
                .leftJoin(item.manageOption,manageOption)
                .leftJoin(item.option, option)
                .where(builder
                )
                .fetch();
    }
}
