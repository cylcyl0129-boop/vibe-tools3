/**
 * 心靈種子與每日冒險 (Seed of Mind & Daily Adventure)
 * 純 Vanilla JavaScript (ES6+) · 零依賴 · 瀏覽器原生運作
 */

// ==========================================
// 1. 資料庫常數與預設資料 (Tasks & Quotes)
// ==========================================
const STORAGE_KEY = 'seed_of_mind_daily_state';

const TASK_PRESETS = {
  '心靈': [
    '深呼吸 3 次，感受當下的平靜',
    '對鏡子裡的自己微笑，說聲「你辛苦了」',
    '聽一首能讓你心情放鬆的純音樂或白噪音',
    '閉上雙眼發呆 3 分鐘，什麼都不必焦慮',
    '把手放在心口上，感受穩定而溫柔的心跳',
    '寫下一件今天值得感謝的小事或感謝自己',
    '允許自己今天有「不完美」的自由'
  ],
  '健康': [
    '緩慢喝一杯溫水，感受水流滋潤身體的感覺',
    '離開螢幕，眺望窗外最遠的那一片天空 1 分鐘',
    '輕輕轉動肩膀與頸部，釋放緊繃了一整天的肌肉',
    '做 30 秒溫和的眼球放鬆運動',
    '放慢腳步散步 5 分鐘，踩穩每一個當下的步伐',
    '調整坐姿，讓背部與雙肩回到舒適放鬆的平衡點',
    '好好享受一口食物的香氣與純粹滋味'
  ],
  '探索': [
    '抬頭觀察今天天空中雲朵的形狀或微風的走向',
    '仔細端詳身邊一株植物或樹木葉片上的細緻脈絡',
    '在日常的路線中，刻意走一條平常少走的小徑',
    '在生活環境中，尋找一件你以前沒注意過的可愛細節',
    '試著聽一首平常不常接觸的異國曲風或輕音樂',
    '用手機或雙眼捕捉一張讓你嘴角上揚的生活光影',
    '觸摸不同質地的物品，專注體驗指尖的觸覺'
  ],
  '成長': [
    '隨手整理桌面上的一個角落，創造呼吸感的小天地',
    '記下今天收穫的一個微小靈感或學到的新概念',
    '向今天遇見的一位朋友或夥伴表達真誠的感謝',
    '翻開一本喜歡的書，隨心閱讀幾行文字',
    '原諒自己今天可能出現的一點小失誤，這很正常',
    '替接下來的一週設定一個輕鬆隨興、無壓力的微小心願',
    '為自己倒一杯溫茶或咖啡，好好犒賞今天的付出'
  ]
};

const HEALING_QUOTES = [
  '允許自己偶爾脆弱，就像天空總有下雨的時候。雨過之後，泥土的氣味會特別清新。',
  '今天的你已經很努力了，不需要每件事都達到滿分。適度的休息是為了更長久的溫柔。',
  '那些看似壓在心頭的沉重，都是滋養靈魂的肥料。在看不見的泥土深處，你正在深深扎根。',
  '不必急著迎合全世界的期待，光是照顧好自己的情緒，就是今天最偉大的成就。',
  '情緒如潮汐有起有伏，當它來的時候靜靜陪伴它，當它走的時候道一聲謝謝。',
  '就算腳步放慢一點也沒關係，路邊的花草正在為你的節奏盛開。',
  '請溫柔地擁抱那個感到疲憊的自己，你是自己最好的守護者。',
  '生活不必總是緊繃前行，留一點空白給微風吹拂。',
  '你種下的煩惱已化作養分，所有的心結終會以另一種美麗的方式盛開。'
];

const TOMORROW_ENCOURAGEMENTS = [
  '明天太陽升起時，世界會以全新的溫柔迎接你。',
  '明天的你，將擁有比今天更從容、更自由的心境。',
  '睡個好覺吧，明天有一場輕盈的小幸運正在途中向你奔來。',
  '明天是全新的一天，所有今天的陰霾都不會跟隨你越過午夜。',
  '帶著柔軟的心入睡，明天的清晨會為你帶來清澈的勇氣。',
  '明天的每一步，都會踏在充滿希望與安心的花徑上。',
  '你的堅韌會化作明天的羽翼，飛向更廣闊的寧靜天空。',
  '明天會有意想不到的美好細節，等待著你去發現與微笑。'
];

