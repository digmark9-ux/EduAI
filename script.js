// Switch visible section
function showSection(sectionId) {
  const sections = document.querySelectorAll('.section');
  sections.forEach(sec => sec.classList.add('hidden'));
  document.getElementById(sectionId).classList.remove('hidden');
}

// Placeholder AI answer
function askAI() {
  const input = document.getElementById('doubtInput').value;
  const answerDiv = document.getElementById('doubtAnswer');

  if (!input) {
    answerDiv.innerHTML = "<p>Please type a question!</p>";
    return;
  }

  // Placeholder AI response
  answerDiv.innerHTML = `<p><strong>AI Answer:</strong> This is where the AI would respond to: "${input}"</p>`;
}

// Toggle Dark Mode
function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
}
