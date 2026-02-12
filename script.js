// Initialize configuration
const config = window.VALENTINE_CONFIG || {};

// Validate configuration
function validateConfig() {
    const warnings = [];

    // Check required fields
    if (!config.valentineName) {
        warnings.push("Valentine's name is not set! Using default.");
        config.valentineName = "My Love";
    }

    // Guard defaults
    config.colors = config.colors || {};
    config.animations = config.animations || {};
    config.questions = config.questions || {};
    config.questions.first = config.questions.first || {};
    config.questions.second = config.questions.second || {};
    config.questions.third = config.questions.third || {};
    config.floatingEmojis = config.floatingEmojis || { hearts: ["❤️"], bears: ["🧸"] };
    config.loveMessages = config.loveMessages || { extreme: "", high: "", normal: "" };
    config.celebration = config.celebration || { title: "", message: "", emojis: "" };
    config.music = config.music || { enabled: false, autoplay: false };

    // Validate colors
    const isValidHex = (hex) => /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hex);
    Object.entries(config.colors).forEach(([key, value]) => {
        if (!isValidHex(value)) {
            warnings.push(`Invalid color for ${key}! Using default.`);
            config.colors[key] = getDefaultColor(key);
        }
    });

    // Validate animation values
    if (config.animations.floatDuration && parseFloat(config.animations.floatDuration) < 5) {
        warnings.push("Float duration too short! Setting to 5s minimum.");
        config.animations.floatDuration = "5s";
    }

    if (typeof config.animations.heartExplosionSize === "number") {
        if (config.animations.heartExplosionSize < 1 || config.animations.heartExplosionSize > 3) {
            warnings.push("Heart explosion size should be between 1 and 3! Using default.");
            config.animations.heartExplosionSize = 1.5;
        }
    }

    // Log warnings if any
    if (warnings.length > 0) {
        console.warn("⚠️ Configuration Warnings:");
        warnings.forEach(warning => console.warn("- " + warning));
    }
}

// Default color values
function getDefaultColor(key) {
    const defaults = {
        backgroundStart: "#ffafbd",
        backgroundEnd: "#ffc3a0",
        buttonBackground: "#ff6b6b",
        buttonHover: "#ff8787",
        textColor: "#ff4757"
    };
    return defaults[key];
}

// Safe helper
function $(id) {
    return document.getElementById(id);
}

// Set page title
if (config.pageTitle) document.title = config.pageTitle;

// Initialize the page content when DOM is loaded
window.addEventListener('DOMContentLoaded', () => {
    // Validate configuration first
    validateConfig();

    // ✅ Title: remove ", my love..." and show only the name
    const titleEl = $('valentineTitle');
    if (titleEl) titleEl.textContent = `${config.valentineName}`;

    // Try to set texts (only if elements exist)
    if ($('question1Text')) $('question1Text').textContent = config.questions.first.text || "";
    if ($('yesBtn1')) $('yesBtn1').textContent = config.questions.first.yesBtn || "Yes";
    if ($('noBtn1')) $('noBtn1').textContent = config.questions.first.noBtn || "No";
    if ($('secretAnswerBtn')) $('secretAnswerBtn').textContent = config.questions.first.secretAnswer || "";

    if ($('question2Text')) $('question2Text').textContent = config.questions.second.text || "";
    if ($('startText')) $('startText').textContent = config.questions.second.startText || "";
    if ($('nextBtn')) $('nextBtn').textContent = config.questions.second.nextBtn || "";

    // ✅ Only question we want visible/used:
    if ($('question3Text')) $('question3Text').textContent = config.questions.third.text || "";
    if ($('yesBtn3')) $('yesBtn3').textContent = config.questions.third.yesBtn || "Yes";
    if ($('noBtn3')) $('noBtn3').textContent = config.questions.third.noBtn || "No";

    // Create initial floating elements
    createFloatingElements();

    // ✅ Music: do not setup at all (removes button + prevents autoplay errors)
    // setupMusicPlayer();

    // ✅ Show ONLY question 3 (hide question 1 & 2)
    forceSingleQuestionMode();

    // ✅ Add hint text under Yes/No buttons for the only question
    addTryNoHint();
});

// ✅ Force showing only question 3
function forceSingleQuestionMode() {
    // Hide all question sections
    document.querySelectorAll('.question-section').forEach(q => q.classList.add('hidden'));

    // Prefer question3 if exists, otherwise question1 as fallback
    const q3 = $('question3');
    const q1 = $('question1');

    if (q3) q3.classList.remove('hidden');
    else if (q1) q1.classList.remove('hidden');
}

// ✅ Add small text below Yes/No buttons: "Try to say 'no'...."
function addTryNoHint() {
    const q3 = $('question3');
    if (!q3) return;

    // Avoid duplicates
    if (q3.querySelector('.try-no-hint')) return;

    // Try to place under the button row if it exists
    // If your HTML has a container like .buttons, use it; otherwise append to question3.
    const buttonsContainer = q3.querySelector('.buttons') || q3;

    const hint = document.createElement('p');
    hint.className = 'try-no-hint';
    hint.textContent = "Try to say 'no'....";
    buttonsContainer.appendChild(hint);
}

// Create floating hearts and bears
function createFloatingElements() {
    const container = document.querySelector('.floating-elements');
    if (!container) return;

    // Create hearts
    (config.floatingEmojis.hearts || []).forEach(heart => {
        const div = document.createElement('div');
        div.className = 'heart';
        div.innerHTML = heart;
        setRandomPosition(div);
        container.appendChild(div);
    });

    // Create bears
    (config.floatingEmojis.bears || []).forEach(bear => {
        const div = document.createElement('div');
        div.className = 'bear';
        div.innerHTML = bear;
        setRandomPosition(div);
        container.appendChild(div);
    });
}

