// --- PAGE SWITCHING ---
const buttons = document.querySelectorAll('.card-btn');
const pages = document.querySelectorAll('.subpage');

buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    const pageName = btn.dataset.page;
    openPage(pageName);
  });
});

function openPage(pageName) {
  pages.forEach(p => p.classList.add('hidden'));
  document.getElementById(pageName).classList.remove('hidden');
  window.scrollTo(0, 0);
}

// --- ASK DOUBTS LOGIC ---
const askBtn = document.getElementById("askBtn");
const doubtInput = document.getElementById("doubtInput");
const doubtAnswer = document.getElementById("doubtAnswer");

askBtn.addEventListener("click", () => {
  const question = doubtInput.value.trim();

  if (question === "") {
    doubtAnswer.innerHTML = "Please type a question first!";
    return;
  }

  // Show loading animation
  doubtAnswer.innerHTML = "<em>Thinking... please wait ⏳</em>";

  // Fake AI response (for now)
  setTimeout(() => {
    doubtAnswer.innerHTML = 
      "Here is a helpful explanation:<br><br>" +
      "👉 <strong>" + question + "</strong><br><br>" +
      "This feature will soon use REAL AI!";
  }, 1200);
});
