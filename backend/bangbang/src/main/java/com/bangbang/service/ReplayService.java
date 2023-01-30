package com.bangbang.service;

import com.bangbang.domain.broadcast.Broadcast;
import com.bangbang.domain.broadcast.BroadcastRepository;
import com.bangbang.domain.replay.Replay;
import com.bangbang.domain.replay.ReplayRepository;
import com.bangbang.dto.replay.ReplayListResponseDto;
import com.bangbang.dto.replay.ReplayResponseDto;
import com.bangbang.dto.replay.ReplaySaveRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class ReplayService {
    private final ReplayRepository replayRepository;
    private final BroadcastRepository broadcastRepository;

    //다시보기 등록
    @Transactional
    public void newReplay(ReplaySaveRequestDto requestDto) throws Exception{
        Broadcast broadcast = broadcastRepository.findByBroadcastId(requestDto.getBroadcastId())
            .orElseThrow(() -> new IllegalArgumentException("해당 방송이 없습니다."));
        replayRepository.save(requestDto.toEntity(broadcast));
    }

    //다시보기 전체 조회
    public List<ReplayListResponseDto> searchReplayAll(){
        return replayRepository.findAll().stream()
            .map(ReplayListResponseDto::new)
            .collect(Collectors.toList());
    }

    //해당 다시보기 조회
    public ReplayResponseDto replayDetail(Long replayId){
        Replay entity = replayRepository.findByReplayId(replayId)
            .orElseThrow(() -> new IllegalArgumentException("해당 다시보기가 존재하지 않습니다."));
        return new ReplayResponseDto(entity);
    }
}
