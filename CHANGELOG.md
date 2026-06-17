# CHANGELOG

## 2026-06-18

### 建立人物流程

- 將首次使用體驗改為「認識你、任務節奏、選擇夥伴」三個步驟。
- 新增三種有明顯外觀差異的探索家角色。
- 年齡選擇會即時設定合適的預設專注時間。
- 加入 Lumo 夥伴介紹、登島前人物摘要和多孩子人物切換。
- 修正選擇角色時會遺失尚未確認名字的問題。
- 完成桌面及 iPhone 尺寸的完整登島流程測試。

## 2026-06-12

按照「QuestKids 修改工作單 v1（Codex 執行版・含完整 code）」完成以下修正。

### Fix 1: 輸入內容轉義

- 新增 `esc()`，統一處理 HTML 字元轉義。
- 把孩子名稱、任務名稱、區域名稱、能力任務名稱、獎勵名稱、家長話術與步驟文字等使用者或可變內容，改為先經過 `esc()` 再輸出。

### Fix 2: 計時器局部更新

- 計時器畫面加入 `data-timer-ring` 與 `data-timer-display`。
- 新增 `updateTimerDisplay()`，倒數期間只更新計時器文字與圓環，不再每秒整頁重繪。
- `startTimer()` 在倒數結束前只做局部更新，結束時才保存狀態並重繪。

### Fix 3: 狀態遷移

- 新增 `STORE_VERSION = 5`。
- `loadState()` 改為透過 `migrateState()` 載入舊資料。
- 遷移時補齊缺少欄位、校正 `selectedChildId`，並把舊計時器狀態重設為安全初始值。
- 保持 `STORE_KEY = "questkids.mvp.v4"` 不變。

### Fix 4: 完成動作加確認閘

- 原本直接完成任務的邏輯改名為 `finalizeTask()`。
- 原本直接完成能力任務的邏輯改名為 `finalizeSkillMission()`。
- `completeTask()` 改為先檢查是否未做步驟且計時不足 30 秒，必要時先顯示確認視窗。
- `completeSkillMission()` 改為先顯示完成練習確認，再真正解鎖能力。
- `runConfirmedAction()` 改為根據 `pendingConfirm.action` 執行對應後續動作。

### Fix 5: 文案統一

- 將本次修正範圍內的介面文案統一為書面中文。
- 清理 `app.js` 內指定的粵語口語字詞，避免同頁混用。
