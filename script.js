// ========================
// VIDEO POPUP FUNCTIONALITY
// ========================

// DOM Elements
const openVideoBtn1 = document.getElementById('openVideoBtn1');
const openVideoBtn2 = document.getElementById('openVideoBtn2');
const videoPopup = document.getElementById('videoPopup');
const closeVideoBtn = document.getElementById('closeVideoBtn');
const popupOverlay = document.getElementById('popupOverlay');
const videoElement = document.getElementById('myVideo');
const backToTopBtn = document.getElementById('backToTop');

// Open 3 months video popup
openVideoBtn1.addEventListener('click', () => {
  videoPopup.classList.add('show');
  document.body.style.overflow = 'hidden'; // Disable scrolling
  
  // Reset and play video
  videoElement.currentTime = 0;
  setTimeout(() => {
    videoElement.play().catch(e => console.log('Autoplay prevented:', e));
  }, 300);
});

// Open 100 days in new tab
openVideoBtn2.addEventListener('click', () => {
  window.open('100Days.html', '_blank', 'noopener,noreferrer');
});

// Close popup functions
const closePopup = () => {
  videoPopup.classList.remove('show');
  document.body.style.overflow = 'auto'; // Enable scrolling
  videoElement.pause();
  videoElement.currentTime = 0;
};

closeVideoBtn.addEventListener('click', closePopup);
popupOverlay.addEventListener('click', closePopup);

// Close popup with Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && videoPopup.classList.contains('show')) {
    closePopup();
  }
});

// ========================
// LOVE DAYS COUNTER
// ========================
function calculateLoveDays() {
  const startDate = new Date('2025-04-20');
  const currentDate = new Date();
  
  // Calculate difference in milliseconds
  const timeDifference = currentDate.getTime() - startDate.getTime();
  
  // Convert to days
  const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));
  
  return daysDifference > 0 ? daysDifference : 0;
}

function updateLoveCounter() {
  const daysTogether = calculateLoveDays();
  const daysElement = document.getElementById('total-days');
  
  // Animated counter
  let currentCount = 0;
  const increment = Math.max(1, Math.floor(daysTogether / 100));
  const duration = 1500; // ms
  const stepTime = Math.max(10, Math.floor(duration / (daysTogether / increment)));
  
  const timer = setInterval(() => {
    currentCount += increment;
    if (currentCount >= daysTogether) {
      currentCount = daysTogether;
      clearInterval(timer);
    }
    daysElement.textContent = currentCount.toLocaleString();
  }, stepTime);
}

// ========================
// BACK TO TOP FUNCTIONALITY
// ========================
function setupBackToTop() {
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      backToTopBtn.style.opacity = '1';
      backToTopBtn.style.visibility = 'visible';
      backToTopBtn.style.transform = 'translateY(0)';
    } else {
      backToTopBtn.style.opacity = '0';
      backToTopBtn.style.visibility = 'hidden';
      backToTopBtn.style.transform = 'translateY(20px)';
    }
  });
  
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// ========================
// INITIALIZE EVERYTHING
// ========================
document.addEventListener('DOMContentLoaded', () => {
  // Initialize love counter
  updateLoveCounter();
  
  // Update counter every day at midnight
  const now = new Date();
  const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
  const timeToMidnight = tomorrow.getTime() - now.getTime();
  
  setTimeout(() => {
    updateLoveCounter();
    // Update every 24 hours
    setInterval(updateLoveCounter, 24 * 60 * 60 * 1000);
  }, timeToMidnight);
  
  // Setup back to top button
  setupBackToTop();
  
  // Add click animation to video buttons
  const videoButtons = [openVideoBtn1, openVideoBtn2];
  videoButtons.forEach(button => {
    button.addEventListener('click', function() {
      this.style.transform = 'scale(0.95)';
      setTimeout(() => {
        this.style.transform = '';
      }, 200);
    });
  });
  
  // Add keyboard navigation for video popup
  videoPopup.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closePopup();
    }
  });
  
  // Focus trap for video popup
  const focusableElements = videoPopup.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  const firstFocusableElement = focusableElements[0];
  const lastFocusableElement = focusableElements[focusableElements.length - 1];
  
  document.addEventListener('keydown', (e) => {
    if (!videoPopup.classList.contains('show')) return;
    
    if (e.key === 'Tab') {
      if (e.shiftKey) {
        if (document.activeElement === firstFocusableElement) {
          lastFocusableElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastFocusableElement) {
          firstFocusableElement.focus();
          e.preventDefault();
        }
      }
    }
  });
});



// Tính số ngày yêu nhau
function calculateDaysTogether() {
    const startDate = new Date('2025-04-20');
    const currentDate = new Date();

    // Tính số mili giây chênh lệch
    const timeDifference = currentDate.getTime() - startDate.getTime();

    // Chuyển đổi từ mili giây sang ngày
    const daysTogether = Math.floor(timeDifference / (1000 * 3600 * 24));

    return daysTogether;
}

// Cập nhật số ngày lên giao diện
function updateDaysCounter() {
    const daysTogether = calculateDaysTogether();
    const daysElement = document.getElementById('total-days');

    // Hiệu ứng đếm số
    let currentCount = 0;
    const increment = Math.ceil(daysTogether / 100);
    const timer = setInterval(() => {
        currentCount += increment;
        if (currentCount >= daysTogether) {
            currentCount = daysTogether;
            clearInterval(timer);
        }
        daysElement.textContent = currentCount;
    }, 20);
}

// Xử lý popup video
function setupVideoPopup() {
    const videoPopup = document.getElementById('videoPopup');
    const closeVideoBtn = document.getElementById('closeVideoBtn');
    const videoElement = document.getElementById('myVideo');
    const openVideoBtn1 = document.getElementById('openVideoBtn1');
    const openVideoBtn2 = document.getElementById('openVideoBtn2');

    // Mở popup khi nhấn nút video 3 tháng
    openVideoBtn1.addEventListener('click', () => {
        videoPopup.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Ngăn cuộn trang nền

        // Đặt nguồn video cho kỷ niệm 3 tháng
        videoElement.src = "https://assets.mixkit.co/videos/preview/mixkit-happy-couple-looking-at-the-sunset-2134-large.mp4";
        videoElement.load();
    });

    // Mở popup khi nhấn nút video 100 ngày
    openVideoBtn2.addEventListener('click', () => {
        videoPopup.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Ngăn cuộn trang nền

        // Đặt nguồn video cho kỷ niệm 100 ngày
        videoElement.src = "https://assets.mixkit.co/videos/preview/mixkit-couple-hugging-on-a-walk-4985-large.mp4";
        videoElement.load();
    });

    // Đóng popup khi nhấn nút đóng
    closeVideoBtn.addEventListener('click', () => {
        videoPopup.style.display = 'none';
        document.body.style.overflow = 'auto';
        videoElement.pause();
    });

    // Đóng popup khi nhấn ra ngoài video
    videoPopup.addEventListener('click', (e) => {
        if (e.target === videoPopup) {
            videoPopup.style.display = 'none';
            document.body.style.overflow = 'auto';
            videoElement.pause();
        }
    });

    // Đóng popup bằng phím Esc
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && videoPopup.style.display === 'flex') {
            videoPopup.style.display = 'none';
            document.body.style.overflow = 'auto';
            videoElement.pause();
        }
    });
}

