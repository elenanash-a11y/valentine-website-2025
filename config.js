// ============================================
// 💝 CUSTOMIZE YOUR VALENTINE'S WEBSITE HERE 💝
// ============================================

const CONFIG = {
  // Your Valentine's name that will appear in the title
  valentineName: "Thijs!",

  // The title that appears in the browser tab
  pageTitle: "Will You Be My Valentine? 💝",

  // Floating emojis that appear in the background
  floatingEmojis: {
    hearts: ["❤️", "💖", "💝", "💗", "💓"],
    bears: ["🧸", "🐻"],
  },

  // Questions and answers
  questions: {
    // We'll use this as the ONLY real question
    first: {
      text: "Will you be my Valentine on February 14th, 2026?",
      yesBtn: "Yes",
      noBtn: "No",
      secretAnswer: "" // removed "my love..." secret hover message
    },

    // Keep these for compatibility with existing script (minimal-change, no break)
    // If your script shows them anyway, we’ll do a tiny script.js patch next.
    second: {
      text: "",
      startText: "",
      nextBtn: ""
    },
    third: {
      text: "Will you be my Valentine on February 14th, 2026?",
      yesBtn: "Yes",
      noBtn: "No"
    }
  },

  loveMessages: {
    extreme: "",
    high: "",
    normal: ""
  },

celebration: {
    title: "Aww! I'm the luckiest homikje!",
    subtitle: "Here a small note for you.",
    buttonText: "Open the note 💌",
noteText: `Let’s celebrate Valentine’s Day together on Saturday  
at 17:00 at Achibald Restaurant in Bussum.

Love always,  
Elena`,
    emojis: "💝💖💗💓❤️"
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
  },

  // Background Music (disabled to remove the button + avoid autoplay/play() console errors)
  music: {
    enabled: false,
    autoplay: false,
    musicUrl: "",
    startText: "",
    stopText: "",
    volume: 0.5
  }
};

// Don't modify anything below this line unless you know what you're doing
window.VALENTINE_CONFIG = CONFIG;
document.title = CONFIG.pageTitle;

// Don't modify anything below this line unless you know what you're doing
window.VALENTINE_CONFIG = CONFIG;
document.title = CONFIG.pageTitle;
