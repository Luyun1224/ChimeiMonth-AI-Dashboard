// 倒數計時：目標日期使用台北時區（ISO +08:00）
(function() {
    // 目標時間（台北）
    const target = new Date('2025-11-23T00:00:00+08:00'); // 2025-11-23 00:00:00 台北時間
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    const noteEl = document.getElementById('count-note');
    const countdownWrap = document.getElementById('countdown');

    function pad(n) { return String(n).padStart(2, '0'); }

    let prevDays = null, prevHours = null, prevMinutes = null, prevSeconds = null;
    function update() {
        const now = new Date();
        let diff = target - now;
        if (diff <= 0) {
            // 工作坊已開始或結束
            if (countdownWrap) countdownWrap.style.display = 'none';
            if (noteEl) noteEl.textContent = '工作坊已開始！歡迎參加。';
            clearInterval(timer);
            return;
        }

        const totalSec = Math.floor(diff / 1000);
        const days = Math.floor(totalSec / 86400);
        const hours = Math.floor((totalSec % 86400) / 3600);
        const minutes = Math.floor((totalSec % 3600) / 60);
        const seconds = totalSec % 60;
        // 只有在數值真正改變時才做脈動動畫（避免每秒跳動造成干擾）
        if (daysEl && days !== prevDays) {
            daysEl.textContent = days;
            daysEl.classList.add('pulse');
            setTimeout(() => daysEl.classList.remove('pulse'), 420);
            prevDays = days;
        }
        if (hoursEl && hours !== prevHours) {
            hoursEl.textContent = pad(hours);
            hoursEl.classList.add('pulse');
            setTimeout(() => hoursEl.classList.remove('pulse'), 420);
            prevHours = hours;
        }
        if (minutesEl && minutes !== prevMinutes) {
            minutesEl.textContent = pad(minutes);
            minutesEl.classList.add('pulse');
            setTimeout(() => minutesEl.classList.remove('pulse'), 420);
            prevMinutes = minutes;
        }
        // 秒數頻繁更新，但不做脈動動畫以免干擾視覺
        if (secondsEl && seconds !== prevSeconds) {
            secondsEl.textContent = pad(seconds);
            prevSeconds = seconds;
        }
        if (noteEl) noteEl.textContent = '距離工作坊開始還有';
    }

    update();
    const timer = setInterval(update, 1000);
})();

// 行事曆功能：只支援打開 Google Calendar（預填活動）
(function() {
    const googleBtn = document.getElementById('googleCalBtn');
    // 事件基本資訊（可按需修改時間或時區）
    const title = encodeURIComponent('AI 數位賦能工作坊');
    const details = encodeURIComponent('地點：奇美博物館豐收廳 / 貓頭鷹手作教室');
    const location = encodeURIComponent('奇美博物館豐收廳');
    // Google Calendar 使用全日事件（20251123）到隔天（20251124）
    const gDates = '20251123/20251124';
    const gUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${gDates}&details=${details}&location=${location}`;

    if (googleBtn) googleBtn.addEventListener('click', () => {
        window.open(gUrl, '_blank');
    });
})();
