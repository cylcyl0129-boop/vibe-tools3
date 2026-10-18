(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=`seed_of_mind_daily_state`,t={心靈:[`深呼吸 3 次，感受當下的平靜`,`對鏡子裡的自己微笑，說聲「你辛苦了」`,`聽一首能讓你心情放鬆的純音樂或白噪音`,`閉上雙眼發呆 3 分鐘，什麼都不必焦慮`,`把手放在心口上，感受穩定而溫柔的心跳`,`寫下一件今天值得感謝的小事或感謝自己`,`允許自己今天有「不完美」的自由`],健康:[`緩慢喝一杯溫水，感受水流滋潤身體的感覺`,`離開螢幕，眺望窗外最遠的那一片天空 1 分鐘`,`輕輕轉動肩膀與頸部，釋放緊繃了一整天的肌肉`,`做 30 秒溫和的眼球放鬆運動`,`放慢腳步散步 5 分鐘，踩穩每一個當下的步伐`,`調整坐姿，讓背部與雙肩回到舒適放鬆的平衡點`,`好好享受一口食物的香氣與純粹滋味`],探索:[`抬頭觀察今天天空中雲朵的形狀或微風的走向`,`仔細端詳身邊一株植物或樹木葉片上的細緻脈絡`,`在日常的路線中，刻意走一條平常少走的小徑`,`在生活環境中，尋找一件你以前沒注意過的可愛細節`,`試著聽一首平常不常接觸的異國曲風或輕音樂`,`用手機或雙眼捕捉一張讓你嘴角上揚的生活光影`,`觸摸不同質地的物品，專注體驗指尖的觸覺`],成長:[`隨手整理桌面上的一個角落，創造呼吸感的小天地`,`記下今天收穫的一個微小靈感或學到的新概念`,`向今天遇見的一位朋友或夥伴表達真誠的感謝`,`翻開一本喜歡的書，隨心閱讀幾行文字`,`原諒自己今天可能出現的一點小失誤，這很正常`,`替接下來的一週設定一個輕鬆隨興、無壓力的微小心願`,`為自己倒一杯溫茶或咖啡，好好犒賞今天的付出`]},n=[`允許自己偶爾脆弱，就像天空總有下雨的時候。雨過之後，泥土的氣味會特別清新。`,`今天的你已經很努力了，不需要每件事都達到滿分。適度的休息是為了更長久的溫柔。`,`那些看似壓在心頭的沉重，都是滋養靈魂的肥料。在看不見的泥土深處，你正在深深扎根。`,`不必急著迎合全世界的期待，光是照顧好自己的情緒，就是今天最偉大的成就。`,`情緒如潮汐有起有伏，當它來的時候靜靜陪伴它，當它走的時候道一聲謝謝。`,`就算腳步放慢一點也沒關係，路邊的花草正在為你的節奏盛開。`,`請溫柔地擁抱那個感到疲憊的自己，你是自己最好的守護者。`,`生活不必總是緊繃前行，留一點空白給微風吹拂。`,`你種下的煩惱已化作養分，所有的心結終會以另一種美麗的方式盛開。`],r=[`明天太陽升起時，世界會以全新的溫柔迎接你。`,`明天的你，將擁有比今天更從容、更自由的心境。`,`睡個好覺吧，明天有一場輕盈的小幸運正在途中向你奔來。`,`明天是全新的一天，所有今天的陰霾都不會跟隨你越過午夜。`,`帶著柔軟的心入睡，明天的清晨會為你帶來清澈的勇氣。`,`明天的每一步，都會踏在充滿希望與安心的花徑上。`,`你的堅韌會化作明天的羽翼，飛向更廣闊的寧靜天空。`,`明天會有意想不到的美好細節，等待著你去發現與微笑。`],i=new class{constructor(){this.ctx=null,this.isEnabled=!0,this.lastScratch=0}init(){if(!this.ctx&&typeof window<`u`){let e=window.AudioContext||window.webkitAudioContext;e&&(this.ctx=new e)}this.ctx&&this.ctx.state===`suspended`&&this.ctx.resume().catch(()=>{})}setEnabled(e){this.isEnabled=e}playFlip(){if(this.isEnabled&&(this.init(),this.ctx))try{let e=this.ctx.currentTime,t=this.ctx.createOscillator(),n=this.ctx.createGain(),r=this.ctx.createBiquadFilter();r.type=`lowpass`,r.frequency.setValueAtTime(800,e),r.frequency.exponentialRampToValueAtTime(2200,e+.08),r.frequency.exponentialRampToValueAtTime(300,e+.22),t.type=`triangle`,t.frequency.setValueAtTime(220,e),t.frequency.exponentialRampToValueAtTime(440,e+.06),t.frequency.exponentialRampToValueAtTime(160,e+.22),n.gain.setValueAtTime(.001,e),n.gain.linearRampToValueAtTime(.18,e+.04),n.gain.exponentialRampToValueAtTime(.001,e+.24),t.connect(r),r.connect(n),n.connect(this.ctx.destination),t.start(e),t.stop(e+.25)}catch{}}playWater(){if(this.isEnabled&&(this.init(),this.ctx))try{let e=this.ctx.currentTime,t=this.ctx.createOscillator(),n=this.ctx.createGain();t.type=`sine`,t.frequency.setValueAtTime(1100,e),t.frequency.exponentialRampToValueAtTime(420,e+.08),t.frequency.exponentialRampToValueAtTime(860,e+.16),n.gain.setValueAtTime(.01,e),n.gain.linearRampToValueAtTime(.28,e+.02),n.gain.exponentialRampToValueAtTime(.001,e+.22),t.connect(n),n.connect(this.ctx.destination),t.start(e),t.stop(e+.23)}catch{}}playCheck(){if(this.isEnabled&&(this.init(),this.ctx))try{let e=this.ctx.currentTime;[523.25,659.25].forEach((t,n)=>{let r=this.ctx.createOscillator(),i=this.ctx.createGain();r.type=`sine`,r.frequency.setValueAtTime(t,e+n*.07);let a=e+n*.07;i.gain.setValueAtTime(.001,a),i.gain.linearRampToValueAtTime(.22,a+.03),i.gain.exponentialRampToValueAtTime(.001,a+.55),r.connect(i),i.connect(this.ctx.destination),r.start(a),r.stop(a+.6)})}catch{}}playScratch(){if(!this.isEnabled)return;let e=Date.now();if(!(e-this.lastScratch<90)&&(this.lastScratch=e,this.init(),this.ctx))try{let e=this.ctx.currentTime,t=this.ctx.sampleRate*.04,n=this.ctx.createBuffer(1,t,this.ctx.sampleRate),r=n.getChannelData(0);for(let e=0;e<t;e++)r[e]=(Math.random()*2-1)*.5;let i=this.ctx.createBufferSource();i.buffer=n;let a=this.ctx.createBiquadFilter();a.type=`bandpass`,a.frequency.setValueAtTime(1400+Math.random()*600,e),a.Q.setValueAtTime(3.5,e);let o=this.ctx.createGain();o.gain.setValueAtTime(.12,e),o.gain.exponentialRampToValueAtTime(.001,e+.04),i.connect(a),a.connect(o),o.connect(this.ctx.destination),i.start(e),i.stop(e+.045)}catch{}}playBloom(){if(this.isEnabled&&(this.init(),this.ctx))try{let e=this.ctx.currentTime;[349.23,440,523.25,659.25,783.99].forEach((t,n)=>{let r=this.ctx.createOscillator(),i=this.ctx.createGain();r.type=`sine`,r.frequency.setValueAtTime(t,e+n*.09);let a=e+n*.09;i.gain.setValueAtTime(.001,a),i.gain.linearRampToValueAtTime(.2,a+.04),i.gain.exponentialRampToValueAtTime(1e-4,a+.9),r.connect(i),i.connect(this.ctx.destination),r.start(a),r.stop(a+.95)})}catch{}}playPlant(){if(this.isEnabled&&(this.init(),this.ctx))try{let e=this.ctx.currentTime,t=this.ctx.createOscillator(),n=this.ctx.createGain();t.type=`sine`,t.frequency.setValueAtTime(140,e),t.frequency.exponentialRampToValueAtTime(70,e+.18),n.gain.setValueAtTime(.001,e),n.gain.linearRampToValueAtTime(.24,e+.02),n.gain.exponentialRampToValueAtTime(.001,e+.28),t.connect(n),n.connect(this.ctx.destination),t.start(e),t.stop(e+.3)}catch{}}};function a(){let e=new Date;return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,`0`)}-${String(e.getDate()).padStart(2,`0`)}`}function o(e,t=!0){return{last_drawn_date:e,sound_enabled:t,seed_state:{text:``,stage:0,unlocked_card:!1,scratched:!1,encouragement:``,healing_quote:``},today_tasks:[],replaced_card_count:0}}var s=null;function c(){let t=a();try{let n=localStorage.getItem(e);if(n){let e=JSON.parse(n),r=typeof e.sound_enabled!=`boolean`||e.sound_enabled;if(e.last_drawn_date!==t){s=o(t,r),l();return}s={last_drawn_date:t,sound_enabled:r,seed_state:{text:e.seed_state?.text||``,stage:typeof e.seed_state?.stage==`number`?e.seed_state.stage:0,unlocked_card:!!e.seed_state?.unlocked_card,scratched:!!e.seed_state?.scratched,encouragement:e.seed_state?.encouragement||``,healing_quote:e.seed_state?.healing_quote||``},today_tasks:Array.isArray(e.today_tasks)?e.today_tasks:[],replaced_card_count:e.replaced_card_count||0};return}}catch{}s=o(t),l()}function l(){try{localStorage.setItem(e,JSON.stringify(s))}catch{}}function u(e){let t=document.getElementById(`toast-container`);t&&(t.innerHTML=`
    <div class="flex items-center gap-2 px-4 py-3 rounded-2xl bg-stone-900 text-white text-xs font-medium shadow-xl">
      <svg class="w-3.5 h-3.5 text-amber-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z"/></svg>
      <span>${e}</span>
    </div>
  `,setTimeout(()=>{t.innerHTML=``},3200))}function d(){let e=document.getElementById(`sound-toggle-btn`);e&&(i.setEnabled(s.sound_enabled),s.sound_enabled?(e.className=`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-medium transition-colors cursor-pointer bg-amber-50/80 border-amber-200/80 text-amber-800 hover:bg-amber-100`,e.innerHTML=`
      <svg class="w-4 h-4 text-amber-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>
      <span class="hidden sm:inline">音效開</span>
    `):(e.className=`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-medium transition-colors cursor-pointer bg-stone-100 border-stone-200 text-stone-600 hover:bg-stone-200/70`,e.innerHTML=`
      <svg class="w-4 h-4 text-stone-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="22" x2="16" y1="9" y2="15"/><line x1="16" x2="22" y1="9" y2="15"/></svg>
      <span class="hidden sm:inline">靜音</span>
    `))}function f(){let e=!!s.seed_state.text,t=s.seed_state.stage,a=[0,33,66,100][t]||0,o=t>=3,c=document.getElementById(`garden-progress-container`);e?(c.classList.remove(`hidden`),document.getElementById(`garden-percent-text`).textContent=`${a}%`,document.getElementById(`garden-progress-bar`).style.width=`${a}%`):c.classList.add(`hidden`);let d=document.getElementById(`garden-plant-box`);d.className=o?`relative w-full max-w-md h-72 sm:h-80 rounded-2xl bg-gradient-to-b from-stone-50/90 via-emerald-50/20 to-amber-100/30 border border-rose-300 shadow-md flex flex-col items-center justify-end p-6 select-none cursor-pointer group`:`relative w-full max-w-md h-72 sm:h-80 rounded-2xl bg-gradient-to-b from-stone-50/90 via-emerald-50/20 to-amber-100/30 border border-stone-200/70 flex flex-col items-center justify-end p-6 select-none`;let m=document.getElementById(`garden-plant-visual`);if(!e)m.innerHTML=`
      <div class="flex flex-col items-center justify-center h-full text-center px-4 my-auto">
        <div class="w-16 h-16 rounded-2xl bg-stone-100 border border-stone-200/80 flex items-center justify-center text-stone-400 mb-3 shadow-inner">
          <svg class="w-8 h-8 opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 20h10"/><path d="M10 20c5.5-2.5.8-6.4 3-13"/><path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z"/><path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z"/></svg>
        </div>
        <p class="text-sm font-medium text-stone-600">花盆已備妥鬆軟的泥土</p>
        <p class="text-xs text-stone-500 mt-1 max-w-xs">在右側寫下今天讓你疲憊的心事，埋入土中開始轉化</p>
      </div>
    `;else{let e=``;t===0?e=`
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
      `:t===1?e=`
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
      `:t===2?e=`
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
      `:t===3&&(e=`
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
      `),m.innerHTML=`
      <div class="relative w-full h-full flex flex-col items-center justify-end">
        <div class="relative flex items-center justify-center mb-2">
          ${e}
        </div>
        <div class="w-full h-12 bg-gradient-to-t from-stone-800 via-stone-700 to-amber-900/90 rounded-2xl border-t-4 border-amber-950/40 relative overflow-hidden flex items-center justify-center shadow-inner">
          <span class="text-[11px] text-amber-200/70 font-medium tracking-wider relative z-10">溫暖的心靈沃土</span>
        </div>
      </div>
    `}let h=document.getElementById(`garden-controls-area`);if(e)h.innerHTML=`
      <div class="space-y-5">
        <div class="p-4 rounded-2xl bg-stone-50 border border-stone-200/70">
          <span class="text-[11px] font-medium text-stone-400 tracking-wider">已埋入的煩惱</span>
          <p class="text-sm font-medium text-stone-800 mt-1 italic">「${s.seed_state.text}」</p>
          <div class="mt-3 flex items-center justify-between text-xs text-stone-500 pt-2.5 border-t border-stone-200/50">
            <span>澆水進度</span>
            <span class="font-semibold text-stone-700 tabular-nums">${t} / 3 次</span>
          </div>
        </div>

        <div>
          ${o?`
            <button type="button" id="open-card-modal-btn" class="w-full flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-rose-600 hover:bg-rose-500 active:scale-[0.98] text-white text-sm font-semibold transition-all shadow-md cursor-pointer whitespace-nowrap">
              <svg class="w-4 h-4 text-rose-100" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M12 16.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 0 1 12 7.5a4.5 4.5 0 1 1 4.5 4.5 4.5 4.5 0 0 1-4.5 4.5z"/></svg>
              <span>查看情緒價值小卡與刮刮卡</span>
            </button>
          `:`
            <button type="button" id="water-seed-btn" class="w-full flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-sky-600 hover:bg-sky-500 active:scale-[0.98] text-white text-sm font-semibold transition-all shadow-md cursor-pointer whitespace-nowrap">
              <svg class="w-4 h-4 fill-sky-200 text-sky-100" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/></svg>
              <span>為種子澆水 (${3-t} 次後盛開)</span>
            </button>
          `}
        </div>

        <p class="text-xs text-stone-500 leading-relaxed">
          💧 每次澆水代表給自己一次溫和的深呼吸。三次灌溉後花朵將盛開，並賦予你專屬的心靈小卡。
        </p>
      </div>
    `,o?document.getElementById(`open-card-modal-btn`).addEventListener(`click`,T):document.getElementById(`water-seed-btn`).addEventListener(`click`,p);else{h.innerHTML=`
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
    `;let e=document.getElementById(`worry-text`),t=document.getElementById(`plant-worry-submit`),a=document.getElementById(`worry-char-count`);e.addEventListener(`input`,()=>{a.textContent=`${e.value.length}/50`,t.disabled=!e.value.trim()}),document.getElementById(`plant-worry-form`).addEventListener(`submit`,t=>{t.preventDefault();let a=e.value.trim();a&&(i.playPlant(),s.seed_state={text:a.slice(0,50),stage:0,unlocked_card:!1,scratched:!1,encouragement:r[Math.floor(Math.random()*r.length)],healing_quote:n[Math.floor(Math.random()*n.length)]},l(),f(),u(`已將煩惱深埋入土壤，轉化為心靈養分`))})}}function p(){if(s.seed_state.stage>=3)return;i.playWater();let e=document.createElement(`div`);e.className=`absolute inset-0 pointer-events-none flex items-center justify-center z-20 animate-water-drop`,e.innerHTML=`
    <div class="flex gap-4">
      <span class="w-2.5 h-3.5 bg-sky-400 rounded-full blur-[0.5px] opacity-90"></span>
      <span class="w-3 h-4 bg-sky-500 rounded-full blur-[0.5px] opacity-90 -mt-2"></span>
      <span class="w-2 h-3 bg-sky-400 rounded-full blur-[0.5px] opacity-90 mt-1"></span>
    </div>
  `,document.getElementById(`garden-plant-box`).appendChild(e),setTimeout(()=>e.remove(),700),s.seed_state.stage+=1,s.seed_state.stage===3&&setTimeout(()=>i.playBloom(),350),l(),f()}function m(){let e=s.today_tasks.length>0,t=document.getElementById(`blind-box-status`),n=document.getElementById(`blind-box-cards-grid`),r=s.today_tasks.filter(e=>e.completed).length;e?t.innerHTML=`
      <div class="flex items-center gap-2 text-xs font-semibold px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/70">
        <svg class="w-3.5 h-3.5 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z"/></svg>
        <span>今日冒險已領取 (${r}/${s.today_tasks.length} 完成)</span>
      </div>
    `:(t.innerHTML=`
      <button type="button" id="draw-all-cards-btn" class="flex items-center gap-2 px-5 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold shadow-sm transition-all cursor-pointer whitespace-nowrap">
        <svg class="w-3.5 h-3.5 text-amber-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z"/></svg>
        <span>翻開全部卡牌</span>
      </button>
    `,document.getElementById(`draw-all-cards-btn`).addEventListener(`click`,h));let i=``;for(let t=0;t<3;t++){let n=s.today_tasks[t],r=e,a=n?n.category:`心靈`,o=`text-purple-700 bg-purple-100/70`,c=`from-purple-50/50 to-white`,l=`border-purple-200/80`;a===`健康`?(o=`text-emerald-700 bg-emerald-100/70`,c=`from-emerald-50/50 to-white`,l=`border-emerald-200/80`):a===`探索`?(o=`text-blue-700 bg-blue-100/70`,c=`from-blue-50/50 to-white`,l=`border-blue-200/80`):a===`成長`&&(o=`text-orange-700 bg-orange-100/70`,c=`from-orange-50/50 to-white`,l=`border-orange-200/80`),i+=`
      <div data-index="${t}" class="blind-box-card-item relative h-64 sm:h-72 w-full transition-transform duration-700 preserve-3d cursor-pointer ${e?``:t===0?`animate-gentle-float`:t===1?`animate-gentle-float-delayed`:`animate-gentle-float-slow`} ${r?`rotate-y-180`:``}">
        <!-- 卡牌背面 (未翻開) -->
        <div class="absolute inset-0 w-full h-full rounded-2xl bg-gradient-to-br from-stone-800 via-stone-900 to-amber-950 p-6 flex flex-col items-center justify-between text-center backface-hidden shadow-md border-2 border-amber-600/30 hover:border-amber-500/60 transition-colors">
          <div class="text-stone-400 text-[11px] tracking-widest font-mono">CARD NO. ${t+1}</div>
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
        <div class="absolute inset-0 w-full h-full rounded-2xl bg-gradient-to-b ${c} p-5 flex flex-col justify-between backface-hidden rotate-y-180 shadow-md border ${l}">
          <div class="flex items-center justify-between">
            <span class="text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${o}">${a}</span>
            <span class="text-[11px] font-mono text-stone-400">#${t+1}</span>
          </div>

          <div class="my-auto py-2">
            <p class="text-sm sm:text-base font-semibold leading-snug ${n?.completed?`line-through text-stone-400`:`text-stone-800`}">
              ${n?n.text:`載入中...`}
            </p>
          </div>

          ${n?`
            <button type="button" data-task-id="${n.id}" class="toggle-task-btn w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-medium transition-all cursor-pointer ${n.completed?`bg-emerald-100 text-emerald-800`:`bg-white hover:bg-stone-100 text-stone-700 border border-stone-200 shadow-xs`}">
              ${n.completed?`
                <svg class="w-4 h-4 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                <span>已完成此任務</span>
              `:`
                <svg class="w-4 h-4 text-stone-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/></svg>
                <span>標記為完成</span>
              `}
            </button>
          `:``}
        </div>
      </div>
    `}n.innerHTML=i,document.querySelectorAll(`.blind-box-card-item`).forEach(t=>{t.addEventListener(`click`,t=>{t.target.closest(`.toggle-task-btn`)||e||h()})}),document.querySelectorAll(`.toggle-task-btn`).forEach(e=>{e.addEventListener(`click`,t=>{t.stopPropagation(),g(e.getAttribute(`data-task-id`))})})}function h(){if(s.today_tasks.length>0)return;i.playFlip();let e=[`心靈`,`健康`,`探索`,`成長`].sort(()=>Math.random()-.5).slice(0,3).map((e,n)=>{let r=t[e],i=r[Math.floor(Math.random()*r.length)];return{id:`${Date.now()}_${n}_${Math.random().toString(36).substring(2,6)}`,category:e,text:i,completed:!1}});s.today_tasks=e,l(),m(),_(),u(`已揭曉今日 3 個微冒險卡牌！`)}function g(e){let t=s.today_tasks.find(t=>t.id===e);t&&(t.completed=!t.completed,t.completed&&i.playCheck(),l(),m(),_())}function _(){let e=document.getElementById(`task-list-items`),t=document.getElementById(`replace-cards-btn`),n=document.getElementById(`task-summary-count`),r=s.today_tasks.length;if(n.textContent=`${s.today_tasks.filter(e=>e.completed).length}/${r} 完成`,s.replaced_card_count<1&&r>0?(t.disabled=!1,t.className=`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100`,t.innerHTML=`
      <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/></svg>
      <span>更換卡牌 (剩餘 1 次)</span>
    `):(t.disabled=!0,t.className=`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-not-allowed whitespace-nowrap bg-stone-100 text-stone-400 border border-stone-200/70 opacity-70`,t.innerHTML=`
      <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/></svg>
      <span>更換卡牌 (今日已用)</span>
    `),r===0){e.innerHTML=`
      <div class="py-12 text-center text-stone-400">
        <p class="text-sm font-medium text-stone-500 mb-1">今日尚未抽卡</p>
        <p class="text-xs">請點擊上方的 3D 盲盒翻開今日卡牌，或點擊「新增自訂任務」開始。</p>
      </div>
    `;return}let i=``;s.today_tasks.forEach(e=>{let t=`text-purple-700 bg-purple-100/70`,n=`bg-purple-50 text-purple-700 border-purple-200`;e.category===`健康`?(t=`text-emerald-700 bg-emerald-100/70`,n=`bg-emerald-50 text-emerald-700 border-emerald-200`):e.category===`探索`?(t=`text-blue-700 bg-blue-100/70`,n=`bg-blue-50 text-blue-700 border-blue-200`):e.category===`成長`&&(t=`text-orange-700 bg-orange-100/70`,n=`bg-orange-50 text-orange-700 border-orange-200`),i+=`
      <div data-task-id="${e.id}" class="task-row-item group flex items-center justify-between p-4 rounded-2xl border transition-all cursor-pointer select-none ${e.completed?`bg-stone-50/70 border-stone-200/50 opacity-75`:`bg-white hover:bg-stone-50/50 border-stone-200 shadow-xs hover:border-stone-300`}">
        <div class="flex items-center gap-3.5 min-w-0 pr-3">
          <div class="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border ${n}">
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
          </div>
          <div class="min-w-0">
            <div class="flex items-center gap-2 mb-0.5">
              <span class="text-[11px] font-semibold px-2 py-0.2 rounded-md ${t}">${e.category}</span>
            </div>
            <p class="text-sm font-medium ${e.completed?`line-through text-stone-400`:`text-stone-800`}">${e.text}</p>
          </div>
        </div>
        <div class="shrink-0 pl-2">
          ${e.completed?`
            <div class="flex items-center gap-1.5 text-xs text-emerald-600 font-medium">
              <span class="hidden sm:inline text-[11px]">已完成</span>
              <svg class="w-5 h-5 text-emerald-600 fill-emerald-100" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            </div>
          `:`
            <svg class="w-5 h-5 text-stone-300 group-hover:text-stone-400 transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/></svg>
          `}
        </div>
      </div>
    `}),e.innerHTML=i,document.querySelectorAll(`.task-row-item`).forEach(e=>{e.addEventListener(`click`,()=>{g(e.getAttribute(`data-task-id`))})})}function v(){if(s.replaced_card_count>=1)return;let e=s.today_tasks.filter(e=>!e.completed);e.length===0?u(`所有任務均已完成，無需更換！`):(i.playFlip(),s.today_tasks=s.today_tasks.map(e=>{if(e.completed)return e;let n=t[e.category],r=n.filter(t=>t!==e.text),i=r.length>0?r[Math.floor(Math.random()*r.length)]:n[0];return{...e,id:`${Date.now()}_${Math.random().toString(36).substring(2,6)}`,text:i}}),s.replaced_card_count+=1,l(),m(),_(),u(`已隨機為您更換 ${e.length} 個未完成的微任務！`))}var y=null,b=null,x=!1,S=!1;function C(){if(y=document.getElementById(`scratch-card-canvas`),!y)return;b=y.getContext(`2d`),S=s.seed_state.scratched;let e=document.getElementById(`scratch-card-container`).clientWidth||340;if(y.width=e*window.devicePixelRatio,y.height=120*window.devicePixelRatio,y.style.width=`${e}px`,y.style.height=`120px`,b.scale(window.devicePixelRatio,window.devicePixelRatio),S){y.style.display=`none`,document.getElementById(`scratch-status-text`).innerHTML=`
      <span class="text-emerald-600 font-medium">✓ 已揭曉明日祝福</span>
    `;return}y.style.display=`block`;let t=b.createLinearGradient(0,0,e,120);t.addColorStop(0,`#CBD5E1`),t.addColorStop(.3,`#E2E8F0`),t.addColorStop(.5,`#F8FAFC`),t.addColorStop(.7,`#E2E8F0`),t.addColorStop(1,`#94A3B8`),b.fillStyle=t,b.fillRect(0,0,e,120),b.fillStyle=`rgba(100, 116, 139, 0.15)`;for(let t=12;t<e;t+=20)for(let e=12;e<120;e+=20)b.beginPath(),b.arc(t,e,1.5,0,Math.PI*2),b.fill();b.fillStyle=`#475569`,b.font=`600 13px system-ui, sans-serif`,b.textAlign=`center`,b.textBaseline=`middle`,b.fillText(`✨ 用手指或滑鼠刮開銀色塗層 ✨`,e/2,52),b.fillStyle=`#64748B`,b.font=`400 11px system-ui, sans-serif`,b.fillText(`揭曉明日專屬的溫柔祝福`,e/2,74);let n=null,r=(e,t)=>{if(S)return;let r=y.getBoundingClientRect(),a=e-r.left,o=t-r.top;b.globalCompositeOperation=`destination-out`,b.lineCap=`round`,b.lineJoin=`round`,b.lineWidth=36,b.beginPath(),n?(b.moveTo(n.x,n.y),b.lineTo(a,o),b.stroke()):(b.arc(a,o,18,0,Math.PI*2),b.fill()),n={x:a,y:o},i.playScratch()},a=()=>{if(!S)try{let e=b.getImageData(0,0,y.width,y.height).data,t=0;for(let n=3;n<e.length;n+=128)e[n]<128&&t++;let n=e.length/128,r=Math.min(100,Math.round(t/n*100));document.getElementById(`scratch-percent-indicator`).textContent=`已刮開 ${r}%`,r>=45&&w()}catch{}};y.onpointerdown=e=>{x=!0,n=null,r(e.clientX,e.clientY)},y.onpointermove=e=>{x&&r(e.clientX,e.clientY)};let o=()=>{x&&(x=!1,n=null,a())};y.onpointerup=o,y.onpointerleave=o}function w(){S=!0,s.seed_state.scratched=!0,l(),i.playBloom(),y&&(y.style.display=`none`),document.getElementById(`scratch-status-text`).innerHTML=`
    <span class="text-emerald-600 font-medium">✓ 已揭曉明日祝福</span>
  `}function T(){let e=document.getElementById(`healing-modal`);e&&(document.getElementById(`modal-worry-quote`).textContent=s.seed_state.text||`今天的微小煩惱`,document.getElementById(`modal-healing-quote`).textContent=s.seed_state.healing_quote||n[0],document.getElementById(`modal-encouragement-text`).textContent=s.seed_state.encouragement||r[0],e.classList.remove(`hidden`),e.classList.add(`flex`),setTimeout(()=>{C()},50))}function E(){let e=document.getElementById(`healing-modal`);e&&(e.classList.add(`hidden`),e.classList.remove(`flex`))}document.addEventListener(`DOMContentLoaded`,()=>{c(),document.getElementById(`sound-toggle-btn`).addEventListener(`click`,()=>{s.sound_enabled=!s.sound_enabled,i.setEnabled(s.sound_enabled),s.sound_enabled&&i.playCheck(),l(),d()}),document.getElementById(`reset-day-btn`).addEventListener(`click`,()=>{s=o(a(),s.sound_enabled),l(),f(),m(),_(),u(`✨ 已重新開始：花園狀態與今日任務已回歸全新開始！`)}),document.getElementById(`replace-cards-btn`).addEventListener(`click`,v),document.getElementById(`garden-plant-box`).addEventListener(`click`,()=>{s.seed_state.stage>=3&&T()}),document.getElementById(`close-modal-btn`).addEventListener(`click`,E),document.getElementById(`modal-back-btn`).addEventListener(`click`,E),document.getElementById(`quick-reveal-btn`).addEventListener(`click`,w);let e=document.getElementById(`add-task-modal`),t=`心靈`;document.getElementById(`open-add-task-btn`).addEventListener(`click`,()=>{e.classList.remove(`hidden`),e.classList.add(`flex`)}),document.getElementById(`cancel-add-task-btn`).addEventListener(`click`,()=>{e.classList.add(`hidden`),e.classList.remove(`flex`)}),document.querySelectorAll(`.cat-select-btn`).forEach(e=>{e.addEventListener(`click`,()=>{document.querySelectorAll(`.cat-select-btn`).forEach(e=>{e.className=`cat-select-btn py-2 px-1 rounded-xl text-xs font-semibold border transition-all cursor-pointer text-center bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100`}),t=e.getAttribute(`data-cat`),e.className=`cat-select-btn py-2 px-1 rounded-xl text-xs font-semibold border transition-all cursor-pointer text-center bg-stone-900 border-stone-900 text-white shadow-xs`})}),document.getElementById(`add-task-form`).addEventListener(`submit`,n=>{n.preventDefault();let r=document.getElementById(`custom-task-input`),a=r.value.trim();a&&(i.playCheck(),s.today_tasks.push({id:`${Date.now()}_custom_${Math.random().toString(36).substring(2,6)}`,category:t,text:a.slice(0,40),completed:!1}),l(),r.value=``,e.classList.add(`hidden`),e.classList.remove(`flex`),m(),_(),u(`已新增今日自訂微目標！`))}),d(),f(),m(),_(),setInterval(()=>{let e=a();s.last_drawn_date!==e&&(c(),f(),m(),_(),u(`新的一天開始了！心靈花園與冒險任務已為您清空歸零。`))},3e4)});