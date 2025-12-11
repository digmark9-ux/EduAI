const input = document.getElementById("doubtInput");
const button = document.getElementById("sendDoubt");
const responseBox = document.getElementById("responseBox");

button.addEventListener("click", () => {
    const text = input.value.trim();

    if (text === "") {
        responseBox.innerHTML = "<p>Please enter a doubt.</p>";
        return;
    }

    // TEMPORARY RESPONSE (until you add your AI backend)
    responseBox.innerHTML = `<p><strong>You asked:</strong> ${text}</p>
    <p><em>AI:</em> Tomodachi, the GREAT PAPYRUS is still connecting your real AI… NYEH HEH!</p>`;
});
