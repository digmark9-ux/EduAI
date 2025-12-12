// ========== CONFIG ==========
const HF_API_KEY = "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";  // ← replace ONLY this string

const MODEL_URL = "https://api-inference.huggingface.co/models/google/gemma-2-9b-it";

// DOM references
const chatBox = document.getElementById("chatBox");
const input = document.getElementById("doubtInput");
const sendButton = document.getElementById("sendDoubt");

// Add message bubble to chat
function addMessage(text, sender) {
    const msg = document.createElement("div");
    msg.classList.add("chat-message", sender);

    // wrap words in <span> for fade-in
    const words = text.split(" ").map(word => `<span>${word}</span>`).join(" ");
    msg.innerHTML = words;

    chatBox.appendChild(msg);
    chatBox.scrollTop = chatBox.scrollHeight;

    // fade-in word by word
    const spans = msg.querySelectorAll("span");
    spans.forEach((span, i) => {
        setTimeout(() => {
            span.style.opacity = 1;
        }, i * 70);   // fade speed per word
    });
}

// Typing indicator
function showTyping() {
    const typing = document.createElement("div");
    typing.id = "typingIndicator";
    typing.classList.add("chat-message", "ai");
    typing.innerHTML = "<em>AI is thinking...</em>";
    chatBox.appendChild(typing);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function removeTyping() {
    const t = document.getElementById("typingIndicator");
    if (t) t.remove();
}

// ---- CALL HUGGINGFACE ----
async function callAI(prompt) {
    try {
        const response = await fetch(MODEL_URL, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${HF_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ inputs: prompt })
        });

        const data = await response.json();

        if (data.error) return "The model is loading… try again in a moment.";
        return data[0].generated_text;
    } catch (err) {
        return "Network error. Try again.";
    }
}

// ---- SEND BUTTON ----
sendButton.addEventListener("click", async () => {
    const text = input.value.trim();
    if (!text) return;

    addMessage(text, "user");
    input.value = "";

    // typing animation starts
    showTyping();

    // artificial delay
    await new Promise(res => setTimeout(res, 3000));

    // call model
    const reply = await callAI(text);

    removeTyping();
    addMessage(reply, "ai");
});

// allow Enter key to send
input.addEventListener("keypress", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        sendButton.click();
    }
});