// ==========================================
// 2. Web Audio API 音效合成器 (SoundFX)
// ==========================================
class SoundFX {
  constructor() {
    this.ctx = null;
    this.isEnabled = true;
    this.lastScratch = 0;
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  setEnabled(val) {
    this.isEnabled = val;
  }

  playFlip() {
    if (!this.isEnabled) return;
    this.init();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, now);
      filter.frequency.exponentialRampToValueAtTime(2200, now + 0.08);
      filter.frequency.exponentialRampToValueAtTime(300, now + 0.22);

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(440, now + 0.06);
      osc.frequency.exponentialRampToValueAtTime(160, now + 0.22);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.18, now + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.24);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.25);
    } catch (e) {}
  }

  playWater() {
    if (!this.isEnabled) return;
    this.init();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1100, now);
      osc.frequency.exponentialRampToValueAtTime(420, now + 0.08);
      osc.frequency.exponentialRampToValueAtTime(860, now + 0.16);

      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.28, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.23);
    } catch (e) {}
  }

  playCheck() {
    if (!this.isEnabled) return;
    this.init();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      [523.25, 659.25].forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.07);
        const startTime = now + idx * 0.07;
        gain.gain.setValueAtTime(0.001, startTime);
        gain.gain.linearRampToValueAtTime(0.22, startTime + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.55);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(startTime);
        osc.stop(startTime + 0.6);
      });
    } catch (e) {}
  }

  playScratch() {
    if (!this.isEnabled) return;
    const nowMs = Date.now();
    if (nowMs - this.lastScratch < 90) return;
    this.lastScratch = nowMs;
    this.init();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const bufSize = this.ctx.sampleRate * 0.04;
      const buf = this.ctx.createBuffer(1, bufSize, this.ctx.sampleRate);
      const data = buf.getChannelData(0);
      for (let i = 0; i < bufSize; i++) data[i] = (Math.random() * 2 - 1) * 0.5;

      const noise = this.ctx.createBufferSource();
      noise.buffer = buf;
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1400 + Math.random() * 600, now);
      filter.Q.setValueAtTime(3.5, now);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);
      noise.start(now);
      noise.stop(now + 0.045);
    } catch (e) {}
  }

  playBloom() {
    if (!this.isEnabled) return;
    this.init();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      [349.23, 440.0, 523.25, 659.25, 783.99].forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.09);
        const startTime = now + idx * 0.09;
        gain.gain.setValueAtTime(0.001, startTime);
        gain.gain.linearRampToValueAtTime(0.2, startTime + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.9);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(startTime);
        osc.stop(startTime + 0.95);
      });
    } catch (e) {}
  }

  playPlant() {
    if (!this.isEnabled) return;
    this.init();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.exponentialRampToValueAtTime(70, now + 0.18);
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.24, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.3);
    } catch (e) {}
  }
}

const sounds = new SoundFX();

// ==========================================
// 3. 狀態管理 (LocalStorage & Midnight Reset)
// ==========================================
function getTodayDateString() {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function getDefaultState(todayStr, soundEnabled = true) {
  return {
    last_drawn_date: todayStr,
    sound_enabled: soundEnabled,
    seed_state: {
      text: '',
      stage: 0,
      unlocked_card: false,
      scratched: false,
      encouragement: '',
      healing_quote: ''
    },
    today_tasks: [],
    replaced_card_count: 0
  };
}

let appState = null;

function loadState() {
  const today = getTodayDateString();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      const soundPref = typeof parsed.sound_enabled === 'boolean' ? parsed.sound_enabled : true;

      // 跨日自動重置 (超過午夜 24:00 自動歸零)
      if (parsed.last_drawn_date !== today) {
        appState = getDefaultState(today, soundPref);
        saveState();
        return;
      }

      appState = {
        last_drawn_date: today,
        sound_enabled: soundPref,
        seed_state: {
          text: parsed.seed_state?.text || '',
          stage: typeof parsed.seed_state?.stage === 'number' ? parsed.seed_state.stage : 0,
          unlocked_card: !!parsed.seed_state?.unlocked_card,
          scratched: !!parsed.seed_state?.scratched,
          encouragement: parsed.seed_state?.encouragement || '',
          healing_quote: parsed.seed_state?.healing_quote || ''
        },
        today_tasks: Array.isArray(parsed.today_tasks) ? parsed.today_tasks : [],
        replaced_card_count: parsed.replaced_card_count || 0
      };
      return;
    }
  } catch (e) {}
  appState = getDefaultState(today);
  saveState();
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(appState));
  } catch (e) {}
}

// ==========================================
// 4. UI 渲染器與互動控制
// ==========================================
function showToast(msg) {
  const container = document.getElementById('toast-container');
  if (!container) return;
  container.innerHTML = `
    <div class="flex items-center gap-2 px-4 py-3 rounded-2xl bg-stone-900 text-white text-xs font-medium shadow-xl">
      <svg class="w-3.5 h-3.5 text-amber-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z"/></svg>
      <span>${msg}</span>
    </div>
  `;
  setTimeout(() => {
    container.innerHTML = '';
  }, 3200);
}

function renderSoundButton() {
  const btn = document.getElementById('sound-toggle-btn');
  if (!btn) return;
  sounds.setEnabled(appState.sound_enabled);
  if (appState.sound_enabled) {
    btn.className = 'flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-medium transition-colors cursor-pointer bg-amber-50/80 border-amber-200/80 text-amber-800 hover:bg-amber-100';
    btn.innerHTML = `
      <svg class="w-4 h-4 text-amber-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>
      <span class="hidden sm:inline">音效開</span>
    `;
  } else {
    btn.className = 'flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-medium transition-colors cursor-pointer bg-stone-100 border-stone-200 text-stone-600 hover:bg-stone-200/70';
    btn.innerHTML = `
      <svg class="w-4 h-4 text-stone-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="22" x2="16" y1="9" y2="15"/><line x1="16" x2="22" y1="9" y2="15"/></svg>
      <span class="hidden sm:inline">靜音</span>
    `;
  }
}

