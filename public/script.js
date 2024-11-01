document.addEventListener("DOMContentLoaded", async function () {
  // Get elements
  const actionButton = document.getElementById("actionButton");
  const embeddedImage = document.getElementById("embeddedImage");
  const apiSelector = document.getElementById("apiSelector");

  // Function to fetch image from the selected API
  async function fetchImage() {
    const apiUrl = apiSelector.value;
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      embeddedImage.src = data.url; // Update image source with fetched URL
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  }

  // Fetch initial image on page load
  await fetchImage();

  // Add event listener for button click to fetch new image
  actionButton.addEventListener("click", fetchImage);
});
