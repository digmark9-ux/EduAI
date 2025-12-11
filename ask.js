const input = document.getElementById("doubtInput");
const button = document.getElementById("sendDoubt");
const chatBox = document.getElementById("chatBox");

function addMessage(text, sender) {
  const msgDiv = document.createElement("div");
  msgDiv.classList.add("chat-message", sender);
  msgDiv.textContent = text;
  chatBox.appendChild(msgDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

button.addEventListener("click", () => {
  const text = input.value.trim();
  if (!text) return;

  addMessage(text, "user"); // user's message on right
  input.value = "";

  // simulate AI typing delay
  setTimeout(() => {
    addMessage(`Tomodachi, the GREAT PAPYRUS is still connecting your real AI… NYEH HEH!`, "ai");
  }, 800); // 800ms delay
});