// 渲染花園植物與澆水區
function renderGarden() {
  const isPlanted = !!appState.seed_state.text;
  const stage = appState.seed_state.stage;
  const percentages = [0, 33, 66, 100];
  const percent = percentages[stage] || 0;
  const isBloomed = stage >= 3;

  // 進度條
  const progressContainer = document.getElementById('garden-progress-container');
  if (isPlanted) {
    progressContainer.classList.remove('hidden');
    document.getElementById('garden-percent-text').textContent = `${percent}%`;
    document.getElementById('garden-progress-bar').style.width = `${percent}%`;
  } else {
    progressContainer.classList.add('hidden');
  }

  // 畫面左側畫布
  const canvasBox = document.getElementById('garden-plant-box');
  if (isBloomed) {
    canvasBox.className = 'relative w-full max-w-md h-72 sm:h-80 rounded-2xl bg-gradient-to-b from-stone-50/90 via-emerald-50/20 to-amber-100/30 border border-rose-300 shadow-md flex flex-col items-center justify-end p-6 select-none cursor-pointer group';
  } else {
    canvasBox.className = 'relative w-full max-w-md h-72 sm:h-80 rounded-2xl bg-gradient-to-b from-stone-50/90 via-emerald-50/20 to-amber-100/30 border border-stone-200/70 flex flex-col items-center justify-end p-6 select-none';
  }

  const plantArea = document.getElementById('garden-plant-visual');
  if (!isPlanted) {
    plantArea.innerHTML = `
      <div class="flex flex-col items-center justify-center h-full text-center px-4 my-auto">
        <div class="w-16 h-16 rounded-2xl bg-stone-100 border border-stone-200/80 flex items-center justify-center text-stone-400 mb-3 shadow-inner">
          <svg class="w-8 h-8 opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 20h10"/><path d="M10 20c5.5-2.5.8-6.4 3-13"/><path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z"/><path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z"/></svg>
        </div>
        <p class="text-sm font-medium text-stone-600">花盆已備妥鬆軟的泥土</p>
        <p class="text-xs text-stone-500 mt-1 max-w-xs">在右側寫下今天讓你疲憊的心事，埋入土中開始轉化</p>
      </div>
    `;
  } else {
    let stageSvg = '';
    if (stage === 0) {
      stageSvg = `
        <div class="flex flex-col items-center animate-gentle-float">
          <div class="relative">
            <div class="w-10 h-10 rounded-full bg-amber-700/80 border-2 border-amber-600 shadow-md flex items-center justify-center">
              <span class="w-3 h-4 rounded-full bg-amber-400/80 blur-[1px]"></span>
            </div>
            <span class="absolute -top-1 -right-1 flex h-3 w-3">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
            </span>
          </div>
          <span class="text-[11px] font-medium text-stone-500 mt-3 bg-white/90 px-2.5 py-0.5 rounded-full border border-stone-200">
            種子深埋土中 · 靜候萌芽
          </span>
        </div>
      `;
    } else if (stage === 1) {
      stageSvg = `
        <div class="flex flex-col items-center animate-gentle-float">
          <svg width="68" height="76" viewBox="0 0 68 76" fill="none">
            <path d="M34 76 C34 50 34 38 34 26" stroke="#15803D" stroke-width="5" stroke-linecap="round"/>
            <path d="M34 40 C20 38 12 28 14 18 C26 18 32 28 34 38" fill="#4ADE80" stroke="#15803D" stroke-width="2"/>
            <path d="M34 32 C48 30 56 20 54 10 C42 10 36 20 34 30" fill="#22C55E" stroke="#15803D" stroke-width="2"/>
            <circle cx="18" cy="20" r="2.5" fill="#BAE6FD"/>
          </svg>
          <span class="text-[11px] font-medium text-emerald-700 mt-2 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
            嫩綠嫩芽破土而出 · 迎向晨光
          </span>
        </div>
      `;
    } else if (stage === 2) {
      stageSvg = `
        <div class="flex flex-col items-center animate-gentle-float">
          <svg width="90" height="110" viewBox="0 0 90 110" fill="none">
            <path d="M45 110 C45 70 43 45 45 22" stroke="#166534" stroke-width="6" stroke-linecap="round"/>
            <path d="M44 80 C24 78 10 65 12 50 C28 50 38 65 44 76" fill="#4ADE80" stroke="#166534" stroke-width="2"/>
            <path d="M46 68 C66 65 80 52 78 38 C62 38 52 52 46 64" fill="#22C55E" stroke="#166534" stroke-width="2"/>
            <path d="M44 48 C28 42 18 30 22 18 C34 20 40 34 44 44" fill="#86EFAC" stroke="#166534" stroke-width="2"/>
            <circle cx="45" cy="18" r="8" fill="#F472B6" stroke="#DB2777" stroke-width="2"/>
            <circle cx="45" cy="18" r="4" fill="#FDE047"/>
          </svg>
          <span class="text-[11px] font-medium text-emerald-700 mt-2 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
            枝葉茁壯生長 · 花苞悄悄孕育
          </span>
        </div>
      `;
    } else if (stage === 3) {
      stageSvg = `
        <div class="flex flex-col items-center animate-bloom-glow">
          <div class="relative group-hover:scale-105 transition-transform duration-300">
            <svg width="120" height="130" viewBox="0 0 120 130" fill="none">
              <path d="M60 130 C60 90 59 70 60 52" stroke="#166534" stroke-width="6" stroke-linecap="round"/>
              <path d="M58 95 C35 92 20 80 22 65 C40 65 52 80 58 90" fill="#4ADE80" stroke="#166534" stroke-width="2"/>
              <path d="M62 82 C85 80 100 68 98 52 C80 52 68 68 62 78" fill="#22C55E" stroke="#166534" stroke-width="2"/>
              <circle cx="60" cy="40" r="34" fill="#FDE047" fill-opacity="0.25"/>
              <circle cx="60" cy="20" r="15" fill="#FB7185"/>
              <circle cx="78" cy="30" r="15" fill="#F43F5E"/>
              <circle cx="78" cy="50" r="15" fill="#FDA4AF"/>
              <circle cx="60" cy="60" r="15" fill="#FB7185"/>
              <circle cx="42" cy="50" r="15" fill="#FDA4AF"/>
              <circle cx="42" cy="30" r="15" fill="#F43F5E"/>
              <circle cx="60" cy="40" r="13" fill="#FBBF24" stroke="#F59E0B" stroke-width="2"/>
              <circle cx="60" cy="40" r="7" fill="#FEF08A"/>
            </svg>
          </div>
          <div class="mt-3 flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 text-white text-xs font-semibold shadow-md animate-pulse-gentle">
            <svg class="w-3.5 h-3.5 text-amber-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z"/></svg>
            <span>點擊花朵，領取情緒價值療癒小卡</span>
          </div>
        </div>
      `;
    }

    plantArea.innerHTML = `
      <div class="relative w-full h-full flex flex-col items-center justify-end">
        <div class="relative flex items-center justify-center mb-2">
          ${stageSvg}
        </div>
        <div class="w-full h-12 bg-gradient-to-t from-stone-800 via-stone-700 to-amber-900/90 rounded-2xl border-t-4 border-amber-950/40 relative overflow-hidden flex items-center justify-center shadow-inner">
          <span class="text-[11px] text-amber-200/70 font-medium tracking-wider relative z-10">溫暖的心靈沃土</span>
        </div>
      </div>
    `;
  }

  // 右側控制台
  const controlsArea = document.getElementById('garden-controls-area');
  if (!isPlanted) {
    controlsArea.innerHTML = `
      <form id="plant-worry-form" class="space-y-4">
        <div>
          <label for="worry-text" class="block text-sm font-semibold text-stone-800 mb-1">寫下今天的壞心情或煩惱</label>
          <p class="text-xs text-stone-500 mb-2">無論是工作的焦慮、人際的委屈或莫名的疲憊，請放心地寫下來（限 50 字）。</p>
          <div class="relative">
            <textarea id="worry-text" rows="3" maxlength="50" placeholder="例：今天會議被主管打槍好挫折，覺得自己不夠好..." class="w-full rounded-xl border border-stone-300 p-3 text-sm text-stone-800 placeholder-stone-400 focus:border-stone-500 focus:outline-none focus:ring-1 focus:ring-stone-500 transition-colors resize-none"></textarea>
            <div id="worry-char-count" class="absolute bottom-2.5 right-3 text-[11px] text-stone-400 tabular-nums">0/50</div>
          </div>
        </div>
        <button type="submit" id="plant-worry-submit" disabled class="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-stone-900 text-white text-sm font-semibold hover:bg-stone-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm cursor-pointer whitespace-nowrap">
          <svg class="w-4 h-4 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 20h10"/><path d="M10 20c5.5-2.5.8-6.4 3-13"/><path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z"/><path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z"/></svg>
          <span>種下煩惱，化作養分</span>
        </button>
      </form>
    `;

    const txt = document.getElementById('worry-text');
    const submitBtn = document.getElementById('plant-worry-submit');
    const countEl = document.getElementById('worry-char-count');
    txt.addEventListener('input', () => {
      countEl.textContent = `${txt.value.length}/50`;
      submitBtn.disabled = !txt.value.trim();
    });

    document.getElementById('plant-worry-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const val = txt.value.trim();
      if (!val) return;
      sounds.playPlant();
      appState.seed_state = {
        text: val.slice(0, 50),
        stage: 0,
        unlocked_card: false,
        scratched: false,
        encouragement: TOMORROW_ENCOURAGEMENTS[Math.floor(Math.random() * TOMORROW_ENCOURAGEMENTS.length)],
        healing_quote: HEALING_QUOTES[Math.floor(Math.random() * HEALING_QUOTES.length)]
      };
      saveState();
      renderGarden();
      showToast('已將煩惱深埋入土壤，轉化為心靈養分');
    });
  } else {
    controlsArea.innerHTML = `
      <div class="space-y-5">
        <div class="p-4 rounded-2xl bg-stone-50 border border-stone-200/70">
          <span class="text-[11px] font-medium text-stone-400 tracking-wider">已埋入的煩惱</span>
          <p class="text-sm font-medium text-stone-800 mt-1 italic">「${appState.seed_state.text}」</p>
          <div class="mt-3 flex items-center justify-between text-xs text-stone-500 pt-2.5 border-t border-stone-200/50">
            <span>澆水進度</span>
            <span class="font-semibold text-stone-700 tabular-nums">${stage} / 3 次</span>
          </div>
        </div>

        <div>
          ${!isBloomed ? `
            <button type="button" id="water-seed-btn" class="w-full flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-sky-600 hover:bg-sky-500 active:scale-[0.98] text-white text-sm font-semibold transition-all shadow-md cursor-pointer whitespace-nowrap">
              <svg class="w-4 h-4 fill-sky-200 text-sky-100" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/></svg>
              <span>為種子澆水 (${3 - stage} 次後盛開)</span>
            </button>
          ` : `
            <button type="button" id="open-card-modal-btn" class="w-full flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-rose-600 hover:bg-rose-500 active:scale-[0.98] text-white text-sm font-semibold transition-all shadow-md cursor-pointer whitespace-nowrap">
              <svg class="w-4 h-4 text-rose-100" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M12 16.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 0 1 12 7.5a4.5 4.5 0 1 1 4.5 4.5 4.5 4.5 0 0 1-4.5 4.5z"/></svg>
              <span>查看情緒價值小卡與刮刮卡</span>
            </button>
          `}
        </div>

        <p class="text-xs text-stone-500 leading-relaxed">
          💧 每次澆水代表給自己一次溫和的深呼吸。三次灌溉後花朵將盛開，並賦予你專屬的心靈小卡。
        </p>
      </div>
    `;

    if (!isBloomed) {
      document.getElementById('water-seed-btn').addEventListener('click', triggerWater);
    } else {
      document.getElementById('open-card-modal-btn').addEventListener('click', openHealingModal);
    }
  }
}

