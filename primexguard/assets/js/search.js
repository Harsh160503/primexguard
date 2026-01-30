// ================================
// LIVE SEARCH PRODUCTS
// ================================
const LIVE_PRODUCTS = [
  { id: "p1", name: "Anti Termite Spray", url: "/shop.html#p1" },
  { id: "p2", name: "Cockroach Control Gel", url: "/shop.html#p2" },
  { id: "p3", name: "Mosquito Repellent Spray", url: "/shop.html#p3" },
  { id: "p4", name: "Rodent Trap Kit", url: "/shop.html#p4" },
  { id: "p5", name: "Bed Bug Killer Spray", url: "/shop.html#p5" },
  { id: "p6", name: "Ant Control Powder", url: "/shop.html#p6" }
];

// ================================
// CORE SEARCH LOGIC
// ================================
function runLiveSearch(query) {
  const resultsBox = document.getElementById("live-search-results");
  if (!resultsBox) return;

  query = query.toLowerCase().trim();

  if (!query) {
    resultsBox.style.display = "none";
    resultsBox.innerHTML = "";
    return;
  }

  const matches = LIVE_PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(query)
  );

  if (matches.length === 0) {
    resultsBox.innerHTML = `<div class="live-search-item">No products found</div>`;
    resultsBox.style.display = "block";
    return;
  }

  resultsBox.innerHTML = matches.map(p => `
    <div class="live-search-item" data-url="${p.url}">
      <strong>${p.name}</strong>
    </div>
  `).join("");

  resultsBox.style.display = "block";
}

// ================================
// INIT AFTER HEADER LOAD
// ================================
function initLiveSearch() {
  const input = document.getElementById("headerSearchInput");
  const resultsBox = document.getElementById("live-search-results");

  if (!input || !resultsBox) {
    // Header not loaded yet — retry
    setTimeout(initLiveSearch, 200);
    return;
  }

  // INPUT EVENT
  input.addEventListener("keyup", e => {
    runLiveSearch(e.target.value);
  });

  // CLICK ON RESULT
  resultsBox.addEventListener("click", e => {
    const item = e.target.closest(".live-search-item");
    if (!item) return;
    window.location.href = item.dataset.url;
  });

  // CLICK OUTSIDE CLOSE
  document.addEventListener("click", e => {
    if (!resultsBox.contains(e.target) && e.target !== input) {
      resultsBox.style.display = "none";
    }
  });

  console.log("✅ Live search initialized");
}

// ================================
// START
// ================================
document.addEventListener("DOMContentLoaded", initLiveSearch);