// Thêm hiệu ứng hover cho các nút
function addButtonEffects() {
    const buttons = document.querySelectorAll('.open-video-btn');

    buttons.forEach(button => {
        button.addEventListener('mouseenter', function () {
            const icon = this.querySelector('.icon');
            icon.style.transform = 'scale(1.2)';
            icon.style.transition = 'transform 0.3s ease';
        });

        button.addEventListener('mouseleave', function () {
            const icon = this.querySelector('.icon');
            icon.style.transform = 'scale(1)';
        });
    });
}

// Khởi tạo khi trang tải xong
document.addEventListener('DOMContentLoaded', () => {
    createFloatingHearts();
    updateDaysCounter();
    setupVideoPopup();
    addButtonEffects();

    // Cập nhật số ngày mỗi ngày
    setInterval(updateDaysCounter, 24 * 60 * 60 * 1000);
});


// Hiệu ứng scroll cho timeline
function initTimelineScroll() {
    const timelineItems = document.querySelectorAll('.timeline-item');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // Thêm hiệu ứng delay cho từng item
                const index = Array.from(timelineItems).indexOf(entry.target);
                entry.target.style.transitionDelay = (index * 0.2) + 's';
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
    });

    timelineItems.forEach(item => {
        observer.observe(item);
    });
}

// Hiệu ứng hover cho timeline items
function initTimelineHover() {
    const timelineContents = document.querySelectorAll('.timeline-content');

    timelineContents.forEach(content => {
        content.addEventListener('mouseenter', () => {
            const dateElement = content.querySelector('.timeline-date');
            dateElement.style.color = '#ff2d75';
        });

        content.addEventListener('mouseleave', () => {
            const dateElement = content.querySelector('.timeline-date');
            dateElement.style.color = '';
        });
    });
}

// Nút back to top
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    backToTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Hiệu ứng mở đầu
function initEntranceAnimation() {
    const timeline = document.querySelector('.timeline');
    timeline.style.opacity = '0';
    timeline.style.transform = 'translateY(50px)';

    setTimeout(() => {
        timeline.style.transition = 'all 1s ease';
        timeline.style.opacity = '1';
        timeline.style.transform = 'translateY(0)';
    }, 500);
}

// Hiệu ứng click vào timeline item
function initClickEffects() {
    const timelineItems = document.querySelectorAll('.timeline-item');

    timelineItems.forEach(item => {
        item.addEventListener('click', () => {
            const content = item.querySelector('.timeline-content');

            // Tạo hiệu ứng ripple
            const ripple = document.createElement('div');
            ripple.style.cssText = `
                        position: absolute;
                        border-radius: 50%;
                        background: rgba(255, 45, 117, 0.3);
                        transform: scale(0);
                        animation: ripple 0.6s linear;
                        pointer-events: none;
                    `;

            const rect = content.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = rect.left + rect.width / 2 - size / 2;
            const y = rect.top + rect.height / 2 - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';

            document.body.appendChild(ripple);

            // Thêm style cho ripple animation
            const style = document.createElement('style');
            style.textContent = `
                        @keyframes ripple {
                            to {
                                transform: scale(4);
                                opacity: 0;
                            }
                        }
                    `;
            document.head.appendChild(style);

            // Xóa ripple sau khi animation kết thúc
            setTimeout(() => {
                ripple.remove();
                style.remove();
            }, 600);
        });
    });
}

// Khởi tạo tất cả
document.addEventListener('DOMContentLoaded', () => {
    initTimelineScroll();
    initTimelineHover();
    initBackToTop();
    initEntranceAnimation();
    initClickEffects();

    console.log('❤️ Timeline tình yêu đã sẵn sàng!');
});

// Hiệu ứng parallax đơn giản
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const timeline = document.querySelector('.timeline');
    const rate = scrolled * -0.5;

    timeline.style.transform = `translateY(${rate * 0.1}px)`;
});




// -     ----------------------------------

/* ===========================================
   LỊCH TÌNH YÊU - ỨNG DỤNG HOÀN CHỈNH
   Tối ưu hóa & Cấu trúc lại - 09/12/2025
=========================================== */

"use strict";

// ============================
// CẤU HÌNH & BIẾN TOÀN CỤC
// ============================
const CONFIG = {
    loveDate: new Date("April 20, 2025 00:00:00").getTime(),
    calendar: {
        currentMonth: new Date().getMonth(),
        currentYear: new Date().getFullYear()
    },
    storageKey: 'love_calendar_data',
    animation: {
        bubbleCount: 15,
        bubbleMinSize: 10,
        bubbleMaxSize: 30,
        bubbleDuration: 3000
    }
};

let events = {};
let activeCalendar = false;

