/* ========================================
   AI Enlightenment Journey — 交互脚本
   ======================================== */

// 全局状态
let currentSlide = 0;
let totalSlides = 0;
let isTransitioning = false;
let currentLang = 'en'; // 默认英文

// DOM 元素
const slides = document.querySelectorAll('.slide');
const progressBar = document.getElementById('progressBar');
const navDots = document.getElementById('navDots');
const slideCounter = document.getElementById('slideCounter');
const keyboardHint = document.getElementById('keyboardHint');

totalSlides = slides.length;

// ========================================
//  国际化 - 语言切换
// ========================================

function switchLang(lang) {
  if (!i18n[lang]) return;
  currentLang = lang;
  
  // 更新按钮状态
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
  
  // 更新 html lang 属性
  document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
  
  // 更新页面标题
  document.title = lang === 'zh' 
    ? 'AI 启蒙之旅 — 从零开始理解人工智能' 
    : 'AI Enlightenment — Understanding AI from Scratch';
  
  // 应用翻译
  applyTranslations(lang);

  // 时间线如有展开的详细面板，随语言切换重渲染
  if (typeof activeTimelineDetail !== 'undefined' && activeTimelineDetail) {
    renderTimelineDetail();
  }

  // 保存偏好
  try { localStorage.setItem('ai-slides-lang', lang); } catch(e) {}
}

function applyTranslations(lang) {
  const texts = i18n[lang];
  if (!texts) return;
  
  // 处理 data-i18n (textContent)
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (texts[key] !== undefined) {
      el.textContent = texts[key];
    }
  });
  
  // 处理 data-i18n-html (innerHTML — 用于包含 <strong>, <em>, <br> 等的内容)
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.getAttribute('data-i18n-html');
    if (texts[key] !== undefined) {
      el.innerHTML = texts[key];
    }
  });
}

// 初始化语言
function initLang() {
  // 检查 localStorage
  try {
    const saved = localStorage.getItem('ai-slides-lang');
    if (saved && i18n[saved]) {
      currentLang = saved;
    }
  } catch(e) {}
  
  // 应用语言
  switchLang(currentLang);
}

// ========================================
//  导航
// ========================================

function initNavDots() {
  navDots.innerHTML = '';
  for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement('button');
    dot.className = `nav-dot${i === 0 ? ' active' : ''}`;
    dot.setAttribute('aria-label', `Slide ${i + 1}`);
    dot.addEventListener('click', () => goToSlide(i));
    navDots.appendChild(dot);
  }
}

function updateProgress() {
  const progress = ((currentSlide) / (totalSlides - 1)) * 100;
  progressBar.style.width = `${progress}%`;
}

function updateNav() {
  const dots = navDots.querySelectorAll('.nav-dot');
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === currentSlide);
  });
  slideCounter.textContent = `${currentSlide + 1} / ${totalSlides}`;
  updateProgress();
}

function goToSlide(index) {
  if (isTransitioning || index === currentSlide || index < 0 || index >= totalSlides) return;
  
  isTransitioning = true;
  const direction = index > currentSlide ? 'up' : 'down';
  const prevSlide = slides[currentSlide];
  const nextSlide = slides[index];
  
  // 给旧slide添加退出动画
  const exitClass = direction === 'up' ? 'exit-up' : 'exit-down';
  prevSlide.classList.add(exitClass);
  prevSlide.classList.remove('active');
  
  setTimeout(() => {
    prevSlide.classList.remove('exit-up', 'exit-down');
    prevSlide.style.transform = '';
    nextSlide.classList.add('active');
    currentSlide = index;
    updateNav();
    triggerSlideAnimations(nextSlide);
    
    setTimeout(() => {
      isTransitioning = false;
    }, 400);
  }, 300);
}

function nextSlide() {
  if (currentSlide < totalSlides - 1) {
    goToSlide(currentSlide + 1);
  }
}

function prevSlide() {
  if (currentSlide > 0) {
    goToSlide(currentSlide - 1);
  }
}

function triggerSlideAnimations(slide) {
  const fadeUps = slide.querySelectorAll('.fade-up');
  fadeUps.forEach(el => {
    el.style.animation = 'none';
    el.offsetHeight;
    el.style.animation = '';
  });
  
  const fadeInRights = slide.querySelectorAll('.fade-in-right');
  fadeInRights.forEach(el => {
    el.style.animation = 'none';
    el.offsetHeight;
    el.style.animation = '';
  });
  
  const handDraws = slide.querySelectorAll('.hand-draw');
  handDraws.forEach(el => {
    el.style.animation = 'none';
    el.offsetHeight;
    el.style.animation = '';
  });
}

// ========================================
//  事件监听
// ========================================

document.addEventListener('keydown', (e) => {
  if (keyboardHint) keyboardHint.classList.add('hidden');
  
  switch (e.key) {
    case 'ArrowRight':
    case 'ArrowDown':
    case ' ':
    case 'PageDown':
      e.preventDefault();
      nextSlide();
      break;
    case 'ArrowLeft':
    case 'ArrowUp':
    case 'PageUp':
      e.preventDefault();
      prevSlide();
      break;
    case 'Home':
      e.preventDefault();
      goToSlide(0);
      break;
    case 'End':
      e.preventDefault();
      goToSlide(totalSlides - 1);
      break;
  }
});

