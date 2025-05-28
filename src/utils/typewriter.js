// Typewriter effect utility function
export const createTypewriter = (text, delay, callback, isSpinner = false, spinTime = 0) => {
  const startTime = new Date();
  let output = '';
  let index = 0;
  const spinnerChars = "⠋⠙⠹⠸⠼⠴⠦⠧⠇";
  const displayText = isSpinner ? spinnerChars : text;

  const intervalId = setInterval(() => {
    // Allow Enter key to skip animation
    const skipListener = (event) => {
      if (event.key === "Enter") {
        clearInterval(intervalId);
        document.removeEventListener("keydown", skipListener);
      }
    };
    document.addEventListener("keydown", skipListener);

    const endTime = new Date();
    
    if (index < displayText.length) {
      if (isSpinner) {
        callback(displayText[index]);
        setTimeout(() => {
          if (index + 1 < displayText.length) {
            callback(displayText[index + 1]);
          }
        }, 700);

        if (index === spinnerChars.length - 1) {
          if (endTime.getTime() - startTime.getTime() < spinTime) {
            index = 0;
          } else {
            clearInterval(intervalId);
            document.removeEventListener("keydown", skipListener);
          }
        } else {
          index += 1;
        }
      } else {
        output += displayText[index];
        index += 1;
        callback(output);
      }
    } else {
      clearInterval(intervalId);
      document.removeEventListener("keydown", skipListener);
    }
  }, delay);

  return intervalId;
}; 