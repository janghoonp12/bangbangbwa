package com.bangbang.domain.item;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@Entity
@Table(name = "item")
public class Item {

  @Id
  @Column(name = "item_id")
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long itemId;

  @Column(name = "item_type", length = 1, nullable = true)
  private Integer itemType;

  @Builder
  public Item(Integer itemType){this.itemType = itemType;}

  public void update(Integer itemType){this.itemType = itemType;}
}
