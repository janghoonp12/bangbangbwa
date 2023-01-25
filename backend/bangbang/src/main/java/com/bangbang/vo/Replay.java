package com.bangbang.vo;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Entity(name = "replay")
@Data
@SuperBuilder
@NoArgsConstructor
public class Replay {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int replayid;

  @Column(length = 200, nullable = true)
  private String replay_storage_location;
  @Column(length = 1, nullable = true)
  private int replay_status;

  @OneToOne
  @JoinColumn(name = "broadcast_id")
  private Broadcast broadcast;

}
