# Personal Portfolio Website  
[**View Live Site**](https://varshithdupati.github.io/)

<br/>

A modern, interactive **terminal-style portfolio** built with React. This unique portfolio simulates a command-line interface where visitors can explore my background, projects, and contact information through terminal commands.

<br/>

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Available Commands](#available-commands)
- [Setup & Development](#setup--development)
- [Deployment](#deployment)
- [License](#license)
- [Contact](#contact)

<br/>

## Features
- **Terminal Interface**: Interactive command-line style interface
- **Matrix Rain Background**: Animated Matrix-style background effect
- **Command History**: Navigate through previous commands with arrow keys
- **Responsive Design**: Optimized for all screen sizes and devices
- **Hack Simulator**: Fun hack sequence animation
- **Dynamic Content**: Quote system and interactive commands
- **Smooth Animations**: Typewriter effects and smooth transitions
- **Modern Architecture**: Built with React and modern web standards

<br/>

## Technologies Used
- **React 18** - Frontend framework
- **React Router DOM** - Client-side routing
- **CSS3** - Custom styling with CSS variables and animations
- **JavaScript ES6+** - Modern JavaScript features
- **Create React App** - Build tooling and development server
- **GitHub Pages** - Deployment platform

<br/>

## Project Structure
```
portfolio/
├── public/                  # Static assets and favicon files
├── src/                     # Source code
│   ├── components/          # React components
│   │   ├── Terminal.jsx     # Main terminal interface
│   │   └── MatrixRain.jsx   # Background animation
│   ├── styles/              # CSS stylesheets
│   │   ├── index.css        # Global styles
│   │   └── terminal.css     # Terminal-specific styles
│   ├── utils/               # Utility functions and constants
│   │   ├── constants.js     # Application constants
│   │   └── typewriter.js    # Typewriter effect utility
│   ├── App.jsx              # Main App component
│   └── index.js             # Application entry point
├── package.json             # Project dependencies and scripts
├── .gitignore               # Git ignore rules
├── LICENSE                  # MIT License
├── README.md                # Project documentation
└── DEVELOPMENT.md           # Development guide
```

<br/>

## Available Commands

### General Commands
- `help` - Display all available commands
- `about` - Learn more about me
- `clear` - Clear terminal screen and history
- `history` - Show command history

### Links & Profiles
- `github` - Open my GitHub profile
- `resume` - View my resume
- `linkedin` - Open my LinkedIn profile
- `leetcode` - Open my LeetCode profile
- `source` - View source code of this portfolio

### Fun Commands
- `quote` - Get a random programming quote
- `matrix` - Get a random Matrix movie quote
- `hack` - Run hack simulator animation

### Navigation
- `↑/↓ Arrow Keys` - Navigate through command history
- `Enter` - Execute command

<br/>

## Setup & Development

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation
1. **Clone the Repository**:  
   ```bash
   git clone https://github.com/dvarshith/dvarshith.github.io.git
   cd dvarshith.github.io
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start Development Server**:
   ```bash
   npm start
   ```
   The application will open in your browser at `http://localhost:3000`

4. **Build for Production**:
   ```bash
   npm run build
   ```

<br/>

## Deployment

This project is configured for deployment to GitHub Pages:

```bash
npm run deploy
```

This command will build the project and deploy it to the `gh-pages` branch.

<br/>

## Customization

### Adding New Commands
1. Add command description to `src/utils/constants.js` in `commandDescriptions`
2. Add command logic to `handleCommand` function in `src/components/Terminal.jsx`
3. Update help text if needed

### Adding New Quotes
1. Add quotes to `programmingQuotes` or `matrixQuotes` in `src/utils/constants.js`

### Styling
- Global styles: `src/styles/index.css`
- Terminal styles: `src/styles/terminal.css`
- CSS variables for easy theme customization

### Background Animation
- Modify `src/components/MatrixRain.jsx` to customize the Matrix rain effect

### Configuration
- All URLs, user info, and settings can be updated in `src/utils/constants.js`

<br/>

## Development

For detailed development instructions, code style guidelines, and contribution information, see [DEVELOPMENT.md](DEVELOPMENT.md).

<br/>

## License
This project is released under the `MIT License`. That means you're free to use, modify, and distribute the code, but you do so at your own 
risk.

<br/>

## Contact
**Author**: Varshith Dupati  
**GitHub**: [@dvarshith](https://github.com/dvarshith)  
**Email**: dvarshith942@gmail.com  
**LinkedIn**: [varshith-dupati](https://www.linkedin.com/in/varshith-dupati/)  

**Issues**: Please open an issue on this repo if you have questions or find bugs.