function triggerWater() {
  if (appState.seed_state.stage >= 3) return;
  sounds.playWater();

  // 水滴動畫
  const splash = document.createElement('div');
  splash.className = 'absolute inset-0 pointer-events-none flex items-center justify-center z-20 animate-water-drop';
  splash.innerHTML = `
    <div class="flex gap-4">
      <span class="w-2.5 h-3.5 bg-sky-400 rounded-full blur-[0.5px] opacity-90"></span>
      <span class="w-3 h-4 bg-sky-500 rounded-full blur-[0.5px] opacity-90 -mt-2"></span>
      <span class="w-2 h-3 bg-sky-400 rounded-full blur-[0.5px] opacity-90 mt-1"></span>
    </div>
  `;
  const plantBox = document.getElementById('garden-plant-box');
  plantBox.appendChild(splash);
  setTimeout(() => splash.remove(), 700);

  appState.seed_state.stage += 1;
  if (appState.seed_state.stage === 3) {
    setTimeout(() => sounds.playBloom(), 350);
  }
  saveState();
  renderGarden();
}

// 渲染 3D 盲盒抽卡區
function renderBlindBox() {
  const isDrawn = appState.today_tasks.length > 0;
  const statusContainer = document.getElementById('blind-box-status');
  const cardsContainer = document.getElementById('blind-box-cards-grid');

  const completedCount = appState.today_tasks.filter((t) => t.completed).length;

  if (isDrawn) {
    statusContainer.innerHTML = `
      <div class="flex items-center gap-2 text-xs font-semibold px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/70">
        <svg class="w-3.5 h-3.5 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z"/></svg>
        <span>今日冒險已領取 (${completedCount}/${appState.today_tasks.length} 完成)</span>
      </div>
    `;
  } else {
    statusContainer.innerHTML = `
      <button type="button" id="draw-all-cards-btn" class="flex items-center gap-2 px-5 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold shadow-sm transition-all cursor-pointer whitespace-nowrap">
        <svg class="w-3.5 h-3.5 text-amber-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z"/></svg>
        <span>翻開全部卡牌</span>
      </button>
    `;
    document.getElementById('draw-all-cards-btn').addEventListener('click', triggerDrawCards);
  }

  // 渲染 3 張卡牌
  let cardsHtml = '';
  for (let idx = 0; idx < 3; idx++) {
    const task = appState.today_tasks[idx];
    const flipped = isDrawn;
    const cat = task ? task.category : '心靈';

    // 類別風格樣式
    let badgeClass = 'text-purple-700 bg-purple-100/70';
    let cardBg = 'from-purple-50/50 to-white';
    let borderClass = 'border-purple-200/80';
    let iconColor = 'text-purple-600';

    if (cat === '健康') {
      badgeClass = 'text-emerald-700 bg-emerald-100/70';
      cardBg = 'from-emerald-50/50 to-white';
      borderClass = 'border-emerald-200/80';
      iconColor = 'text-emerald-600';
    } else if (cat === '探索') {
      badgeClass = 'text-blue-700 bg-blue-100/70';
      cardBg = 'from-blue-50/50 to-white';
      borderClass = 'border-blue-200/80';
      iconColor = 'text-blue-600';
    } else if (cat === '成長') {
      badgeClass = 'text-orange-700 bg-orange-100/70';
      cardBg = 'from-orange-50/50 to-white';
      borderClass = 'border-orange-200/80';
      iconColor = 'text-orange-600';
    }

    const floatClass = !isDrawn ? (idx === 0 ? 'animate-gentle-float' : idx === 1 ? 'animate-gentle-float-delayed' : 'animate-gentle-float-slow') : '';

    cardsHtml += `
      <div data-index="${idx}" class="blind-box-card-item relative h-64 sm:h-72 w-full transition-transform duration-700 preserve-3d cursor-pointer ${floatClass} ${flipped ? 'rotate-y-180' : ''}">
        <!-- 卡牌背面 (未翻開) -->
        <div class="absolute inset-0 w-full h-full rounded-2xl bg-gradient-to-br from-stone-800 via-stone-900 to-amber-950 p-6 flex flex-col items-center justify-between text-center backface-hidden shadow-md border-2 border-amber-600/30 hover:border-amber-500/60 transition-colors">
          <div class="text-stone-400 text-[11px] tracking-widest font-mono">CARD NO. ${idx + 1}</div>
          <div class="w-20 h-20 rounded-full border border-amber-400/40 bg-amber-400/5 flex items-center justify-center relative shadow-inner">
            <div class="w-14 h-14 rounded-full border border-dashed border-amber-300/30 flex items-center justify-center">
              <svg class="w-6 h-6 text-amber-300 animate-pulse-gentle" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z"/></svg>
            </div>
          </div>
          <div class="space-y-1">
            <p class="text-xs font-semibold text-amber-200">點擊翻牌</p>
            <p class="text-[11px] text-stone-400">探索今日微任務</p>
          </div>
        </div>

        <!-- 卡牌正面 (翻開後) -->
        <div class="absolute inset-0 w-full h-full rounded-2xl bg-gradient-to-b ${cardBg} p-5 flex flex-col justify-between backface-hidden rotate-y-180 shadow-md border ${borderClass}">
          <div class="flex items-center justify-between">
            <span class="text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${badgeClass}">${cat}</span>
            <span class="text-[11px] font-mono text-stone-400">#${idx + 1}</span>
          </div>

          <div class="my-auto py-2">
            <p class="text-sm sm:text-base font-semibold leading-snug ${task?.completed ? 'line-through text-stone-400' : 'text-stone-800'}">
              ${task ? task.text : '載入中...'}
            </p>
          </div>

          ${task ? `
            <button type="button" data-task-id="${task.id}" class="toggle-task-btn w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-medium transition-all cursor-pointer ${task.completed ? 'bg-emerald-100 text-emerald-800' : 'bg-white hover:bg-stone-100 text-stone-700 border border-stone-200 shadow-xs'}">
              ${task.completed ? `
                <svg class="w-4 h-4 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                <span>已完成此任務</span>
              ` : `
                <svg class="w-4 h-4 text-stone-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/></svg>
                <span>標記為完成</span>
              `}
            </button>
          ` : ''}
        </div>
      </div>
    `;
  }

  cardsContainer.innerHTML = cardsHtml;

  // 點擊卡牌翻牌或點擊打勾
  document.querySelectorAll('.blind-box-card-item').forEach((card) => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('.toggle-task-btn')) return;
      if (!isDrawn) triggerDrawCards();
    });
  });

  document.querySelectorAll('.toggle-task-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.getAttribute('data-task-id');
      toggleTask(id);
    });
  });
}

