package com.bangbang.domain.item;

import lombok.Getter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Id;

@Getter
@Entity
@Table(name="sidocode")
public class SidoCode {
    @Id
    private String sidoCode;
    @Column
    private String sidoName;
}
