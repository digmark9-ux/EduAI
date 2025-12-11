// Homepage script.js
document.querySelectorAll(".card-btn").forEach(button => {
  const page = button.dataset.page;
  button.addEventListener("click", () => {
    document.querySelectorAll(".subpage").forEach(sp => sp.classList.add("hidden"));
    const target = document.getElementById(page);
    if(target) target.classList.remove("hidden");
  });
});

// Optional: dynamic quotes on homepage
const quotes = [
  `"Knowledge is power" - EduAI`,
  `"Learn, grow, conquer" - EduAI`,
  `"The beginning of the end is always the end of the beginning" - Tomodachi`
];

const quoteLine = document.getElementById("quoteLine");
if (quoteLine) {
  setInterval(() => {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    quoteLine.textContent = randomQuote;
  }, 10000); // every 10 seconds
}
