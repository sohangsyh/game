# OpenMAIC-GamePlay：互動學習遊戲館

把課程教材轉化為 3D 網頁學習遊戲，對象為香港中小學生，配合教育局課程。
每款遊戲都是一個獨立的 HTML 檔，用手機或電腦瀏覽器打開即玩，無需登入或安裝。

## 快速開始

打開根目錄的 `index.html`，就是遊戲館入口頁。

本機預覽（建議用本機伺服器，避免部分瀏覽器限制本機檔案）：

```bash
python3 -m http.server 8000
# 然後瀏覽 http://localhost:8000
```

### 用 GitHub Pages 發佈

1. 把整個資料夾推送到 GitHub repo。
2. 在 repo 的 **Settings → Pages**，Source 選 `Deploy from a branch`，分支選 `main`，資料夾選 `/ (root)`。
3. 數分鐘後，入口頁會在 `https://<你的帳號>.github.io/<repo 名稱>/` 上線。

## 遊戲列表

| 資料夾 | 遊戲 | 玩法 | 學科 |
|---|---|---|---|
| `games/fish` | 魚我所欲也 | RPG 冒險 | 中國語文（DSE 範文） |
| `games/lunyu` | 論語：杏壇搬運戰 | 限時搬運 | 中國語文（DSE 範文） |
| `games/xiaoyao` | 逍遙遊：惠子的庫房 | 密室逃脫 | 中國語文（DSE 範文） |
| `games/xishan` | 始得西山 | 探索漫遊 | 中國語文（DSE 範文） |
| `games/labsafety` | 實驗室安全 | RPG 冒險 | 初中科學 |
| `games/floatsink` | 浮與沉 | 模擬實驗室 | 小學科學科 |
| `games/chibi` | 赤壁疑案 | 偵探查案 | 初中中國歷史 |
| `games/shop` | 檸檬茶小店 | 經營決策 | 初中經濟、小學人文科 |

## 專案結構

```
index.html            遊戲館入口頁
games/<遊戲>/
  content.json        內容層：知識單元、盲點、台詞、提示、題目
  world.json          世界層：場景、地點、角色站位
  game.json           玩法層：計分、時間、規則參數
  recommendation.json 玩法推薦器的判斷紀錄
  index.html          建置後的遊戲（由 build.py 生成）
engine/
  engine.js           共用引擎：渲染、角色與程序動畫、鏡頭、對話、提示、跳過
  rpg.js 等           各玩法模組
  kit_campus.js       現代校園場景套件
shells/               各玩法的頁面外殼（版面、樣式、HUD）
build/build.py        建置腳本
docs/                 項目說明書
```

## 修改內容後重新建置

遊戲的文字、題目和參數都在三份 JSON 中，不需要改程式。修改後執行：

```bash
python3 build/build.py          # 重建全部
python3 build/build.py chibi    # 只重建一款
```

需要 Python 3，不需要安裝任何套件。

## 外部依賴

遊戲在瀏覽器中會從網上載入：

- Three.js r128（cdnjs.cloudflare.com）
- Google Fonts（Noto Serif TC、LXGW WenKai TC）

因此需要連線才能遊玩。如需完全離線使用，可下載 `three.min.js` 放入 repo，並把 shells 中的 `<script src>` 改為相對路徑。

## 備註

- `games/fish` 是第一個原型，仍使用舊版獨立程式（`shells/legacy_rpg_shell.html`），未遷移到共用引擎。
- 所有需要答對才能前進的地方，都有「跳過，看答案」按鈕。
- 課文詮釋與學科內容在正式使用前，應由任教老師審核。
- 授權：請自行選擇授權條款並加入 `LICENSE` 檔。如日後整合 OpenMAIC 的程式碼，需先確認其授權條款。
