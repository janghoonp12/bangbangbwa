package com.bangbang.domain.item;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Id;

@Getter
@Setter
@Entity
@Table(name="sidocode")
public class SidoCode {
    @Id
    private String sidoCode;
    @Column
    private String sidoName;
}
