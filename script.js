// Web Audio Sound Synthesizer for Interactive Effects
const audioCtx = typeof window !== 'undefined' ? new (window.AudioContext || window.webkitAudioContext)() : null;

function playChimeSound(freq = 587.33, duration = 0.3, type = 'sine') {
    if (!audioCtx) return;
    try {
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + duration);
    } catch (e) { }
}

function playLoveSound() {
    playChimeSound(523.25, 0.2); // C5
    setTimeout(() => playChimeSound(659.25, 0.25), 100); // E5
    setTimeout(() => playChimeSound(783.99, 0.35), 200); // G5
}

// Section Navigation Logic
function showSection(sectionId, btnEl = null) {
    playChimeSound(440, 0.1);

    document.querySelectorAll('.section').forEach(s => {
        s.classList.remove('active');
        s.style.display = 'none';
    });

    const target = document.getElementById(sectionId);
    if (target) {
        target.classList.add('active');
        target.style.display = 'block';
    }

    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));

    if (btnEl) {
        btnEl.classList.add('active');
    } else {
        const matchingBtn = document.querySelector(`.nav-btn[data-section="${sectionId}"]`);
        if (matchingBtn) matchingBtn.classList.add('active');
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function openHeart() {
    playLoveSound();

    const heartEl = document.getElementById('mainHeart');
    if (heartEl) {
        createFloatingText(heartEl, "💛 +100 Love!");
    }
    createConfetti();

    // Smooth transition to next page (Love Counter)
    setTimeout(() => {
        showSection('love-counter');
    }, 400);
}

function clickHeart() {
    openHeart();
}

function createFloatingText(targetEl, text) {
    const rect = targetEl.getBoundingClientRect();
    const textEl = document.createElement('div');
    textEl.className = 'floating-text';
    textEl.textContent = text;
    textEl.style.left = (rect.left + rect.width / 2 - 40 + (Math.random() * 30 - 15)) + 'px';
    textEl.style.top = (rect.top + 20) + 'px';
    document.body.appendChild(textEl);
    setTimeout(() => textEl.remove(), 800);
}

function createConfetti() {
    for (let i = 0; i < 30; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '-10px';
        confetti.style.background = ['#d4af37', '#f0e68c', '#ffd700', '#cfb53b', '#ffffff'][Math.floor(Math.random() * 5)];
        confetti.style.delay = Math.random() * 0.4 + 's';
        document.body.appendChild(confetti);

        setTimeout(() => confetti.remove(), 3000);
    }
}

// Love Counter Logic
function setCounter() {
    const daysInput = document.getElementById('startDate');
    const days = daysInput ? (daysInput.value || 0) : 365;
    document.getElementById('counter').textContent = days;
    playChimeSound(600, 0.15);
}

function incrementCounter() {
    const counterEl = document.getElementById('counter');
    const current = parseInt(counterEl.textContent) || 0;
    counterEl.textContent = current + 1;

    const daysInput = document.getElementById('startDate');
    if (daysInput) daysInput.value = current + 1;

    playLoveSound();
    createFloatingText(counterEl, "➕1 Day Loved! 💛");
    createConfetti();
}

// Dedicated Handsome Memory Photo & Custom Caption
const handsomeMemory = {
    src: 'images/photo.jpg',
    caption: 'this image uffff i cant descirbe how hot and handsome u look u made fall for you all over again like so much deep that i m not able to get up i dont want to also and honestly i had whole zoo seeing that image i m have it whenever i see ur image uff hot'
};

function toggleCardFlip(cardElement, event = null) {
    if (event) {
        if (event.target.closest('.back-btn')) {
            return;
        }
    }
    playChimeSound(600, 0.12);
    cardElement.classList.toggle('flipped');
}

function renderPhotos() {
    const grid = document.getElementById('galleryGrid');
    if (!grid) return;
    grid.innerHTML = '';

    const card = document.createElement('div');
    card.className = 'flip-card';
    card.onclick = (e) => toggleCardFlip(card, e);

    card.innerHTML = `
        <div class="flip-card-inner">
            <!-- Front Side: Handsome Mirror Selfie Photo & Caption -->
            <div class="flip-card-front">
                <img src="${handsomeMemory.src}" class="flip-card-front-img" alt="Handsome Photo">
                <div class="flip-card-caption-text" title="${handsomeMemory.caption}">
                    ${handsomeMemory.caption}
                </div>
                <div class="flip-card-front-footer">
                    <span>My Handsome Love 💛</span>
                    <span class="flip-hint-badge">🔄 Flip Card</span>
                </div>
            </div>
            <!-- Back Side: Written Caption Note -->
            <div class="flip-card-back">
                <div class="back-header">
                    <span>📜 Caption Note</span>
                    <span>👑 Hot & Handsome</span>
                </div>
                <div class="back-caption-body">
                    "${handsomeMemory.caption}"
                </div>
                <div class="back-actions">
                    <button class="back-btn" onclick="openLightbox()" title="View full photo">🔍 View Full Photo</button>
                </div>
            </div>
        </div>
    `;
    grid.appendChild(card);
}
const handsomeMemory = {
    src: 'images/photo2.jpg',
    caption: 'the day we met for second time and the day i cant forget for my lifetime i cant forget any day with you but this is special bcz of the stunt we did and see we were twinning without even knowing how cool and we look so cute together and everyday with you makes it more memorable and more good honestly u da my safeeeee placeeeee"'
};

function toggleCardFlip(cardElement, event = null) {
    if (event) {
        if (event.target.closest('.back-btn')) {
            return;
        }
    }
    playChimeSound(600, 0.12);
    cardElement.classList.toggle('flipped');
}

function renderPhotos() {
    const grid = document.getElementById('galleryGrid');
    if (!grid) return;
    grid.innerHTML = '';

    const card = document.createElement('div');
    card.className = 'flip-card';
    card.onclick = (e) => toggleCardFlip(card, e);

    card.innerHTML = `
        <div class="flip-card-inner">
            <!-- Front Side: Handsome Mirror Selfie Photo & Caption -->
            <div class="flip-card-front">
                <img src="${handsomeMemory.src}" class="flip-card-front-img" alt="Handsome Photo">
                <div class="flip-card-caption-text" title="${handsomeMemory.caption}">
                    ${handsomeMemory.caption}
                </div>
                <div class="flip-card-front-footer">
                    <span>My Handsome Love 💛</span>
                    <span class="flip-hint-badge">🔄 Flip Card</span>
                </div>
            </div>
            <!-- Back Side: Written Caption Note -->
            <div class="flip-card-back">
                <div class="back-header">
                    <span>📜 Caption Note</span>
                    <span>👑 Hot & Handsome</span>
                </div>
                <div class="back-caption-body">
                    "${handsomeMemory.caption}"
                </div>
                <div class="back-actions">
                    <button class="back-btn" onclick="openLightbox()" title="View full photo">🔍 View Full Photo</button>
                </div>
            </div>
        </div>
    `;
    grid.appendChild(card);
}

// Lightbox Modal Handler
function openLightbox() {
    const modal = document.getElementById('lightboxModal');
    const img = document.getElementById('lightboxImg');
    const caption = document.getElementById('lightboxCaption');

    if (img) img.src = handsomeMemory.src;
    if (caption) caption.textContent = "📜 " + handsomeMemory.caption;
    if (modal) modal.style.display = 'flex';
    playChimeSound(650, 0.15);
}

function closeLightbox() {
    const modal = document.getElementById('lightboxModal');
    if (modal) modal.style.display = 'none';
}

// Love Letter Logic
const defaultLetter = "You are the reason my heart smiles every single day. Every moment with you is a treasure, and every day is an adventure I never want to end. Thank you for being my love, my best friend, and my favorite person! 💛";

function saveLetter() {
    const input = document.getElementById('letterText');
    const text = input ? input.value.trim() : '';
    if (text) {
        try {
            localStorage.setItem('our_love_letter_text', text);
        } catch (e) { }
        playLoveSound();
        createConfetti();
        alert('✨ Love Letter Saved Successfully! 💌');
    } else {
        alert('Please write your letter message first!');
    }
}

function loadLetter() {
    try {
        const saved = localStorage.getItem('our_love_letter_text');
        const input = document.getElementById('letterText');
        if (input) {
            input.value = saved || defaultLetter;
        }
    } catch (e) { }
}

// Promises Ceremony Logic
let savedPromises = [];
try {
    savedPromises = JSON.parse(localStorage.getItem('our_love_promises') || '[]');
} catch (e) {
    savedPromises = [];
}

function addPromise() {
    const input = document.getElementById('promiseInput');
    const promise = input ? input.value.trim() : '';
    if (promise) {
        savedPromises.push(promise);
        try {
            localStorage.setItem('our_love_promises', JSON.stringify(savedPromises));
        } catch (e) { }
        if (input) input.value = '';
        renderPromises();
        playLoveSound();
        createConfetti();
    } else {
        alert('Please write your promise first!');
    }
}

function deletePromise(index) {
    if (confirm('Remove this promise?')) {
        savedPromises.splice(index, 1);
        try {
            localStorage.setItem('our_love_promises', JSON.stringify(savedPromises));
        } catch (e) { }
        renderPromises();
        playChimeSound(300, 0.2);
    }
}

function renderPromises() {
    const listEl = document.getElementById('promisesList');
    if (!listEl) return;
    listEl.innerHTML = '';

    if (savedPromises.length === 0) {
        listEl.innerHTML = `
            <div style="padding: 30px 15px; text-align: center; color: #ffd700; font-style: italic; background: rgba(0,0,0,0.25); border-radius: 12px; border: 1px dashed rgba(212,175,55,0.4);">
                🤝 No promises written yet.<br><br>
                Type your promise below and click <b>"Add Promise 💛"</b> to add it to your story!
            </div>
        `;
        return;
    }

    savedPromises.forEach((promise, idx) => {
        const item = document.createElement('div');
        item.className = 'promise-item';
        item.innerHTML = `
            <span style="word-break: break-word; flex: 1; padding-right: 10px;">✨ ${promise}</span>
            <button class="delete-photo-btn" onclick="deletePromise(${idx})" title="Delete Promise" style="position: static; flex-shrink: 0;">✕</button>
        `;
        listEl.appendChild(item);
    });
}

// Initialize application state on DOM load
window.addEventListener('DOMContentLoaded', () => {
    // 1. Start on Heart Section
    showSection('heart-section');

    // 2. Initialize modules
    setCounter();
    loadLetter();
    renderPromises();
    renderPhotos();
});
