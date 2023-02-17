# 🏢 BangBangBwa ( 어디서든 실시간으로 집 매물을 볼 수 있는 부동산 라이브 커머스)

## 🏚방방봐 소개 🏚
중개사가 등록한 매물을 토대로 방송을 등록하면 호스트와 시청자로 구분하여 실시간으로 집 매물을 확인할 수 있는 서비스


## ✨Overview
집을 구할 때 이리저리 돌아다녀야 해서 힘드셨죠? 사진으로만 괜찮은 집인지 아닌지 판단하기 힘드셨죠? 그래서 준비했습니다!!!! 방방봐 서비스~~!

## ✨방방봐의 모토
`빠르게 집을 구하기위해 어디서든 실시간으로 집을 확인하고 집보러 가는 시간을 절약하자!`

## 🕑프로젝트 기간 - 2023.01.03 ~ 2023.02.17


## ✨ 주요 기능

- 서비스 설명 : 어디서든 실시간으로 집 매물을 볼 수 있는 부동산 라이브 커머스
- 주요 기능 :
    - webRTC를 통한 실시간 라이브커머스
    - 일반 사용자가 중개사 등록 승인이 되면 매물 등록 및 방송 등록 가능
    - 진행중인 방송이나 방송 예정인 매물 방송 카테고리 보여줌

### 🖥️ 개발 환경

---


🖱**Backend**

<img src="https://img.shields.io/badge/Spring Boot-green?style=flat&logo=Spring Boot&logoColor=white"/>
<img src="https://img.shields.io/badge/Hibernate-black?style=flat&logo=Hibernate&logoColor=white"/>
<img src="https://img.shields.io/badge/Spring Security-green?style=flat&logo=Spring Security&logoColor=white"/>
<img src="https://img.shields.io/badge/WebRTC-black?style=flat&logo=WebRTC&logoColor=white"/>
<img src="https://img.shields.io/badge/MySQL-blue?style=flat&logo=MySQL&logoColor=white"/>

👀**Frontend**👀

<img src="https://img.shields.io/badge/React-blue?style=flat&logo=React&logoColor=white"/>
<img src="https://img.shields.io/badge/Redux-purple?style=flat&logo=Redux&logoColor=white"/>
<img src="https://img.shields.io/badge/JavaScript-yellow?style=flat&logo=JavaScript&logoColor=white"/>
<img src="https://img.shields.io/badge/styled_components-pink?style=flat&logo=styled-components&logoColor=white"/>


🛠**Tools**🛠

<img src="https://img.shields.io/badge/IntelliJ IDEA-purple?style=flat&logo=IntelliJ IDEA&logoColor=white"/>
<img src="https://img.shields.io/badge/Visual Studio Code IDEA-blue?style=flat&logo=Visual Studio Code&logoColor=white"/>


<img src="https://img.shields.io/badge/Visual Amazon AWS-yellow?style=flat&logo=Amazon AWS&logoColor=white"/>
<img src="https://img.shields.io/badge/NGINX-grreen?style=flat&logo=NGINX&logoColor=white"/>
<img src="https://img.shields.io/badge/Jenkins-orange?style=flat&logo=Jenkins&logoColor=white"/>
<img src="https://img.shields.io/badge/Docker-blue?style=flat&logo=Docker&logoColor=white"/>


<img src="https://img.shields.io/badge/GitHub-black?style=flat&logo=GitHub&logoColor=white"/>
<img src="https://img.shields.io/badge/Jira Software-blue?style=flat&logo=Jira Software&logoColor=whie"/>
<img src="https://img.shields.io/badge/Notion-black?style=flat&logo=Notion&logoColor=white"/>
<img src="https://img.shields.io/badge/Mattermost-blue?style=flat&logo=Mattermost&logoColor=white"/>




### ✨ EC2 포트 정리
---
|**PORT**|**이름**|
|:---:|:---:|
|443|HTTPS|
|80|HTTP - HTTPS로 리다이렉트(프론트 페이지지로 리다이렉트)|
|8086|Openvidu|
|43306|MySQL|
|9090|Jenkins|
|8081|Spring boot Docker Container|
|3000|React, NginX Docker Container|

