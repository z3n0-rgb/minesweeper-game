# Cinematic Minesweeper

A modern Minesweeper game with cinematic animations, scoreboard tracking, and streak system.

## Features

- **10x10 Grid**: Standard Minesweeper gameplay with 10 mines
- **Cinematic Animations**: Smooth cell reveals, explosion effects, and win celebrations
- **Scoreboard System**: Track best times, win/loss ratio, and winning streaks
- **Responsive Design**: Works on desktop and mobile devices
- **Local Storage**: Persistent score tracking across sessions

## How to Run Locally

### Prerequisites
- Git (for cloning the repository)
- A modern web browser (Chrome, Firefox, Safari, or Edge)

### Installation Instructions

#### Windows
1. Open Command Prompt or PowerShell
2. Clone the repository:
   ```bash
   git clone https://github.com/z3n0-rgb/minesweeper-game.git
   ```
3. Navigate to the project directory:
   ```bash
   cd minesweeper-game
   ```
4. Start a local web server:
   ```bash
   python -m http.server 8000
   ```
   Or if you have Python 2:
   ```bash
   python -m SimpleHTTPServer 8000
   ```
5. Open your browser and go to: http://localhost:8000

#### macOS
1. Open Terminal
2. Clone the repository:
   ```bash
   git clone https://github.com/z3n0-rgb/minesweeper-game.git
   ```
3. Navigate to the project directory:
   ```bash
   cd minesweeper-game
   ```
4. Start a local web server:
   ```bash
   python -m http.server 8000
   ```
5. Open your browser and go to: http://localhost:8000

#### Linux
1. Open Terminal
2. Clone the repository:
   ```bash
   git clone https://github.com/z3n0-rgb/minesweeper-game.git
   ```
3. Navigate to the project directory:
   ```bash
   cd minesweeper-game
   ```
4. Start a local web server:
   ```bash
   python -m http.server 8000
   ```
5. Open your browser and go to: http://localhost:8000

### Alternative Methods

#### Using Node.js
If you have Node.js installed:
```bash
npx serve .
```

#### Using Python 2
If you have Python 2:
```bash
python -m SimpleHTTPServer 8000
```

#### Using PHP
If you have PHP installed:
```bash
php -S localhost:8000
```

## How to Play

1. **Left-click** to reveal a cell
2. **Right-click** (or long-press on mobile) to flag a cell as a mine
3. Clear all non-mine cells to win
4. Avoid clicking on mines!

## Scoreboard

- **Best Time**: Your fastest completion time
- **Win Rate**: Percentage of games won
- **Streak**: Current and longest winning streaks

## Browser Compatibility

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## License

This project is open source and available under the MIT License.