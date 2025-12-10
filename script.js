// daily quotes (you can edit or expand)
const quotes = [
  {t: "Kids are cool", a: "Catboy"},
  {t: "Practice is the key to mastery.", a: "Unknown"},
  {t: "Small steps every day become big wins.", a: "Tomodachi"},
  {t: "Learn, then teach.", a: "Anonymous"},
];

// rotate daily quote (based on day number)
function setDailyQuote(){
  const idx = (new Date()).getDate() % quotes.length;
  const q = quotes[idx];
  const el = document.getElementById('quoteLine');
  if(el) el.innerHTML = `"${q.t}" <span class="author">- ${q.a}</span>`;
}
setDailyQuote();

// navigation between home buttons and subpages
document.querySelectorAll('.card-btn').forEach(btn=>{
  btn.addEventListener('click', ()=> {
    const page = btn.dataset.page;
    openSubpage(page);
  });
});

function openSubpage(id){
  // hide all subpages
  document.querySelectorAll('.subpage').forEach(s => s.classList.add('hidden'));
  // if target exists, show it
  const el = document.getElementById(id);
  if(el){
    el.classList.remove('hidden');
    // scroll into view smoothly
    el.scrollIntoView({behavior:'smooth', block:'start'});
  } else {
    // fallback: show a temporary message in page-area
    const area = document.getElementById('page-area');
    if(area){
      area.innerHTML = `<div class="subpage"><h2>No page: ${id}</h2><p>This subpage isn't implemented yet.</p></div>`;
    }
  }
}

// simple ask AI placeholder (replace with your API integration)
const askBtn = document.getElementById('askBtn');
if(askBtn){
  askBtn.addEventListener('click', async ()=>{
    const input = document.getElementById('doubtInput').value || '';
    const out = document.getElementById('doubtAnswer');
    out.innerHTML = '<em>Thinking...</em>';
    // small simulated delay
    await new Promise(r=>setTimeout(r,700));
    // simple simulated answer
    out.innerHTML = `<strong>AI:</strong> This is a placeholder answer for: <br><pre style="white-space:pre-wrap">${escapeHtml(input)}</pre>`;
  });
}

function escapeHtml(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