// ========================================
//  视觉效果
// ========================================

function createEndingParticles() {
  const container = document.getElementById('endingParticles');
  if (!container) return;
  
  const colors = ['#5B4A8A', '#E8A87C', '#85C7DE', '#C38EC7', '#90C695'];
  
  for (let i = 0; i < 30; i++) {
    const particle = document.createElement('div');
    particle.style.cssText = `
      position: absolute;
      width: ${Math.random() * 6 + 2}px;
      height: ${Math.random() * 6 + 2}px;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      border-radius: 50%;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      opacity: ${Math.random() * 0.5 + 0.1};
      animation: particleFloat ${Math.random() * 6 + 4}s ease-in-out infinite;
      animation-delay: ${Math.random() * 4}s;
    `;
    container.appendChild(particle);
  }
}

const particleStyle = document.createElement('style');
particleStyle.textContent = `
  @keyframes particleFloat {
    0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.2; }
    25% { transform: translate(${Math.random() * 40 - 20}px, ${Math.random() * 40 - 20}px) scale(1.2); opacity: 0.5; }
    50% { transform: translate(${Math.random() * 60 - 30}px, ${Math.random() * 60 - 30}px) scale(0.8); opacity: 0.3; }
    75% { transform: translate(${Math.random() * 40 - 20}px, ${Math.random() * 40 - 20}px) scale(1.1); opacity: 0.4; }
  }
`;
document.head.appendChild(particleStyle);

function addHoverEffects() {
  const cards = document.querySelectorAll('.feature-card, .scenario-card, .practice-card, .agent-feature, .myth-card');
  
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-3px)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

function autoHideKeyboardHint() {
  setTimeout(() => {
    if (keyboardHint) keyboardHint.classList.add('hidden');
  }, 5000);
}

// ========================================
//  History 时间线交互（点击节点展开详细简介）
// ========================================

let activeTimelineDetail = null;

function initHistoryTimeline() {
  const timeline = document.getElementById('historyTimeline');
  const detailPanel = document.getElementById('historyDetail');
  const detailBody = document.getElementById('historyDetailBody');
  if (!timeline || !detailPanel || !detailBody) return;

  const items = timeline.querySelectorAll('.timeline-item');
  items.forEach(item => {
    item.setAttribute('role', 'button');
    item.setAttribute('tabindex', '0');
    item.addEventListener('click', () => showTimelineDetail(item));
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        showTimelineDetail(item);
      }
    });
  });
}

function showTimelineDetail(item) {
  const idx = item.getAttribute('data-detail');
  if (!idx) return;

  const timeline = document.getElementById('historyTimeline');
  const detailPanel = document.getElementById('historyDetail');
  const detailBody = document.getElementById('historyDetailBody');
  if (!detailPanel || !detailBody) return;

  // 同一个节点二次点击 = 收起
  if (activeTimelineDetail === idx) {
    detailPanel.hidden = true;
    detailPanel.classList.remove('is-open');
    timeline.querySelectorAll('.timeline-item.is-active').forEach(el => el.classList.remove('is-active'));
    activeTimelineDetail = null;
    return;
  }

  // 高亮当前节点
  timeline.querySelectorAll('.timeline-item.is-active').forEach(el => el.classList.remove('is-active'));
  item.classList.add('is-active');

  // 渲染内容
  activeTimelineDetail = idx;
  renderTimelineDetail();
  detailPanel.hidden = false;
  // 重触发动画
  detailPanel.classList.remove('is-open');
  void detailPanel.offsetHeight;
  detailPanel.classList.add('is-open');
}

function renderTimelineDetail() {
  const detailBody = document.getElementById('historyDetailBody');
  if (!detailBody || !activeTimelineDetail) return;
  const texts = i18n[currentLang] || {};
  const titleKey = `s2T${activeTimelineDetail}Title`;
  const yearKey = null; // 年份直接从 DOM 拿
  const detailKey = `s2T${activeTimelineDetail}Detail`;
  const item = document.querySelector(`.timeline-item[data-detail="${activeTimelineDetail}"]`);
  const year = item ? item.querySelector('.timeline-year').textContent : '';
  const title = texts[titleKey] || '';
  const detail = texts[detailKey] || '';
  detailBody.innerHTML = `
    <div class="td-head">
      <span class="td-year">${year}</span>
      <h4 class="td-title">${title}</h4>
    </div>
    <p class="td-body">${detail}</p>
  `;
}

// ========================================
//  初始化
// ========================================

function init() {
  initNavDots();
  updateNav();
  createEndingParticles();
  addHoverEffects();
  autoHideKeyboardHint();
  initLang();
  initHistoryTimeline();
  triggerSlideAnimations(slides[0]);
}

document.addEventListener('DOMContentLoaded', init);

// 暴露全局函数
window.nextSlide = nextSlide;
window.prevSlide = prevSlide;
window.goToSlide = goToSlide;
window.switchLang = switchLang;