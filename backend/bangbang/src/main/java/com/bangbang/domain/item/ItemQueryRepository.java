package com.bangbang.domain.item;

import com.bangbang.dto.item.ItemDto;
import com.bangbang.dto.item.ItemFilterRequestDto;
import com.bangbang.dto.item.QItemDto;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.time.LocalDate;
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
        if (filter.getItem_type() != null) {
            for (int i = 0; i < filter.getItem_type().length; i++) {
                builder.or(item.item_type.eq(filter.getItem_type()[i]));
            }
        }

        BooleanBuilder tmp = new BooleanBuilder();
        //거래 종류
        if (filter.getItem_deal_type() != null) {
            for (int i = 0; i < filter.getItem_deal_type().length; i++) {
                BooleanBuilder tmp2 = new BooleanBuilder();
                tmp2.and(item.item_deal_type.eq(filter.getItem_deal_type()[i]));
                //방 크기
                if (filter.getItem_exclusive_area() != null)
                    tmp2.and(item.item_exclusive_area.between(filter.getItem_exclusive_area()[0],filter.getItem_exclusive_area()[1]));

                if (filter.getItem_deal_type()[i] == 0) {
                    if (filter.getItem_price_month_rent() != null) //월세
                        tmp2.andAnyOf(itemPrice.item_price_month_rent.between(filter.getItem_price_month_rent()[0],filter.getItem_price_month_rent()[1]));
                    if (filter.getItem_price_month_deposit() != null) //월세 보증금
                        tmp2.andAnyOf(itemPrice.item_price_month_deposit.between(filter.getItem_price_month_deposit()[0],filter.getItem_price_month_deposit()[1]));
                }
                if (filter.getItem_deal_type()[i] == 1)//보증금
                    if (filter.getItem_price_house_deposit() != null)
                        tmp2.andAnyOf(itemPrice.item_price_house_deposit.between(filter.getItem_price_house_deposit()[0],filter.getItem_price_house_deposit()[1]));
                if (filter.getItem_deal_type()[i] == 2) //매매
                    if (filter.getItem_price_buy_house() != null)
                        tmp2.andAnyOf(itemPrice.item_price_buy_house.between(filter.getItem_price_buy_house()[0],filter.getItem_price_buy_house()[1]));
               
            tmp.and(tmp2);
            }
        }

        builder.and(tmp);

        tmp = new BooleanBuilder();
        //층수
        if (filter.getItem_floor() != null) {
            for (int i = 0; i < filter.getItem_floor().length; i++) {
                if (filter.getItem_floor()[i] == 0) {
                    tmp.and(item.item_floor.lt(0));
                }
                if (filter.getItem_floor()[i] == 1) {
                    tmp.and(item.item_floor.eq(1));
                }
                if (filter.getItem_floor()[i] == 2) {
                    tmp.and(item.item_floor.eq(2));
                }
                if (filter.getItem_floor()[i] == 3) {
                    tmp.and(item.item_floor.eq(3));
                }
                if (filter.getItem_floor()[i] == 4) {
                    tmp.and(item.item_floor.goe(3));
                }
            }
        }

        builder.and(tmp);

        //사용승인일
        LocalDate now = LocalDate.now();
        int year = now.getYear();
        if (filter.getItem_build_year() != null) {
            for (int i = 0; i < filter.getItem_build_year().length; i++) {
                if (filter.getItem_build_year()[i] == 0) {
                    builder.and(item.item_build_year.castToNum(Integer.class).subtract(year).goe(-1));
                }
                if (filter.getItem_build_year()[i] == 1) {
                    builder.and(item.item_build_year.castToNum(Integer.class).subtract(year).goe(-5));
                }
                if (filter.getItem_build_year()[i] == 2) {
                    builder.and(item.item_build_year.castToNum(Integer.class).subtract(year).goe(-10));
                }
                if (filter.getItem_build_year()[i] == 3) {
                    builder.and(item.item_build_year.castToNum(Integer.class).subtract(year).goe(-15));
                }
                if (filter.getItem_build_year()[i] == 4) {
                    builder.and(item.item_build_year.castToNum(Integer.class).subtract(year).loe(-15));
                }
            }
        }

        tmp = new BooleanBuilder();
        //옵션
        if (filter.getOption() != null) {
            Option f = filter.getOption();
            if (option.option_elevator.equals(f.isOption_elevator()))
                tmp.and(option.option_elevator.eq(true));
            if (option.option_veranda.equals(f.isOption_veranda()))
                tmp.and(option.option_veranda.eq(true));
            if (option.option_parking.equals(f.isOption_parking()))
                tmp.and(option.option_parking.eq(true));
            if (option.option_duplex.equals(f.isOption_duplex()))
                tmp.and(option.option_duplex.eq(true));
            if (option.option_separation.equals(f.isOption_separation()))
                tmp.and(option.option_separation.eq(true));
            if (option.option_induction.equals(f.isOption_induction()))
                tmp.and(option.option_induction.eq(true));
            if (option.option_microwave.equals(f.isOption_microwave()))
                tmp.and(option.option_microwave.eq(true));
            if (option.option_aircon.equals(f.isOption_aircon()))
                tmp.and(option.option_aircon.eq(true));
            if (option.option_washer.equals(f.isOption_washer()))
                tmp.and(option.option_washer.eq(true));
            if (option.option_tv.equals(f.isOption_tv()))
                tmp.and(option.option_tv.eq(true));
            if (option.option_closet.equals(f.isOption_closet()))
                tmp.and(option.option_closet.eq(true));
            if (option.option_bed.equals(f.isOption_bed()))
                tmp.and(option.option_bed.eq(true));
            if (option.option_table.equals(f.isOption_table()))
                tmp.and(option.option_table.eq(true));
            if (option.option_shoe.equals(f.isOption_shoe()))
                tmp.and(option.option_shoe.eq(true));
            if (option.option_bidet.equals(f.isOption_bidet()))
                tmp.and(option.option_bidet.eq(true));
            if (option.option_gasrange.equals(f.isOption_gasrange()))
                tmp.and(option.option_gasrange.eq(true));
            if (option.option_refrigerator.equals(f.isOption_refrigerator()))
                tmp.and(option.option_refrigerator.eq(true));
            if (option.option_doorlock.equals(f.isOption_doorlock()))
                tmp.and(option.option_doorlock.eq(true));
        }

        builder.or(tmp);

        if (builder != null) {
            //item_id 연결
            builder.and(item.item_id.eq(itemPrice.item_id));
            builder.and(item.item_id.eq(manageOption.item_id));
            builder.and(item.item_id.eq(option.item_id));

            //활성상태(삭제, 팔리지 않은)인 게시글만
            builder.and(item.item_status.eq(1));
            builder.and(item.item_deal_complete.eq(false));
        }

        return queryFactory
                .select(new QItemDto(item, itemPrice, manageOption, option)).distinct()
                .from(item, itemPrice, manageOption, option)
                .where(builder)
                .orderBy(item.item_id.desc())
                .limit(100)
                .fetch();
    }
}