package com.bangbang.domain.item;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@Entity
@Table(name="manage_option")
@SuperBuilder
@NoArgsConstructor
public class ManageOption {
    @Id
    private long manage_option_id;

    @Column(nullable = true)
    private boolean manage_option_internet;

    @Column(nullable = true)
    private boolean manage_option_tv;

    @Column(nullable = true)
    private boolean manage_option_clean;

    @Column(nullable = true)
    private boolean manage_option_water;

    @Column(nullable = true)
    private boolean manage_option_gas;

    @Column(nullable = true)
    private boolean manage_option_electric;

    @Column(nullable = true)
    private String manage_option_etc;

    @Column(nullable = false)
    private long item_id; //FK
}