// ============================
// MODULE 1: BỘ ĐẾM THỜI GIAN YÊU
// ============================
const LoveCounter = {
    init() {
        this.update();
        setInterval(() => this.update(), 1000);
        console.log("❤️ Bộ đếm tình yêu đã khởi động!");
    },

    update() {
        const now = Date.now();
        const distance = now - CONFIG.loveDate;

        if (distance > 0) {
            this.displayElapsedTime(distance);
        } else {
            this.displayCountdown(Math.abs(distance));
        }
    },

    displayCountdown(timeLeft) {
        const units = this.calculateTimeUnits(timeLeft);
        this.updateDisplay({
            days: "⌛" + this.formatNumber(units.days),
            hours: this.formatNumber(units.hours),
            minutes: this.formatNumber(units.minutes),
            seconds: this.formatNumber(units.seconds)
        });
    },

    displayElapsedTime(distance) {
        const units = this.calculateTimeUnits(distance);
        this.updateDisplay({
            days: this.formatNumber(units.days),
            hours: this.formatNumber(units.hours),
            minutes: this.formatNumber(units.minutes),
            seconds: this.formatNumber(units.seconds)
        });
    },

    calculateTimeUnits(milliseconds) {
        const seconds = Math.floor(milliseconds / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        return {
            days,
            hours: hours % 24,
            minutes: minutes % 60,
            seconds: seconds % 60
        };
    },

    formatNumber(num) {
        return num < 10 ? `0${num}` : num.toString();
    },

    updateDisplay(data) {
        Object.keys(data).forEach(id => {
            const element = document.getElementById(id);
            if (element) element.textContent = data[id];
        });
    }
};

// ============================
// MODULE 2: LỊCH TÌNH YÊU (LocalStorage)
// ============================
const LoveCalendar = {
    init() {
        this.loadEvents();
        this.render();
        this.addControls();
        this.addMonthNavigation(); // <- THÊM DÒNG NÀY
        console.log("📅 Lịch tình yêu đã khởi động!");
        return true;
    },

    loadEvents() {
        try {
            const saved = localStorage.getItem(CONFIG.storageKey);
            events = saved ? JSON.parse(saved) : {};
            console.log(`📥 Đã tải ${Object.keys(events).length} sự kiện`);
            this.updateStatus('✅ Dữ liệu đã sẵn sàng');
            return events;
        } catch (error) {
            console.error('❌ Lỗi đọc dữ liệu:', error);
            events = {};
            this.updateStatus('❌ Lỗi đọc dữ liệu');
            return {};
        }
    },
    // THÊM HÀM MỚI: Xử lý nút chuyển tháng
    addMonthNavigation() {
        const prevBtn = document.querySelector('.calendar-controls button:first-child');
        const nextBtn = document.querySelector('.calendar-controls button:nth-child(2)');

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                this.changeMonth(-1);
                this.updateMonthButtons(); // Cập nhật trạng thái nút
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                this.changeMonth(1);
                this.updateMonthButtons(); // Cập nhật trạng thái nút
            });
        }

        // Cập nhật trạng thái ban đầu
        this.updateMonthButtons();
    },

    saveEvents() {
        try {
            localStorage.setItem(CONFIG.storageKey, JSON.stringify(events));
            return true;
        } catch (error) {
            console.error('❌ Lỗi lưu dữ liệu:', error);
            return false;
        }
    },

    render() {
        const calendar = document.getElementById("calendar");
        const title = document.getElementById("month-year-title");

        if (!calendar || !title) return false;

        // Xóa lịch cũ
        calendar.innerHTML = "";

        // Cập nhật tiêu đề
        const monthName = this.getMonthName(CONFIG.calendar.currentMonth);
        title.textContent = `${monthName} ${CONFIG.calendar.currentYear}`;

        // Tính toán ngày
        const firstDay = new Date(CONFIG.calendar.currentYear, CONFIG.calendar.currentMonth, 1);
        const firstDayIndex = firstDay.getDay();
        const daysInMonth = new Date(CONFIG.calendar.currentYear, CONFIG.calendar.currentMonth + 1, 0).getDate();

        // Thêm ô trống đầu tháng
        for (let i = 0; i < firstDayIndex; i++) {
            calendar.appendChild(this.createDayElement(null));
        }

        // Thêm các ngày trong tháng
        for (let day = 1; day <= daysInMonth; day++) {
            calendar.appendChild(this.createDayElement(day));
        }

        return true;
    },

    createDayElement(day) {
        const dayElement = document.createElement("div");
        dayElement.className = "day";

        if (day === null) {
            dayElement.classList.add("empty");
            return dayElement;
        }

        // Thêm số ngày
        const number = document.createElement("div");
        number.className = "day-number";
        number.textContent = day;
        dayElement.appendChild(number);

        // Thêm sự kiện nếu có
        const dateKey = this.getDateKey(day);
        if (events[dateKey]) {
            dayElement.appendChild(this.createEventElement(events[dateKey]));
        }

        // Thêm sự kiện click
        dayElement.addEventListener("click", (e) => {
            e.stopPropagation();
            this.showEditPopup(dayElement, dateKey, day);
        });

        return dayElement;
    },

    createEventElement(text) {
        const eventElement = document.createElement("div");
        eventElement.className = "event";
        eventElement.title = text;

        // Giới hạn hiển thị
        const displayText = text.length > 9 ? text.substring(0, 9) + '...' : text;
        eventElement.textContent = displayText;

        return eventElement;
    },

    showEditPopup(dayElement, dateKey, day) {
        // Xóa popup cũ nếu có
        this.removeExistingPopup();

        // Tạo popup mới
        const popup = document.createElement('div');
        popup.className = 'edit-popup';
        popup.innerHTML = this.getPopupHTML(day, events[dateKey] || '');

        // Thêm sự kiện
        this.setupPopupEvents(popup, dateKey, dayElement);

        // Hiển thị
        dayElement.appendChild(popup);
        popup.querySelector('#eventInput').focus();
    },

    getPopupHTML(day, currentText) {
        return `
            <h3>Ngày ${day}</h3>
            <input type="text" 
                   id="eventInput" 
                   placeholder="Nhập sự kiện..." 
                   maxlength="50"
                   value="${currentText}">
            <div class="char-count">${currentText.length}/50</div>
            <div class="popup-buttons">
                <button class="save-btn" data-action="save">💾 Lưu</button>
                <button class="delete-btn" data-action="delete">🗑️ Xóa</button>
                <button class="cancel-btn" data-action="cancel">❌ Đóng</button>
            </div>
        `;
    },

    setupPopupEvents(popup, dateKey, dayElement) {
        const input = popup.querySelector('#eventInput');
        const charCount = popup.querySelector('.char-count');

        // Đếm ký tự
        input.addEventListener('input', () => {
            charCount.textContent = input.value.length + '/50';
        });

        // Xử lý nút bấm
        popup.querySelectorAll('button').forEach(button => {
            button.addEventListener('click', async (e) => {
                e.stopPropagation();
                const action = button.dataset.action;

                switch (action) {
                    case 'save':
                        await this.handleSave(dateKey, input.value.trim(), popup);
                        break;
                    case 'delete':
                        await this.handleDelete(dateKey, popup);
                        break;
                    case 'cancel':
                        popup.remove();
                        break;
                }
            });
        });

        // Đóng khi click ra ngoài
        document.addEventListener('click', (e) => {
            if (!popup.contains(e.target) && !dayElement.contains(e.target)) {
                popup.remove();
            }
        }, { once: true });
    },

    async handleSave(dateKey, text, popup) {
        if (!text) {
            this.showMessage('⚠️ Vui lòng nhập nội dung!', 'warning');
            return;
        }

        events[dateKey] = text;

        if (this.saveEvents()) {
            this.showMessage('✅ Đã lưu thành công!', 'success');
            this.render();
            popup.remove();
        } else {
            this.showMessage('❌ Lỗi khi lưu!', 'error');
        }
    },

    async handleDelete(dateKey, popup) {
        if (!confirm('Bạn chắc chắn muốn xóa sự kiện này?')) return;

        delete events[dateKey];

        if (this.saveEvents()) {
            this.showMessage('🗑️ Đã xóa thành công!', 'success');
            this.render();
            popup.remove();
        } else {
            this.showMessage('❌ Lỗi khi xóa!', 'error');
        }
    },

    removeExistingPopup() {
        const existing = document.querySelector('.edit-popup');
        if (existing) existing.remove();
    },

    addControls() {
        const controls = document.querySelector('.calendar-controls');
        if (!controls) return;

        const controlsHTML = `
            <div class="sync-controls" style="margin-top: 15px; text-align: center;">
                <button id="syncBtn" style="margin-right: 10px;">🔄 Tải lại</button>
                <button id="exportBtn">📤 Export JSON</button>
                <button id="importBtn" style="margin-left: 10px;">📥 Import JSON</button> <br>

                
                <button id="viewAllBtn" style="margin-left: 10px;">📋 Xem tất cả</button>
                <div id="syncStatus" style="margin-top: 10px; font-size: 14px; color: #666;">
                    🟢 Sẵn sàng
                </div>
            </div>
        `;

        controls.insertAdjacentHTML('beforeend', controlsHTML);

        // Thêm sự kiện
        document.getElementById('syncBtn').addEventListener('click', () => this.loadEvents());
        document.getElementById('exportBtn').addEventListener('click', () => this.exportData());
        document.getElementById('importBtn').addEventListener('click', () => this.importData());
        document.getElementById('viewAllBtn').addEventListener('click', () => this.showAllEvents());
    },

    exportData() {
        const dataStr = JSON.stringify(events, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
        const link = document.createElement('a');
        link.href = dataUri;
        link.download = `love-calendar-backup-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        this.showMessage('📤 Đã xuất file backup!', 'success');
    },

    importData() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';

        input.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const imported = JSON.parse(e.target.result);
                    events = imported;
                    this.saveEvents();
                    this.render();
                    this.showMessage('📥 Đã import thành công!', 'success');
                } catch (error) {
                    this.showMessage('❌ File JSON không hợp lệ!', 'error');
                }
            };
            reader.readAsText(file);
        });

        input.click();
    },

    showAllEvents() {
        if (Object.keys(events).length === 0) {
            alert('📅 Chưa có sự kiện nào!');
            return;
        }

        let message = '📅 TẤT CẢ SỰ KIỆN:\n\n';
        const sortedDates = Object.keys(events).sort();

        sortedDates.forEach(date => {
            const [year, month, day] = date.split('-');
            message += `📌 ${day}/${month}/${year}: ${events[date]}\n`;
        });

        message += `\n📊 Tổng: ${sortedDates.length} sự kiện`;
        alert(message);
    },

    updateStatus(text) {
        const statusDiv = document.getElementById('syncStatus');
        if (!statusDiv) return;

        statusDiv.textContent = text;
        statusDiv.style.color = text.includes('✅') ? '#4CAF50' :
            text.includes('❌') ? '#f44336' : '#666';
    },

    showMessage(text, type = 'info') {
        const colors = {
            success: '#4CAF50',
            error: '#f44336',
            warning: '#FF9800',
            info: '#2196F3'
        };

        const msg = document.createElement('div');
        msg.className = 'floating-message';
        msg.textContent = text;
        msg.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${colors[type] || '#2196F3'};
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            z-index: 9999;
            animation: slideIn 0.3s ease, slideOut 0.3s ease 2.7s;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            font-size: 14px;
        `;

        document.body.appendChild(msg);

        setTimeout(() => {
            if (msg.parentNode) msg.remove();
        }, 3000);
    },

    getDateKey(day) {
        const month = String(CONFIG.calendar.currentMonth + 1).padStart(2, '0');
        const dayStr = String(day).padStart(2, '0');
        return `${CONFIG.calendar.currentYear}-${month}-${dayStr}`;
    },

    getMonthName(monthIndex) {
        const months = [
            'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4',
            'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8',
            'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'
        ];
        return months[monthIndex];
    },

    changeMonth(direction) {
        // Lưu tháng/năm cũ để kiểm tra
        const oldMonth = CONFIG.calendar.currentMonth;
        const oldYear = CONFIG.calendar.currentYear;

        // Thay đổi tháng
        CONFIG.calendar.currentMonth += direction;

        // Xử lý quay vòng năm
        if (CONFIG.calendar.currentMonth < 0) {
            CONFIG.calendar.currentMonth = 11;
            CONFIG.calendar.currentYear--;
        } else if (CONFIG.calendar.currentMonth > 11) {
            CONFIG.calendar.currentMonth = 0;
            CONFIG.calendar.currentYear++;
        }

        // Kiểm tra xem có thay đổi không
        if (oldMonth !== CONFIG.calendar.currentMonth || oldYear !== CONFIG.calendar.currentYear) {
            this.render();
            this.showMessage(`📅 Đã chuyển sang ${this.getMonthName(CONFIG.calendar.currentMonth)}`, 'info');
        }
    },

    // HÀM MỚI: Cập nhật trạng thái nút (disable nếu là tháng hiện tại)
    updateMonthButtons() {
        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();

        const prevBtn = document.querySelector('.calendar-controls button:first-child');
        const nextBtn = document.querySelector('.calendar-controls button:nth-child(2)');

        if (prevBtn) {
            // Nếu là tháng 1 năm 2025 (giới hạn đầu)
            const isMinDate = CONFIG.calendar.currentYear === 2025 && CONFIG.calendar.currentMonth === 0;
            prevBtn.disabled = isMinDate;
            prevBtn.style.opacity = isMinDate ? '0.5' : '1';
            prevBtn.title = isMinDate ? 'Không thể quay lại trước năm 2025' : 'Tháng trước';
        }

        if (nextBtn) {
            // Nếu là tháng 12 năm 2025 (giới hạn cuối - theo HTML của bạn)
            const isMaxDate = CONFIG.calendar.currentYear === 2025 && CONFIG.calendar.currentMonth === 11;
            nextBtn.disabled = isMaxDate;
            nextBtn.style.opacity = isMaxDate ? '0.5' : '1';
            nextBtn.title = isMaxDate ? 'Không thể xem sau năm 2025' : 'Tháng sau';
        }
    },
};

