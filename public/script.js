let total = 0;
let purchaseHistory = [];

async function loadItems() {
  const res = await fetch("/api/items");
  const items = await res.json();

  const container = document.getElementById("items");
  container.innerHTML = "";

  items.forEach(item => {
    const btn = document.createElement("button");
    btn.className = "item-btn";
    btn.textContent = `${item.name}\n$${item.price.toFixed(2)}`;

    btn.addEventListener("click", () => {
      total += item.price;
      purchaseHistory.push(item.price);
      updateTotal();
    });

    container.appendChild(btn);
  });
}

function updateTotal() {
  document.getElementById("total").textContent = `Total: $${total.toFixed(2)}`;
}

// Undo last item
document.getElementById("undoBtn").addEventListener("click", () => {
  if (purchaseHistory.length > 0) {
    const last = purchaseHistory.pop();
    total -= last;
    updateTotal();
  }
});

// Clear total
document.getElementById("clearBtn").addEventListener("click", () => {
  total = 0;
  purchaseHistory = [];
  updateTotal();
});

loadItems();