function triggerDrawCards() {
  if (appState.today_tasks.length > 0) return;
  sounds.playFlip();

  const categories = ['心靈', '健康', '探索', '成長'];
  const shuffledCats = [...categories].sort(() => Math.random() - 0.5).slice(0, 3);

  const newTasks = shuffledCats.map((cat, idx) => {
    const pool = TASK_PRESETS[cat];
    const text = pool[Math.floor(Math.random() * pool.length)];
    return {
      id: `${Date.now()}_${idx}_${Math.random().toString(36).substring(2, 6)}`,
      category: cat,
      text,
      completed: false
    };
  });

  appState.today_tasks = newTasks;
  saveState();

  renderBlindBox();
  renderTaskList();
  showToast('已揭曉今日 3 個微冒險卡牌！');
}

function toggleTask(id) {
  const task = appState.today_tasks.find((t) => t.id === id);
  if (!task) return;
  task.completed = !task.completed;
  if (task.completed) {
    sounds.playCheck();
  }
  saveState();
  renderBlindBox();
  renderTaskList();
}

// 渲染任務清單區
function renderTaskList() {
  const listEl = document.getElementById('task-list-items');
  const replaceBtn = document.getElementById('replace-cards-btn');
  const summaryCount = document.getElementById('task-summary-count');

  const total = appState.today_tasks.length;
  const completed = appState.today_tasks.filter((t) => t.completed).length;

  summaryCount.textContent = `${completed}/${total} 完成`;

  // 更換卡牌按鈕 (每日限 1 次)
  const canReplace = appState.replaced_card_count < 1 && total > 0;
  if (canReplace) {
    replaceBtn.disabled = false;
    replaceBtn.className = 'flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100';
    replaceBtn.innerHTML = `
      <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/></svg>
      <span>更換卡牌 (剩餘 1 次)</span>
    `;
  } else {
    replaceBtn.disabled = true;
    replaceBtn.className = 'flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-not-allowed whitespace-nowrap bg-stone-100 text-stone-400 border border-stone-200/70 opacity-70';
    replaceBtn.innerHTML = `
      <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/></svg>
      <span>更換卡牌 (今日已用)</span>
    `;
  }

  if (total === 0) {
    listEl.innerHTML = `
      <div class="py-12 text-center text-stone-400">
        <p class="text-sm font-medium text-stone-500 mb-1">今日尚未抽卡</p>
        <p class="text-xs">請點擊上方的 3D 盲盒翻開今日卡牌，或點擊「新增自訂任務」開始。</p>
      </div>
    `;
    return;
  }

  let html = '';
  appState.today_tasks.forEach((t) => {
    let badgeClass = 'text-purple-700 bg-purple-100/70';
    let iconBg = 'bg-purple-50 text-purple-700 border-purple-200';
    if (t.category === '健康') {
      badgeClass = 'text-emerald-700 bg-emerald-100/70';
      iconBg = 'bg-emerald-50 text-emerald-700 border-emerald-200';
    } else if (t.category === '探索') {
      badgeClass = 'text-blue-700 bg-blue-100/70';
      iconBg = 'bg-blue-50 text-blue-700 border-blue-200';
    } else if (t.category === '成長') {
      badgeClass = 'text-orange-700 bg-orange-100/70';
      iconBg = 'bg-orange-50 text-orange-700 border-orange-200';
    }

    html += `
      <div data-task-id="${t.id}" class="task-row-item group flex items-center justify-between p-4 rounded-2xl border transition-all cursor-pointer select-none ${t.completed ? 'bg-stone-50/70 border-stone-200/50 opacity-75' : 'bg-white hover:bg-stone-50/50 border-stone-200 shadow-xs hover:border-stone-300'}">
        <div class="flex items-center gap-3.5 min-w-0 pr-3">
          <div class="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border ${iconBg}">
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
          </div>
          <div class="min-w-0">
            <div class="flex items-center gap-2 mb-0.5">
              <span class="text-[11px] font-semibold px-2 py-0.2 rounded-md ${badgeClass}">${t.category}</span>
            </div>
            <p class="text-sm font-medium ${t.completed ? 'line-through text-stone-400' : 'text-stone-800'}">${t.text}</p>
          </div>
        </div>
        <div class="shrink-0 pl-2">
          ${t.completed ? `
            <div class="flex items-center gap-1.5 text-xs text-emerald-600 font-medium">
              <span class="hidden sm:inline text-[11px]">已完成</span>
              <svg class="w-5 h-5 text-emerald-600 fill-emerald-100" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            </div>
          ` : `
            <svg class="w-5 h-5 text-stone-300 group-hover:text-stone-400 transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/></svg>
          `}
        </div>
      </div>
    `;
  });

  listEl.innerHTML = html;

  document.querySelectorAll('.task-row-item').forEach((row) => {
    row.addEventListener('click', () => {
      const id = row.getAttribute('data-task-id');
      toggleTask(id);
    });
  });
}

