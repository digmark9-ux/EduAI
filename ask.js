const input = document.getElementById("doubtInput");
const button = document.getElementById("sendDoubt");
const chatBox = document.getElementById("chatBox");

function addMessage(text, sender) {
  const msgDiv = document.createElement("div");
  msgDiv.classList.add("chat-message", sender);

  if(sender === "ai") {
    // Word-by-word fade in
    const words = text.split(" ");
    let i = 0;
    const span = document.createElement("span");
    msgDiv.appendChild(span);
    chatBox.appendChild(msgDiv);
    chatBox.scrollTop = chatBox.scrollHeight;

    const interval = setInterval(() => {
      span.textContent += (i === 0 ? "" : " ") + words[i];
      i++;
      chatBox.scrollTop = chatBox.scrollHeight;
      if(i >= words.length) clearInterval(interval);
    }, 300); // adjust typing speed per word
  } else {
    msgDiv.textContent = text;
    chatBox.appendChild(msgDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
  }
}

button.addEventListener("click", () => {
  const text = input.value.trim();
  if (!text) return;

  addMessage(text, "user"); // User on right
  input.value = "";

  // 3-second AI typing delay
  setTimeout(() => {
    addMessage("Tomodachi, the GREAT PAPYRUS is still connecting your real AI… NYEH HEH!", "ai");
  }, 3000);
});
