import { useState, useEffect, useRef } from 'react';
import '../styles/terminal.css';
import MatrixRain from './MatrixRain';
import { 
  programmingQuotes, 
  matrixQuotes, 
  socialLinks, 
  userInfo, 
  animationTimings, 
  hackSequence,
  commandDescriptions 
} from '../utils/constants';
import { createTypewriter } from '../utils/typewriter';

function Terminal() {
  const [Text1, setText1] = useState('');
  const [Text2, setText2] = useState('');
  const [Text3, setText3] = useState('');
  const [Text4, setText4] = useState('');
  const [isHackRunning, setIsHackRunning] = useState(false);
  const cursor = '▮';
  const accessGrantedRef = useRef(false);

  const [prevusedCommand, setprevusedCommand] = useState([]);
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  // Auto-scroll to bottom when new commands are added
  useEffect(() => {
    if (prevusedCommand.length > 0) {
      setTimeout(() => {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth'
        });
      }, 100);
    }
  }, [prevusedCommand]);

  // Block input during hack sequence
  useEffect(() => {
    const commandInput = document.getElementById('command');
    if (commandInput) {
      if (isHackRunning) {
        commandInput.disabled = true;
        commandInput.style.opacity = '0.5';
      } else {
        commandInput.disabled = false;
        commandInput.style.opacity = '1';
      }
    }
  }, [isHackRunning]);

  // Execute hack sequence in terminal history
  const executeHackSequence = async () => {
    setIsHackRunning(true);
    
    for (let i = 0; i < hackSequence.length; i++) {
      const line = hackSequence[i];
      
      // Add realistic delay between lines
      await new Promise(resolve => setTimeout(resolve, 
        line.type === "header" ? 500 :
        line.type === "separator" ? 100 :
        line.type === "progress" ? 800 :
        line.type === "success" ? 300 :
        line.type === "file" ? 150 :
        line.type === "box" ? 100 :
        line.type === "warning" ? 500 :
        400
      ));
      
      setprevusedCommand(prevArray => [...prevArray, { text: line.text, type: line.type }]);
      
      setTimeout(() => {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth'
        });
      }, 50);
    }
    
    setIsHackRunning(false);
  };

  // Skip intro animation
  function SkipIntro() {
    // Clear all timers
    let id = setTimeout(() => { }, 0);
    while (id--) {
      clearTimeout(id);
    }

    id = setInterval(() => { }, 0);
    while (id--) {
      clearInterval(id);
    }

    setText1(`ssh ${userInfo.username}@${userInfo.hostname}`);
    setText2(`${userInfo.username}@${userInfo.hostname}'s password:`);
    setText3("> Access granted.");
    accessGrantedRef.current = true;
  }

  // Handle command execution and navigation
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Enter") {
        if (!accessGrantedRef.current) {
          SkipIntro();
        }
        
        const CommandArea = document.getElementById("command");
        if (CommandArea && accessGrantedRef.current && !isHackRunning) {
          const currentCommand = CommandArea.value.trim();
          
          // Add command to history if it's not empty and not duplicate
          if (currentCommand && (commandHistory.length === 0 || commandHistory[commandHistory.length - 1] !== currentCommand)) {
            setCommandHistory(prev => [...prev, currentCommand]);
          }
          
          setHistoryIndex(-1);
          setprevusedCommand(prevArray => [...prevArray, `${userInfo.username}@${userInfo.hostname}:~$ ${currentCommand}`]);
          
          // Handle commands
          handleCommand(currentCommand);
          CommandArea.value = "";
        }
      }
      // Handle command history navigation
      else if (event.key === "ArrowUp" && accessGrantedRef.current && !isHackRunning) {
        event.preventDefault();
        navigateHistory(-1);
      }
      else if (event.key === "ArrowDown" && accessGrantedRef.current && !isHackRunning) {
        event.preventDefault();
        navigateHistory(1);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [commandHistory, historyIndex, isHackRunning]);

  // Handle individual commands
  const handleCommand = (command) => {
    switch (command) {
      case "github":
        window.open(socialLinks.github, '_blank');
        break;
      case "resume":
        window.open(socialLinks.resume, '_blank');
        break;
      case "source":
        window.open(socialLinks.source, '_blank');
        break;
      case "linkedin":
        window.open(socialLinks.linkedin, '_blank');
        break;
      case "leetcode":
        window.open(socialLinks.leetcode, '_blank');
        break;
      case "quote":
        const randomQuote = programmingQuotes[Math.floor(Math.random() * programmingQuotes.length)];
        setprevusedCommand(prevArray => [...prevArray, randomQuote]);
        break;
      case "hack":
        executeHackSequence();
        break;
      case "matrix":
        const randomMatrixQuote = matrixQuotes[Math.floor(Math.random() * matrixQuotes.length)];
        setprevusedCommand(prevArray => [...prevArray, randomMatrixQuote]);
        break;
      case "clear":
        setprevusedCommand([]);
        setCommandHistory([]);
        setHistoryIndex(-1);
        break;
      case "history":
        if (commandHistory.length === 0) {
          setprevusedCommand(prevArray => [...prevArray, "No commands in history."]);
        } else {
          commandHistory.forEach((cmd, index) => {
            setprevusedCommand(prevArray => [...prevArray, `  ${index + 1}  ${cmd}`]);
          });
        }
        break;
      case "help":
        showHelp();
        break;
      case "about":
        // Will be handled in the rendering logic
        break;
      default:
        // The error message will be handled by renderCommandHistory
        break;
    }
  };

  // Navigate command history
  const navigateHistory = (direction) => {
    const CommandArea = document.getElementById("command");
    if (!CommandArea || commandHistory.length === 0) return;

    let newIndex;
    if (direction === -1) { // Up arrow
      newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
    } else { // Down arrow
      if (historyIndex === -1) return;
      newIndex = historyIndex === commandHistory.length - 1 ? -1 : historyIndex + 1;
    }

    setHistoryIndex(newIndex);
    CommandArea.value = newIndex === -1 ? "" : commandHistory[newIndex];
    
    setTimeout(() => {
      CommandArea.setSelectionRange(CommandArea.value.length, CommandArea.value.length);
    }, 0);
  };

  // Show help information
  const showHelp = () => {
    const helpLines = [
      "",
      "Available Commands:",
      "",
      "GENERAL COMMANDS:",
      ...Object.entries(commandDescriptions.general).map(([cmd, desc]) => `  ${cmd.padEnd(10)} - ${desc}`),
      "",
      "LINKS:",
      ...Object.entries(commandDescriptions.links).map(([cmd, desc]) => `  ${cmd.padEnd(10)} - ${desc}`),
      "",
      "FUN COMMANDS:",
      ...Object.entries(commandDescriptions.fun).map(([cmd, desc]) => `  ${cmd.padEnd(10)} - ${desc}`),
      "",
      "NAVIGATION:",
      "  ↑/↓       - Navigate command history",
      "  Enter     - Execute command",
      ""
    ];

    helpLines.forEach(line => {
      setprevusedCommand(prevArray => [...prevArray, line]);
    });
  };

  // Initial setup useEffect
  useEffect(() => {
    // Clear any existing timers
    let id = setTimeout(() => { }, 0);
    while (id--) {
      clearTimeout(id);
    }

    id = setInterval(() => { }, 0);
    while (id--) {
      clearInterval(id);
    }

    // Reset all state
    setText1('');
    setText2('');
    setText3('');
    setText4('');
    setprevusedCommand([]);
    accessGrantedRef.current = false;

    // Start animation sequence
    createTypewriter(`ssh ${userInfo.username}@${userInfo.hostname}`, animationTimings.typewriterDelay, setText1);

    const timer1 = setTimeout(() => {
      setText2(`${userInfo.username}@${userInfo.hostname}'s password:${cursor}`);
    }, animationTimings.passwordPromptDelay);

    const timer2 = setTimeout(() => {
      createTypewriter("", animationTimings.typewriterDelay, setText4, true, animationTimings.spinnerDuration);
    }, animationTimings.spinnerStartDelay);

    const timer3 = setTimeout(() => {
      setText3(`Connecting to ${userInfo.username}@${userInfo.hostname}...`);
    }, animationTimings.spinnerStartDelay);

    const timer4 = setTimeout(() => {
      setText2(`${userInfo.username}@${userInfo.hostname}'s password:`);
      setText3("> Access granted.");
      accessGrantedRef.current = true;
    }, animationTimings.accessGrantedDelay);

    // Cleanup function
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      
      let id = setTimeout(() => { }, 0);
      while (id--) {
        clearTimeout(id);
      }

      id = setInterval(() => { }, 0);
      while (id--) {
        clearInterval(id);
      }
    };
  }, []);

  // Get styling for hack sequence lines
  const getHackLineStyle = (type) => {
    switch (type) {
      case "header":
        return { color: "#00ff41", fontWeight: "bold", textAlign: "center", fontSize: "16px" };
      case "separator":
        return { color: "#00ff41" };
      case "info":
        return { color: "#00ccff" };
      case "progress":
        return { color: "#ffff00" };
      case "success":
        return { color: "#00ff00" };
      case "file":
        return { color: "#ff8800", marginLeft: "20px" };
      case "box":
        return { color: "#00ff41", fontWeight: "bold", textAlign: "center", fontFamily: "monospace" };
      case "warning":
        return { color: "#ff0000", fontWeight: "bold", textAlign: "center", animation: "blink 1s infinite" };
      default:
        return { color: "var(--matrix-green)" };
    }
  };

  // Render command history
  const renderCommandHistory = () => {
    return prevusedCommand.map((item, index) => {
      // Handle hack sequence items with styling
      if (typeof item === 'object' && item.type) {
        return (
          <li key={index} style={getHackLineStyle(item.type)}>
            {item.text}
            <br />
          </li>
        );
      }
      
      // Handle regular string commands
      const prompt = `${userInfo.username}@${userInfo.hostname}:~$`;
      
      if (item.startsWith(`${prompt} github`)) {
        return <li key={index}>{item}<br /><br /><span style={{ color: "var(--matrix-green)" }}>Opened my GitHub profile in a new tab: {socialLinks.github}</span><br /><br /></li>;
      }
      else if (item.startsWith(`${prompt} resume`)) {
        return <li key={index}>{item}<br /><br /><span style={{ color: "var(--matrix-green)" }}>Opened my resume in a new tab</span><br /><br /></li>;
      }
      else if (item.startsWith(`${prompt} linkedin`)) {
        return <li key={index}>{item}<br /><br /><span style={{ color: "var(--matrix-green)" }}>Opened my LinkedIn profile in a new tab: {socialLinks.linkedin}</span><br /><br /></li>;
      }
      else if (item.startsWith(`${prompt} leetcode`)) {
        return <li key={index}>{item}<br /><br /><span style={{ color: "var(--matrix-green)" }}>Opened my LeetCode profile in a new tab: {socialLinks.leetcode}</span><br /><br /></li>;
      }
      else if (item.startsWith(`${prompt} source`)) {
        return <li key={index}>{item}<br /><br /><span style={{ color: "var(--matrix-green)" }}>Opened the source code of this site in a new tab: {socialLinks.source}</span><br /><br /></li>;
      }
      else if (item.startsWith(`${prompt} about`)) {
        return (
          <div key={index}>
            <li>{item}</li>
            <div className='aboutme'><br />
              Hi! I'm {userInfo.name}, a {userInfo.title} passionate about building innovative solutions.
              <br /><br />
              I specialize in full-stack development and have experience building scalable and intelligent systems. I'm always eager to learn new technologies and solve challenging problems.
              <br /><br />
              Feel free to explore my portfolio using the available commands!
              <br /><br />
            </div>
          </div>
        );
      }
      else if (item.startsWith(`${prompt} quote`) || item.startsWith(`${prompt} matrix`) || item.startsWith(`${prompt} hack`) || item.startsWith(`${prompt} history`) || item.startsWith(`${prompt} help`)) {
        return <li key={index}>{item}<br /><br /></li>;
      }
      else if (item.startsWith(prompt)) {
        const command = item.replace(`${prompt} `, "").trim();
        if (command === "clear") {
          return null;
        }
        return <li key={index}>{item}<br /><span style={{ color: "#ff6b6b" }}>bash: {command}: command not found</span><br /></li>;
      }
      else if (item.startsWith("bash:")) {
        return <li key={index}><span style={{ color: "#ff6b6b" }}>{item}</span><br /></li>;
      }
      else {
        return <li key={index}><span style={{ color: "var(--matrix-green)" }}>{item}</span><br /></li>;
      }
    });
  };

  return (
    <div className="terminal">
      <MatrixRain />
      <div className='console'>
        <span className='userPrefix glitch'>{userInfo.username}@localhost:~$
          <span style={{ color: "var(--matrix-green)", marginLeft: "8px" }}>
            {Text1}{Text1.length === `ssh ${userInfo.username}@${userInfo.hostname}`.length ? "" : cursor}
          </span>
        </span>

        {Text3.includes("Access") ? "" : <span id='skipButton' onClick={SkipIntro}>Press Enter or Click Here to Skip</span>}
        {Text2}
        <span> {Text4} <span style={{ color: Text3.includes("Access") ? ("var(--matrix-green)") : "" }} >{Text3}</span></span>
        <br />
        
        {Text3.includes("Access") ? (
          <pre className="glitch">
            {`
    ███╗   ███╗ █████╗ ████████╗██████╗ ██╗██╗  ██╗
    ████╗ ████║██╔══██╗╚══██╔══╝██╔══██╗██║╚██╗██╔╝
    ██╔████╔██║███████║   ██║   ██████╔╝██║ ╚███╔╝ 
    ██║╚██╔╝██║██╔══██║   ██║   ██╔══██╗██║ ██╔██╗ 
    ██║ ╚═╝ ██║██║  ██║   ██║   ██║  ██║██║██╔╝ ██╗
    ╚═╝     ╚═╝╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝╚═╝╚═╝  ╚═╝
    `}
          </pre>
        ) : null}

        {Text3.includes("Access") && (
          <>
            <span className="glitch">Welcome to my terminal portfolio! I'm {userInfo.name}, a {userInfo.title}.</span><br />
            <span><span style={{ color: "var(--matrix-green)" }}>Available Commands:</span></span>
            <span><span style={{ color: "var(--matrix-green)" }}>General: </span> about, clear, history, help</span>
            <span><span style={{ color: "var(--matrix-green)" }}>Links:</span> github, resume, linkedin, leetcode, source</span>
            <span><span style={{ color: "var(--matrix-green)" }}>Fun:</span> quote, hack, matrix</span>
            <br />
            <span className="glitch">Thank you for visiting!◝(ᵔᵕᵔ)◜</span>
          </>
        )}

        <br />
        <ul className='previousCommands' id='console23'>
          {renderCommandHistory()}
        </ul>
        
        {Text3.includes("Access") && (
          <span className='commands'>
            <span className='userPrefix glitch'>{userInfo.username}@{userInfo.hostname}:~$</span> 
            <input type="text" id="command" name="command" autoFocus autoComplete="off" spellCheck={false} />
          </span>
        )}
      </div>
    </div>
  );
}

export default Terminal;