// ============================
// MODULE 3: HIỆU ỨNG BONG BÓNG
// ============================
const BubbleEffect = {
    init() {
        this.createBubbles();
        setInterval(() => this.createBubbles(), 10000);
        this.addStyles();
        console.log("✨ Hiệu ứng bong bóng đã khởi động!");
    },

    createBubbles() {
        const container = document.querySelector('.love-anniversary');
        if (!container) return;

        for (let i = 0; i < CONFIG.animation.bubbleCount; i++) {
            setTimeout(() => {
                const bubble = this.createBubble();
                container.appendChild(bubble);

                setTimeout(() => {
                    if (bubble.parentNode) bubble.remove();
                }, 10000);
            }, i * 300);
        }
    },

    createBubble() {
        const bubble = document.createElement('div');
        bubble.className = 'bubble';

        const size = Math.random() *
            (CONFIG.animation.bubbleMaxSize - CONFIG.animation.bubbleMinSize) +
            CONFIG.animation.bubbleMinSize;

        const duration = 3 + Math.random() * 4;

        bubble.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: floatBubble ${duration}s ease-in-out infinite,
                       bubbleOpacity ${duration}s ease-in-out infinite;
            animation-delay: ${Math.random() * 2}s;
            background: rgba(255, 107, 154, ${0.2 + Math.random() * 0.3});
            border-radius: 50%;
            position: absolute;
            pointer-events: none;
        `;

        return bubble;
    },

    addStyles() {
        if (document.querySelector('#bubble-styles')) return;

        const style = document.createElement('style');
        style.id = 'bubble-styles';
        style.textContent = `
            @keyframes bubbleOpacity {
                0%, 100% { opacity: 0.3; }
                50% { opacity: 0.8; }
            }
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
};

// ============================
// MODULE 4: UI & INTERACTION
// ============================
const UI = {
    init() {
        this.initTypedJS();
        this.initDarkMode();
        this.initScrollEffects();
        this.initSmoothScroll();
        this.initBackToTop();
        this.initFooterAnimation();
        console.log("🎨 UI đã khởi động!");
    },

    initTypedJS() {
        const typedElement = document.getElementById('typed');
        if (!typedElement) return;

        if (typeof Typed !== 'undefined') {
            new Typed(typedElement, {
                strings: ['Developer', 'Photographer', 'Designer', 'Editor', 'Technician'],
                typeSpeed: 75,
                backSpeed: 40,
                loop: true,
                showCursor: true,
                cursorChar: '|'
            });
        }
    },

    initDarkMode() {
        const toggle = document.getElementById('darkModeToggle');
        if (!toggle) return;

        const currentTheme = localStorage.getItem('theme') || 'dark-mode';
        document.body.classList.add(currentTheme);
        toggle.checked = currentTheme === 'light-mode';

        toggle.addEventListener('change', () => {
            if (toggle.checked) {
                document.body.classList.replace('dark-mode', 'light-mode');
                localStorage.setItem('theme', 'light-mode');
            } else {
                document.body.classList.replace('light-mode', 'dark-mode');
                localStorage.setItem('theme', 'dark-mode');
            }
        });
    },

    initScrollEffects() {
        const navbar = document.getElementById('mainNav');
        if (!navbar) return;

        window.addEventListener('scroll', () => {
            navbar.classList.toggle('scrolled', window.scrollY > 50);
        });
    },

    initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;

                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });
    },

    initBackToTop() {
        const button = document.getElementById('backToTop');
        if (!button) return;

        button.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    },

    initFooterAnimation() {
        const footerElements = document.querySelectorAll('.modern-footer .footer-brand, .modern-footer .footer-columns > div');
        if (footerElements.length === 0) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });

        footerElements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
            observer.observe(el);
        });
    }
};