// 更換未完成卡牌
function replaceIncompleteCards() {
  if (appState.replaced_card_count >= 1) return;
  const incomplete = appState.today_tasks.filter((t) => !t.completed);
  if (incomplete.length === 0) {
    showToast('所有任務均已完成，無需更換！');
    return;
  }

  sounds.playFlip();
  appState.today_tasks = appState.today_tasks.map((task) => {
    if (task.completed) return task;
    const pool = TASK_PRESETS[task.category];
    const alternatives = pool.filter((t) => t !== task.text);
    const newText = alternatives.length > 0 ? alternatives[Math.floor(Math.random() * alternatives.length)] : pool[0];
    return {
      ...task,
      id: `${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      text: newText
    };
  });

  appState.replaced_card_count += 1;
  saveState();
  renderBlindBox();
  renderTaskList();
  showToast(`已隨機為您更換 ${incomplete.length} 個未完成的微任務！`);
}

// ==========================================
// 5. 刮刮卡控制器 (HTML5 Canvas Scratch Card)
// ==========================================
let scratchCanvas = null;
let scratchCtx = null;
let isScratching = false;
let scratchCompleted = false;

function setupScratchCard() {
  scratchCanvas = document.getElementById('scratch-card-canvas');
  if (!scratchCanvas) return;
  scratchCtx = scratchCanvas.getContext('2d');
  scratchCompleted = appState.seed_state.scratched;

  const container = document.getElementById('scratch-card-container');
  const width = container.clientWidth || 340;
  const height = 120;

  scratchCanvas.width = width * window.devicePixelRatio;
  scratchCanvas.height = height * window.devicePixelRatio;
  scratchCanvas.style.width = `${width}px`;
  scratchCanvas.style.height = `${height}px`;

  scratchCtx.scale(window.devicePixelRatio, window.devicePixelRatio);

  if (scratchCompleted) {
    scratchCanvas.style.display = 'none';
    document.getElementById('scratch-status-text').innerHTML = `
      <span class="text-emerald-600 font-medium">✓ 已揭曉明日祝福</span>
    `;
    return;
  }

  scratchCanvas.style.display = 'block';

  // 銀色漸層塗層
  const grad = scratchCtx.createLinearGradient(0, 0, width, height);
  grad.addColorStop(0, '#CBD5E1');
  grad.addColorStop(0.3, '#E2E8F0');
  grad.addColorStop(0.5, '#F8FAFC');
  grad.addColorStop(0.7, '#E2E8F0');
  grad.addColorStop(1, '#94A3B8');

  scratchCtx.fillStyle = grad;
  scratchCtx.fillRect(0, 0, width, height);

  // 斑點顆粒
  scratchCtx.fillStyle = 'rgba(100, 116, 139, 0.15)';
  for (let x = 12; x < width; x += 20) {
    for (let y = 12; y < height; y += 20) {
      scratchCtx.beginPath();
      scratchCtx.arc(x, y, 1.5, 0, Math.PI * 2);
      scratchCtx.fill();
    }
  }

  scratchCtx.fillStyle = '#475569';
  scratchCtx.font = '600 13px system-ui, sans-serif';
  scratchCtx.textAlign = 'center';
  scratchCtx.textBaseline = 'middle';
  scratchCtx.fillText('✨ 用手指或滑鼠刮開銀色塗層 ✨', width / 2, height / 2 - 8);

  scratchCtx.fillStyle = '#64748B';
  scratchCtx.font = '400 11px system-ui, sans-serif';
  scratchCtx.fillText('揭曉明日專屬的溫柔祝福', width / 2, height / 2 + 14);

  // 事件綁定
  let lastPos = null;

  const scratchAt = (clientX, clientY) => {
    if (scratchCompleted) return;
    const rect = scratchCanvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    scratchCtx.globalCompositeOperation = 'destination-out';
    scratchCtx.lineCap = 'round';
    scratchCtx.lineJoin = 'round';
    scratchCtx.lineWidth = 36;

    scratchCtx.beginPath();
    if (lastPos) {
      scratchCtx.moveTo(lastPos.x, lastPos.y);
      scratchCtx.lineTo(x, y);
      scratchCtx.stroke();
    } else {
      scratchCtx.arc(x, y, 18, 0, Math.PI * 2);
      scratchCtx.fill();
    }

    lastPos = { x, y };
    sounds.playScratch();
  };

  const checkPercent = () => {
    if (scratchCompleted) return;
    try {
      const imgData = scratchCtx.getImageData(0, 0, scratchCanvas.width, scratchCanvas.height);
      const data = imgData.data;
      let clearCount = 0;
      const stride = 32;
      for (let i = 3; i < data.length; i += 4 * stride) {
        if (data[i] < 128) clearCount++;
      }
      const total = data.length / (4 * stride);
      const pct = Math.min(100, Math.round((clearCount / total) * 100));

      document.getElementById('scratch-percent-indicator').textContent = `已刮開 ${pct}%`;

      if (pct >= 45) {
        revealScratchCard();
      }
    } catch (e) {}
  };

  scratchCanvas.onpointerdown = (e) => {
    isScratching = true;
    lastPos = null;
    scratchAt(e.clientX, e.clientY);
  };

  scratchCanvas.onpointermove = (e) => {
    if (!isScratching) return;
    scratchAt(e.clientX, e.clientY);
  };

  const endScratch = () => {
    if (isScratching) {
      isScratching = false;
      lastPos = null;
      checkPercent();
    }
  };

  scratchCanvas.onpointerup = endScratch;
  scratchCanvas.onpointerleave = endScratch;
}

function revealScratchCard() {
  scratchCompleted = true;
  appState.seed_state.scratched = true;
  saveState();
  sounds.playBloom();
  if (scratchCanvas) scratchCanvas.style.display = 'none';
  document.getElementById('scratch-status-text').innerHTML = `
    <span class="text-emerald-600 font-medium">✓ 已揭曉明日祝福</span>
  `;
}

// 彈窗開關
function openHealingModal() {
  const modal = document.getElementById('healing-modal');
  if (!modal) return;
  document.getElementById('modal-worry-quote').textContent = appState.seed_state.text || '今天的微小煩惱';
  document.getElementById('modal-healing-quote').textContent = appState.seed_state.healing_quote || HEALING_QUOTES[0];
  document.getElementById('modal-encouragement-text').textContent = appState.seed_state.encouragement || TOMORROW_ENCOURAGEMENTS[0];

  modal.classList.remove('hidden');
  modal.classList.add('flex');

  setTimeout(() => {
    setupScratchCard();
  }, 50);
}

function closeHealingModal() {
  const modal = document.getElementById('healing-modal');
  if (!modal) return;
  modal.classList.add('hidden');
  modal.classList.remove('flex');
}

// ==========================================
// 6. 頁面初始化與全域事件監聽
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  loadState();

  // 音效切換
  document.getElementById('sound-toggle-btn').addEventListener('click', () => {
    appState.sound_enabled = !appState.sound_enabled;
    sounds.setEnabled(appState.sound_enabled);
    if (appState.sound_enabled) sounds.playCheck();
    saveState();
    renderSoundButton();
  });

  // 重新開始 (手動重置為全新的一天)
  document.getElementById('reset-day-btn').addEventListener('click', () => {
    appState = getDefaultState(getTodayDateString(), appState.sound_enabled);
    saveState();
    renderGarden();
    renderBlindBox();
    renderTaskList();
    showToast('✨ 已重新開始：花園狀態與今日任務已回歸全新開始！');
  });

  // 更換卡牌
  document.getElementById('replace-cards-btn').addEventListener('click', replaceIncompleteCards);

  // 花園花朵點擊
  document.getElementById('garden-plant-box').addEventListener('click', () => {
    if (appState.seed_state.stage >= 3) {
      openHealingModal();
    }
  });

  // 彈窗關閉
  document.getElementById('close-modal-btn').addEventListener('click', closeHealingModal);
  document.getElementById('modal-back-btn').addEventListener('click', closeHealingModal);
  document.getElementById('quick-reveal-btn').addEventListener('click', revealScratchCard);

  // 新增自訂任務彈窗
  const addTaskModal = document.getElementById('add-task-modal');
  let selectedCategory = '心靈';

  document.getElementById('open-add-task-btn').addEventListener('click', () => {
    addTaskModal.classList.remove('hidden');
    addTaskModal.classList.add('flex');
  });

  document.getElementById('cancel-add-task-btn').addEventListener('click', () => {
    addTaskModal.classList.add('hidden');
    addTaskModal.classList.remove('flex');
  });

  document.querySelectorAll('.cat-select-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.cat-select-btn').forEach((b) => {
        b.className = 'cat-select-btn py-2 px-1 rounded-xl text-xs font-semibold border transition-all cursor-pointer text-center bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100';
      });
      selectedCategory = btn.getAttribute('data-cat');
      btn.className = 'cat-select-btn py-2 px-1 rounded-xl text-xs font-semibold border transition-all cursor-pointer text-center bg-stone-900 border-stone-900 text-white shadow-xs';
    });
  });

  document.getElementById('add-task-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const input = document.getElementById('custom-task-input');
    const val = input.value.trim();
    if (!val) return;

    sounds.playCheck();
    appState.today_tasks.push({
      id: `${Date.now()}_custom_${Math.random().toString(36).substring(2, 6)}`,
      category: selectedCategory,
      text: val.slice(0, 40),
      completed: false
    });
    saveState();
    input.value = '';
    addTaskModal.classList.add('hidden');
    addTaskModal.classList.remove('flex');
    renderBlindBox();
    renderTaskList();
    showToast('已新增今日自訂微目標！');
  });

  // 渲染頁面
  renderSoundButton();
  renderGarden();
  renderBlindBox();
  renderTaskList();

  // 午夜跨日定時器 (每 30 秒檢測一次)
  setInterval(() => {
    const today = getTodayDateString();
    if (appState.last_drawn_date !== today) {
      loadState();
      renderGarden();
      renderBlindBox();
      renderTaskList();
      showToast('新的一天開始了！心靈花園與冒險任務已為您清空歸零。');
    }
  }, 30000);
});
