# NOTICE & 3D Implementation Architecture

본 문서는 `deepseek-harness-kr-3d`의 3D VRM 대화형 아바타 시스템 구현 방식, 절차적 애니메이션 엔진, 성격 모드 및 라이선스 고지 사항을 상세히 기록한 기술 문서입니다.

---

## 1. 프로젝트 개요 및 기반 라이선스

- **프로젝트 명**: `deepseek-harness-kr-3d` (DeepSeek Harness 3D VRM & 3대 성격 에디션)
- **기반 프로젝트**: [noire113-dev/deepseek-harness-kr](https://github.com/noire113-dev/deepseek-harness-kr) (MIT License)
- **핵심 라이선스**: 플러그인 소스코드 및 3D 애니메이션 렌더링 엔진 전체는 **MIT License**를 따릅니다.
- **주요 변경점**: 기존 2D Live2D 렌더링 파이프라인(Cubism Core / PixiJS)을 완전히 걷어내고, **Three.js + `@pixiv/three-vrm` 기반의 고성능 3D VRM 절차적 애니메이션 렌더링 엔진**으로 전면 재설계·구축되었습니다.

---

## 2. 3D VRM 절차적(Procedural) 모션 엔진 구현

본 플러그인은 정적인 단일 모션 클립에 의존하지 않고, 기본 VRMA 루프 위에 수치 제어 및 삼각함수, 역기구학을 합성하는 **하이브리드 절차적 애니메이션(Hybrid Procedural Animation)** 방식을 채택했습니다.

### 2.1 쿼터니언 Slerp 보간 기반 목·머리 댐퍼
- Euler 각도를 매 프레임 직교 곱셈할 때 발생하는 각도 튐(Gimbal-lock 및 불연속 프레임 드롭)을 방지하기 위해 넥(`neck`)과 헤드(`head`) 본에 전용 쿼터니언(`_curNeckQ`, `_curHeadQ`)을 배치했습니다.
- 대사 음절 끄덕임(`nodKick`), 마우스 시선 추적, 상체 호흡 및 제스처 회전을 합성한 목표 쿼터니언(`_targetNeckQ`, `_targetHeadQ`)을 **구면 선형 보간(Slerp, 계수 `dt * 22`)**으로 추종시켜 60fps 환경에서 물 흐르듯 매끄러운 목 움직임을 보장합니다.

### 2.2 60fps BlendShape 표정 연속 감쇠 댐퍼 (`applySmoothMorphs`)
- VRoid 모델의 세밀한 페이셜 모프(눈 깜빡임, 윙크, 눈웃음, 립싱크 모음, 냥이 입, 삐죽거림 등) 전환 시 발생하는 버텍스 찢어짐과 팝핑 현상을 원천 방지합니다.
- 매 프레임 강제 리셋 대신 활성 모프 가중치를 보간 계수(`dt * 28`)로 연속 감쇠하여 감정 표현이 유기적으로 블렌딩됩니다.

### 2.3 발 고정 역기구학 제로투 댄스 (`zeroTwo`)
- **어깨/팔 탈골 방지**: 팔 본을 억지로 비틀지 않고 VRMA 기본 자세를 유지하여 자연스러운 실루엣을 보존합니다.
- **분석적 Foot-Planting IK**: 116 BPM 템포에 맞춰 골반이 좌우로 수평 이동(`ztHipX`)할 때, 두 발이 바닥에 본드로 붙은 것처럼 고정되도록 다리 길이(`legLength`) 기반 역기구학 각도(`ikLegRollDeg = asin(ztHipX / legLength)`)를 허벅지 본(`UpperLeg`)에 실시간 역보상합니다.
- **상체 S자 역곡선 (Lateral Isolation)**: 골반이 옆으로 빠질 때 허리와 흉곽이 반대 위상으로 굴곡을 형성해 상체 밸런스를 유지합니다.

### 2.4 3D 공간 보행(산책) 시스템 (`walk`)
- 아바타가 화면 밖으로 퇴장/입장할 때 단순 슬라이드 이동 대신, 몸 전체(`vrm.scene.rotation.y = -1.36 rad`)를 진행 방향인 왼쪽 측면(-78도)으로 틀어 실제 걸어가는 연출을 구현했습니다.
- 양쪽 허벅지·무릎·발목 본을 위상차 교차 보행 각도로 구동하고, 양팔의 전후 스윙 및 보행 상하 바운스(`walkBodyBob`)를 연동했습니다.

### 2.5 손목 꼬임 없는 손 흔들기 인사 (`wave`)
- 외회전(Twist)을 손목(`rightHand`)에만 집중시키면 메시가 사탕봉지처럼 비틀려 손목이 가늘어지는 기형 현상을 방지하기 위해, 회전각(-68도)을 아래팔(`rightLowerArm: -42도`)과 손목(`rightHand: -26도`)에 최적 분산했습니다.
- 원근 왜곡으로 손이 얼굴보다 거대해 보이는 대왕손 현상을 막기 위해 위팔(`rightUpperArm`)을 살짝 뒤로 물려 갸름하고 우아한 손 모양을 완성했습니다.

---

## 3. 인터랙티브 3D 본 투영 터치 시스템

2D 이미지 히트박스 대신, 3D 월드 공간의 뼈대 위치를 Three.js 카메라 투영 평면으로 실시간 변환하여 부위별 터치를 정밀 판정합니다.

1. **3D 정규화 본 투영 (`bone2D`)**:
   - `head`, `neck`, `upperChest`, `chest`, `spine`, `hips`, `leftUpperArm`, `rightUpperArm`, `leftUpperLeg`, `rightUpperLeg` 본의 월드 좌표를 화면 스크린 2D 좌표로 프로젝션.
2. **선분 최단 거리 판정 (`distSeg2`)**:
   - 클릭 좌표와 각 본 관절을 잇는 선분 간의 수직 거리를 계산하여 의상이나 체형이 바뀌어도 정확한 신체 부위 감지.
3. **부위별 상태 반응**:
   - **머리**: 쓰다듬기 카운트 누적, 과도한 클릭 시 볼 부풀리고 토라지는 삐짐 모션(`head_sulk`) 및 자율 화해(`head_after`).
   - **가슴 / 하체**: 무단 터치 시 3단계 경고 반응 및 정색/쿨다운 모드.
   - **양팔 / 다리 / 몸통**: 깜짝 놀라며 갸우뚱거리거나 호기심을 보이는 가벼운 반응.

---

## 4. 3가지 성격 모드 & 한·영 이중 언어 시스템

플러그인 설정에서 실시간 전환할 수 있는 3종 성격 모드와 한국어/영어(아메리칸 스타일 로컬라이징) 이중 언어 엔진을 탑재했습니다.

| 성격 모드 | 한국어 스타일 | 아메리칸 스타일 영문 (American Localization) | 고유 피직스 & 표정 특성 |
| :--- | :--- | :--- | :--- |
| **귀요미 (Cute)** | 애교 만점, 따뜻하고 심쿵한 존댓말 | Sweet & Bubbly, playful darling companion | 미소·눈웃음 모프 상시 유지, 잦은 윙크, 하트/홍조 빈도 극대화 |
| **츤데레 (Tsundere)** | 툴툴대지만 세심하게 챙겨주는 츤데레 말투 | Feisty & Snarky, sharp-tongued yet caring | 갸우뚱 모션, 뾰로통한 냥이 입, 턱 튕김, 당황 홍조 |
| **광녀/여왕님 (Queen)** | 턱을 치켜들고 위에서 아래로 깔보는 시크 반말 | Sassy Boss / Empress, commanding & cool | 턱 치켜들기(`headY: +5.5`), 곁눈질 내리깔기, 미소 억제, 썩소(`smug`) |

- **이중 언어 자동 감지 (`isKoreanLocale`)**: DSH 코어 언어 설정에 동기화되어 한국어/영문 대사 뱅크 자동 교체.
- **동적 이름 & 한국어 조사 포매터**: 설정된 아바타 이름(`window.__dscOutfit.avatarName`)의 종성(받침) 유무 및 영문 끝글자 발음을 자동 분석해 `{name}이(가)`, `{name}은(는)`, `{name}이랑(랑)`, `{name}이에요(예요)`를 자동 치환. 영문 대사는 `{name}` 플레이스홀더를 통해 자연스러운 문맥으로 결합.
- **Fisher-Yates 셔플 덱 (`lineDeck`)**: 카테고리별 대사가 무작위로 고르게 순환되어 중복 대사 출현 방지.

---

## 5. 의상·소품·카메라 실시간 셰이더 제어

단일 Merged SkinnedMesh 구조를 가진 VRoid 모델의 특성을 고려하여 머티리얼 레벨에서 실시간 튜닝을 수행합니다.

1. **서브 머티리얼 선택적 은폐 (`mat.visible`)**:
   - SkinnedMesh 객체 자체를 숨기면 피부까지 통째로 날아가는 문제를 방지하기 위해, 드레스 소매 레이스 프릴(`Tops_01_CLOTH_04, 05`) 및 목 케이프 리본(`Onepiece_00_CLOTH_01, 02`)의 서브 머티리얼만 개별 토글.
2. **MToon 셰이더 RGB 색상 보간**:
   - `mat.color`와 `mat.shadeColorFactor`를 선형 보간하여 미드나잇 퍼플 고딕 드레스 및 미스틱 로즈 헤어 틴트 실시간 전환.
3. **머리 부착 3D 엔젤 헤일로 (광륜)**:
   - 머리 본(`head`)의 월드 회전을 역보정한 로컬 좌표계에 다이아몬드 날개가 달린 이중 링 지오메트리를 생성하여 자율 부유 및 회전 애니메이션 구현.
4. **3단계 카메라 구도 Lerp**:
   - 기본 상반신 포트레이트, 클로즈업 버스트 샷, 전신 풀샷을 줌 비율 및 카메라 Y/Z 위치 보간으로 매끄럽게 전환.

---

## 6. 3D 모델 저작권 분리 배포 체계

- **최적화 대상 모델**: Rachel Lawford (3D VRoid)
- **원작자**: kyame ([VRoid Hub 모델 페이지](https://hub.vroid.com/en/characters/5813079808239232451/models/6001751550027080479))
- **저작권 준수 고지**:
  - 본 모델은 원작자의 사용권 규정상 **재배포 금지(`allowRedistribution: false`)** 조건이 적용되어 있습니다.
  - 따라서 본 플러그인의 공개 Git 저장소에는 3D VRM 바이너리 모델이 포함되어 있지 않으며, 사용자가 원작자 페이지에서 직접 다운로드받아 로컬 `assets/model/` 폴더에 넣는 **클라이언트 사이드 로컬 연동 방식**을 채택하고 있습니다.
- **스마트 자동 감지 로더 (`find-vrm`)**:
  - `plugin/host.js`에 탑재된 API를 통해 다운로드된 파일명이 영문, 숫자, 해시 등 무엇이든 상관없이 `assets/model/*.vrm`을 감지하여 이름 변경 없이 즉시 로드합니다.
  - 설정 창에서 **`[모델폴더]`** 클릭 시 운영체제의 파일 탐색기가 즉시 팝업되는 편의 기능을 제공합니다.

---

## 7. 외부 라이브러리 라이선스 고지

- **Three.js**: MIT License — Copyright (c) 2010-2026 Three.js Authors
- **@pixiv/three-vrm**: MIT License — Copyright (c) 2020 Pixiv Inc.
- **DeepSeek Harness (코어 규격)**: MIT License — Copyright (c) 2026 DeepSeek
