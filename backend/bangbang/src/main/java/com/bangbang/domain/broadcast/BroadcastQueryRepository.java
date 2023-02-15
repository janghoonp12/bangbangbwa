package com.bangbang.domain.broadcast;

import com.bangbang.domain.item.Option;
import com.bangbang.dto.broadcast.BroadcastResponseDto;
import com.bangbang.dto.broadcast.QBroadcastResponseDto;
import com.bangbang.dto.item.ItemFilterRequestDto;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.util.List;
import static com.bangbang.domain.item.QItem.item;
import static com.bangbang.domain.item.QItemPrice.itemPrice;
import static com.bangbang.domain.item.QOption.option;
import static com.bangbang.domain.broadcast.QBroadcast.broadcast;

@Repository
public class BroadcastQueryRepository {
    private final EntityManager em;
    private final JPAQueryFactory queryFactory;

    public BroadcastQueryRepository(EntityManager em) {
        this.em = em;
        this.queryFactory = new JPAQueryFactory(em);
    }

    public List<BroadcastResponseDto> searchBroadcastByFilter(ItemFilterRequestDto filter) {
        BooleanBuilder builder = new BooleanBuilder();

        //매물 종류
        if (filter.getItem_type() != null) {
            for (int i = 0; i < filter.getItem_type().length; i++) {
                builder.or(item.item_type.eq(filter.getItem_type()[i]));
            }
        }
        //거래 종류
        if (filter.getItem_deal_type() != null) {
            for (int i = 0; i < filter.getItem_deal_type().length; i++) {
                builder.or(item.item_deal_type.eq(filter.getItem_deal_type()[i]));
            }
        }

        //매매가
        if (filter.getItem_price_buy_house() != null)
            builder.or(itemPrice.item_price_buy_house.between(filter.getItem_price_buy_house()[0],filter.getItem_price_buy_house()[1]));
        //보증금
        if (filter.getItem_price_house_deposit() != null)
            builder.or(itemPrice.item_price_house_deposit.between(filter.getItem_price_house_deposit()[0],filter.getItem_price_house_deposit()[1]));
        //월세
        if (filter.getItem_price_month_rent() != null)
            builder.or(itemPrice.item_price_month_rent.between(filter.getItem_price_month_rent()[0],filter.getItem_price_month_rent()[1]));
        //방 크기
        if (filter.getItem_exclusive_area() != null)
            builder.or(item.item_exclusive_area.between(filter.getItem_exclusive_area()[0],filter.getItem_exclusive_area()[1]));

        //층수
        if (filter.getItem_floor() != null) {
            for (int i = 0; i < filter.getItem_floor().length; i++) {
                if (filter.getItem_floor()[i] == 0) {
                    builder.or(item.item_floor.lt(0));
                }
                if (filter.getItem_floor()[i] == 1) {
                    builder.or(item.item_floor.eq(1));
                }
                if (filter.getItem_floor()[i] == 2) {
                    builder.or(item.item_floor.eq(2));
                }
                if (filter.getItem_floor()[i] == 3) {
                    builder.or(item.item_floor.eq(3));
                }
                if (filter.getItem_floor()[i] == 4) {
                    builder.or(item.item_floor.gt(3));
                }
            }
        }

        //사용승인일
        LocalDate now = LocalDate.now();
        int year = now.getYear();
        if (filter.getItem_build_year() != null) {
            for (int i = 0; i < filter.getItem_build_year().length; i++) {
                if (filter.getItem_build_year()[i] == 0) {
                    builder.or(item.item_build_year.castToNum(Integer.class).subtract(year).loe(1));
                }
                if (filter.getItem_build_year()[i] == 1) {
                    builder.or(item.item_build_year.castToNum(Integer.class).subtract(year).loe(5));
                }
                if (filter.getItem_build_year()[i] == 2) {
                    builder.or(item.item_build_year.castToNum(Integer.class).subtract(year).loe(10));
                }
                if (filter.getItem_build_year()[i] == 3) {
                    builder.or(item.item_build_year.castToNum(Integer.class).subtract(year).loe(15));
                }
                if (filter.getItem_build_year()[i] == 4) {
                    builder.or(item.item_build_year.castToNum(Integer.class).subtract(year).goe(15));
                }
            }
        }

        //옵션
        if (filter.getOption() != null) {
            Option f = filter.getOption();
            if (option.option_elevator.equals(f.isOption_elevator()))
                builder.or(option.option_elevator.eq(true));
            if (option.option_veranda.equals(f.isOption_veranda()))
                builder.or(option.option_veranda.eq(true));
            if (option.option_parking.equals(f.isOption_parking()))
                builder.or(option.option_parking.eq(true));
            if (option.option_duplex.equals(f.isOption_duplex()))
                builder.or(option.option_duplex.eq(true));
            if (option.option_separation.equals(f.isOption_separation()))
                builder.or(option.option_separation.eq(true));
            if (option.option_induction.equals(f.isOption_induction()))
                builder.or(option.option_induction.eq(true));
            if (option.option_microwave.equals(f.isOption_microwave()))
                builder.or(option.option_microwave.eq(true));
            if (option.option_aircon.equals(f.isOption_aircon()))
                builder.or(option.option_aircon.eq(true));
            if (option.option_washer.equals(f.isOption_washer()))
                builder.or(option.option_washer.eq(true));
            if (option.option_tv.equals(f.isOption_tv()))
                builder.or(option.option_tv.eq(true));
            if (option.option_closet.equals(f.isOption_closet()))
                builder.or(option.option_closet.eq(true));
            if (option.option_bed.equals(f.isOption_bed()))
                builder.or(option.option_bed.eq(true));
            if (option.option_table.equals(f.isOption_table()))
                builder.or(option.option_table.eq(true));
            if (option.option_shoe.equals(f.isOption_shoe()))
                builder.or(option.option_shoe.eq(true));
            if (option.option_bidet.equals(f.isOption_bidet()))
                builder.or(option.option_bidet.eq(true));
            if (option.option_gasrange.equals(f.isOption_gasrange()))
                builder.or(option.option_gasrange.eq(true));
            if (option.option_refrigerator.equals(f.isOption_refrigerator()))
                builder.or(option.option_refrigerator.eq(true));
            if (option.option_doorlock.equals(f.isOption_doorlock()))
                builder.or(option.option_doorlock.eq(true));
        }

        if (builder != null) {
            //item_id 연결
            builder.andAnyOf(broadcast.itemId.eq(item.item_id));
            builder.andAnyOf(item.item_id.eq(itemPrice.item_id));
            builder.andAnyOf(item.item_id.eq(option.item_id));

            //활성상태(삭제, 팔리지 않은)인 게시글만
            builder.andAnyOf(item.item_status.eq(1));
            builder.andAnyOf(item.item_deal_complete.eq(false));
            builder.andAnyOf(broadcast.broadcastStatus.eq(1));
        }

        return queryFactory
                .select(new QBroadcastResponseDto(broadcast)).distinct()
                .from(item, itemPrice, option, broadcast)
                .where(builder)
                .orderBy(broadcast.broadcastId.desc())
                .limit(100)
                .fetch();
    }
}