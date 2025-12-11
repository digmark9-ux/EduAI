const input = document.getElementById("doubtInput");
const button = document.getElementById("sendDoubt");
const chatBox = document.getElementById("chatBox");

// Function to add a message
function addMessage(text, sender) {
  const msgDiv = document.createElement("div");
  msgDiv.classList.add("chat-message", sender);

  if (sender === "ai") {
    // Word-by-word fade-in effect
    const words = text.split(" ");
    chatBox.appendChild(msgDiv);
    chatBox.scrollTop = chatBox.scrollHeight;

    let i = 0;

    function addNextWord() {
      if (i < words.length) {
        const wordSpan = document.createElement("span");
        wordSpan.textContent = (i === 0 ? "" : " ") + words[i];
        wordSpan.style.opacity = "0";
        msgDiv.appendChild(wordSpan);

        // Trigger fade-in
        setTimeout(() => {
          wordSpan.style.transition = "opacity 0.3s";
          wordSpan.style.opacity = "1";
        }, 50);

        i++;
        setTimeout(addNextWord, 150); // Delay between words (adjust for speed)
        chatBox.scrollTop = chatBox.scrollHeight;
      }
    }

    addNextWord();
  } else {
    // User message
    msgDiv.textContent = text;
    chatBox.appendChild(msgDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
  }
}

// Send button click
button.addEventListener("click", () => {
  const text = input.value.trim();
  if (!text) return;

  addMessage(text, "user"); // User message
  input.value = ""; // Clear input immediately

  // AI response after 3-second delay
  setTimeout(() => {
    addMessage("Tomodachi, the GREAT PAPYRUS is still connecting your real AI… NYEH HEH!", "ai");
  }, 3000);
});

// Optional: allow pressing Enter to send
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    button.click();
  }
});
