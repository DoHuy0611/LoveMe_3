import {
    db,
    ref,
    set,
    push,
    onValue,
    update,
    remove
}
from "./firebase.js";


/* =====================================================================
   LOVE STORY — Sang & Nguyệt — script.js
   Refactor 2026 — module pattern, tách rõ DOM / Events / Animation / Utils
===================================================================== */
"use strict";

/* =========================================================
   UTILS
========================================================= */
const Utils = {
  qs: (sel, ctx = document) => ctx.querySelector(sel),
  qsa: (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel)),

  pad2(n){ return n < 10 ? `0${n}` : String(n); },

  onReady(fn){
    if (document.readyState !== "loading") fn();
    else document.addEventListener("DOMContentLoaded", fn);
  },

  debounce(fn, wait = 150){
    let t;
    return (...args) => {
      clearTimeout(t);
      t = setTimeout(() => fn(...args), wait);
    };
  },

  clamp(n, min, max){ return Math.min(Math.max(n, min), max); }
};

/* =========================================================
   TOAST — thông báo nổi
========================================================= */
const Toast = (() => {
  let el;
  function ensure(){
    if (el) return el;
    el = document.createElement("div");
    el.className = "toast";
    el.setAttribute("role", "status");
    document.body.appendChild(el);
    return el;
  }
  function show(msg, duration = 2600){
    const node = ensure();
    node.textContent = msg;
    node.classList.add("is-show");
    clearTimeout(node._t);
    node._t = setTimeout(() => node.classList.remove("is-show"), duration);
  }
  return { show };
})();

/* =========================================================
   NAVIGATION — menu mobile + scroll state + smooth scroll
========================================================= */
const Nav = {
  init(){
    this.nav = Utils.qs(".site-nav");
    this.toggle = Utils.qs(".nav-toggle");
    this.menu = Utils.qs(".nav-menu");
    if (!this.nav) return;

    this.bindScroll();
    this.bindToggle();
    this.bindSmoothScroll();
    this.bindActiveLink();
  },

  bindScroll(){
    const onScroll = () => this.nav.classList.toggle("is-scrolled", window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  },

  bindToggle(){
    if (!this.toggle || !this.menu) return;
    this.toggle.addEventListener("click", () => {
      const isOpen = this.menu.classList.toggle("is-open");
      this.toggle.setAttribute("aria-expanded", String(isOpen));
      document.body.style.overflow = isOpen ? "hidden" : "";
    });
    Utils.qsa("a", this.menu).forEach(a => a.addEventListener("click", () => {
      this.menu.classList.remove("is-open");
      this.toggle.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    }));
  },

  bindSmoothScroll(){
    Utils.qsa('a[href^="#"]').forEach(a => {
      a.addEventListener("click", e => {
        const id = a.getAttribute("href");
        if (id.length < 2) return;
        const target = Utils.qs(id);
        if (!target) return;
        e.preventDefault();
        const y = target.getBoundingClientRect().top + window.scrollY - 72;
        window.scrollTo({ top: y, behavior: "smooth" });
      });
    });
  },

  bindActiveLink(){
    const links = Utils.qsa(".nav-menu a[href^='#']");
    const sections = links
      .map(a => Utils.qs(a.getAttribute("href")))
      .filter(Boolean);
    if (!("IntersectionObserver" in window) || !sections.length) return;

    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const id = `#${entry.target.id}`;
        links.forEach(a => a.classList.toggle("is-active", a.getAttribute("href") === id));
      });
    }, { rootMargin: "-45% 0px -50% 0px" });

    sections.forEach(s => obs.observe(s));
  }
};

/* =========================================================
   REVEAL ON SCROLL — fade/slide-in cho các block .reveal
========================================================= */
const Reveal = {
  init(){
    const items = Utils.qsa(".reveal");
    if (!items.length) return;

    if (!("IntersectionObserver" in window)) {
      items.forEach(el => el.classList.add("is-visible"));
      return;
    }
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -60px 0px" });

    items.forEach((el, i) => {
      el.style.transitionDelay = `${Math.min(i % 6, 5) * 70}ms`;
      obs.observe(el);
    });
  }
};

