package com.bangbang.domain.item;

import lombok.Getter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Getter
@Entity
@Table(name="dongcode")
public class DongCode {
    @Id
    private String dongCode;
    @Column
    private String sidoName;
    @Column
    private String gugunName;
    @Column
    private String dongName;
}
