function askEduAI() {
    const input = document.getElementById("question").value;
    const output = document.getElementById("response");

    if (input.trim() === "") {
        output.innerText = "PLEASE ENTER A QUESTION, HUMAN!";
        return;
    }

    // SIMPLE PLACEHOLDER UNTIL YOU ADD REAL AI
    output.innerText = "Thinking...\n\n" + 
                       "NYEH HEH HEH!\n" +
                       "You asked: " + input + "\n\n" +
                       "EduAI will answer this soon!";
}
