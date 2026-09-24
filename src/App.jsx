import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { 
  Heart, Sparkles, Volume2, VolumeX, ArrowRight, ArrowLeft, 
  RotateCcw, Send, Lock, ChevronRight, ChevronLeft,
  PartyPopper, Check, Flame, Stars, Gift, Eye
} from 'lucide-react';

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        this.ctx = new AudioContextClass();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playTone(freq, type = 'sine', duration = 0.2, gainLevel = 0.15) {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(gainLevel, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch {
      // Audio fallback catch
    }
  }

  chime() {
    [523.25, 659.25, 783.99, 1046.50].forEach((freq, idx) => {
      setTimeout(() => this.playTone(freq, 'triangle', 0.35, 0.16), idx * 75);
    });
  }

  pop() {
    this.playTone(460, 'sine', 0.08, 0.2);
    setTimeout(() => this.playTone(920, 'triangle', 0.12, 0.2), 35);
  }

  typeClick() {
    this.playTone(620 + Math.random() * 220, 'sine', 0.03, 0.04);
  }

  bubble() {
    [320, 480, 640, 800].forEach((freq, i) => {
      setTimeout(() => this.playTone(freq, 'sine', 0.1, 0.2), i * 50);
    });
  }

  fanfare() {
    const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98];
    notes.forEach((f, i) => {
      setTimeout(() => this.playTone(f, 'sine', 0.38, 0.22), i * 95);
    });
  }
}

const sounds = new SoundEngine();

const BUBU_PHOTOS = [
  {
    id: 1,
    title: "Bossy Girl 👑",
    filename: "bossy girl.jpg",
    subtitle: "The Royal Supreme Commander of Dudu's Heart",
    caption: "When she puts her hands on her hips and orders Dudu around, he surrenders happily with infinite smiles! 💖",
    emoji: "👑",
    color: "from-amber-200 via-rose-100 to-pink-200"
  },
  {
    id: 2,
    title: "Gorgeous Girl in Yellow 🌻",
    filename: "gorgeous girl in yellow.jpg",
    altFilename: "gorgeous girl in yello.jpg",
    subtitle: "Like A Summer Sunflower Blooming In Sunlight",
    caption: "Dressed in bright yellow, lighting up the entire world! Yellow was created just to complement her glow.",
    emoji: "☀️",
    color: "from-yellow-100 via-amber-100 to-rose-100"
  },
  {
    id: 3,
    title: "Her Deep Gaze 👀✨",
    filename: "her gaze.jpg",
    subtitle: "Where Dudu Gets Lost Every Single Time",
    caption: "One magical look from those deep, starry eyes and Dudu's brain completely stops functioning. Pure magic!",
    emoji: "💖",
    color: "from-purple-100 via-pink-100 to-rose-100"
  },
  {
    id: 4,
    title: "Simply Her 🌸",
    filename: "her.jpg",
    subtitle: "Raw, Pure, Incomparable Sweetness",
    caption: "No filters, no posing, just the prettiest girl in the universe existing. Dudu's favorite view forever.",
    emoji: "🧸",
    color: "from-rose-100 via-pink-50 to-pink-200"
  },
  {
    id: 5,
    title: "Her Vibrant Smile 🌟",
    filename: "hervibrant smile.jpg",
    subtitle: "The Cure To Any Bad Day In Existence",
    caption: "Her genuine smile makes the flowers bloom and all sadness evaporate into thin air. Truly divine!",
    emoji: "🥰",
    color: "from-pink-100 via-rose-100 to-amber-100"
  },
  {
    id: 6,
    title: "Little Don 🕶️😎",
    filename: "little don.jpg",
    subtitle: "Small In Height, Mafia In Attitude",
    caption: "The ultimate boss! One stern pout and Dudu immediately rushes to get snacks, boba, and ice cream!",
    emoji: "😼",
    color: "from-slate-100 via-pink-100 to-purple-100"
  },
  {
    id: 7,
    title: "Luminous Twilight Smile 🌇",
    filename: "Luminous twilight smile.jpg",
    subtitle: "Sunsets Are Jealous Of Her Soft Glow",
    caption: "Golden hour sunset lighting reflecting upon her angelic face. Absolutely ethereal and breathtaking.",
    emoji: "🌅",
    color: "from-orange-100 via-pink-100 to-purple-100"
  },
  {
    id: 8,
    title: "Pretty Girl 🌷",
    filename: "preety girl.jpg",
    altFilename: "pretty girl.jpg",
    subtitle: "Innocent Elegance & Pure Grace",
    caption: "How Dudu got so immensely lucky to have this masterpiece of a human as his soulmate remains life's biggest blessing.",
    emoji: "💐",
    color: "from-teal-50 via-pink-100 to-rose-100"
  },
  {
    id: 9,
    title: "Pretty Smile 😊💕",
    filename: "pretty smile.jpg",
    subtitle: "Heart Melting Cuteness",
    caption: "That soft shy curve of her pink lips that makes Dudu fall in love all over again, minute after minute.",
    emoji: "🧁",
    color: "from-pink-100 via-rose-100 to-red-100"
  },
  {
    id: 10,
    title: "She in Blue 💙",
    filename: "she in blue.jpg",
    subtitle: "Royal Ocean Starlight Elegance",
    caption: "Draped in majestic blue, radiating royal peace and serenity. The absolute queen of 29th July!",
    emoji: "💎",
    color: "from-sky-100 via-blue-50 to-pink-100"
  }
];

const COUPONS = [
  {
    id: 0,
    icon: "🫂💖",
    title: "Unlimited Midnight Warm Cuddle Pass",
    desc: "Valid anytime, anywhere! Can never be refused by Dudu, even during gaming, driving or deep sleep."
  },
  {
    id: 1,
    icon: "🍦🚗",
    title: "Midnight Ice Cream & Starry Long Drive",
    desc: "Redeemable on any sudden craving. Dudu will drive to your favorite sweet shop at 2 AM with music."
  },
  {
    id: 2,
    icon: "👑✨",
    title: "Golden 'Bubu Is 100% Right' Card",
    desc: "Instant argument solver. Dudu immediately surrenders, admits defeat, and treats Bubu like the queen she is!"
  }
];

const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "Who loves the other person more in this universe? 💖",
    options: [
      { text: "Bubu loves Dudu more", note: "Super sweet, but Dudu's love has no ceiling or boundary!" },
      { text: "Dudu loves Bubu by 1000x infinity!", note: "BINGO! A scientifically proven universal fact!" },
      { text: "Both equal, but Dudu adds 15% extra daily", note: "Aww! Absolutely spot on and certified true!" }
    ]
  },
  {
    id: 2,
    question: "What is Bubu's undisputed superpower over Dudu? 🪄",
    options: [
      { text: "Her cute pout that melts all arguments instantly", note: "Undefeatable. Dudu surrenders unconditionally." },
      { text: "Her tiny giggle when she is genuinely happy", note: "Pure celestial music to Dudu's ears!" },
      { text: "Both combined into an ultimate weapon of cuteness", note: "100% Lethal weapon of irresistible love!" }
    ]
  },
  {
    id: 3,
    question: "What happens when Dudu looks into Bubu's eyes? 🥺",
    options: [
      { text: "His heart does a double backflip", note: "Every single time, without exception." },
      { text: "He forgets all worries and finds peace", note: "She is his instant sanctuary and happiness." },
      { text: "All of the above + giant silly smile", note: "Accurate! Total heart melt mode unlocked!" }
    ]
  },
  {
    id: 4,
    question: "When Bubu gets hungry or sleepy, Dudu's primary mission is: 🧸",
    options: [
      { text: "Wrap her like a cozy warm burrito with kisses", note: "Certified Professional Burrito Specialist!" },
      { text: "Bring snacks and massage her head gently", note: "Highest priority royal service protocol!" },
      { text: "Whisper 'I love you my Jaanu' softly", note: "Sweetest dreams guaranteed for eternity!" }
    ]
  },
  {
    id: 5,
    question: "How long will Dudu love his sweet Bubu? 💍",
    options: [
      { text: "Until all stars in the cosmos burn out", note: "And even far beyond the darkness of time!" },
      { text: "Through this lifetime and the next 1000 lives", note: "Sealed forever in our timeless destiny." },
      { text: "Infinity + 1 forever and always", note: "Forever is just our starting chapter! 💖" }
    ]
  }
];