// ============================
// KHỞI TẠO ỨNG DỤNG
// ============================
class LoveApp {
    constructor() {
        this.modules = [];
    }

    initialize() {
        console.log('🚀 Đang khởi động ứng dụng tình yêu...');

        // Kiểm tra và khởi động các module
        this.loadModule('LoveCounter', LoveCounter);
        this.loadModule('Calendar', LoveCalendar, () => document.getElementById('calendar'));
        this.loadModule('BubbleEffect', BubbleEffect, () => document.querySelector('.love-anniversary'));
        this.loadModule('UI', UI);

        // Thêm CSS động
        this.addDynamicCSS();

        console.log('✅ Ứng dụng đã sẵn sàng! ❤️');
    }

    loadModule(name, module, condition = () => true) {
        if (condition()) {
            try {
                module.init();
                this.modules.push(name);
                console.log(`✓ ${name} loaded`);
            } catch (error) {
                console.error(`✗ ${name} failed:`, error);
            }
        } else {
            console.log(`- ${name} skipped (condition not met)`);
        }
    }

    addDynamicCSS() {
        const style = document.createElement('style');
        style.textContent = `
            .edit-popup {
                position: absolute;
                top: 100%;
                left: 50%;
                transform: translateX(-50%);
                background: white;
                padding: 20px;
                border-radius: 15px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.2);
                z-index: 100;
                min-width: 250px;
                border: 2px solid #ff6b9a;
            }
            
            .edit-popup h3 {
                margin: 0 0 15px 0;
                color: #ff6b9a;
                text-align: center;
                font-size: 18px;
            }
            
            .edit-popup input {
                width: 100%;
                padding: 10px 12px;
                border: 2px solid #ffe5ee;
                border-radius: 10px;
                margin-bottom: 5px;
                font-size: 14px;
                box-sizing: border-box;
            }
            
            .edit-popup input:focus {
                outline: none;
                border-color: #ff6b9a;
            }
            
            .char-count {
                text-align: right;
                font-size: 12px;
                color: #999;
                margin-bottom: 15px;
            }
            
            .popup-buttons {
                display: flex;
                gap: 10px;
                justify-content: center;
            }
            
            .popup-buttons button {
                flex: 1;
                padding: 8px 12px;
                border: none;
                border-radius: 8px;
                cursor: pointer;
                font-weight: bold;
                font-size: 14px;
                transition: opacity 0.2s;
            }
            
            .popup-buttons button:hover {
                opacity: 0.9;
            }
            
            .save-btn { 
                background: #4CAF50; 
                color: white; 
            }
            .delete-btn { 
                background: #f44336; 
                color: white; 
            }
            .cancel-btn { 
                background: #9e9e9e; 
                color: white; 
            }
            
            .sync-controls button {
                padding: 8px 16px;
                border: none;
                border-radius: 6px;
                background: #ff6b9a;
                color: white;
                cursor: pointer;
                font-size: 14px;
                transition: background 0.2s;
            }
            
            .sync-controls button:hover {
                background: #ff4081;
            }
            
            .sync-controls button:active {
                transform: scale(0.98);
            }
        `;
        document.head.appendChild(style);
    }

    getStatus() {
        return {
            modules: this.modules,
            eventsCount: Object.keys(events).length,
            currentDate: new Date().toLocaleString('vi-VN'),
            config: CONFIG
        };
    }
}

// ============================
// KÍCH HOẠT ỨNG DỤNG
// ============================
document.addEventListener('DOMContentLoaded', () => {
    const app = new LoveApp();
    window.LoveApp = app; // Cho phép truy cập từ console
    app.initialize();

    // Log trạng thái
    setTimeout(() => {
        console.log('📊 Trạng thái ứng dụng:', app.getStatus());
    }, 1000);
});

// ============================
// UTILITY FUNCTIONS
// ============================
window.addEventListener('error', function (e) {
    console.error('❌ Global error:', e.error);
});

// Export nếu sử dụng module
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { LoveCounter, LoveCalendar, BubbleEffect, UI, LoveApp };
}


// <!-- ========================  PHẦN 14: KỈ NIỆM CUỐI NĂM 2025 =============================================================================================================================================================================================== -->
// <!-- ========================  PHẦN 14: KỈ NIỆM CUỐI NĂM 2025 =============================================================================================================================================================================================== -->
// <!-- ========================  PHẦN 14: KỈ NIỆM CUỐI NĂM 2025 =============================================================================================================================================================================================== -->
// <!-- ========================  PHẦN 14: KỈ NIỆM CUỐI NĂM 2025 =============================================================================================================================================================================================== -->

// ============================
// VƯỜN KỶ NIỆM 3D - ĐÃ FIX LỖI PHÂN TRANG HOÀN TOÀN
// ============================

// Cấu hình gallery
const GALLERY_CONFIG = {
    itemsPerPage: 12,
    showPageNumbers: false
};

// Biến toàn cục
let galleryCurrentPage = 1;
let galleryCurrentFilter = 'all';
let galleryAllMemories = [];
let galleryFilteredMemories = [];
let galleryTotalPages = 1;

