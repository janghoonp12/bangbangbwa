package com.bangbang.domain.broadcast;

import com.bangbang.domain.BroadcastDatetime;
import com.bangbang.domain.image.Image;
import com.bangbang.domain.item.Item;
import javax.persistence.*;

import com.bangbang.domain.BroadcastDatetime;
import lombok.*;

@Getter
@NoArgsConstructor
@Entity
@Table(name = "broadcast")
public class Broadcast extends BroadcastDatetime {
  @Id
  @Column(name = "broadcast_id")
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long broadcastId; //PK

  @Column(name = "broadcast_description",length = 10, nullable = true)
  private String broadcastDescription;       //방송설명

  @Column(name = "broadcast_status",length = 1, nullable = true)
  private Integer broadcastStatus;               //방송상태

  @Column(name = "broadcast_title",length = 30, nullable = true)
  private String broadcastTitle;             //방송제목


//  @JoinColumn(name = "item_id")
//  @ManyToOne(fetch = FetchType.LAZY)
//  private Item item;      //FK
  @JoinColumn(name="image_id")
  @OneToOne(fetch = FetchType.LAZY)
  private Image image;     //FK


  @Builder
  public Broadcast(Long broadcastId, String broadcastDescription, Integer broadcastStatus,
      String broadcastTitle, Image image){
    this.broadcastId = broadcastId;
    this.broadcastDescription = broadcastDescription;
    this.broadcastStatus = broadcastStatus;
    this.broadcastTitle = broadcastTitle;
    this.image = image;
  }

  public void update(Long broadcastId, String broadcastDescription, String broadcastTitle){
    this.broadcastId = broadcastId;
    this.broadcastDescription = broadcastDescription;
    this.broadcastTitle = broadcastTitle;
  }
  public void deactive(Long broadcastId, Integer broadcastStatus){
    this.broadcastId = broadcastId;
    this.broadcastStatus = broadcastStatus;
  }
  //  @PrePersist
//  public void prePersist(){
//    this.broadcast_reservation_time = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
//    this.broadcast_start_time = this.broadcast_reservation_time;
//    this.broadcast_end_time = this.broadcast_reservation_time;
//  }
//
//  @PreUpdate
//  public void preUpdate(){
//    this.broadcast_end_time = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
//  }
}
