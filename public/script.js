document.addEventListener("DOMContentLoaded", async function () {
  // Get elements
  const actionButton = document.getElementById("actionButton");
  const embeddedImage = document.getElementById("embeddedImage");
  const apiSelector = document.getElementById("apiSelector");
  const loadingBar = document.getElementById("loadingBar");

  // Function to fetch image from the selected API
  async function fetchImage() {
    const apiUrl = apiSelector.value;
    try {
      // Show loading bar
      loadingBar.style.width = "50%";
      embeddedImage.style.opacity = "0"; // Hide image until loaded

      // Fetch from the selected API
      const response = await fetch(apiUrl);
      const data = await response.json();

      // Update image source with fetched URL
      embeddedImage.src = data.url;
      loadingBar.style.width = "75%"; // Update loading bar while image is loading

      // Add a load event listener to the image to hide loading bar
      embeddedImage.onload = function () {
        loadingBar.style.width = "100%";
        setTimeout(() => {
          loadingBar.style.width = "0"; // Hide loading bar after a brief delay
          embeddedImage.style.opacity = "1"; // Show the image
        }, 500);
      };
    } catch (error) {
      console.error("Error fetching image:", error);
      loadingBar.style.width = "0"; // Reset loading bar on error
    }
  }

  // Fetch initial image on page load
  await fetchImage();

  // Add event listener for button click to fetch new image
  actionButton.addEventListener("click", fetchImage);
});
