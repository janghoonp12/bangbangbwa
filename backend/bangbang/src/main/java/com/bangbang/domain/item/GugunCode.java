package com.bangbang.domain.item;

import lombok.Getter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Getter
@Entity
@Table(name="guguncode")
public class GugunCode {
    @Id
    private String gugunCode;
    @Column
    private String gugunName;
}
