// ============================================
// 💝 CUSTOMIZE YOUR VALENTINE'S WEBSITE HERE 💝
// ============================================

const CONFIG = {
    valentineName: "Thijs",

    pageTitle: "Will You Be My Valentine? 💝",

    floatingEmojis: {
        hearts: ['❤️', '💖', '💝', '💗', '💓'],
        bears: ['🐹', '🐹']
    },

    // Single question
    question: {
        text: "Will you be my Valentine? 🌹",
        hintText: "Try to say no...",
        yesBtn: "Yes",
        noBtn: "No"
    },

    // Celebration + note
    celebration: {
        title: "Awww! I'm the luckiest homikje!",
        message: "Here is a small note for you.",
        emojis: ['❤️', '💖', '💝', '💗', '💓'],
        noteText: "Spend this Valentine with me, my love. At 17:00, Saturday, at Archibald Restaurant Bussum. Elena xxx"
    },

    colors: {
        backgroundStart: "#ffafbd",
        backgroundEnd: "#ffc3a0",
        buttonBackground: "#ff6b6b",
        buttonHover: "#ff8787",
        textColor: "#ff4757"
    },

    animations: {
        floatDuration: "15s",
        floatDistance: "50px",
        bounceSpeed: "0.5s",
        heartExplosionSize: 1.5
    }
};

// Don't modify anything below this line unless you know what you're doing
window.VALENTINE_CONFIG = CONFIG;
document.title = CONFIG.pageTitle;