// Set random position for floating elements
function setRandomPosition(element) {
    element.style.left = Math.random() * 100 + 'vw';
    element.style.animationDelay = Math.random() * 5 + 's';
    element.style.animationDuration = 10 + Math.random() * 20 + 's';
}

// Function to show next question
function showNextQuestion(questionNumber) {
    document.querySelectorAll('.question-section').forEach(q => q.classList.add('hidden'));
    const el = $(`question${questionNumber}`);
    if (el) el.classList.remove('hidden');
}

// Function to move the "No" button when clicked
function moveButton(button) {
    const x = Math.random() * (window.innerWidth - button.offsetWidth);
    const y = Math.random() * (window.innerHeight - button.offsetHeight);
    button.style.position = 'fixed';
    button.style.left = x + 'px';
    button.style.top = y + 'px';
}

/* ✅ Love meter: keep code, but make it safe (won't throw if elements removed/hidden) */
const loveMeter = $('loveMeter');
const loveValue = $('loveValue');
const extraLove = $('extraLove');

function setInitialPosition() {
    if (!loveMeter || !loveValue) return;
    loveMeter.value = 100;
    loveValue.textContent = 100;
    loveMeter.style.width = '100%';
}

if (loveMeter && loveValue && extraLove) {
    loveMeter.addEventListener('input', () => {
        const value = parseInt(loveMeter.value);
        loveValue.textContent = value;

        if (value > 100) {
            extraLove.classList.remove('hidden');
            const overflowPercentage = (value - 100) / 9900;
            const extraWidth = overflowPercentage * window.innerWidth * 0.8;
            loveMeter.style.width = `calc(100% + ${extraWidth}px)`;
            loveMeter.style.transition = 'width 0.3s';

            if (value >= 5000) {
                extraLove.classList.add('super-love');
                extraLove.textContent = config.loveMessages.extreme || "";
            } else if (value > 1000) {
                extraLove.classList.remove('super-love');
                extraLove.textContent = config.loveMessages.high || "";
            } else {
                extraLove.classList.remove('super-love');
                extraLove.textContent = config.loveMessages.normal || "";
            }
        } else {
            extraLove.classList.add('hidden');
            extraLove.classList.remove('super-love');
            loveMeter.style.width = '100%';
        }
    });

    window.addEventListener('DOMContentLoaded', setInitialPosition);
    window.addEventListener('load', setInitialPosition);
}

// Celebration function
function celebrate() {
    document.querySelectorAll('.question-section').forEach(q => q.classList.add('hidden'));

    const celebration = document.getElementById('celebration');
    celebration.classList.remove('hidden');

    const title = document.getElementById('celebrationTitle');
    const message = document.getElementById('celebrationMessage');
    const emojis = document.getElementById('celebrationEmojis');

    title.textContent = config.celebration.title;
    
    // Добавляем параграф между предложениями
    message.innerHTML = `
        <p>${config.celebration.subtitle}</p>
        <button id="openNoteBtn" class="cute-btn">${config.celebration.buttonText}</button>
    `;

    emojis.textContent = config.celebration.emojis;

    createHeartExplosion();

    // Открытие note
    document.getElementById('openNoteBtn').addEventListener('click', openNote);
}

// Create heart explosion animation
function createHeartExplosion() {
    const container = document.querySelector('.floating-elements');
    if (!container) return;

    for (let i = 0; i < 50; i++) {
        const heart = document.createElement('div');
        const hearts = config.floatingEmojis.hearts || ["❤️"];
        const randomHeart = hearts[Math.floor(Math.random() * hearts.length)];
        heart.innerHTML = randomHeart;
        heart.className = 'heart';
        container.appendChild(heart);
        setRandomPosition(heart);
    }
}

// Music Player Setup (kept for compatibility, but safe)
function setupMusicPlayer() {
    const musicControls = $('musicControls');
    const musicToggle = $('musicToggle');
    const bgMusic = $('bgMusic');
    const musicSource = $('musicSource');

    // If elements not present, do nothing safely
    if (!musicControls || !musicToggle || !bgMusic || !musicSource) return;

    // Only show controls if music is enabled in config
    if (!config.music || !config.music.enabled) {
        musicControls.style.display = 'none';
        return;
    }

    // Set music source and volume
    musicSource.src = config.music.musicUrl || "";
    bgMusic.volume = config.music.volume || 0.5;
    bgMusic.load();

    // Try autoplay if enabled
    if (config.music.autoplay) {
        const playPromise = bgMusic.play();
        if (playPromise !== undefined) {
            playPromise.catch(() => {
                console.log("Autoplay prevented by browser");
                musicToggle.textContent = config.music.startText || "Play Music";
            });
        }
    }

    // Toggle music on button click
    musicToggle.addEventListener('click', () => {
        if (bgMusic.paused) {
            bgMusic.play();
            musicToggle.textContent = config.music.stopText || "Stop Music";
        } else {
            bgMusic.pause();
            musicToggle.textContent = config.music.startText || "Play Music";
        }
    });
} 

function openNote() {
    const noteModal = document.createElement('div');
    noteModal.className = 'note-modal';
    noteModal.innerHTML = `
        <div class="note-content">
            <p>${config.celebration.noteText}</p>
            <button class="cute-btn" onclick="this.closest('.note-modal').remove()">Close 💕</button>
        </div>
    `;
    document.body.appendChild(noteModal);
}

