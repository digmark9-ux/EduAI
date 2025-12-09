// -----------------------------
// SECTION SWITCHER
// -----------------------------
function showSection(sectionId) {
  const sections = document.querySelectorAll(".section");
  sections.forEach(sec => sec.classList.remove("active"));
  document.getElementById(sectionId).classList.add("active");
}

// Default section
showSection("ask");


// -----------------------------
// ASK AI (FAKE RESPONSE FOR NOW)
// -----------------------------
function askAI() {
  const input = document.getElementById("doubtInput").value;
  const answerBox = document.getElementById("doubtAnswer");

  if (!input.trim()) {
    answerBox.innerHTML = "<p>Please enter a question first!</p>";
    return;
  }

  // TEMPORARY — until we add REAL AI
  answerBox.innerHTML = `
    <p><strong>AI:</strong> Hmm... let me think about that...</p>
    <p>(Real AI response will be added soon!)</p>
  `;
}
