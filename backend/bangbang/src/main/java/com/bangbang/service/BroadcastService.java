package com.bangbang.service;

import com.bangbang.vo.Broadcast;
import java.util.ArrayList;

public interface BroadcastService {

  String newBroadcast(Broadcast broadCast);         //방송등록
  ArrayList<Broadcast> searchBroadcastAll();        //방송전체검색
  ArrayList<Broadcast> searchBroadcastFilter();     //방송필터검색

  String deactivateBroadcast(int broadcast_id);     //방송삭제(비활성화)

  String modifyBroadcast(int broadcast_id);         //방송내용수정
}
