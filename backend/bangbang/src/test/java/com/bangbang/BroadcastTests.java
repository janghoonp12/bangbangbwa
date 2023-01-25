package com.bangbang;

import com.bangbang.vo.Broadcast;
import com.bangbang.vo.BroadcastRepository;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@SpringBootTest
@RunWith(SpringRunner.class)
public class BroadcastTests {

  @Autowired
  BroadcastRepository broadcastRepository;

  @Autowired
  ImageRepository imageRepository;

  @Test
  public void InsertDummy(){
    Broadcast broadcast = Broadcast.builder()
            .broadcast_title("풍무동1")
            .broadcast_description("30평")
            .broadcast_status(0)
            .item_id(1)
            .image_id(1)
            .build();
    broadcastRepository.save(broadcast);
  }
  
//  @Test
//  public void SelectDummy(){
//    List<Broadcast> broadcast = service;
//    return repository.findAll();
//  }
}
