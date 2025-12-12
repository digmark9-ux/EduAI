// ask.js — Robust chat UI with 3s thinking delay, typing indicator, and word-by-word fade.
// Works immediately with a local fallback AI. Replace callAI() to integrate a real API later.

/* DOM refs */
const chatBox = document.getElementById("chatBox");
const input = document.getElementById("doubtInput");
const sendBtn = document.getElementById("sendDoubt");

/* Utility: scroll to bottom */
function scrollToBottom() {
  chatBox.scrollTop = chatBox.scrollHeight;
}

/* Display a message bubble (user or ai). For AI we add word-by-word typing handled separately) */
function appendMessageElement(sender) {
  const msgDiv = document.createElement("div");
  msgDiv.classList.add("chat-message", sender);
  chatBox.appendChild(msgDiv);
  scrollToBottom();
  return msgDiv;
}

/* Show typing indicator (three dots) and return an object to remove it later */
function showTypingIndicator() {
  const container = appendMessageElement("ai");
  container.classList.add("typing-placeholder");
  const indicator = document.createElement("span");
  indicator.className = "typing-indicator";
  indicator.textContent = "•";
  container.appendChild(indicator);

  // animate dot count 1→3
  let count = 1;
  const interval = setInterval(() => {
    indicator.textContent = "•".repeat(count);
    count = count < 3 ? count + 1 : 1;
    scrollToBottom();
  }, 500);

  return { container, interval };
}

/* Remove typing indicator */
function removeTypingIndicator(obj) {
  if (!obj) return;
  clearInterval(obj.interval);
  if (obj.container) obj.container.remove();
}

/* Type AI text word-by-word into a given container (smooth fade) */
function typeTextIntoContainer(text, container, onComplete) {
  const words = text.split(" ");
  let i = 0;

  function addNext() {
    if (i >= words.length) {
      if (onComplete) onComplete();
      return;
    }
    const span = document.createElement("span");
    span.textContent = (i === 0 ? "" : " ") + words[i];
    span.style.opacity = "0";
    span.style.transition = "opacity 0.35s";
    container.appendChild(span);
    // slight delay before fade-in for this word
    setTimeout(() => { span.style.opacity = "1"; }, 30);
    i++;
    scrollToBottom();
    // natural variation in word timing
    const delay = 80 + Math.random() * 160; // ~80–240ms
    setTimeout(addNext, delay);
  }

  addNext();
}

/* Add a user message */
function addUserMessage(text) {
  const el = appendMessageElement("user");
  el.textContent = text;
}

/* Add an AI message (with typing animation). Returns a Promise that resolves when finished */
function addAIMessageAnimated(text) {
  return new Promise((resolve) => {
    // create container (empty) for AI message
    const aiContainer = appendMessageElement("ai");
    // start typing animation into aiContainer
    typeTextIntoContainer(text, aiContainer, () => resolve());
  });
}

/* ========== FALLBACK AI ========== */
/* This function is the place to integrate a real model. For now it returns a safe fallback. */
/* To use a real API later, replace the internals of callAI() to call your server-side endpoint,
   then return the AI text string. DO NOT put secret keys in client-side JS on GitHub Pages. */
async function callAI(prompt) {
  // === Option: attempt a direct fetch to some public endpoint (NOT enabled here).
  // For safety and to keep this working offline, we use a local fallback.

  // Simple keyword-aware fallback (improves "feels real")
  const lowered = prompt.toLowerCase();
  if (lowered.includes("define") || lowered.includes("what is") || lowered.includes("explain")) {
    return "Here's a short explanation: " + (prompt.length <= 200 ? prompt : prompt.slice(0, 200)) + " — If you want a longer answer, ask me to elaborate.";
  }
  const fallbacks = [
    "That's an interesting question — here's how I'd think about it: try breaking it into smaller pieces.",
    "I can help with that. Can you share any specific details or constraints?",
    "Hmm — I don't have external lookup enabled in this demo, but here's a general approach you can try.",
    "Try solving it step by step. Start by identifying knowns and unknowns.",
    "Good question! Here's a hint: try drawing a diagram or writing down what you know."
  ];
  // small deterministic-ish pick so replies feel varied
  const idx = Math.abs(Array.from(prompt).reduce((a,c)=>a+c.charCodeAt(0),0)) % fallbacks.length;
  return fallbacks[idx];
}

/* ========== SEND / FLOW CONTROL ========== */
let inFlight = false; // prevent multiple concurrent sends

async function handleSend() {
  if (inFlight) return;
  const text = input.value.trim();
  if (!text) return;

  inFlight = true;
  sendBtn.disabled = true;

  addUserMessage(text);
  input.value = "";

  // show typing indicator
  const typing = showTypingIndicator();

  // 3-second "thinking" delay (during this time indicator animates)
  await new Promise(resolve => setTimeout(resolve, 3000));

  // call AI (fallback or real integration)
  let aiText;
  try {
    aiText = await callAI(text);
  } catch (err) {
    aiText = "⚠️ An error occurred while contacting the AI. Try again later.";
    console.error("AI call error:", err);
  }

  // remove placeholder typing indicator
  removeTypingIndicator(typing);

  // animated word-by-word typing into chat
  await addAIMessageAnimated(aiText);

  // done
  inFlight = false;
  sendBtn.disabled = false;
}

/* Event listeners */
sendBtn.addEventListener("click", handleSend);
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    handleSend();
  }
});
