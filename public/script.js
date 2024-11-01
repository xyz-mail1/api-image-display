document.addEventListener("DOMContentLoaded", async function () {
  // Define the initial API URL
  const apiSelector = document.getElementById("apiSelector");
  const embeddedImage = document.getElementById("embeddedImage");

  // Get the selected API endpoint
  const apiUrl = apiSelector.value;

  try {
    // Fetch from the selected API
    const response = await fetch(apiUrl);
    const data = await response.json();

    // Update image source with fetched URL
    embeddedImage.src = data.url;
  } catch (error) {
    console.error("Error fetching image:", error);
  }
});
