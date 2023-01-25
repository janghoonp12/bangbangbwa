package com.bangbang.vo;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name="item_price")
public class ItemPrice {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int item_price_id;

  @Column(nullable = false)
  private int item_id; //FK

  @Column(nullable = true)
  private Integer item_price_buy_house;

  @Column(nullable = true)
  private Integer item_price_house_deposit;

  @Column(nullable = true)
  private Integer item_price_month_deposit;

  @Column(nullable = true)
  private Integer item_price_month_rent;
}
