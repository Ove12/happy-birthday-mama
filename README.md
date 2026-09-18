# Happy Birthday, Mama! 🎂✨
### A Premium, Interactive, Multi-Page Cinematic Birthday Experience

A modern, highly polished birthday web application designed specifically for **Mama** (Mother's Brother). Built entirely with clean **HTML5, modern CSS3, vanilla ES6+ JavaScript, SVG shapes, and HTML5 Canvas**. Contains **zero image dependencies or uploads**.

---

## 🌟 Key Features

1. **8-Page Interactive Storybook Layout**:
   - Page 1: Cinematic Intro with Typewriter effect.
   - Page 2: Grand Birthday Reveal with particle bursts & floating balloons.
   - Page 3: **Luxury 3D Vector Envelope & Letter** with wax seal and smooth unfolding physics.
   - Page 4: **What Makes You Special** (5 Glassmorphism cards with 3D cursor tilt).
   - Page 5: **Deluxe 3D Isometric Birthday Cake** with metallic stand, cream drips, and interactive candle blowing + real smoke rise physics.
   - Page 6: **Family Wishes & Blessings**.
   - Page 7: **Hidden 3D Gift Box** with shake animation, light beam, and fireworks.
   - Page 8: **Grand Finale Celebration** with ongoing fireworks loop.

2. **Instant Email Notification**:
   - When a visitor clicks **"🎁 OPEN YOUR SURPRISE"** on Page 1, an automatic email notification is dispatched to `jh4406011@gmail.com` via FormSubmit AJAX service!

---

## 📩 Email Notification Setup

The target email address is defined at the top of `js/script.js`:
```javascript
const birthdayConfig = {
    name: "Mama",
    senderName: "Your Name",
    notificationEmail: "jh4406011@gmail.com", // Notification recipient
    birthdayMessage: `...`
};
```

> **First-Time Email Activation**: FormSubmit will send a 1-click confirmation email to `jh4406011@gmail.com` the first time a notification is sent. Simply click the activation link in your email inbox once! After that, every time someone opens the surprise on your site, you will receive an instant email notification!

---

## 📱 Mobile & Accessibility Support

- **Responsive**: Mobile-first layout supporting iPhones, Android devices, tablets, and desktop monitors.
- **Accessibility**: Includes `prefers-reduced-motion` detection, semantic tags, keyboard focus rings, and ARIA labels.

---

## 🚀 How to Run

Simply open `index.html` in any web browser! No build tools or npm installation required.
