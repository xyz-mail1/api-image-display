document.addEventListener("DOMContentLoaded", async () => {
  const actionButton = document.getElementById("actionButton");
  const embeddedImage = document.getElementById("embeddedImage");
  const apiSelector = document.getElementById("apiSelector");
  const loadingBar = document.getElementById("loadingBar");

  async function fetchImage() {
    const apiUrl = apiSelector.value;
    try {
      loadingBar.style.width = "50%";
      embeddedImage.style.opacity = "0"; // Hide image until loaded

      const response = await fetch(apiUrl);
      const data = await response.json();
      embeddedImage.src = data.url;

      loadingBar.style.width = "75%"; // Update loading bar

      embeddedImage.onload = () => {
        loadingBar.style.width = "100%";
        setTimeout(() => {
          loadingBar.style.width = "0"; // Hide loading bar
          embeddedImage.style.opacity = "1"; // Show image
        }, 500);
      };
    } catch (error) {
      console.error("Error fetching image:", error);
      loadingBar.style.width = "0"; // Reset loading bar on error
    }
  }

  await fetchImage();
  actionButton.addEventListener("click", fetchImage);
});
