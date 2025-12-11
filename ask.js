const input = document.getElementById("doubtInput");
const button = document.getElementById("sendDoubt");
const responseBox = document.getElementById("responseBox");

button.addEventListener("click", () => {
  const text = input.value.trim();

  if (text === "") {
    responseBox.innerHTML = `<p class="error">Please enter a doubt first.</p>`;
    return;
  }

  // TEMPORARY AI RESPONSE
  responseBox.innerHTML = `
    <div class="user-question"><strong>You asked:</strong> ${text}</div>
    <div class="ai-answer"><em>AI:</em> Tomodachi, the GREAT PAPYRUS is still connecting your real AI… NYEH HEH!</div>
  `;
});
