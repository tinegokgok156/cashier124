const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.static("public"));

// Load all items from one JSON file
app.get("/api/items", (req, res) => {
  const itemsFile = path.join(__dirname, "items", "items.json");
  fs.readFile(itemsFile, "utf8", (err, data) => {
    if (err) return res.status(500).send("Error loading items");
    res.json(JSON.parse(data));
  });
});

app.listen(PORT, () => {
  console.log(`✅ Cashier app running at http://localhost:${PORT}`);
});