// Hàm khởi tạo dữ liệu
function initGalleryData() {
    console.log('🔄 Đang khởi tạo dữ liệu gallery...');

    const galleryData = document.getElementById('galleryData');

    // Tạo dữ liệu mẫu để test
    galleryAllMemories = [
        { url: 'images/8m1.jpg', title: 'KỈ NIỆM BÊN NHAU 8 THÁNG', date: '21/12/2025', category: 'tamthang' },
        { url: 'images/8m2.jpg', title: 'KỈ NIỆM BÊN NHAU 8 THÁNG', date: '21/12/2025', category: 'tamthang' },
        { url: 'images/8m3.jpg', title: 'KỈ NIỆM BÊN NHAU 8 THÁNG', date: '21/12/2025', category: 'tamthang' },
        { url: 'images/8m4.jpg', title: 'KỈ NIỆM BÊN NHAU 8 THÁNG', date: '21/12/2025', category: 'tamthang' },
        { url: 'images/8m5.jpg', title: 'KỈ NIỆM BÊN NHAU 8 THÁNG', date: '21/12/2025', category: 'tamthang' },
        { url: 'images/8m6.jpg', title: 'KỈ NIỆM BÊN NHAU 8 THÁNG', date: '21/12/2025', category: 'tamthang' },
        { url: 'images/8m8.jpg', title: 'KỈ NIỆM BÊN NHAU 8 THÁNG', date: '21/12/2025', category: 'tamthang' },
        { url: 'images/8m9.jpg', title: 'KỈ NIỆM BÊN NHAU 8 THÁNG', date: '21/12/2025', category: 'tamthang' },
        { url: 'images/8m10.jpg', title: 'KỈ NIỆM BÊN NHAU 8 THÁNG', date: '21/12/2025', category: 'tamthang' },
        { url: 'images/8m11.jpg', title: 'KỈ NIỆM BÊN NHAU 8 THÁNG', date: '21/12/2025', category: 'tamthang' },
        { url: 'images/8m12.jpg', title: 'KỈ NIỆM BÊN NHAU 8 THÁNG', date: '21/12/2025', category: 'tamthang' },
        { url: 'images/8m13.jpg', title: 'KỈ NIỆM BÊN NHAU 8 THÁNG', date: '21/12/2025', category: 'tamthang' },
        { url: 'images/8m14.jpg', title: 'KỈ NIỆM BÊN NHAU 8 THÁNG', date: '21/12/2025', category: 'tamthang' },
        { url: 'images/8m15.jpg', title: 'KỈ NIỆM BÊN NHAU 8 THÁNG', date: '21/12/2025', category: 'tamthang' },
        { url: 'images/8m16.jpg', title: 'KỈ NIỆM BÊN NHAU 8 THÁNG', date: '21/12/2025', category: 'tamthang' },
        { url: 'images/8m17.jpg', title: 'KỈ NIỆM BÊN NHAU 8 THÁNG', date: '21/12/2025', category: 'tamthang' },
        { url: 'images/8m18.jpg', title: 'KỈ NIỆM BÊN NHAU 8 THÁNG', date: '21/12/2025', category: 'tamthang' },
        { url: 'images/8m19.jpg', title: 'KỈ NIỆM BÊN NHAU 8 THÁNG', date: '21/12/2025', category: 'tamthang' },
        { url: 'images/8m20.jpg', title: 'KỈ NIỆM BÊN NHAU 8 THÁNG', date: '21/12/2025', category: 'tamthang' },
        { url: 'images/8m21.jpg', title: 'KỈ NIỆM BÊN NHAU 8 THÁNG', date: '21/12/2025', category: 'tamthang' },
        { url: 'images/8m22.jpg', title: 'KỈ NIỆM BÊN NHAU 8 THÁNG', date: '21/12/2025', category: 'tamthang' },
        { url: 'images/8m23.jpg', title: 'KỈ NIỆM BÊN NHAU 8 THÁNG', date: '21/12/2025', category: 'tamthang' },
        { url: 'images/8m24.jpg', title: 'KỈ NIỆM BÊN NHAU 8 THÁNG', date: '21/12/2025', category: 'tamthang' },
        { url: 'images/8m25.jpg', title: 'KỈ NIỆM BÊN NHAU 8 THÁNG', date: '21/12/2025', category: 'tamthang' },
        { url: 'images/8m26.jpg', title: 'KỈ NIỆM BÊN NHAU 8 THÁNG', date: '21/12/2025', category: 'tamthang' },
        { url: 'images/8m27.jpg', title: 'KỈ NIỆM BÊN NHAU 8 THÁNG', date: '21/12/2025', category: 'tamthang' },
        { url: 'images/8m29.jpg', title: 'KỈ NIỆM BÊN NHAU 8 THÁNG', date: '21/12/2025', category: 'tamthang' },
        { url: 'images/8m30.jpg', title: 'KỈ NIỆM BÊN NHAU 8 THÁNG', date: '21/12/2025', category: 'tamthang' },
        // ----------------------------------------------------------------------------------------------------- title: 'KỈ NIỆM BÊN NHAU 8 THÁNG',




        // { url: 'images/8m9.jpg', title: 'Ngày đầu gặp gỡ', date: '21/12/2025', category: 'tamthang' },

        ...Array.from({ length: 100 }, (_, i) => ({
            //   url: `images/nt${(i % 4) + 1}.jpg`,
            //   title: `Kỷ niệm ${i + 7}`,
            //   date: `${Math.floor(Math.random() * 28) + 1}/0${Math.floor(Math.random() * 9) + 1}/2025`,
            //   category: ['tamthang', 'travel', 'special'][Math.floor(Math.random() * 3)]
        }))
    ];

    console.log(`✅ Đã tạo ${galleryAllMemories.length} ảnh mẫu`);
    galleryFilteredMemories = [...galleryAllMemories];
    calculateGalleryTotalPages();
    console.log(`📊 Tổng ${galleryAllMemories.length} ảnh, ${galleryTotalPages} trang`);
}

// Hàm tính tổng số trang
function calculateGalleryTotalPages() {
    galleryTotalPages = Math.max(1, Math.ceil(galleryFilteredMemories.length / GALLERY_CONFIG.itemsPerPage));
    console.log(`📄 Tổng trang: ${galleryTotalPages} (${galleryFilteredMemories.length} ảnh / ${GALLERY_CONFIG.itemsPerPage} mỗi trang)`);
}

// Hàm tạo card ảnh
function createGalleryPhotoCard(memory, index) {
    const card = document.createElement('div');
    card.className = 'photo-card';
    card.setAttribute('data-category', memory.category);
    card.style.animationDelay = `${index * 0.05}s`;

    const imgHTML = `
    <div class="photo-frame">
      <img src="${memory.url}" alt="${memory.title}" loading="lazy" 
           onerror="this.onerror=null; this.src='https://via.placeholder.com/400x300/12121a/ff6b9d?text=Kỷ+Niệm';">
      <div class="photo-overlay">
        <h3>${memory.title}</h3>
        <p>${memory.date}</p>
      </div>
    </div>
  `;

    card.innerHTML = imgHTML;

    card.addEventListener('click', () => openGalleryLightbox(memory));

    return card;
}

