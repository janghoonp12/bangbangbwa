package com.bangbang.dto.item;

import com.bangbang.domain.item.Option;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
public class OptionSaveRequestDto {
    private long option_id;
    private boolean option_elevator;
    private boolean option_veranda;
    private boolean option_parking;
    private boolean option_duplex;
    private boolean option_separation;
    private boolean option_induction;
    private boolean option_microwave;
    private boolean option_aircon;
    private boolean option_washer;
    private boolean option_tv;
    private boolean option_closet;
    private boolean option_bed;
    private boolean option_table;
    private boolean option_shoe;
    private boolean option_bidet;
    private boolean option_gasrange;
    private boolean option_refrigerator;
    private boolean option_doorlock;
    private long item_id; //FK

    @Builder
    public OptionSaveRequestDto(boolean option_elevator, boolean option_veranda, boolean option_parking, boolean option_duplex, boolean option_separation, boolean option_induction, boolean option_microwave, boolean option_aircon, boolean option_washer, boolean option_tv, boolean option_closet, boolean option_bed, boolean option_table, boolean option_shoe, boolean option_bidet, boolean option_gasrange, boolean option_refrigerator, boolean option_doorlock, long item_id) {
        this.option_elevator = option_elevator;
        this.option_veranda = option_veranda;
        this.option_parking = option_parking;
        this.option_duplex = option_duplex;
        this.option_separation = option_separation;
        this.option_induction = option_induction;
        this.option_microwave = option_microwave;
        this.option_aircon = option_aircon;
        this.option_washer = option_washer;
        this.option_tv = option_tv;
        this.option_closet = option_closet;
        this.option_bed = option_bed;
        this.option_table = option_table;
        this.option_shoe = option_shoe;
        this.option_bidet = option_bidet;
        this.option_gasrange = option_gasrange;
        this.option_refrigerator = option_refrigerator;
        this.option_doorlock = option_doorlock;
        this.item_id = item_id;
    }

    public Option toEntity() {
        return Option.builder()
                .option_elevator(option_elevator)
                .option_veranda(option_veranda)
                .option_parking(option_parking)
                .option_duplex(option_duplex)
                .option_separation(option_separation)
                .option_induction(option_induction)
                .option_microwave(option_microwave)
                .option_aircon(option_aircon)
                .option_washer(option_washer)
                .option_tv(option_tv)
                .option_closet(option_closet)
                .option_bed(option_bed)
                .option_table(option_table)
                .option_shoe(option_shoe)
                .option_bidet(option_bidet)
                .option_gasrange(option_gasrange)
                .option_refrigerator(option_refrigerator)
                .option_doorlock(option_doorlock)
                .item_id(item_id)
                .build();
    }
}
