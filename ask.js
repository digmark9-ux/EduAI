const input = document.getElementById("doubtInput");
const sendBtn = document.getElementById("sendDoubt");
const chatBox = document.getElementById("chatBox");

const WORKER_URL = "https://throbbing-mountain-06d1.digmark9.workers.dev/";

function addMessage(text, type) {
  const msg = document.createElement("div");
  msg.className = `chat-message ${type}`;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;

  // smooth word-by-word fade
  const words = text.split(" ");
  words.forEach((word, i) => {
    const span = document.createElement("span");
    span.textContent = word + " ";
    span.style.opacity = "0";
    msg.appendChild(span);

    setTimeout(() => {
      span.style.opacity = "1";
    }, i * 60);
  });
}

sendBtn.addEventListener("click", async () => {
  const text = input.value.trim();
  if (!text) return;

  addMessage(text, "user");
  input.value = "";

  const typing = document.createElement("div");
  typing.className = "chat-message ai typing-indicator";
  typing.textContent = "Thinking...";
  chatBox.appendChild(typing);
  chatBox.scrollTop = chatBox.scrollHeight;

  try {
    const res = await fetch(WORKER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text })
    });

    const data = await res.json();
    chatBox.removeChild(typing);

    setTimeout(() => {
      addMessage(data.reply || "No response.", "ai");
    }, 3000); // ⏳ 3 second delay
  } catch (err) {
    chatBox.removeChild(typing);
    addMessage("Network error. Try again.", "ai");
  }
});