// Hàm load trang - QUAN TRỌNG: ĐÃ SỬA LỖI
function loadGalleryPage(page) {
    console.log(`📖 Đang load trang ${page}...`);

    // Validate page number
    if (page < 1) page = 1;
    if (page > galleryTotalPages) page = galleryTotalPages;

    // Cập nhật current page
    galleryCurrentPage = page;
    console.log(`📌 Đã cập nhật galleryCurrentPage = ${galleryCurrentPage}`);

    const gallery = document.getElementById('memoryGallery');
    const loading = document.getElementById('loadingIndicator');

    if (!gallery) {
        console.error('❌ Không tìm thấy gallery!');
        return;
    }

    // Hiện loading
    if (loading) loading.classList.add('active');
    gallery.style.opacity = '0.5';

    // Tính toán items cho trang
    const startIndex = (page - 1) * GALLERY_CONFIG.itemsPerPage;
    const endIndex = startIndex + GALLERY_CONFIG.itemsPerPage;
    const pageItems = galleryFilteredMemories.slice(startIndex, endIndex);

    console.log(`➡️ Trang ${page}: Ảnh ${startIndex + 1} đến ${Math.min(endIndex, galleryFilteredMemories.length)}`);
    console.log(`📸 Có ${pageItems.length} ảnh trên trang này`);

    // Render ngay lập tức
    setTimeout(() => {
        // Clear gallery
        gallery.innerHTML = '';

        // Render các ảnh
        pageItems.forEach((memory, index) => {
            const card = createGalleryPhotoCard(memory, index);
            gallery.appendChild(card);
        });

        // Nếu không có ảnh
        if (pageItems.length === 0) {
            gallery.innerHTML = `
        <div class="no-photos" style="grid-column: 1/-1; text-align: center; padding: 60px 20px;">
          <h3 style="color: #ff6b9d;">Không có ảnh nào</h3>
          <p style="color: #aaa;">Hãy chọn danh mục khác</p>
        </div>
      `;
        }

        // Ẩn loading
        if (loading) loading.classList.remove('active');
        gallery.style.opacity = '1';

        // Cập nhật pagination và stats
        updateGalleryPagination();
        updateGalleryStats();

        console.log(`✅ Đã load xong trang ${page}`);
    }, 300); // Tăng thời gian loading để thấy rõ
}

// Hàm cập nhật phân trang - QUAN TRỌNG: ĐÃ SỬA LỖI
function updateGalleryPagination() {
    const pageNumbers = document.getElementById('pageNumbers');
    const prevBtn = document.getElementById('prevPage');
    const nextBtn = document.getElementById('nextPage');
    const currentPageNum = document.getElementById('currentPageNum');
    const totalPagesNum = document.getElementById('totalPagesNum');

    console.log(`🔄 Cập nhật pagination: Trang ${galleryCurrentPage}/${galleryTotalPages}`);
    console.log(`Prev nên ${galleryCurrentPage === 1 ? 'disabled' : 'enabled'}`);
    console.log(`Next nên ${galleryCurrentPage === galleryTotalPages ? 'disabled' : 'enabled'}`);

    // Cập nhật số trang hiển thị
    if (currentPageNum) {
        currentPageNum.textContent = galleryCurrentPage;
    }

    if (totalPagesNum) {
        totalPagesNum.textContent = galleryTotalPages;
    }

    // Cập nhật nút prev/next - FIX QUAN TRỌNG
    if (prevBtn) {
        const isDisabled = galleryCurrentPage <= 1;
        prevBtn.disabled = isDisabled;
        console.log(`⬅️ Nút Prev: ${isDisabled ? 'disabled' : 'enabled'}`);
    }

    if (nextBtn) {
        const isDisabled = galleryCurrentPage >= galleryTotalPages;
        nextBtn.disabled = isDisabled;
        console.log(`➡️ Nút Next: ${isDisabled ? 'disabled' : 'enabled'}`);
    }

    // Cập nhật hiển thị số trang nếu cần
    if (GALLERY_CONFIG.showPageNumbers && pageNumbers) {
        updatePageNumbersDisplay(pageNumbers);
    }
}

// Hàm hiển thị số trang
function updatePageNumbersDisplay(pageNumbers) {
    pageNumbers.innerHTML = '';

    if (galleryTotalPages <= 1) {
        pageNumbers.innerHTML = '<span style="color: #aaa;">Trang 1/1</span>';
        return;
    }

    // Hiển thị 5 trang quanh trang hiện tại
    let startPage = Math.max(1, galleryCurrentPage - 2);
    let endPage = Math.min(galleryTotalPages, startPage + 4);

    if (endPage - startPage < 4) {
        startPage = Math.max(1, endPage - 4);
    }

    for (let i = startPage; i <= endPage; i++) {
        const pageBtn = document.createElement('button');
        pageBtn.className = `page-number ${i === galleryCurrentPage ? 'active' : ''}`;
        pageBtn.textContent = i;
        pageBtn.onclick = () => {
            console.log(`👉 Nhấn trang ${i}`);
            galleryCurrentPage = i;
            loadGalleryPage(i);
        };
        pageNumbers.appendChild(pageBtn);
    }
}

// Hàm lọc gallery
function filterGallery(category) {
    console.log(`🔍 Lọc theo danh mục: ${category}`);

    galleryCurrentFilter = category;

    // Lọc memories
    if (category === 'all') {
        galleryFilteredMemories = [...galleryAllMemories];
    } else {
        galleryFilteredMemories = galleryAllMemories.filter(m => m.category === category);
    }

    console.log(`✅ Lọc xong: ${galleryFilteredMemories.length} ảnh`);

    // Tính lại số trang
    calculateGalleryTotalPages();

    // Reset về trang 1
    galleryCurrentPage = 1;

    // Load trang 1
    loadGalleryPage(1);

    // Cập nhật nút active
    document.querySelectorAll('.control-btn').forEach(btn => {
        const filter = btn.getAttribute('data-filter');
        btn.classList.toggle('active', filter === category);
    });

    // Cập nhật thống kê
    updateGalleryStats();
}

// Hàm cập nhật thống kê
function updateGalleryStats() {
    const totalEl = document.getElementById('totalPhotos');
    const visibleEl = document.getElementById('visiblePhotos');
    const categoryEl = document.getElementById('filteredCategory');

    if (totalEl) totalEl.textContent = galleryAllMemories.length;
    if (visibleEl) visibleEl.textContent = galleryFilteredMemories.length;
    if (categoryEl) {
        const categoryText = {
            'all': 'Tất cả',
            'tamthang': '8 Tháng',
            'travel': 'Du lịch',
            'special': 'Đặc biệt'
        };
        categoryEl.textContent = categoryText[galleryCurrentFilter] || 'Tất cả';
    }
}

