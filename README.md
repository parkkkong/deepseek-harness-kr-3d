# deepseek-harness-kr-3d (3D VRM & Personality Edition)

> This project is a 3D VRM & Personality-extended edition based on [noire113-dev/deepseek-harness-kr](https://github.com/noire113-dev/deepseek-harness-kr) (MIT License).

[🇰🇷 한국어 안내](#-한국어-안내) | [🇺🇸 English Guide](#-english-guide)

---

## 🇰🇷 한국어 안내

[DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness)를 한국어로 사용하고, 화면 안에 살아 움직이는 인터랙티브 3D VRM 캐릭터 **ZENA**와 3가지 성격 모드(귀요미 / 츤데레 / 광녀-시크 여왕님)를 더하는 DSH 플러그인입니다. 한국어 및 영문(아메리칸 스타일 로컬라이징) 이중 언어를 완벽하게 지원합니다.

### 📌 3D 아바타 (VRM) 모델 저작권 및 다운로드 안내

원작자의 **저작권 보호 및 재배포 금지(Redistribution Prohibited)** 규정을 철저히 준수하기 위해, **본 저장소에는 3D VRM 모델 바이너리가 번들되어 있지 않습니다.**

본 플러그인은 **Rachel Lawford** 모델에 최적화되어 있으므로, 플러그인을 처음 설치한 후 아래 공식 사이트에서 모델을 무료로 내려받아 플러그인 폴더에 넣어주세요:

1. **공식 모델 다운로드 링크**:  
   🔗 [Rachel Lawford on VRoid Hub (by kyame)](https://hub.vroid.com/en/characters/5813079808239232451/models/6001751550027080479)
2. **저장 위치 (파일명 변경 불필요!)**:  
   다운로드한 `.vrm` 파일(숫자나 긴 해시 이름이어도 무관)을 **파일명 그대로** 플러그인의 `assets/model/` 폴더에 넣습니다.  
   - Windows Desktop 프로필 기본 경로:  
     `%USERPROFILE%\.dsh\profiles\desktop\node_modules\deepseek-harness-kr\assets\model\`  
   - *팁: 플러그인 설정 창의 안내 배너에서 **`[모델폴더]`** 링크를 클릭하면 윈도우 탐색기가 해당 위치로 즉시 열립니다.*
3. 파일을 넣은 후 DeepSeek Harness를 새로고침(`Ctrl + R`)하면 3D 아바타가 즉시 로드됩니다.

### 주요 기능

- **3D VRM 실시간 렌더링 & 절차적 피직스**:
  - 눈 깜빡임, 입 모양(한글 모음 ㅏㅔㅣㅗㅜ / 영어 a·e·i·o·u 실시간 립싱크), 시선 추적, 호흡 및 Slerp 쿼터니언 댐퍼
  - 산책 보행 애니메이션, 3D 본 투영 터치 반응, 머리 쓰다듬기(삐짐/정색 모션), 발 고정 제로투 댄스 모드
  - 3D 엔젤 헤일로(광륜), 미드나잇 퍼플 고딕 드레스 컬러 체인지, 미스틱 로즈 헤어 틴트, 3단계 카메라 샷(버스트/기본/풀샷)
- **3가지 성격 모드 & 한·영 이중 언어 지원**:
  - 🎀 **귀요미 모드 (Cute)**: 애교 넘치고 포근하며 심쿵한 말투
  - 🧊 **츤데레 모드 (Tsundere)**: 겉으론 툴툴대지만 세심하게 챙겨주는 매력의 말투
  - 👑 **광녀 모드 (Queen)**: 시크하고 도도한 반말로 툭툭 내뱉는 카리스마 여왕님 말투
  - *DSH 언어 설정(한국어 / English)에 따라 한국어 대사 및 아메리칸 스타일 영문 대사 뱅크가 실시간 자동 교체됩니다.*
- **아바타 이름 동적 커스텀**: 플러그인 설정에서 기본값(`ZENA`) 외에 원하는 이름으로 변경 가능 (모든 대사/인사말 및 한국어 조사 자동 반영)
- **한국어 언어팩 & 파스텔 테마**: UI 전체 한국어 패치 및 깔끔한 테마 지원

### 플러그인으로 설치

DSH **0.2.1-rc.5** 이상의 Desktop 앱과 브라우저 Web UI에서 사용할 수 있습니다.

1. Harness의 **Plugins**에서 **+ Add plugin** 버튼을 클릭합니다.
2. **Add Plugin** 창에 아래 GitHub 주소를 입력해 설치·활성화합니다.

   ```text
   git+https://github.com/parkkkong/deepseek-harness-kr-3d.git
   ```

3. 한국어가 자동 선택되지 않으면 **Settings → General → Language**에서 **한국어**를 선택합니다.
4. 상단의 [3D 아바타 모델 저작권 및 다운로드 안내](#-3d-아바타-vrm-모델-저작권-및-다운로드-안내)에 따라 `.vrm` 파일을 넣고 새로고침합니다.

### 플러그인 설정

**Plugins**에서 이 플러그인의 상세 페이지를 연 뒤, **Components** 아래의 **deepseek-harness-kr**를 클릭하면 설정 창이 열립니다.

- **캐릭터와 말풍선**: 3D VRM 캐릭터, 표정·터치 반응과 말풍선 온/오프
- **파스텔 테마**: 배경·색상·입력창 스타일 (밝은 모드 / 다크 모드 지원)
- **한국어 언어팩**: 한국어 UI 번역
- **아바타 이름**: 기본값(`ZENA`) 외에 원하는 이름으로 변경
- **말풍선 성격 모드**: 귀요미 / 츤데레 / 광녀 모드 선택
- **전용 스타일 & 소품**: 엔젤 헤일로, 고딕 드레스 컬러 체인지, 헤어 컬러 틴트, 제로투 댄스 모드 등
- **카메라 구도**: 기본 상반신 구도, 클로즈업 버스트 샷, 전신 풀샷 구도 선택

---

## 🇺🇸 English Guide

Transform your [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) workspace into a lively interactive experience! This plugin introduces **ZENA**, a responsive 3D VRM desktop avatar featuring procedural animations, 3 distinct personality modes with localized American English dialogue, customizable outfits, and pastel UI styling.

### 📌 3D Avatar (VRM) Model Licensing & Download

To strictly comply with original creator copyright and **Redistribution Prohibited** terms, **3D VRM binary files are NOT bundled in this repository.**

This plugin is optimized for the **Rachel Lawford** model. After installing the plugin, download the model for free from the official VRoid Hub page and place it in the plugin directory:

1. **Official Model Download Link**:  
   🔗 [Rachel Lawford on VRoid Hub (by kyame)](https://hub.vroid.com/en/characters/5813079808239232451/models/6001751550027080479)
2. **Installation Directory (No file renaming required!)**:  
   Place the downloaded `.vrm` file (any original hash/number filename is supported) into the plugin's `assets/model/` directory:  
   - Windows Desktop Profile default path:  
     `%USERPROFILE%\.dsh\profiles\desktop\node_modules\deepseek-harness-kr\assets\model\`  
   - *Tip: In the plugin settings page, simply click the **`[model folder]`** link in the notice banner to instantly open the destination folder in Windows Explorer.*
3. After placing the file, reload DeepSeek Harness (`Ctrl + R`). Your 3D avatar will load immediately!

### Key Features

- **Real-Time 3D VRM Rendering & Procedural Motion**:
  - Natural blinking, dynamic lip-sync (English vowels `a, e, i, o, u` and Korean `JUNG`), eye-gaze tracking, breathing, and quaternion Slerp damping for smooth 60fps head/neck motion.
  - Interactive touch responses, headpats with pouting physics, outdoor walk animation, and foot-planted Zero-Two hip-sway dance.
  - Floating 3D Angel Halo, Midnight Purple gothic dress color transform, Mystic Rose hair dye tint, and 3-stage camera framing (bust close-up / portrait / full body).
- **3 Distinct Personality Modes (Localized American English Voice Banks)**:
  - 🎀 **Cute Mode**: Sweet, bubbly, and affectionate little companion style (*"Hiya Master~! Your favorite sweetie {name} is here! 💕"*).
  - 🧊 **Tsundere Mode**: Feisty, snarky, yet secretly caring heroine (*"Hmph, it's not like I was waiting for you or anything...! Dumb-dumb."*).
  - 👑 **Queen Mode**: Sassy, commanding, confident, and direct boss style (*"...You're here? I'm {name}. Make it quick."*).
  - *Automatically switches between Korean and American English dialogues based on your Harness language setting!*
- **Customizable Avatar Name**: Change the default name (`ZENA`) to any custom name in settings; all greeting and reaction dialogues update dynamically.
- **Bilingual UI & Pastel Theme**: Seamless Korean/English UI support with modern pastel aesthetic and light/dark theme support.

### Plugin Installation

Compatible with DeepSeek Harness **0.2.1-rc.5** and above on Desktop and Web UI.

1. In DeepSeek Harness, navigate to **Plugins** and click **+ Add plugin**.
2. Enter the following GitHub repository address:

   ```text
   git+https://github.com/parkkkong/deepseek-harness-kr-3d.git
   ```

3. Follow the [3D Avatar Model Download Guide](#-3d-avatar-vrm-model-licensing--download) above to drop your `.vrm` model into `assets/model/`, then hit `Ctrl + R` to reload.

### Customization & Settings

Open **Plugins**, select **deepseek-harness-kr** under **Components** to access the settings panel:

- **Character & Speech Bubbles**: Toggle 3D avatar display, expressions, touch interactions, and chat bubbles.
- **Theme**: Clean pastel UI with light and dark mode support.
- **Avatar Name**: Personalize avatar display name (default: `ZENA`).
- **Personality Mode**: Choose between Cute, Tsundere, and Queen modes.
- **Outfits & Accessories**: Toggle Angel Halo, Midnight Purple dress, Mystic Rose hair color, and Zero-Two dance.
- **Camera View**: Switch between Portrait (default), Close-up Bust, and Full Body shot.

---

## License & Credits

- **Plugin Code & Procedural 3D Engine**: [MIT License](LICENSE)
- **Base Project**: [@noire113-dev](https://github.com/noire113-dev) ([deepseek-harness-kr](https://github.com/noire113-dev/deepseek-harness-kr))
- **Rachel Lawford 3D VRM Model**: kyame ([VRoid Hub Model Page](https://hub.vroid.com/en/characters/5813079808239232451/models/6001751550027080479))
  - *This project strictly respects the original creator's non-redistribution license and does not distribute model binaries.*