const LOVE_LETTER_TEXT = `My sweet, beautiful Jaanu,

From the very moment you entered my world, everything changed in the softest, most miraculous way. The chaotic days found quiet harmony, the ordinary moments became unforgettable poetry, and my restless heart found its forever home in your eyes.

You are not just the birthday girl today on 29th July — you are my answered prayer, my safest shelter, my cutest little troublemaker, and my whole universe. Whenever you laugh with that pure, innocent sparkle or give that adorable little pout, I fall in love with you all over again.

On this special 29th July, I wish for all your sweetest dreams to bloom like eternal flowers. I promise to always hold your hand firmly through every high and low, to feed you snacks when you are hangry, to wipe your tears, to celebrate your joys, and to protect that priceless smile for every single lifetime to come.

Happy Birthday, my forever Bubu.

Forever and always yours,
Dudu 🧸💖`;

export default function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [soundOn, setSoundOn] = useState(true);
  const totalPages = 10;

  // Strict Chapter Progress State
  const [unlockedPages, setUnlockedPages] = useState({
    1: true,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false,
    8: false,
    9: false,
    10: false
  });

  // Page 1: 3D tilt tracking
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  // Page 3: Photo gallery tracking & Photo tap reactions
  const [photoIndex, setPhotoIndex] = useState(0);
  const [viewedPhotos, setViewedPhotos] = useState(new Set([0]));
  const [imgErrorState, setImgErrorState] = useState({});
  const [isPhotoBouncing, setIsPhotoBouncing] = useState(false);
  const [photoReactions, setPhotoReactions] = useState([]);

  // Page 4: 10-Second Wish Timer
  const [timerSeconds, setTimerSeconds] = useState(10);
  const [timerActive, setTimerActive] = useState(false);
  const [timerDone, setTimerDone] = useState(false);

  // Page 5: Secret Wish Capsule
  const [secretWish, setSecretWish] = useState('');
  const [wishLocked, setWishLocked] = useState(false);
  const [wishError, setWishError] = useState(false);

  // Page 6: Cake Candle Blowout
  const [candleBlown, setCandleBlown] = useState(false);

  // Page 7: Scratch Coupons
  const [couponIndex, setCouponIndex] = useState(0);
  const [scratchedSet, setScratchedSet] = useState(new Set());
  const scratchCanvasRef = useRef(null);
  const isScratching = useRef(false);
  const scratchPixelCount = useRef({});

  // Page 8: Soulmate Quiz
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  // Page 9: Typewriter Love Letter
  const [typedText, setTypedText] = useState('');
  const [isTypingDone, setIsTypingDone] = useState(false);

  // Page 10: Canvas Particle Shower & Floating Emoji Storm
  const stormCanvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animationFrameId = useRef(null);
  const [domKisses, setDomKisses] = useState([]);

  const toggleSound = () => {
    sounds.enabled = !soundOn;
    setSoundOn(!soundOn);
    if (!soundOn) sounds.pop();
  };

  const unlockPage = useCallback((pageNumber) => {
    setUnlockedPages(prev => ({ ...prev, [pageNumber]: true }));
  }, []);

  const goToPage = (page) => {
    if (page > currentPage && !unlockedPages[page]) {
      sounds.playTone(220, 'sawtooth', 0.18, 0.25);
      return;
    }
    sounds.chime();
    const clamped = Math.max(1, Math.min(totalPages, page));
    setCurrentPage(clamped);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goNext = () => {
    if (currentPage < totalPages && unlockedPages[currentPage + 1]) {
      goToPage(currentPage + 1);
    } else {
      sounds.playTone(220, 'sawtooth', 0.18, 0.25);
    }
  };

  const goBack = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  };

  const fireConfetti = useCallback((options = {}) => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        ...options
      });
    } catch {
      // Confetti fallback
    }
  }, []);

  const handleMouseMove = (e) => {
    if (currentPage !== 1) return;
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = ((clientX / innerWidth) - 0.5) * 22;
    const y = ((clientY / innerHeight) - 0.5) * -22;
    setTilt({ x, y });
  };

  const handleOpenSurprise = () => {
    sounds.chime();
    unlockPage(2);
    goToPage(2);
  };

  const handleBlastConfetti = () => {
    sounds.fanfare();
    fireConfetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.55 },
      colors: ['#f43f5e', '#ec4899', '#fbcfe8', '#fbbf24', '#a855f7']
    });
    unlockPage(3);
    setTimeout(() => {
      goToPage(3);
    }, 750);
  };

  const markPhotoViewed = useCallback((index) => {
    setViewedPhotos(prev => {
      const updated = new Set(prev).add(index);
      if (updated.size >= 5) {
        unlockPage(4);
      }
      return updated;
    });
  }, [unlockPage]);

  const spawnPhotoFloatingEmoji = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const emojiIcons = ['💖', '💋', '✨', '🌹', '🥰', '💐', '🌸'];
    const newItems = Array.from({ length: 7 }).map((_, i) => ({
      id: Math.random() + Date.now() + i,
      x: clickX + (Math.random() * 60 - 30),
      y: clickY + (Math.random() * 40 - 20),
      emoji: emojiIcons[Math.floor(Math.random() * emojiIcons.length)],
      angle: (Math.random() * 60 - 30),
      duration: 0.8 + Math.random() * 0.4
    }));

    setPhotoReactions(prev => [...prev.slice(-15), ...newItems]);
    setTimeout(() => {
      setPhotoReactions(prev => prev.filter(item => !newItems.find(n => n.id === item.id)));
    }, 1200);
  };

  const handlePhotoTap = (e) => {
    sounds.pop();
    spawnPhotoFloatingEmoji(e);
    setIsPhotoBouncing(true);
    const nextIdx = (photoIndex + 1) % BUBU_PHOTOS.length;
    setPhotoIndex(nextIdx);
    markPhotoViewed(nextIdx);
    setTimeout(() => setIsPhotoBouncing(false), 300);
    fireConfetti({ particleCount: 30, spread: 60, origin: { y: 0.7 } });
  };

  const handleNextPhoto = (e) => {
    e.stopPropagation();
    sounds.pop();
    const nextIdx = (photoIndex + 1) % BUBU_PHOTOS.length;
    setPhotoIndex(nextIdx);
    markPhotoViewed(nextIdx);
  };

  const handlePrevPhoto = (e) => {
    e.stopPropagation();
    sounds.pop();
    const prevIdx = (photoIndex - 1 + BUBU_PHOTOS.length) % BUBU_PHOTOS.length;
    setPhotoIndex(prevIdx);
    markPhotoViewed(prevIdx);
  };

  useEffect(() => {
    let interval = null;
    if (timerActive && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setTimerActive(false);
            setTimerDone(true);
            unlockPage(5);
            sounds.fanfare();
            fireConfetti({ particleCount: 120, spread: 90 });
            return 0;
          }
          sounds.playTone(550, 'sine', 0.08, 0.1);
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerActive, timerSeconds, fireConfetti, unlockPage]);

  const handleStartTimer = () => {
    sounds.chime();
    setTimerSeconds(10);
    setTimerDone(false);
    setTimerActive(true);
  };

  const handleSendWish = () => {
    if (!secretWish.trim()) {
      setWishError(true);
      sounds.playTone(220, 'sawtooth', 0.2, 0.25);
      return;
    }
    setWishError(false);
    setWishLocked(true);
    sounds.bubble();
    setTimeout(() => sounds.playTone(880, 'sine', 0.5, 0.3), 300);

    fireConfetti({
      particleCount: 120,
      spread: 100,
      origin: { y: 0.4 }
    });

    unlockPage(6);
    setTimeout(() => {
      goToPage(6);
    }, 1600);
  };

  const handleBlowCandle = () => {
    if (candleBlown) return;
    setCandleBlown(true);
    sounds.bubble();
    setTimeout(() => sounds.fanfare(), 300);
    fireConfetti({
      particleCount: 140,
      spread: 95,
      origin: { y: 0.6 }
    });
    unlockPage(7);
  };

  const initScratchCanvas = useCallback(() => {
    const canvas = scratchCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    scratchPixelCount.current[couponIndex] = scratchPixelCount.current[couponIndex] || 0;

    if (scratchedSet.has(couponIndex)) {
      ctx.clearRect(0, 0, width, height);
      return;
    }

    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = '#f472b6';
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = '#fb7185';
    for (let i = 0; i < width; i += 24) {
      ctx.fillRect(i, 0, 12, height);
    }

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 15px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('✨ Scratch With Love, Bubu! ✨', width / 2, height / 2 + 5);
  }, [couponIndex, scratchedSet]);

  useEffect(() => {
    if (currentPage === 7) {
      initScratchCanvas();
    }
  }, [currentPage, couponIndex, initScratchCanvas]);

  const scratchAtPoint = (clientX, clientY) => {
    const canvas = scratchCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = (clientX - rect.left) * (canvas.width / rect.width);
    const y = (clientY - rect.top) * (canvas.height / rect.height);

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 24, 0, Math.PI * 2);
    ctx.fill();

    sounds.playTone(600 + Math.random() * 200, 'sine', 0.03, 0.04);

    scratchPixelCount.current[couponIndex] = (scratchPixelCount.current[couponIndex] || 0) + 1;
    if (scratchPixelCount.current[couponIndex] > 26 && !scratchedSet.has(couponIndex)) {
      setScratchedSet(prev => {
        const next = new Set(prev).add(couponIndex);
        if (next.size === COUPONS.length) {
          unlockPage(8);
          sounds.fanfare();
          fireConfetti({ particleCount: 95, spread: 85 });
        }
        return next;
      });
    }
  };

  useEffect(() => {
    if (currentPage === 9) {
      setTypedText('');
      setIsTypingDone(false);
      let index = 0;
      const interval = setInterval(() => {
        if (index < LOVE_LETTER_TEXT.length) {
          setTypedText(LOVE_LETTER_TEXT.slice(0, index + 1));
          index++;
          if (index % 10 === 0) {
            sounds.typeClick();
          }
        } else {
          clearInterval(interval);
          setIsTypingDone(true);
          unlockPage(10);
        }
      }, 22);

      return () => clearInterval(interval);
    }
  }, [currentPage, unlockPage]);

  const handleSkipTyping = () => {
    setTypedText(LOVE_LETTER_TEXT);
    setIsTypingDone(true);
    unlockPage(10);
    sounds.chime();
  };

  const triggerEmojiStorm = useCallback(() => {
    sounds.fanfare();

    // 1. DOM Shower Particles for Maximum Clarity & Vibrant Visibility
    const icons = ['💋', '🌹', '💖', '🥀', '💕', '🥰', '💐', '💗', '✨', '😘'];
    const newDomItems = Array.from({ length: 65 }).map((_, i) => ({
      id: Math.random() + Date.now() + i,
      char: icons[i % icons.length],
      left: `${Math.random() * 92 + 2}%`,
      top: `${-10 - Math.random() * 30}%`,
      duration: `${2.8 + Math.random() * 3.2}s`,
      delay: `${Math.random() * 1.5}s`,
      size: `${26 + Math.random() * 30}px`,
      sway: `${Math.random() * 40 - 20}px`
    }));
    setDomKisses(newDomItems);

    // 2. High-Performance Fullscreen Canvas Particle System
    const canvas = stormCanvasRef.current;
    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const ctx = canvas.getContext('2d');

      const emojiList = ['💋', '🌹', '💖', '✨', '💐', '🥀', '💗'];
      const particles = [];
      const particleTotal = 85;

      for (let i = 0; i < particleTotal; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: -50 - Math.random() * canvas.height,
          vx: Math.random() * 3 - 1.5,
          vy: Math.random() * 4 + 3.5,
          char: emojiList[Math.floor(Math.random() * emojiList.length)],
          size: Math.random() * 26 + 22,
          rotation: Math.random() * 360,
          rotationSpeed: Math.random() * 4 - 2,
          alpha: 1
        });
      }

      particlesRef.current = particles;

      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }

      const renderLoop = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        let activeCount = 0;

        particlesRef.current.forEach((p) => {
          p.x += p.vx + Math.sin(p.y * 0.02) * 1.5;
          p.y += p.vy;
          p.rotation += p.rotationSpeed;

          if (p.y < canvas.height + 60) {
            activeCount++;
          }

          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          ctx.font = `${p.size}px serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(p.char, 0, 0);
          ctx.restore();
        });

        if (activeCount > 0) {
          animationFrameId.current = requestAnimationFrame(renderLoop);
        }
      };

      animationFrameId.current = requestAnimationFrame(renderLoop);
    }

    // 3. Multi-point canvas confetti cannon
    const duration = 4.5 * 1000;
    const animationEnd = Date.now() + duration;
    const colors = ['#e11d48', '#f43f5e', '#ec4899', '#fda4af', '#fb7185', '#ffd166'];

    (function frame() {
      confetti({
        particleCount: 7,
        angle: 60,
        spread: 65,
        origin: { x: 0 },
        colors: colors
      });
      confetti({
        particleCount: 7,
        angle: 120,
        spread: 65,
        origin: { x: 1 },
        colors: colors
      });

      if (Date.now() < animationEnd) {
        requestAnimationFrame(frame);
      }
    })();
  }, []);

  useEffect(() => {
    if (currentPage === 10) {
      triggerEmojiStorm();
    }
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [currentPage, triggerEmojiStorm]);

  // Handle window resizing for particle canvas
  useEffect(() => {
    const handleResize = () => {
      if (stormCanvasRef.current) {
        stormCanvasRef.current.width = window.innerWidth;
        stormCanvasRef.current.height = window.innerHeight;
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const heartsBackground = useMemo(() => {
    return Array.from({ length: 16 }).map((_, i) => ({
      id: i,
      left: `${(i * 6.2 + Math.random() * 3)}%`,
      duration: `${7 + (i % 6) * 1.5}s`,
      delay: `${(i % 5) * 1.2}s`,
      size: `${18 + (i % 4) * 8}px`,
      char: ['💖', '🌸', '✨', '🧸', '💕', '🧁', '⭐'][i % 7]
    }));
  }, []);

  const currentPhoto = BUBU_PHOTOS[photoIndex];
  const allCouponsScratched = scratchedSet.size === COUPONS.length;

  return (
    <div 
      onMouseMove={handleMouseMove}
      className="min-h-screen bg-gradient-to-b from-rose-100 via-pink-50 to-pink-100 text-slate-800 flex flex-col justify-between items-center p-3 sm:p-6 relative overflow-x-hidden select-none font-sans"
    >
      {/* FULLSCREEN BLOWOUT CANVAS & EMOJI STORM (Z-Index 50) */}
      {currentPage === 10 && (
        <>
          <canvas
            ref={stormCanvasRef}
            className="fixed inset-0 pointer-events-none z-50 w-full h-full"
          />
          <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
            {domKisses.map((k) => (
              <span
                key={k.id}
                style={{
                  left: k.left,
                  top: k.top,
                  fontSize: k.size,
                  animationDuration: k.duration,
                  animationDelay: k.delay
                }}
                className="fixed animate-bounce pointer-events-none drop-shadow-md select-none transition-transform"
              >
                {k.char}
              </span>
            ))}
          </div>
        </>
      )}

      {/* Ambient background particles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {heartsBackground.map((item) => (
          <span
            key={item.id}
            style={{
              left: item.left,
              animationDuration: item.duration,
              animationDelay: item.delay,
              fontSize: item.size
            }}
            className="fixed pointer-events-none opacity-30 animate-pulse"
          >
            {item.char}
          </span>
        ))}
      </div>

      {/* Floating Audio Toggle */}
      <div className="fixed top-3 right-3 sm:top-4 sm:right-4 z-40">
        <button
          onClick={toggleSound}
          className="bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-bold text-pink-600 shadow-md border border-pink-200 flex items-center gap-1.5 hover:bg-white active:scale-95 transition"
        >
          {soundOn ? <Volume2 size={16} /> : <VolumeX size={16} />}
          <span>{soundOn ? "Sound On" : "Sound Off"}</span>
        </button>
      </div>

      {/* Sticky Story Navigation Bar */}
      <header className="w-full max-w-xl mx-auto mt-1 z-30 flex flex-col items-center">
        <div className="flex items-center justify-between w-full px-2 mb-2">
          <button
            onClick={goBack}
            disabled={currentPage === 1}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 transition shadow-sm ${
              currentPage === 1
                ? 'opacity-40 bg-pink-100/60 text-pink-400 cursor-not-allowed'
                : 'bg-white/90 text-pink-700 hover:bg-pink-100 border border-pink-200 active:scale-95'
            }`}
          >
            <ChevronLeft size={16} />
            <span>Back</span>
          </button>

          <div className="flex items-center gap-1.5">
            <span className="text-lg">🧸</span>
            <span className="text-xs px-3 py-1 bg-pink-100 text-pink-700 font-bold rounded-full border border-pink-200 shadow-sm">
              Chapter {currentPage} / {totalPages}
            </span>
          </div>

          <button
            onClick={goNext}
            disabled={currentPage === totalPages || !unlockedPages[currentPage + 1]}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 transition shadow-sm ${
              currentPage === totalPages || !unlockedPages[currentPage + 1]
                ? 'opacity-40 bg-pink-100/60 text-pink-400 cursor-not-allowed'
                : 'bg-pink-500 text-white hover:bg-pink-600 shadow-pink-500/30 active:scale-95'
            }`}
          >
            <span>Next</span>
            {unlockedPages[currentPage + 1] ? <ChevronRight size={16} /> : <Lock size={13} className="ml-0.5" />}
          </button>
        </div>

        {/* Chapter Progression Indicators */}
        <div className="w-full grid grid-cols-10 gap-1 px-1">
          {Array.from({ length: totalPages }).map((_, idx) => {
            const pageNum = idx + 1;
            const isUnlocked = unlockedPages[pageNum];
            const isCurrent = pageNum === currentPage;
            return (
              <button
                key={idx}
                disabled={!isUnlocked}
                onClick={() => goToPage(pageNum)}
                title={`Chapter ${pageNum} ${!isUnlocked ? '(Complete current chapter to unlock)' : ''}`}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  isCurrent
                    ? 'bg-pink-600 scale-110 shadow-sm'
                    : isUnlocked
                    ? 'bg-pink-400 hover:bg-pink-500 cursor-pointer'
                    : 'bg-pink-200/50 cursor-not-allowed opacity-60'
                }`}
              />
            );
          })}
        </div>
      </header>

      {/* Main Container */}
      <main className="w-full max-w-xl mx-auto my-auto py-3 z-10 flex flex-col items-center justify-center relative min-h-[560px]">

        {/* ================= CHAPTER 1: 3D PARALLAX COVER (29TH JULY) ================= */}
        {}
        {currentPage === 1 && (
          <div className="w-full" style={{ perspective: '1200px' }}>
            <div 
              style={{
                transform: `rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
                transition: 'transform 0.15s ease-out'
              }}
              className="bg-white/85 backdrop-blur-md rounded-3xl p-6 sm:p-9 text-center border-2 border-pink-200/90 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-pink-300/40 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute -bottom-10 -left-10 w-28 h-28 bg-rose-300/40 rounded-full blur-xl pointer-events-none" />

              <div className="relative mx-auto w-32 h-32 my-2 flex items-center justify-center">
                <div className="absolute inset-0 bg-pink-200/60 rounded-full blur-md animate-pulse" />
                <svg className="w-28 h-28 relative z-10 drop-shadow-md hover:scale-105 transition-transform" viewBox="0 0 120 120" fill="none">
                  <circle cx="34" cy="30" r="14" fill="#FFE2B8" stroke="#483829" strokeWidth="3"/>
                  <circle cx="34" cy="30" r="8" fill="#F8B4C0"/>
                  <circle cx="86" cy="30" r="14" fill="#FFE2B8" stroke="#483829" strokeWidth="3"/>
                  <circle cx="86" cy="30" r="8" fill="#F8B4C0"/>
                  <ellipse cx="60" cy="65" rx="42" ry="38" fill="#FFF2DF" stroke="#483829" strokeWidth="3.5"/>
                  <ellipse cx="37" cy="74" rx="8" ry="5" fill="#FF8BA7" opacity="0.6"/>
                  <ellipse cx="83" cy="74" rx="8" ry="5" fill="#FF8BA7" opacity="0.6"/>
                  <circle cx="44" cy="62" r="4.5" fill="#2E2018"/>
                  <circle cx="46" cy="60" r="1.5" fill="#FFFFFF"/>
                  <circle cx="76" cy="62" r="4.5" fill="#2E2018"/>
                  <circle cx="78" cy="60" r="1.5" fill="#FFFFFF"/>
                  <ellipse cx="60" cy="72" rx="13" ry="10" fill="#FFFFFF"/>
                  <ellipse cx="60" cy="68" rx="4" ry="3" fill="#3D291F"/>
                  <path d="M57 73C58.5 75 61.5 75 63 73" stroke="#3D291F" strokeWidth="2.5" strokeLinecap="round"/>
                  <polygon points="60,2 45,34 75,34" fill="#FF6584" stroke="#FFF" strokeWidth="2"/>
                  <circle cx="60" cy="2" r="4" fill="#FFD166"/>
                </svg>
                <div className="absolute -bottom-1 -right-1 text-2xl animate-bounce">🎂</div>
              </div>

              <span className="inline-block px-3.5 py-1 bg-rose-100 text-rose-600 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
                ✨ Special Date: 29 July ✨
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-pink-600 tracking-wide font-serif">
                Happy Birthday, My Jaanu!
              </h1>
              <p className="text-sm text-slate-600 mt-2 px-2 font-medium">
                Welcome to your fairy surprise world handcrafted by Dudu! Tilt your screen or cursor to explore! 💖
              </p>

              <div className="mt-4 p-3 bg-pink-50/80 border border-pink-200/80 rounded-2xl flex items-center justify-around text-xs text-pink-700 font-semibold">
                <div>🎈 Pure Love</div>
                <div>•</div>
                <div>🧁 Sweetest Bubu</div>
                <div>•</div>
                <div>✨ Endless Joy</div>
              </div>

              <button
                onClick={handleOpenSurprise}
                className="mt-6 w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 text-white font-bold text-base shadow-lg shadow-pink-500/30 hover:shadow-pink-500/50 transform active:scale-95 transition flex items-center justify-center gap-2"
              >
                <span>Open Surprise World 🎁</span>
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}

        {/* ================= CHAPTER 2: HEART MELT & CONFETTI PORTAL ================= */}
        {}
        {currentPage === 2 && (
          <div className="bg-white/85 backdrop-blur-md rounded-3xl p-6 sm:p-9 w-full border-2 border-rose-200 shadow-xl text-center">
            <div className="text-6xl my-3 animate-pulse">🧸🍫💖</div>
            <h2 className="text-2xl sm:text-3xl font-bold text-pink-700 font-serif">
              "You Make My Heart Melt..."
            </h2>
            <p className="text-xl text-rose-600 font-serif italic font-bold my-4 leading-relaxed">
              Like warm molten chocolate on a rainy day, your voice brings sweetest tranquility to my entire soul, Bubu.
            </p>

            <p className="text-xs text-slate-500 mb-6 px-4">
              Blast the confetti below to unlock the magical 10-photo album!
            </p>

            <div className="space-y-3">
              <button
                onClick={handleBlastConfetti}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-pink-500 to-rose-500 text-white font-bold text-base sm:text-lg shadow-xl shadow-rose-400/30 active:scale-95 transform transition flex items-center justify-center gap-3"
              >
                <PartyPopper size={22} />
                <span>Blast Confetti & Enter Album 🎉</span>
              </button>

              <button
                onClick={goBack}
                className="w-full py-2.5 rounded-xl bg-slate-100 text-slate-600 text-xs font-bold hover:bg-slate-200 transition flex items-center justify-center gap-1"
              >
                <ArrowLeft size={14} /> Back to Cover
              </button>
            </div>
          </div>
        )}

        {/* ================= CHAPTER 3: FULL UNTOUCHED 10-PHOTO ALBUM ================= */}
        {}
        {currentPage === 3 && (
          <div className="bg-white/90 backdrop-blur-md rounded-3xl p-4 sm:p-7 w-full border border-pink-200 shadow-xl text-center">
            <span className="text-xs uppercase tracking-widest font-bold text-pink-500">
              Exhibit: The Birthday Queen ({photoIndex + 1} of {BUBU_PHOTOS.length})
            </span>
            <h2 className="text-2xl font-bold text-pink-700 font-serif mt-1">Who Is This Birthday Girl?</h2>
            <p className="text-xs text-slate-500 mb-3">
              Full uncropped portraits! Tap image to shower love & flip mood. (Explore at least 5 to unlock next chapter!)
            </p>

            {/* Interactive Portrait Box with Floating Tap Reactions */}
            <div
              onClick={handlePhotoTap}
              className={`relative mx-auto w-full max-w-md h-[440px] sm:h-[470px] bg-gradient-to-b ${currentPhoto.color} rounded-3xl border-4 border-white shadow-xl overflow-hidden cursor-pointer transform transition-all active:scale-95 flex flex-col justify-between p-3 select-none`}
            >
              {/* Tap Emoji Floating Emitters */}
              <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden">
                {photoReactions.map((r) => (
                  <span
                    key={r.id}
                    style={{
                      left: r.x,
                      top: r.y,
                      transform: `rotate(${r.angle}deg)`,
                      animationDuration: `${r.duration}s`
                    }}
                    className="absolute text-3xl animate-ping select-none drop-shadow"
                  >
                    {r.emoji}
                  </span>
                ))}
              </div>

              {/* Photo Frame with object-contain */}
              <div className="relative w-full h-[290px] sm:h-[310px] rounded-2xl overflow-hidden bg-rose-50/90 flex items-center justify-center shadow-inner p-1">
                {!imgErrorState[currentPhoto.id] ? (
                  <img
                    src={`/img/${currentPhoto.filename}`}
                    alt={currentPhoto.title}
                    onError={(e) => {
                      if (currentPhoto.altFilename && !e.target.dataset.triedAlt) {
                        e.target.dataset.triedAlt = 'true';
                        e.target.src = `/img/${currentPhoto.altFilename}`;
                      } else {
                        setImgErrorState(prev => ({ ...prev, [currentPhoto.id]: true }));
                      }
                    }}
                    className={`max-w-full max-h-full object-contain rounded-xl transition-transform duration-300 ${
                      isPhotoBouncing ? 'scale-105' : 'scale-100'
                    }`}
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center p-3 text-center text-pink-600">
                    <span className="text-5xl mb-2">{currentPhoto.emoji}</span>
                    <span className="text-xs font-bold">{currentPhoto.title}</span>
                    <span className="text-[10px] text-pink-400 mt-1">Make sure {currentPhoto.filename} is in /public/img/</span>
                  </div>
                )}

                <div className="absolute top-2.5 right-2.5 bg-black/60 backdrop-blur-md text-white px-2.5 py-0.5 rounded-full text-xs font-bold shadow">
                  {photoIndex + 1} / {BUBU_PHOTOS.length}
                </div>
              </div>

              <div className="bg-white/95 rounded-2xl p-2.5 sm:p-3 shadow-sm border border-pink-200/70 text-left">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs sm:text-sm font-bold text-pink-700 truncate">{currentPhoto.title}</h4>
                  <span className="text-base">{currentPhoto.emoji}</span>
                </div>
                <p className="text-[11px] text-slate-500 font-semibold">{currentPhoto.subtitle}</p>
                <p className="text-[11px] text-slate-700 font-medium mt-1 leading-snug line-clamp-2">
                  {currentPhoto.caption}
                </p>
              </div>

              <div className="text-[10px] text-pink-600 font-bold text-center">
                ✨ Tap portrait to flip & shower kisses! ✨
              </div>
            </div>

            {/* Thumbnail selector */}
            <div className="flex items-center justify-center gap-1.5 mt-3 overflow-x-auto py-1 px-1">
              {BUBU_PHOTOS.map((p, idx) => (
                <button
                  key={p.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    sounds.pop();
                    setPhotoIndex(idx);
                    markPhotoViewed(idx);
                  }}
                  className={`w-7 h-7 rounded-lg text-xs flex items-center justify-center transition border ${
                    idx === photoIndex
                      ? 'bg-pink-600 text-white font-bold border-pink-700 scale-110 shadow-sm'
                      : 'bg-white text-slate-600 hover:bg-pink-100 border-pink-200'
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>

            <div className="flex gap-2 mt-3">
              <button
                onClick={handlePrevPhoto}
                className="w-1/2 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition flex items-center justify-center gap-1"
              >
                <ChevronLeft size={14} /> Prev Portrait
              </button>
              <button
                onClick={handleNextPhoto}
                className="w-1/2 py-2 rounded-xl bg-pink-100 hover:bg-pink-200 text-pink-700 font-bold text-xs transition flex items-center justify-center gap-1"
              >
                Next Portrait <ChevronRight size={14} />
              </button>
            </div>

            <div className="mt-4 flex gap-2">
              <button
                onClick={goBack}
                className="w-1/3 py-3 rounded-2xl bg-slate-100 text-slate-600 font-semibold text-xs hover:bg-slate-200 transition"
              >
                ← Back
              </button>
              <button
                onClick={() => goToPage(4)}
                disabled={!unlockedPages[4]}
                className={`w-2/3 py-3 rounded-2xl font-bold text-xs shadow-md transition flex items-center justify-center gap-1.5 ${
                  unlockedPages[4]
                    ? 'bg-pink-500 text-white shadow-pink-500/30 hover:bg-pink-600 active:scale-95'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                <span>Make A Wish Timer ⏱️</span>
                {unlockedPages[4] ? <ArrowRight size={14} /> : <Lock size={13} />}
              </button>
            </div>
          </div>
        )}

        {/* ================= CHAPTER 4: 10-SECOND MAKE-A-WISH TIMER ================= */}
        {}
        {currentPage === 4 && (
          <div className="bg-white/85 backdrop-blur-md rounded-3xl p-6 sm:p-8 w-full border border-pink-200 shadow-xl text-center">
            <span className="text-xs uppercase tracking-widest font-bold text-pink-500">Sacred Moment</span>
            <h2 className="text-2xl font-bold text-pink-700 font-serif mt-1">Make Your Sweetest Wish ✨</h2>
            <p className="text-xs text-slate-600 mt-2 px-3">
              Close your eyes, breathe gently, and tell your wish to the stars. The timer must complete to unlock the next chapter!
            </p>

            <div className="relative w-44 h-44 mx-auto my-6 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90">
                <circle cx="88" cy="88" r="74" stroke="#fce7f3" strokeWidth="12" fill="none" />
                <circle
                  cx="88"
                  cy="88"
                  r="74"
                  stroke="#ec4899"
                  strokeWidth="12"
                  strokeLinecap="round"
                  fill="none"
                  strokeDasharray="465"
                  strokeDashoffset={465 - (timerSeconds / 10) * 465}
                  className="transition-all duration-1000 linear"
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-4xl font-extrabold text-pink-600">{timerSeconds}</span>
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Seconds</span>
              </div>
            </div>

            <p className="text-xs font-semibold text-rose-600 min-h-[22px]">
              {timerDone
                ? "Your wish has been woven into the stars! Chapter unlocked! 🌟"
                : timerActive
                ? "Close your eyes & picture your happiest dream... ✨"
                : "Press start to begin your 10 seconds of wishing!"}
            </p>

            <div className="mt-5 space-y-2.5">
              {!timerActive && !timerDone && (
                <button
                  onClick={handleStartTimer}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold text-sm shadow-lg shadow-pink-500/30 active:scale-95 transition"
                >
                  Start 10s Wish Timer 🌟
                </button>
              )}

              {timerDone && (
                <button
                  onClick={() => goToPage(5)}
                  className="w-full py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm shadow-lg shadow-emerald-500/30 transition animate-bounce flex items-center justify-center gap-2"
                >
                  <span>Proceed to Wish Capsule 💌</span>
                  <ArrowRight size={16} />
                </button>
              )}

              <div className="flex gap-2 pt-1">
                <button
                  onClick={goBack}
                  className="w-1/2 py-2.5 rounded-xl bg-slate-100 text-slate-600 text-xs font-bold hover:bg-slate-200 transition"
                >
                  ← Back
                </button>
                <button
                  onClick={goNext}
                  disabled={!unlockedPages[5]}
                  className={`w-1/2 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1 transition ${
                    unlockedPages[5]
                      ? 'bg-pink-100 text-pink-700 hover:bg-pink-200'
                      : 'bg-slate-100 text-slate-400 cursor-not-allowed opacity-50'
                  }`}
                >
                  Next Page {!unlockedPages[5] && <Lock size={12} />}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ================= CHAPTER 5: SECRET WISH CAPSULE ================= */}
        {}
        {currentPage === 5 && (
          <div className="bg-white/85 backdrop-blur-md rounded-3xl p-6 sm:p-8 w-full border border-pink-200 shadow-xl text-center">
            <span className="text-xs uppercase tracking-widest font-bold text-pink-500">Eternal Starlight</span>
            <h2 className="text-2xl font-bold text-pink-700 font-serif mt-1">Secret Wish Capsule</h2>
            <p className="text-xs text-slate-600 mt-2 px-1">
              Type your true birthday wish below. You cannot move forward until you seal and launch it to the stars!
            </p>

            <div className={`my-4 mx-auto w-24 h-24 bg-pink-100 rounded-3xl border-2 border-dashed border-pink-400 flex items-center justify-center text-4xl shadow-inner transition-transform duration-1000 ${wishLocked ? '-translate-y-96 opacity-0 scale-50' : ''}`}>
              {wishLocked ? "🚀" : "🛸✨"}
            </div>

            <div className="relative mt-2">
              <textarea
                value={secretWish}
                disabled={wishLocked}
                onChange={(e) => {
                  setSecretWish(e.target.value);
                  if (wishError) setWishError(false);
                }}
                rows={3}
                placeholder="Write your heartfelt wish here, Jaanu... (Mandatory before moving ahead!)"
                className={`w-full p-3.5 rounded-2xl border-2 ${
                  wishError ? 'border-rose-500 bg-rose-50/50' : 'border-pink-300'
                } focus:border-pink-500 focus:outline-none text-xs text-slate-700 bg-white/90 resize-none shadow-sm transition placeholder-pink-300`}
              />
              {wishError && (
                <span className="text-xs text-rose-500 font-semibold block mt-1 text-left pl-1">
                  ⚠️ Type your wish first so Dudu and the universe can hear it!
                </span>
              )}
            </div>

            <button
              onClick={handleSendWish}
              disabled={wishLocked}
              className="mt-4 w-full py-3.5 rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 text-white font-bold text-sm shadow-lg shadow-purple-500/30 active:scale-95 transition flex items-center justify-center gap-2"
            >
              {wishLocked ? <Check size={16} /> : <Send size={16} />}
              <span>{wishLocked ? "Wish Sealed & Sent to Universe! 🚀" : "Lock & Send Wish To Universe 🚀✨"}</span>
            </button>

            <div className="flex gap-2 mt-3">
              <button
                onClick={goBack}
                className="w-1/2 py-2.5 rounded-xl bg-slate-100 text-slate-600 text-xs font-bold hover:bg-slate-200 transition"
              >
                ← Back
              </button>
              <button
                onClick={goNext}
                disabled={!unlockedPages[6]}
                className={`w-1/2 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1 transition ${
                  unlockedPages[6]
                    ? 'bg-pink-100 text-pink-700 hover:bg-pink-200'
                    : 'bg-slate-100 text-slate-400 cursor-not-allowed opacity-50'
                }`}
              >
                Next (Cake) {!unlockedPages[6] && <Lock size={12} />}
              </button>
            </div>
          </div>
        )}

        {/* ================= CHAPTER 6: BLOW OUT CANDLES & CAKE ================= */}
        {}
        {currentPage === 6 && (
          <div className="bg-white/85 backdrop-blur-md rounded-3xl p-6 w-full border border-pink-200 shadow-xl text-center">
            <span className="text-xs uppercase tracking-widest font-bold text-pink-500">Ceremony Time</span>
            <h2 className="text-2xl font-bold text-pink-700 font-serif mt-1">Blow Out Your Candle! 🎂</h2>
            <p className="text-xs text-slate-600 mt-2 px-2">
              {candleBlown
                ? "The candle is blown out! Happy 29th July Bubu! ✨🎂"
                : "The candles are glowing! Tap 'Blow Candle Now' to blow them out and unlock next!"}
            </p>

            <div className="relative w-60 h-52 mx-auto my-3 flex items-center justify-center">
              {candleBlown && (
                <div className="absolute top-6 text-2xl z-30 font-bold text-slate-400 animate-ping">
                  💨 ✨
                </div>
              )}

              <svg className="w-full h-full" viewBox="0 0 200 180" fill="none">
                <ellipse cx="100" cy="165" rx="80" ry="12" fill="#E2E8F0" stroke="#CBD5E1" strokeWidth="2" />
                <ellipse cx="100" cy="162" rx="72" ry="9" fill="#FFFFFF" />

                <rect x="35" y="105" width="130" height="50" rx="10" fill="#F472B6" />
                <path d="M35 115 C45 125, 55 110, 65 122 C75 110, 85 126, 95 112 C105 124, 115 112, 125 124 C135 114, 145 125, 165 115" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" fill="none" />
                <rect x="42" y="112" width="116" height="6" fill="#FBCFE8" rx="3" />

                <rect x="55" y="65" width="90" height="42" rx="8" fill="#F9A8D4" />
                <path d="M55 74 C65 82, 75 70, 85 82 C95 72, 105 84, 115 72 C125 82, 135 72, 145 76" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" fill="none" />

                <rect x="94" y="32" width="12" height="34" rx="3" fill="#67E8F9" stroke="#0891B2" strokeWidth="1.5" />
                <line x1="100" y1="32" x2="100" y2="24" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />

                {!candleBlown && (
                  <g className="origin-bottom animate-bounce">
                    <path d="M100 4 C106 13, 108 19, 100 24 C92 19, 94 13, 100 4 Z" fill="#FB5607" />
                    <circle cx="100" cy="18" r="3" fill="#FFBE0B" />
                  </g>
                )}
              </svg>
            </div>

            {candleBlown && (
              <div className="my-2 p-2 bg-emerald-50 border border-emerald-300 rounded-xl text-emerald-700 text-xs font-bold animate-pulse">
                🎉 YAAAAAY! May all your dreams come true! Happy Birthday Bubu! 🥳👏
              </div>
            )}

            <div className="mt-3 space-y-2">
              {!candleBlown ? (
                <button
                  onClick={handleBlowCandle}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-500 text-white font-bold text-sm shadow-lg shadow-rose-500/30 active:scale-95 transition"
                >
                  Blow Candle Now 💨🎂
                </button>
              ) : (
                <button
                  onClick={() => goToPage(7)}
                  className="w-full py-3.5 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm shadow-lg shadow-purple-600/30 transition flex items-center justify-center gap-2"
                >
                  <span>Open VIP Scratch Coupons 🎟️</span>
                  <ArrowRight size={16} />
                </button>
              )}

              <div className="flex gap-2 pt-1">
                <button
                  onClick={goBack}
                  className="w-1/2 py-2 rounded-xl bg-slate-100 text-slate-600 text-xs font-bold hover:bg-slate-200 transition"
                >
                  ← Back
                </button>
                <button
                  onClick={goNext}
                  disabled={!unlockedPages[7]}
                  className={`w-1/2 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1 transition ${
                    unlockedPages[7]
                      ? 'bg-pink-100 text-pink-700 hover:bg-pink-200'
                      : 'bg-slate-100 text-slate-400 cursor-not-allowed opacity-50'
                  }`}
                >
                  Next Page {!unlockedPages[7] && <Lock size={12} />}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ================= CHAPTER 7: VIP SCRATCH COUPONS ================= */}
        {}
        {currentPage === 7 && (
          <div className="bg-white/85 backdrop-blur-md rounded-3xl p-5 sm:p-6 w-full border border-pink-200 shadow-xl text-center">
            <span className="text-xs uppercase tracking-widest font-bold text-pink-500">Boyfriend Dudu's Gifts</span>
            <h2 className="text-2xl font-bold text-pink-700 font-serif mt-1">VIP Scratch Coupons 🎟️</h2>
            <p className="text-xs text-slate-500 mb-2">
              Scratch each card to reveal! You must scratch <strong>all 3 coupons</strong> to unlock the next chapter!
            </p>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-pink-100 border border-pink-300 text-pink-700 rounded-full text-xs font-bold mb-3 shadow-sm">
              <span>Scratched Revealed: {scratchedSet.size} / {COUPONS.length}</span>
              {allCouponsScratched && <span>✅ (All Unlocked!)</span>}
            </div>

            <div className="relative w-full max-w-[300px] h-[170px] mx-auto rounded-2xl overflow-hidden border-2 border-pink-300 shadow-md">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-50 to-rose-100 flex flex-col items-center justify-center p-3 text-center">
                <span className="text-3xl mb-1">{COUPONS[couponIndex].icon}</span>
                <h3 className="text-xs font-extrabold text-pink-700 leading-tight">
                  {COUPONS[couponIndex].title}
                </h3>
                <p className="text-[11px] text-slate-600 mt-1">
                  {COUPONS[couponIndex].desc}
                </p>
                <span className="mt-2 text-[9px] uppercase font-bold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-300">
                  {scratchedSet.has(couponIndex) ? 'Revealed & Claimed ✅' : 'Scratch Above 👆'}
                </span>
              </div>

              <canvas
                ref={scratchCanvasRef}
                width={300}
                height={170}
                onMouseDown={(e) => { isScratching.current = true; scratchAtPoint(e.clientX, e.clientY); }}
                onMouseUp={() => { isScratching.current = false; }}
                onMouseMove={(e) => { if (isScratching.current) scratchAtPoint(e.clientX, e.clientY); }}
                onTouchStart={(e) => {
                  isScratching.current = true;
                  if (e.touches[0]) scratchAtPoint(e.touches[0].clientX, e.touches[0].clientY);
                }}
                onTouchEnd={() => { isScratching.current = false; }}
                onTouchMove={(e) => {
                  if (isScratching.current && e.touches[0]) {
                    scratchAtPoint(e.touches[0].clientX, e.touches[0].clientY);
                  }
                }}
                className="absolute inset-0 z-10 w-full h-full cursor-crosshair touch-none"
              />
            </div>

            <div className="flex items-center justify-center gap-2 mt-3">
              {COUPONS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    sounds.pop();
                    setCouponIndex(idx);
                  }}
                  className={`px-3 py-1 text-xs rounded-xl font-bold border transition ${
                    idx === couponIndex
                      ? 'bg-pink-600 text-white border-pink-700 shadow-sm'
                      : 'bg-white text-slate-600 border-pink-200 hover:bg-pink-50'
                  }`}
                >
                  Coupon {idx + 1} {scratchedSet.has(idx) ? '✓' : ''}
                </button>
              ))}
            </div>

            <div className="mt-4 flex gap-2">
              <button
                onClick={() => {
                  sounds.pop();
                  setCouponIndex((prev) => (prev + 1) % COUPONS.length);
                }}
                className="w-1/2 py-2.5 rounded-xl bg-amber-500 text-white font-bold text-xs shadow-md shadow-amber-500/20 active:scale-95 transition"
              >
                Next Coupon 🎟️
              </button>
              <button
                onClick={() => {
                  if (allCouponsScratched) {
                    goToPage(8);
                  } else {
                    sounds.playTone(220, 'sawtooth', 0.2, 0.2);
                  }
                }}
                disabled={!allCouponsScratched}
                className={`w-1/2 py-2.5 rounded-xl font-bold text-xs shadow-md transition flex items-center justify-center gap-1 ${
                  allCouponsScratched
                    ? 'bg-pink-600 text-white hover:bg-pink-700 active:scale-95'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                <span>Soulmate Quiz</span>
                {allCouponsScratched ? <ArrowRight size={14} /> : <Lock size={13} />}
              </button>
            </div>

            <div className="flex gap-2 mt-2">
              <button
                onClick={goBack}
                className="w-1/2 py-2 rounded-xl bg-slate-100 text-slate-600 text-xs font-bold hover:bg-slate-200 transition"
              >
                ← Back
              </button>
              <button
                onClick={goNext}
                disabled={!allCouponsScratched}
                className={`w-1/2 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1 transition ${
                  allCouponsScratched
                    ? 'bg-pink-100 text-pink-700 hover:bg-pink-200'
                    : 'bg-slate-100 text-slate-400 cursor-not-allowed opacity-50'
                }`}
              >
                Next Page {!allCouponsScratched && <Lock size={12} />}
              </button>
            </div>
          </div>
        )}

        {/* ================= CHAPTER 8: SOULMATE QUIZ ================= */}
        {}
        {currentPage === 8 && (
          <div className="bg-white/85 backdrop-blur-md rounded-3xl p-6 w-full border border-pink-200 shadow-xl text-center">
            <span className="text-xs uppercase tracking-widest font-bold text-pink-500">Love Verification</span>
            <h2 className="text-2xl font-bold text-pink-700 font-serif mt-1">Soulmate Quiz 💞</h2>

            <div className="flex justify-between items-center text-xs font-bold text-pink-600 my-2 px-1">
              <span>Question {quizIndex + 1} of {QUIZ_QUESTIONS.length}</span>
              <span className="bg-pink-100 px-2 py-0.5 rounded-full">Love Score: 100%</span>
            </div>

            <div className="min-h-[60px] flex items-center justify-center p-3 bg-pink-50/60 rounded-2xl border border-pink-200">
              <p className="text-xs font-semibold text-slate-800">
                {QUIZ_QUESTIONS[quizIndex].question}
              </p>
            </div>

            <div className="mt-3 space-y-2">
              {QUIZ_QUESTIONS[quizIndex].options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    sounds.chime();
                    setSelectedAnswer(opt);
                    fireConfetti({ particleCount: 25, spread: 50 });
                  }}
                  className={`w-full p-2.5 text-xs font-semibold rounded-xl border text-left flex items-center justify-between shadow-sm transition active:scale-95 ${
                    selectedAnswer === opt
                      ? 'bg-pink-100 border-pink-500 text-pink-700 font-bold'
                      : 'bg-white border-pink-200 text-slate-700 hover:bg-pink-50'
                  }`}
                >
                  <span>{opt.text}</span>
                  <Heart size={14} className="text-pink-400" />
                </button>
              ))}
            </div>

            {selectedAnswer && (
              <div className="mt-3 p-2.5 bg-pink-100/90 text-pink-700 rounded-xl text-xs font-bold border border-pink-300 animate-pulse">
                {selectedAnswer.note}
              </div>
            )}

            <div className="mt-4">
              {selectedAnswer && quizIndex < QUIZ_QUESTIONS.length - 1 && (
                <button
                  onClick={() => {
                    sounds.pop();
                    setSelectedAnswer(null);
                    setQuizIndex((prev) => prev + 1);
                  }}
                  className="w-full py-2.5 rounded-xl bg-pink-500 text-white font-bold text-xs shadow-md transition"
                >
                  Next Question →
                </button>
              )}

              {selectedAnswer && quizIndex === QUIZ_QUESTIONS.length - 1 && (
                <button
                  onClick={() => {
                    unlockPage(9);
                    goToPage(9);
                  }}
                  className="w-full py-3.5 rounded-2xl bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-500/30 animate-pulse transition flex items-center justify-center gap-2"
                >
                  <span>Read Dudu's Handwritten Letter 💌</span>
                  <ArrowRight size={16} />
                </button>
              )}
            </div>

            <div className="flex gap-2 mt-3">
              <button
                onClick={goBack}
                className="w-1/2 py-2 rounded-xl bg-slate-100 text-slate-600 text-xs font-bold hover:bg-slate-200 transition"
              >
                ← Back
              </button>
              <button
                onClick={goNext}
                disabled={!unlockedPages[9]}
                className={`w-1/2 py-2 rounded-xl text-xs font-bold hover:bg-pink-200 transition ${
                  unlockedPages[9] ? 'bg-pink-100 text-pink-700' : 'bg-slate-100 text-slate-400 cursor-not-allowed opacity-50'
                }`}
              >
                Next (Letter) {!unlockedPages[9] && <Lock size={12} />}
              </button>
            </div>
          </div>
        )}

        {/* ================= CHAPTER 9: GRAND LOVE LETTER ================= */}
        {}
        {currentPage === 9 && (
          <div className="bg-white/90 backdrop-blur-md rounded-3xl p-5 sm:p-8 w-full border-2 border-rose-200 shadow-2xl text-center relative overflow-hidden">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs uppercase tracking-widest font-bold text-pink-500">From Dudu's Heart</span>
              {!isTypingDone && (
                <button
                  onClick={handleSkipTyping}
                  className="text-[11px] font-bold text-pink-600 underline hover:text-pink-800"
                >
                  Fast Forward ⚡
                </button>
              )}
            </div>

            <h2 className="text-2xl font-bold text-pink-700 font-serif">To My Forever Bubu 🌸</h2>

            <div className="my-4 max-h-[310px] overflow-y-auto px-4 py-3 bg-rose-50/70 rounded-2xl border border-rose-200 text-left font-serif text-sm text-slate-800 leading-relaxed whitespace-pre-line shadow-inner">
              {typedText}
              {!isTypingDone && <span className="inline-block w-1.5 h-4 ml-1 bg-pink-500 animate-ping" />}
            </div>

            <button
              onClick={() => goToPage(10)}
              disabled={!isTypingDone}
              className={`w-full py-3.5 rounded-2xl text-white font-bold text-sm shadow-xl transition flex items-center justify-center gap-2 ${
                isTypingDone
                  ? 'bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 shadow-rose-500/30 active:scale-95'
                  : 'bg-slate-300 cursor-not-allowed opacity-60'
              }`}
            >
              <Sparkles size={18} />
              <span>Claim 1000 Kisses & Rose Storm 🌹💋</span>
            </button>

            <div className="flex gap-2 mt-3">
              <button
                onClick={goBack}
                className="w-1/2 py-2 rounded-xl bg-slate-100 text-slate-600 text-xs font-bold hover:bg-slate-200 transition"
              >
                ← Back
              </button>
              <button
                onClick={goNext}
                disabled={!isTypingDone}
                className={`w-1/2 py-2 rounded-xl text-xs font-bold transition ${
                  isTypingDone ? 'bg-pink-100 text-pink-700 hover:bg-pink-200' : 'bg-slate-100 text-slate-400 cursor-not-allowed opacity-50'
                }`}
              >
                Next (Storm) {!isTypingDone && <Lock size={12} />}
              </button>
            </div>
          </div>
        )}

        {/* ================= CHAPTER 10: 1000 KISSES & ROSE STORM CLIMAX ================= */}
        {}
        {currentPage === 10 && (
          <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-9 w-full border-2 border-pink-300 shadow-2xl text-center relative overflow-hidden">
            <div className="text-6xl my-2 animate-bounce">🌹💋💖</div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-pink-700 font-serif">
              Happy 29th July, Bubu!
            </h2>
            <p className="text-sm font-medium text-slate-700 mt-2 px-3">
              Every kiss, every single rose petal, and all the love in the universe belongs only to you today, tomorrow, and across all our lifetimes!
            </p>

            <div className="my-6 space-y-3">
              <button
                onClick={triggerEmojiStorm}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-rose-600 via-pink-600 to-red-500 text-white font-extrabold text-base sm:text-lg shadow-2xl shadow-rose-500/40 active:scale-90 transform transition flex items-center justify-center gap-2"
              >
                <span>Shower 1000 Kisses & Rose Storm 🌹💋</span>
              </button>

              <button
                onClick={() => {
                  sounds.fanfare();
                  fireConfetti({ particleCount: 160, spread: 110 });
                }}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-pink-500 text-white font-bold text-xs shadow-md active:scale-95 transition"
              >
                Blast Starlight Fireworks! 🎆
              </button>
            </div>

            <div className="pt-2 border-t border-pink-200 flex justify-between items-center text-xs font-semibold text-pink-600">
              <button
                onClick={goBack}
                className="hover:text-pink-800 flex items-center gap-1"
              >
                <ArrowLeft size={12} /> Back
              </button>
              <span>Crafted with ❤️ by Dudu</span>
              <button
                onClick={() => goToPage(1)}
                className="underline hover:text-pink-800 flex items-center gap-1"
              >
                <RotateCcw size={12} /> Replay Story
              </button>
            </div>
          </div>
        )}

      </main>

      {/* Footer */}
      {}
      <footer className="w-full max-w-xl mx-auto text-center py-1 z-20">
        <p className="text-[10px] text-pink-400 font-medium">
          ✨ Happy Birthday Bubu (29 July) • Made with True Love by Dudu ✨
        </p>
      </footer>
    </div>
  );
}