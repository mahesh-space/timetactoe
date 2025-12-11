# ⏱️ TimeTacToe

> *"Tic-Tac-Toe in motion: timing is your fourth line."*

A dynamic, time-based variant of Tic-Tac-Toe built with React + Vite. Marks expire, so victory is a race against time.

![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

**🎮 [Play Live](https://mahesh-space.github.io/timetactoe)**

---

## 📖 Table of Contents

- [Overview](#overview)
- [Quick Start](#quick-start)
- [Core Rules](#core-rules)
- [How the App Works](#how-the-app-works)
- [Game Modes](#game-modes)
- [Tech Stack](#tech-stack)
- [Development & Scripts](#development--scripts)
- [Deployment](#deployment)
- [Strategy Tips](#strategy-tips)
- [Author](#author)

---

## 🎯 Overview

TimeTacToe is a fast-paced tactical duel where traditional Tic-Tac-Toe meets time pressure. Each placed mark (X or O) has its own countdown timer. When time runs out, the mark vanishes—reopening the cell for new plays. Win by holding any **three active marks in a row** before they disappear.

### Key Features

- ⏲️ **Dynamic Timers**: Each mark has its own countdown (default 5 seconds)
- 🎨 **Glassmorphism UI**: Modern, sleek design with smooth animations
- ⚡ **Chaos Mode**: Real-time simultaneous play—no turns, pure reflex
- 🎮 **Adjustable Settings**: Customize turn duration (entropy slider)
- 🔄 **Auto-Cleanup**: Expired marks vanish automatically
- 🏆 **Live Win Detection**: Continuous checking for three active marks in a row

---

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation & Running

```bash
# Clone the repository
git clone https://github.com/mahesh-space/timetactoe.git

# Navigate to project directory
cd timetactoe

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Deploy to GitHub Pages
npm run deploy
```

The game will be available at `http://localhost:5173` (or the port Vite assigns).

---

## 📜 Core Rules

### 1. Game Summary
- **Grid**: 3×3 board
- **Players**: Two players (X and O)
- **Timers**: Every placed mark has a countdown timer
- **Goal**: Form three active marks in a row before they expire

### 2. Components
- Game grid (3×3)
- Digital timer system
- Markers: **X** (Player 1), **O** (Player 2)

### 3. Objective
Be the first player to form a line of **three active (non-expired) marks** horizontally, vertically, or diagonally.

### 4. Game Setup
1. Choose who plays X and O
2. Set Move Duration Timer (default: 5 seconds per mark)
3. Board starts empty
4. Player X makes the first move

### 5. How to Play

**Placing a Mark**
- Select an empty cell
- Place your mark (X or O)
- The mark's countdown timer starts immediately

**Countdown Timers**
- Each mark has its own independent timer (default: 5 seconds)
- When a timer reaches zero, the mark **disappears**
- The cell becomes empty and available again

**Turn Time**
- Complete your move within 3 seconds (recommended)
- Keeps gameplay fast-paced

**Overwriting Rules**
- You can only place marks on **empty cells**
- A cell is empty when:
  - It has never been used, OR
  - The previous mark's timer expired
- **Cannot overwrite active marks**

**Timer Tracking**
- Each mark shows a visible countdown
- Rendered with fading rings in the app
- Monitor all active timers to plan your strategy

### 6. Winning Conditions
- **Win immediately** when three of your active marks form a continuous line
- A line **does not count** if any mark expires before the win is declared
- Timing is crucial—a mark can expire at the last second and cost you the victory

### 7. Draw Conditions
- Draws are rare due to the dynamic board
- **Optional Rule**: If no player completes a line within 60 seconds, call a draw

### 8. Strategic Mechanics

**Chain Timing**
- Set up patterns where opponent's blocks expire right before your marks do

**Pressure Placement**
- Rapid attacks can overwhelm slower opponents

**Defensive Timing**
- Delay blocking until opponent's timer is nearly zero
- Forces them to re-place and buy yourself time

---

## 🎮 How the App Works

### Implementation Details

**Per-Cell Timers**
- Each placed mark stores its own `expiresAt` timestamp
- Game loop continuously checks and removes expired marks

**Dynamic Visuals**
- Countdown rendered via animated fading rings
- Smooth transitions with Tailwind CSS animations
- Expired marks clear automatically with visual feedback

**Win Detection**
- Runs continuously in the background
- Validates that all three marks are **still active** when checking lines
- Instant win declaration when conditions are met

**Chaos Mode Toggle**
- Removes turn alternation completely
- Both players can tap any available cell at any time
- Timers still expire at configured duration
- First to achieve 3 active marks in a row wins

**Settings Panel**
- **Turn Duration Slider**: Adjust mark lifetime (entropy control)
- **Chaos Mode Switch**: Toggle between turn-based and real-time modes
- **Initialize Button**: Restart game and clear board

---

## 🕹️ Game Modes

### Classic Mode (Default)
- Turn-based gameplay
- X and O alternate moves
- 5-second mark duration
- Strategic, chess-like pacing

### Chaos Mode 🔥
Mirrors the **Real-Time Mode** from the rulebook:
- **No turns**: Both players can tap cells simultaneously
- **Pure reflexes**: Fast-paced, action-oriented
- **Same win conditions**: First to 3 active marks in a row
- **Same timers**: Marks still expire at set duration
- **Overwrite rule**: Only after expiration

### Advanced Variants (Future)
- **Refresh Move**: Reset a mark's timer instead of placing new one
- **Variable Timers**: Different cells with 3s, 8s, or random durations
- **Per-Cell Duration**: Customize timer for each grid position

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **React 19** | UI framework with modern hooks |
| **Vite** | Lightning-fast build tool and dev server |
| **TypeScript** | Type-safe development |
| **Tailwind CSS (CDN)** | Utility-first styling with glassmorphism |
| **gh-pages** | GitHub Pages deployment |

### Project Structure

```
timetactoe/
├── .npm-cache/
│   └── _update-notifier-last-checked
├── components/
│   ├── Board.tsx
│   ├── Cell.tsx
│   ├── Icon.tsx
│   └── TimerRing.tsx
├── utils/
│   └── SoundManager.ts
├── .gitignore
├── App.tsx
├── README.md
├── constants.ts
├── index.html
├── index.tsx
├── metadata.json
├── package-lock.json
├── package.json
├── tsconfig.json
├── types.ts
└── vite.config.ts
```

---

## 🔧 Development & Scripts

```bash
# Start development server with hot reload
npm run dev

# Build optimized production bundle
npm run build

# Preview production build locally
npm run preview

# Deploy to GitHub Pages (builds + publishes dist/)
npm run deploy

# Type checking
npm run type-check

# Linting
npm run lint
```

---

## 🚀 Deployment

### GitHub Pages

**Live URL**: [https://mahesh-space.github.io/timetactoe](https://mahesh-space.github.io/timetactoe)

**Deployment Steps**:
1. Make sure `vite.config.ts` has correct `base` path
2. Run `npm run deploy`
3. Script automatically builds and publishes `dist/` folder
4. GitHub Pages serves the site within minutes

**Manual Deployment**:
```bash
npm run build
# Upload dist/ folder to your hosting provider
```

---

## 🧠 Strategy Tips

1. **Monitor All Timers**: Keep track of both your marks and opponent's expiration times
2. **Create Pressure**: Force opponents to defend multiple threats simultaneously
3. **Timing Defense**: Block only when necessary; let some threats expire naturally
4. **Chain Reactions**: Set up situations where opponent blocks expire before yours
5. **Chaos Mode Mastery**: In real-time mode, speed + positioning beats pure strategy
6. **Corner Control**: Corners give more winning line possibilities
7. **Center Dominance**: Center cell participates in 4 winning lines
8. **Expiration Prediction**: Plan 2-3 moves ahead based on timer predictions

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. 🍴 Fork the repository
2. 🌿 Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. 💾 Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. 📤 Push to the branch (`git push origin feature/AmazingFeature`)
5. 🔃 Open a Pull Request

### Ideas for Contributions
- [ ] AI opponent with difficulty levels
- [ ] Online multiplayer with WebSockets
- [ ] Game replay and history
- [ ] Sound effects and haptic feedback
- [ ] Achievement system
- [ ] Leaderboards with persistent storage
- [ ] Mobile app (React Native port)
- [ ] Accessibility improvements

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Crafted with ❤️ by MG Jiwana**

- 🌐 GitHub: [@mahesh-space](https://github.com/mahesh-space)
- 🐦 Twitter: [@mgjiwana](https://twitter.com/mgjiwana)
- 💼 LinkedIn: [MG](https://linkedin.com/in/maheshjiwana)

---

## 🙏 Acknowledgments

- Inspired by the timeless classic Tic-Tac-Toe
- Built with the amazing React and Vite ecosystems
- Glassmorphism design trends from the UI/UX community
- Special thanks to all open-source contributors

---

## 📞 Support

If you enjoy TimeTacToe, please consider:

- ⭐ **Star this repository** to show your support
- 🐛 **Report bugs** via [GitHub Issues](https://github.com/mahesh-space/timetactoe/issues)
- 💡 **Suggest features** you'd like to see
- 🔄 **Share** with friends and fellow gamers
- ☕ **Buy me a coffee** (coming soon!)

---

<div align="center">

**⚡ Ready to race against time? [Start Playing Now!](https://mahesh-space.github.io/timetactoe) ⚡**

Made with 💙 and ⚛️ React

</div>
