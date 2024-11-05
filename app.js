const express = require("express");
const path = require("path");
const fetch = require("node-fetch");

const app = express();
const PORT = 3000;

const url = "https://freaky-shiv-website.onrender.com/";
app.set("trust proxy", true);

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, "public")));

// Endpoint to get a new image URL based on selected API
app.get("/api/image", async (req, res) => {
  const apiUrl = req.query.url; // Get the URL from the query parameter
  if (!apiUrl) {
    return res.status(400).json({ error: "API URL is required" });
  }

  try {
    const response = await fetch(apiUrl); // Fetch from the selected API
    const data = await response.json();
    res.json({ url: data.url });
  } catch (error) {
    console.error("Error fetching image:", error);
    res.status(500).json({ error: "Failed to fetch image" });
  }
});

// Serve the index.html file
app.get("/", (req, res) => {
  console.log(req.ip);
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

function keepAlive() {
  fetch(url)
    .then((response) => {
      console.log(
        `Reloaded at ${new Date().toISOString()}: Status Code ${
          response.status
        }`
      );
    })
    .catch((error) => {
      console.error(
        `Error reloading at ${new Date().toISOString()}:`,
        error.message
      );
    });
}

setInterval(keepAlive, 30000);
