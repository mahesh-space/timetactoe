🎮 TIMETACTOE — OFFICIAL RULEBOOK (v1.0)
======================================

A dynamic, time-based variant of Tic-Tac-Toe built with React + Vite. Marks expire, so victory is a race against time.

## Table of Contents
- Overview
- Quick Start
- Core Rules
- How the App Implements the Rules
- Advanced Variants (Chaos Mode)
- Tech Stack
- Development & Scripts
- Deployment (GitHub Pages)

## Overview
TimeTacToe is a fast-paced tactical duel. Each placed mark (X or O) has its own countdown. When time runs out, the mark vanishes—opening the cell again. Win by holding any three active marks in a row before they disappear.

## Quick Start
1) Install: `npm install`
2) Run dev server: `npm run dev`
3) Build: `npm run build`
4) Deploy to GitHub Pages: `npm run deploy` (runs build + publishes `dist/`)

## Core Rules
1. Game Summary
   - 3×3 grid, two players (X and O).
   - Every placed mark has a timer; when it expires, the mark disappears.
   - Balance speed, timing, coordination, positioning to keep three active in a row.
2. Components
   - 1 game grid (3×3)
   - Timer system (digital in the app)
   - Markers: X (Player 1), O (Player 2)
3. Objective
   - First to form a line of three active (non-expired) marks horizontally, vertically, or diagonally.
4. Game Setup
   - Choose who is X and O.
   - Set Move Duration Timer (default 5 seconds per mark).
   - Board starts empty. X goes first.
5. How to Play
   - Placing: select an empty cell, place your mark; its timer starts.
   - Countdown: each mark has its own timer (default 5s). When it hits zero, the mark vanishes.
   - Turn time: complete your move quickly (app is real-time; recommended 3s cadence).
   - Overwriting: only empty cells (never overwrite an active mark).
   - Tracking: watch visible countdowns to plan moves.
6. Winning
   - Win immediately when three active marks form a continuous line.
   - A line fails if any mark in it expires before the win is declared.
7. Draws
   - Rare; optionally call a draw if no line is made within 60s.
8. Strategic Mechanics
   - Chain Timing: let a block expire right before you complete a line.
   - Pressure Placement: rapid attacks can overwhelm slower opponents.
   - Defensive Timing: delay a block until an opponent’s timer is near zero.
9. Optional Advanced Rules
   - Refresh Move: instead of placing, refresh one of your active marks (1 refresh/turn).
   - Variable Timers: cells with short (3s), long (8s), or random timers.
   - Real-Time Mode (Chaos Mode): no turns; anyone can tap any free cell anytime. Marks expire at 5s; overwrite only after expiration; first to 3 active in a row wins.
10. Etiquette & Fair Play
    - Don’t block view of timers; avoid distractions; timers must be visible to both players.

## How the App Implements the Rules
- Per-cell timers: each placed mark stores its own `expiresAt`; the game loop removes marks whose timers pass.
- Dynamic visuals: countdown rendered via fading rings; expired marks clear automatically.
- Win detection: runs continuously; wins count only if marks are still active.
- Chaos Mode toggle: removes turn alternation; both players can tap available cells; timers still expire at the configured duration.
- Settings panel: adjust turn duration (entropy), toggle Chaos Mode.
- Restart: “Initialize” button clears the board and resets state.

## Advanced Variants in-App
- Chaos Mode: mirrors the Real-Time Mode described above.
- Turn Duration slider: approximates “Variable Timers” by adjusting global duration; could be extended to per-cell timers if desired.

## Tech Stack
- React 19 + Vite
- Tailwind (CDN) with custom glassmorphism styles
- TypeScript
- gh-pages for deployment

## Development & Scripts
- `npm run dev` — start dev server
- `npm run build` — production build
- `npm run preview` — preview built assets
- `npm run deploy` — build then publish `dist/` to GitHub Pages

## Deployment (GitHub Pages)
- Site URL: https://mahesh-space.github.io/timetactoe
- Script: `npm run deploy` (runs build + `gh-pages -d dist`)

## Project Moto
- “Tic-Tac-Toe in motion: timing is your fourth line.”

Enjoy the race against the clock!
