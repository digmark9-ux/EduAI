// --- Ask Doubts AI (Gemini Free Endpoint) ---

const chatBox = document.getElementById("chatBox");
const input = document.getElementById("doubtInput");
const sendBtn = document.getElementById("sendDoubt");

// Add message to chat box
function addMessage(text, sender) {
  const msg = document.createElement("div");
  msg.classList.add("chat-message", sender);
  msg.textContent = text;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Typing Indicator
function showTyping() {
  const dot = document.createElement("div");
  dot.id = "typingIndicator";
  dot.className = "chat-message ai";
  dot.textContent = "EduAI is thinking…";
  chatBox.appendChild(dot);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function removeTyping() {
  const dot = document.getElementById("typingIndicator");
  if (dot) dot.remove();
}

// Handle sending message
sendBtn.addEventListener("click", () => {
  const question = input.value.trim();
  if (!question) return;

  addMessage(question, "user");
  input.value = "";

  showTyping();
  askAI(question);
});

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendBtn.click();
  }
});

// --- AI FUNCTION (Google Gemini Public Endpoint) ---
async function askAI(prompt) {
  try {
    const res = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    });

    const data = await res.json();
    removeTyping();

    let output =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Hmm… I couldn't understand that. Try asking again, friend!";

    addMessage(output, "ai");

  } catch (err) {
    removeTyping();
    addMessage("⚠ Error: AI is unreachable right now.", "ai");
    console.error(err);
  }
}
