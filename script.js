// 🍝 PAPYRUS-CODE: PAGE SWITCHER
const buttons = document.querySelectorAll(".card-btn");
const pages = document.querySelectorAll(".subpage");

buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    const page = btn.dataset.page;

    pages.forEach(p => p.classList.remove("active"));
    document.getElementById(page).classList.add("active");

    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

// 🍝 ASK AI (TEMP RESPONSE — WE CAN CONNECT API LATER!)
document.getElementById("askBtn").addEventListener("click", () => {
  const input = document.getElementById("doubtInput").value.trim();
  const output = document.getElementById("doubtAnswer");

  if (input === "") {
    output.innerHTML = "Please type a question!";
    return;
  }

  output.innerHTML = "Thinking... (AI backend not connected yet)";
});

// 🍝 DAILY QUOTE ROTATION
const quotes = [
  { text: "Kids are cool", author: "📘 Catboy" },
  { text: "Study smart, not hard", author: "🧠 Unknown" },
  { text: "One hour a day keeps failure away", author: "🔥 Someone" },
  { text: "Focus on the goal, not the struggle", author: "⚡ You" }
];

const q = quotes[Math.floor(Math.random() * quotes.length)];
document.getElementById("quoteLine").innerHTML = `"${q.text}" <span class='author'>- ${q.author}</span>`;
