# deepseek-harness-kr-3d (3D VRM Edition)

> This project is a 3D VRM & Personality-extended edition based on [noire113-dev/deepseek-harness-kr](https://github.com/noire113-dev/deepseek-harness-kr) (MIT License).

[DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness)를 한국어로 사용하고, 화면 안에 살아 움직이는 3D VRM 캐릭터 **ZENA**와 3가지 성격(귀요미 / 츤데레 / 광녀-시크 반말) 모드를 더하는 DSH 플러그인입니다.

---

## 📌 3D 아바타 (VRM) 모델 저작권 및 다운로드 안내

원작자의 **저작권 보호 및 재배포 금지(Redistribution Prohibited)** 규정을 철저히 준수하기 위해, **본 저장소에는 3D VRM 모델 바이너리가 번들되어 있지 않습니다.**

본 플러그인은 **Rachel Lawford** 모델에 최적화되어 있으므로, 플러그인을 처음 설치한 후 아래 공식 사이트에서 모델을 무료로 내려받아 플러그인 폴더에 넣어주세요:

1. **공식 모델 다운로드 링크**:  
   🔗 [Rachel Lawford on VRoid Hub (by kyame)](https://hub.vroid.com/en/characters/5813079808239232451/models/6001751550027080479)
2. **저장 위치 (파일명 변경 불필요!)**:  
   다운로드한 `.vrm` 파일(숫자나 긴 해시 이름이어도 무관)을 **파일명 그대로** 플러그인의 `assets/model/` 폴더에 넣습니다.  
   - Windows Desktop 프로필 기본 경로:  
     `%USERPROFILE%\.dsh\profiles\desktop\node_modules\deepseek-harness-kr\assets\model\`  
   *(플러그인이 폴더 내의 `.vrm` 파일을 자동으로 감지하여 로드합니다)*
3. 파일을 넣은 후 DeepSeek Harness를 새로고침(`Ctrl + R`)하면 3D 아바타가 즉시 로드됩니다.

---

## 주요 기능

- **3D VRM 실시간 렌더링 & 피직스**:
  - 눈 깜빡임, 입 모양(한글 모음 ㅏㅔㅣㅗㅜ / 영어 a·e·i·o·u 립싱크), 시선 추적, 호흡 및 자연스러운 바디 바운스
  - 산책 애니메이션, 터치 반응, 머리 쓰다듬기(정색/삐짐 모션), 제로투 댄스 모드
  - 천사 광륜(Halo), 고딕 드레스 컬러 체인지, 헤어 틴트, 체형/카메라 샷(버스트/풀샷) 변경
- **3가지 대사 & 성격 모드 (플러그인 설정에서 선택)**:
  - 🎀 **귀요미 모드**: 포즈와 상황에 어울리는 애교 가득하고 심쿵한 말투
  - 🧊 **츤데레 모드**: 겉으론 툴툴대지만 세심하게 챙겨주는 매력의 말투
  - 👑 **광녀 모드**: 웃음기 없이 시크하고 도도한 반말로 툭툭 내뱉는 말투
- **아바타 이름 커스텀**: 플러그인 설정에서 기본값(`ZENA`) 외에 원하는 이름으로 변경 가능 (모든 대사/인사말에 실시간 반영)
- **한국어 언어팩 & 파스텔 테마**: UI 전체 한국어 패치 및 깔끔한 테마 지원

---

## 플러그인으로 설치

DSH **0.2.1-rc.5** 이상의 Desktop 앱과 브라우저 Web UI에서 사용할 수 있습니다.

### Harness에서 설치

1. Harness의 **Plugins**에서 **+ Add plugin** 버튼을 클릭합니다.
2. **Add Plugin** 창에 아래 GitHub 주소를 입력해 설치·활성화합니다.

   ```text
   git+https://github.com/parkkkong/deepseek-harness-kr-3d.git
   ```

3. 한국어가 자동 선택되지 않으면 **Settings → General → Language**에서 **한국어**를 선택합니다.
4. 상단의 [3D 아바타 모델 저작권 및 다운로드 안내](#-3d-아바타-vrm-모델-저작권-및-다운로드-안내)에 따라 `rachel_lawford.vrm` 파일을 넣고 새로고침합니다.

---

## 플러그인 설정

**Plugins**에서 이 플러그인의 상세 페이지를 연 뒤, **Components** 아래의 **deepseek-harness-kr**를 클릭하면 설정 창이 열립니다.

- **캐릭터와 말풍선**: 3D VRM 캐릭터, 표정·터치 반응과 말풍선 온/오프
- **파스텔 테마**: 배경·색상·입력창 스타일 (밝은 모드 / 다크 모드 지원)
- **한국어 언어팩**: 한국어 UI 번역
- **아바타 이름**: 기본값(`ZENA`) 외에 원하는 이름으로 변경
- **말풍선 성격 모드**: 귀요미 / 츤데레 / 광녀 모드 선택
- **전용 스타일 & 소품**: 엔젤 헤일로, 고딕 드레스 컬러 체인지, 헤어 컬러 틴트, 제로투 댄스 모드 등
- **카메라 구도**: 기본 상반신 구도, 클로즈업 버스트 샷, 전신 풀샷 구도 선택

---

## 라이선스 & 크레딧

- **플러그인 코드 & 3D 렌더링 엔진**: MIT License
- **기반 프로젝트 원작자**: [@noire113-dev](https://github.com/noire113-dev) ([deepseek-harness-kr](https://github.com/noire113-dev/deepseek-harness-kr))
- **Rachel Lawford 3D 모델 원작자**: kyame ([VRoid Hub 모델 페이지](https://hub.vroid.com/en/characters/5813079808239232451/models/6001751550027080479))
  - *본 프로젝트는 원작자의 재배포 금지 라이선스를 준수하여 3D 모델을 직접 배포하지 않습니다.*