// Hàm setup event listeners - QUAN TRỌNG: ĐÃ SỬA LỖI
function setupGalleryEventListeners() {
    console.log('🔗 Đang thiết lập event listeners...');

    // Lọc danh mục
    document.querySelectorAll('.control-btn').forEach(button => {
        button.addEventListener('click', function () {
            const filter = this.getAttribute('data-filter');
            console.log(`🎯 Chọn danh mục: ${filter}`);
            filterGallery(filter);
        });
    });

    // Nút prev - FIX QUAN TRỌNG
    const prevBtn = document.getElementById('prevPage');
    if (prevBtn) {
        console.log('✅ Đã tìm thấy nút Prev');
        prevBtn.addEventListener('click', function () {
            console.log('⬅️ Nhấn nút Trước');
            console.log(`Trang hiện tại: ${galleryCurrentPage}, Tổng trang: ${galleryTotalPages}`);

            if (galleryCurrentPage > 1) {
                galleryCurrentPage--;
                console.log(`📌 Chuyển sang trang ${galleryCurrentPage}`);
                loadGalleryPage(galleryCurrentPage);
            } else {
                console.log('⚠️ Đã ở trang đầu, không thể nhấn Trước');
                this.style.cursor = 'not-allowed';
            }
        });
    } else {
        console.error('❌ Không tìm thấy nút Prev!');
    }

    // Nút next - FIX QUAN TRỌNG
    const nextBtn = document.getElementById('nextPage');
    if (nextBtn) {
        console.log('✅ Đã tìm thấy nút Next');
        nextBtn.addEventListener('click', function () {
            console.log('➡️ Nhấn nút Sau');
            console.log(`Trang hiện tại: ${galleryCurrentPage}, Tổng trang: ${galleryTotalPages}`);

            if (galleryCurrentPage < galleryTotalPages) {
                galleryCurrentPage++;
                console.log(`📌 Chuyển sang trang ${galleryCurrentPage}`);
                loadGalleryPage(galleryCurrentPage);
            } else {
                console.log('⚠️ Đã ở trang cuối, không thể nhấn Sau');
                this.style.cursor = 'not-allowed';
            }
        });
    } else {
        console.error('❌ Không tìm thấy nút Next!');
    }

    // Thêm phím tắt
    document.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowLeft' && galleryCurrentPage > 1) {
            galleryCurrentPage--;
            loadGalleryPage(galleryCurrentPage);
        } else if (e.key === 'ArrowRight' && galleryCurrentPage < galleryTotalPages) {
            galleryCurrentPage++;
            loadGalleryPage(galleryCurrentPage);
        }
    });

    console.log('✅ Event listeners đã sẵn sàng');
}

// Hàm mở lightbox
function openGalleryLightbox(memory) {
    console.log(`🖼️ Mở lightbox: ${memory.title}`);

    const lightbox = document.createElement('div');
    lightbox.className = 'memory-lightbox';
    lightbox.innerHTML = `
    <div class="lightbox-content">
      <button class="close-lightbox" title="Đóng">&times;</button>
      <img src="${memory.url}" alt="${memory.title}" loading="eager">
      <div class="lightbox-info">
        <h3>${memory.title}</h3>
        <p>📅 ${memory.date} | 📁 ${getGalleryCategoryName(memory.category)}</p>
        <button class="love-btn" onclick="galleryLikePhoto(this)">
          ❤️ <span>${Math.floor(Math.random() * 50)}</span>
        </button>
      </div>
    </div>
  `;

    document.body.appendChild(lightbox);
    document.body.style.overflow = 'hidden';

    setTimeout(() => lightbox.classList.add('active'), 10);

    // Đóng lightbox
    const closeBtn = lightbox.querySelector('.close-lightbox');
    closeBtn.addEventListener('click', function () {
        lightbox.classList.remove('active');
        setTimeout(() => {
            if (lightbox.parentNode) {
                document.body.removeChild(lightbox);
            }
            document.body.style.overflow = 'auto';
        }, 300);
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
            setTimeout(() => {
                if (lightbox.parentNode) {
                    document.body.removeChild(lightbox);
                }
                document.body.style.overflow = 'auto';
            }, 300);
        }
    });

    // ESC để đóng
    function escHandler(e) {
        if (e.key === 'Escape') {
            lightbox.classList.remove('active');
            setTimeout(() => {
                if (lightbox.parentNode) {
                    document.body.removeChild(lightbox);
                }
                document.body.style.overflow = 'auto';
            }, 300);
            document.removeEventListener('keydown', escHandler);
        }
    }
    document.addEventListener('keydown', escHandler);
}

// Hàm lấy tên danh mục
function getGalleryCategoryName(category) {
    const names = {
        'tamthang': '8 Tháng',
        'travel': 'Du lịch',
        'special': 'Đặc biệt',
        'all': 'Tất cả'
    };
    return names[category] || 'Khác';
}

// Hàm thích ảnh
function galleryLikePhoto(btn) {
    let count = parseInt(btn.querySelector('span').textContent) || 0;
    count++;
    btn.querySelector('span').textContent = count;
    btn.style.transform = 'scale(1.2)';
    setTimeout(() => btn.style.transform = 'scale(1)', 300);
    showGalleryNotification('❤️ Bạn đã thích bức ảnh này!');
}

// Hàm hiển thị thông báo
function showGalleryNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'memory-notification';
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => notification.classList.add('show'), 10);

    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Thêm style để fix nút disabled
document.addEventListener('DOMContentLoaded', function () {
    const style = document.createElement('style');
    style.textContent = `
    .page-btn:disabled {
      opacity: 0.3 !important;
      cursor: not-allowed !important;
      pointer-events: none !important;
    }
    
    .page-btn:not(:disabled):hover {
      background: rgba(255, 107, 157, 0.2) !important;
      transform: translateY(-2px) !important;
    }
    
    .control-btn.active {
      background: linear-gradient(45deg, #ff6b9d, #c77dff) !important;
      color: white !important;
      border-color: transparent !important;
      box-shadow: 0 0 15px rgba(255, 107, 157, 0.4) !important;
    }
  `;
    document.head.appendChild(style);
});

// Khởi động gallery
document.addEventListener('DOMContentLoaded', function () {
    console.log('🚀 VƯỜN KỶ NIỆM 3D - KHỞI ĐỘNG');

    // Kiểm tra xem gallery có tồn tại không
    const gallery = document.getElementById('memoryGallery');
    if (!gallery) {
        console.error('❌ Không tìm thấy gallery container!');
        return;
    }

    // Khởi tạo dữ liệu
    initGalleryData();

    // Thiết lập event listeners
    setupGalleryEventListeners();

    // Load trang đầu tiên
    loadGalleryPage(1);

    console.log('✅ Gallery đã sẵn sàng!');
});

// Hàm thêm ảnh mới từ bên ngoài
window.addMemoryToGallery = function (imageData) {
    if (imageData && imageData.url) {
        galleryAllMemories.push({
            url: imageData.url,
            title: imageData.title || 'Kỷ niệm mới',
            date: imageData.date || new Date().toLocaleDateString('vi-VN'),
            category: imageData.category || 'special'
        });

        if (galleryCurrentFilter === 'all' || imageData.category === galleryCurrentFilter) {
            galleryFilteredMemories.push(galleryAllMemories[galleryAllMemories.length - 1]);
            calculateGalleryTotalPages();
            loadGalleryPage(galleryCurrentPage);
        }

        updateGalleryStats();
        showGalleryNotification('📸 Đã thêm ảnh mới vào gallery!');
    }
};
// <!-- ========================  PHẦN 14: KỈ NIỆM CUỐI NĂM 2025 ======================= -->