/* =========================================================
   LOVE COUNTER — đếm ngày/giờ/phút/giây yêu nhau
========================================================= */
const LoveCounter = {
  startDate: new Date("2025-04-20T00:00:00"),

  init(){
    this.els = {
      days: Utils.qs("#days"),
      hours: Utils.qs("#hours"),
      minutes: Utils.qs("#minutes"),
      seconds: Utils.qs("#seconds")
    };
    if (!this.els.days) return;
    this.tick();
    this._interval = setInterval(() => this.tick(), 1000);
  },

  tick(){
    const now = new Date();
    let diff = Math.max(0, now - this.startDate);

    const totalSeconds = Math.floor(diff / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (this.els.days) this.els.days.textContent = days;
    if (this.els.hours) this.els.hours.textContent = Utils.pad2(hours);
    if (this.els.minutes) this.els.minutes.textContent = Utils.pad2(minutes);
    if (this.els.seconds) this.els.seconds.textContent = Utils.pad2(seconds);
  }
};

/* =========================================================
   FOOTER DAYS COUNTER — số ngày lớn ở footer, có hiệu ứng đếm
========================================================= */
const FooterCounter = {
  startDate: new Date("2025-04-20T00:00:00"),

  init(){
    this.el = Utils.qs("#total-days");
    if (!this.el) return;
    this.animateTo(this.daysTogether());
  },

  daysTogether(){
    const diff = Date.now() - this.startDate.getTime();
    return Math.max(0, Math.floor(diff / 86400000));
  },

  animateTo(target){
    const duration = 1200;
    const start = performance.now();
    const step = (now) => {
      const progress = Utils.clamp((now - start) / duration, 0, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      this.el.textContent = Math.round(eased * target).toLocaleString("vi-VN");
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }
};

/* =========================================================
   CAROUSEL — custom, không phụ thuộc Bootstrap
========================================================= */
class Carousel {
  constructor(root){
    this.root = root;
    this.track = Utils.qs(".carousel__track", root);
    this.slides = Utils.qsa(".carousel__slide", root);
    this.dotsWrap = Utils.qs(".carousel__dots", root);
    this.index = 0;
    this.autoplayMs = 5000;
    this.init();
  }

  init(){
    if (!this.slides.length) return;
    this.buildDots();
    this.bindControls();
    this.bindSwipe();
    this.goTo(0);
    this.startAutoplay();

    this.root.addEventListener("mouseenter", () => this.stopAutoplay());
    this.root.addEventListener("mouseleave", () => this.startAutoplay());
  }

  buildDots(){
    if (!this.dotsWrap) return;
    this.dotsWrap.innerHTML = "";
    this.slides.forEach((_, i) => {
      const dot = document.createElement("button");
      dot.className = "carousel__dot";
      dot.setAttribute("aria-label", `Xem ảnh ${i + 1}`);
      dot.addEventListener("click", () => this.goTo(i));
      this.dotsWrap.appendChild(dot);
    });
  }

  bindControls(){
    const prev = Utils.qs(".carousel__btn--prev", this.root);
    const next = Utils.qs(".carousel__btn--next", this.root);
    if (prev) prev.addEventListener("click", () => this.goTo(this.index - 1));
    if (next) next.addEventListener("click", () => this.goTo(this.index + 1));
  }

  bindSwipe(){
    let startX = 0;
    let dx = 0;
    this.track.addEventListener("touchstart", e => {
      startX = e.touches[0].clientX;
      this.stopAutoplay();
    }, { passive: true });
    this.track.addEventListener("touchmove", e => {
      dx = e.touches[0].clientX - startX;
    }, { passive: true });
    this.track.addEventListener("touchend", () => {
      if (Math.abs(dx) > 40) this.goTo(this.index + (dx < 0 ? 1 : -1));
      dx = 0;
      this.startAutoplay();
    });
  }

  goTo(i){
    this.index = (i + this.slides.length) % this.slides.length;
    this.track.style.transform = `translateX(-${this.index * 100}%)`;
    if (this.dotsWrap) {
      Utils.qsa(".carousel__dot", this.dotsWrap).forEach((d, idx) =>
        d.classList.toggle("is-active", idx === this.index));
    }
  }

  startAutoplay(){
    this.stopAutoplay();
    this._timer = setInterval(() => this.goTo(this.index + 1), this.autoplayMs);
  }
  stopAutoplay(){ clearInterval(this._timer); }
}

const CarouselModule = {
  init(){
    Utils.qsa(".carousel").forEach(el => new Carousel(el));
  }
};

/* =========================================================
   MEMORY GALLERY — Vườn kỷ niệm: filter + phân trang + lightbox
========================================================= */
const MemoryGallery = {
  PER_PAGE: 12,
  page: 1,
  filter: "all",
  all: [],
  filtered: [],

  init(){
    this.root = Utils.qs("#memoryGallery");
    if (!this.root) return;

    this.buildData();
    this.filtered = [...this.all];
    this.bindFilters();
    this.bindPager();
    this.render();
  },

  // Dữ liệu ảnh — có thể thay bằng fetch JSON trong tương lai
  buildData(){
    const months8 = Array.from(
      { length: 30 },
      (_, i) => i + 1
    ).filter(n => n !== 7 && n !== 28); // giữ đúng danh sách ảnh có thật

    this.all = months8.map(n => ({
      url: `image/8m${n}.jpg`,
      title: "Kỷ niệm bên nhau 8 tháng",
      date: "21/12/2025",
      category: "tamthang"
    }));
  },

  bindFilters(){
    Utils.qsa(".chip[data-filter]").forEach(btn => {
      btn.addEventListener("click", () => {
        this.filter = btn.dataset.filter;
        Utils.qsa(".chip[data-filter]").forEach(b => b.classList.toggle("is-active", b === btn));
        this.filtered = this.filter === "all"
          ? [...this.all]
          : this.all.filter(m => m.category === this.filter);
        this.page = 1;
        this.render();
      });
    });
  },

  bindPager(){
    this.prevBtn = Utils.qs("#prevPage");
    this.nextBtn = Utils.qs("#nextPage");
    if (this.prevBtn) this.prevBtn.addEventListener("click", () => this.goPage(this.page - 1));
    if (this.nextBtn) this.nextBtn.addEventListener("click", () => this.goPage(this.page + 1));
  },

  totalPages(){
    return Math.max(1, Math.ceil(this.filtered.length / this.PER_PAGE));
  },

  goPage(p){
    this.page = Utils.clamp(p, 1, this.totalPages());
    this.render();
  },

  render(){
    const total = this.totalPages();
    const start = (this.page - 1) * this.PER_PAGE;
    const items = this.filtered.slice(start, start + this.PER_PAGE);

    this.root.innerHTML = "";

    if (!items.length) {
      this.root.innerHTML = `<p class="gallery-empty">Chưa có ảnh trong danh mục này.</p>`;
    } else {
      items.forEach((m, i) => {
        const card = document.createElement("div");
        card.className = "mem-card";
        card.style.animationDelay = `${i * 40}ms`;
        card.innerHTML = `
          <img src="${m.url}" alt="${m.title}" loading="lazy"
               onerror="this.onerror=null;this.src='https://via.placeholder.com/400x500/FDF2F8/C9748A?text=Kỷ+Niệm';">
          <span class="mem-card__tag">${m.date}</span>
        `;
        card.addEventListener("click", () => Lightbox.open(m));
        this.root.appendChild(card);
      });
    }

    this.updatePager(total);
    this.updateStats();
  },

  updatePager(total){
    const cur = Utils.qs("#currentPageNum");
    const tot = Utils.qs("#totalPagesNum");
    if (cur) cur.textContent = this.page;
    if (tot) tot.textContent = total;
    if (this.prevBtn) this.prevBtn.disabled = this.page <= 1;
    if (this.nextBtn) this.nextBtn.disabled = this.page >= total;
  },

  updateStats(){
    const totalEl = Utils.qs("#totalPhotos");
    const visEl = Utils.qs("#visiblePhotos");
    const catEl = Utils.qs("#filteredCategory");
    const names = { all: "Tất cả", tamthang: "8 Tháng", travel: "Du lịch", special: "Đặc biệt" };
    if (totalEl) totalEl.textContent = this.all.length;
    if (visEl) visEl.textContent = this.filtered.length;
    if (catEl) catEl.textContent = names[this.filter] || "Tất cả";
  }
};

/* =========================================================
   LIGHTBOX — xem ảnh phóng to
========================================================= */
const Lightbox = {
  init(){
    this.root = document.createElement("div");
    this.root.className = "lightbox";
    this.root.innerHTML = `
      <button class="icon-btn lightbox__close" aria-label="Đóng">&times;</button>
      <div class="lightbox__inner">
        <img alt="">
        <p class="lightbox__caption"></p>
      </div>
    `;
    document.body.appendChild(this.root);

    Utils.qs(".lightbox__close", this.root).addEventListener("click", () => this.close());
    this.root.addEventListener("click", e => { if (e.target === this.root) this.close(); });
    document.addEventListener("keydown", e => {
      if (e.key === "Escape" && this.root.classList.contains("is-open")) this.close();
    });
  },

  open(memory){
    Utils.qs("img", this.root).src = memory.url;
    Utils.qs("img", this.root).alt = memory.title;
    Utils.qs(".lightbox__caption", this.root).textContent = `${memory.title} · ${memory.date}`;
    this.root.classList.add("is-open");
    document.body.style.overflow = "hidden";
  },

  close(){
    this.root.classList.remove("is-open");
    document.body.style.overflow = "";
  }
};

/* =========================================================
   CALENDAR — lịch kỷ niệm, lưu localStorage
========================================================= */
const LoveCalendar = {
  STORAGE_KEY: "love_calendar_events_v2",
  state: { month: new Date().getMonth(), year: new Date().getFullYear() },
  events: {},

  MONTHS: [
    "Tháng 1","Tháng 2","Tháng 3","Tháng 4","Tháng 5","Tháng 6",
    "Tháng 7","Tháng 8","Tháng 9","Tháng 10","Tháng 11","Tháng 12"
  ],

  init(){
    this.grid = Utils.qs("#calendarGrid");
    if (!this.grid) return;

    this.titleEl = Utils.qs("#calendarTitle");
    this.statusEl = Utils.qs("#calendarStatus");
    this.loadEvents();
    this.bindNav();
    this.bindTools();
    this.render();
  },

  loadEvents(){
    try {
      this.events = JSON.parse(localStorage.getItem(this.STORAGE_KEY)) || {};
      this.setStatus(`Đã tải ${Object.keys(this.events).length} sự kiện`);
    } catch {
      this.events = {};
      this.setStatus("Không thể đọc dữ liệu đã lưu");
    }
  },

  saveEvents(){
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.events));
      return true;
    } catch {
      return false;
    }
  },

  setStatus(text){ if (this.statusEl) this.statusEl.textContent = text; },

  bindNav(){
    const prev = Utils.qs("#calPrev");
    const next = Utils.qs("#calNext");
    if (prev) prev.addEventListener("click", () => this.changeMonth(-1));
    if (next) next.addEventListener("click", () => this.changeMonth(1));
  },

  bindTools(){
    const exportBtn = Utils.qs("#calExport");
    const clearBtn = Utils.qs("#calViewAll");
    if (exportBtn) exportBtn.addEventListener("click", () => this.exportData());
    if (clearBtn) clearBtn.addEventListener("click", () => this.showAllEvents());
  },

  changeMonth(delta){
    let { month, year } = this.state;
    month += delta;
    if (month < 0) { month = 11; year--; }
    if (month > 11) { month = 0; year++; }
    this.state = { month, year };
    this.render();
  },

  dateKey(day){
    const m = Utils.pad2(this.state.month + 1);
    const d = Utils.pad2(day);
    return `${this.state.year}-${m}-${d}`;
  },

  render(){
    const { month, year } = this.state;
    if (this.titleEl) this.titleEl.textContent = `${this.MONTHS[month]}, ${year}`;

    this.grid.innerHTML = "";
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let i = 0; i < firstDay; i++) {
      const empty = document.createElement("div");
      empty.className = "day-cell is-empty";
      this.grid.appendChild(empty);
    }

    for (let d = 1; d <= daysInMonth; d++) {
      const key = this.dateKey(d);
      const cell = document.createElement("button");
      cell.className = "day-cell";
      cell.type = "button";
      if (this.events[key]) cell.classList.add("has-event");
      cell.innerHTML = `<span>${d}</span>${this.events[key] ? '<span class="dot"></span>' : ""}`;
      cell.title = this.events[key] || "Thêm kỷ niệm";
      cell.addEventListener("click", () => this.openPopover(cell, key, d));
      this.grid.appendChild(cell);
    }
  },

  openPopover(cell, key, day){
    Utils.qsa(".day-popover").forEach(p => p.remove());

    const pop = document.createElement("div");
    pop.className = "day-popover";
    pop.innerHTML = `
      <input type="text" maxlength="60" placeholder="Kỷ niệm ngày ${day}..." value="${this.events[key] || ""}">
      <div class="row">
        <button class="pop-save">Lưu</button>
        <button class="pop-delete">Xoá</button>
        <button class="pop-cancel">Đóng</button>
      </div>
    `;
    cell.appendChild(pop);
    const input = Utils.qs("input", pop);
    input.focus();

    Utils.qs(".pop-save", pop).addEventListener("click", (e) => {
      e.stopPropagation();
      const val = input.value.trim();
      if (!val) { Toast.show("Vui lòng nhập nội dung"); return; }
      this.events[key] = val;
      this.saveEvents();
      this.setStatus("Đã lưu kỷ niệm");
      Toast.show("Đã lưu kỷ niệm ❤");
      this.render();
    });

    Utils.qs(".pop-delete", pop).addEventListener("click", (e) => {
      e.stopPropagation();
      delete this.events[key];
      this.saveEvents();
      Toast.show("Đã xoá kỷ niệm");
      this.render();
    });

    Utils.qs(".pop-cancel", pop).addEventListener("click", (e) => {
      e.stopPropagation();
      pop.remove();
    });

    const outsideClick = (e) => {
      if (!pop.contains(e.target) && !cell.contains(e.target)) {
        pop.remove();
        document.removeEventListener("click", outsideClick);
      }
    };
    setTimeout(() => document.addEventListener("click", outsideClick), 0);
  },

  exportData(){
    const data = JSON.stringify(this.events, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `love-calendar-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    Toast.show("Đã xuất file backup");
  },

  showAllEvents(){
    const keys = Object.keys(this.events).sort();
    if (!keys.length) { Toast.show("Chưa có sự kiện nào"); return; }
    Toast.show(`Tổng cộng ${keys.length} sự kiện đã lưu`);
  }
};

/* =========================================================
   VIDEO POPUP
========================================================= */
const VideoPopup = {
  init(){
    this.popup = Utils.qs("#videoPopup");
    if (!this.popup) return;
    this.video = Utils.qs("#popupVideo", this.popup);
    this.closeBtn = Utils.qs("#closeVideoBtn", this.popup);
    this.overlay = Utils.qs(".video-popup__overlay", this.popup);

    Utils.qsa("[data-open-video]").forEach(btn => {
      btn.addEventListener("click", () => this.open(btn.dataset.openVideo));
    });

    if (this.closeBtn) this.closeBtn.addEventListener("click", () => this.close());
    if (this.overlay) this.overlay.addEventListener("click", () => this.close());
    document.addEventListener("keydown", e => {
      if (e.key === "Escape" && this.popup.classList.contains("is-open")) this.close();
    });
  },

  open(action){
    if (action === "external") {
      window.open("100Days.html", "_blank", "noopener,noreferrer");
      return;
    }
    this.popup.classList.add("is-open");
    document.body.style.overflow = "hidden";
    if (this.video) {
      this.video.currentTime = 0;
      this.video.play().catch(() => {});
    }
  },

  close(){
    this.popup.classList.remove("is-open");
    document.body.style.overflow = "";
    if (this.video) this.video.pause();
  }
};

/* =========================================================
   BACK TO TOP
========================================================= */
const BackToTop = {
  init(){
    this.btn = Utils.qs(".back-to-top");
    if (!this.btn) return;
    const onScroll = Utils.debounce(() => {
      this.btn.classList.toggle("is-visible", window.scrollY > 400);
    }, 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    this.btn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  }
};

/* =========================================================
   APP BOOTSTRAP
========================================================= */
const App = {
  init(){
    Nav.init();
    Reveal.init();
    LoveCounter.init();
    FooterCounter.init();
    CarouselModule.init();
    Lightbox.init();
    MemoryGallery.init();
    LoveCalendar.init();
    VideoPopup.init();
    BackToTop.init();
    console.log("💗 Love Story app initialized");
  }
};

Utils.onReady(() => App.init());