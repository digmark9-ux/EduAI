const input = document.getElementById("doubtInput");
const button = document.getElementById("sendDoubt");
const chatBox = document.getElementById("chatBox");

// Function to add a message
function addMessage(text, sender) {
  const msgDiv = document.createElement("div");
  msgDiv.classList.add("chat-message", sender);
  chatBox.appendChild(msgDiv);
  chatBox.scrollTop = chatBox.scrollHeight;

  if (sender === "ai") {
    const words = text.split(" ");
    let i = 0;

    function typeNextWord() {
      if (i < words.length) {
        const wordSpan = document.createElement("span");
        wordSpan.textContent = (i === 0 ? "" : " ") + words[i];
        wordSpan.style.opacity = "0";
        msgDiv.appendChild(wordSpan);
        chatBox.scrollTop = chatBox.scrollHeight;

        setTimeout(() => {
          wordSpan.style.transition = "opacity 0.4s";
          wordSpan.style.opacity = "1";
        }, 50);

        i++;
        const delay = 100 + Math.random() * 150; // natural typing variation
        setTimeout(typeNextWord, delay);
      }
    }

    // Remove typing indicator and start typing words
    const typingIndicator = msgDiv.querySelector(".typing-indicator");
    if (typingIndicator) typingIndicator.remove();

    typeNextWord();
  } else {
    msgDiv.textContent = text;
    chatBox.scrollTop = chatBox.scrollHeight;
  }
}

// Function to show typing indicator
function showTypingIndicator() {
  const msgDiv = document.createElement("div");
  msgDiv.classList.add("chat-message", "ai");
  const indicator = document.createElement("span");
  indicator.classList.add("typing-indicator");
  indicator.textContent = "…"; // initial dot
  msgDiv.appendChild(indicator);
  chatBox.appendChild(msgDiv);
  chatBox.scrollTop = chatBox.scrollHeight;

  let dotCount = 1;
  const interval = setInterval(() => {
    if (dotCount > 3) dotCount = 1;
    indicator.textContent = "•".repeat(dotCount);
    dotCount++;
    chatBox.scrollTop = chatBox.scrollHeight;
  }, 500);

  return { msgDiv, interval };
}

// Send button click
button.addEventListener("click", () => {
  const text = input.value.trim();
  if (!text) return;

  addMessage(text, "user");
  input.value = "";

  // Show typing indicator first
  const { msgDiv, interval } = showTypingIndicator();

  // After 3-second delay, remove typing indicator and show AI response
  setTimeout(() => {
    clearInterval(interval);
    msgDiv.remove(); // remove placeholder
    addMessage("Tomodachi, the GREAT PAPYRUS is still connecting your real AI… NYEH HEH!", "ai");
  }, 3000);
});

// Press Enter to send
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    button.click();
  }
});
