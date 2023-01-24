package com.bangbang.service;

import com.bangbang.vo.Broadcast;
import com.bangbang.vo.BroadcastRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

public interface BroadcastService {

  String newBroadcast(Broadcast broadCast);         //방송등록


  List<Broadcast> searchBroadcastAll();             //방송전체검색


  List<Broadcast> searchBroadcastFilter();          //방송필터검색

  Broadcast deactivateBroadcast(int broadcastid, Broadcast broadcast);    //방송삭제(비활성화)


  Broadcast modifyBroadcast(int broadcastid, Broadcast broadcast);        //방송내용수정

}
