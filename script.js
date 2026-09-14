// BGJ'26 begins at 10:00 in Istanbul (UTC+3) on 23 October 2026.
const EVENT_START = new Date('2026-10-23T10:00:00+03:00').getTime();

const countdownElements = {
    days: document.getElementById('days'),
    hours: document.getElementById('hours'),
    minutes: document.getElementById('minutes'),
    seconds: document.getElementById('seconds'),
};

function pad(value) {
    return String(Math.max(0, value)).padStart(2, '0');
}

function updateCountdown() {
    const remaining = Math.max(0, EVENT_START - Date.now());
    const totalSeconds = Math.floor(remaining / 1000);

    const values = {
        days: Math.floor(totalSeconds / 86400),
        hours: Math.floor((totalSeconds % 86400) / 3600),
        minutes: Math.floor((totalSeconds % 3600) / 60),
        seconds: totalSeconds % 60,
    };

    Object.entries(countdownElements).forEach(([unit, element]) => {
        if (element) element.textContent = pad(values[unit]);
    });

    return remaining;
}

if (Object.values(countdownElements).some(Boolean)) {
    updateCountdown();

    const countdownTimer = window.setInterval(() => {
        if (updateCountdown() === 0) window.clearInterval(countdownTimer);
    }, 1000);
}
