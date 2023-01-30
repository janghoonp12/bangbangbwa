package com.bangbang.domain.dongcode;

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
@Table(name = "dongcode")
public class Dongcode {
  @Id
  @Column(name = "dongcode_id")
  private String dongcodeId;

  @Column(name = "sido_name", length = 30)
  private String siDoName;

  @Column(name = "gugun_name", length = 30)
  private String guGunName;

  @Column(name = "dong_name", length = 30)
  private String dongName;

  @Builder
  public Dongcode(String dongcodeId, String siDoName, String guGunName, String dongName){
    this.dongcodeId = dongcodeId;
    this.siDoName = siDoName;
    this.guGunName = guGunName;
    this.dongName = dongName;
  }
}
