document.addEventListener("DOMContentLoaded", async () => {
  const actionButton = document.getElementById("actionButton");
  const embeddedImage = document.getElementById("embeddedImage");
  const apiSelector = document.getElementById("apiSelector");
  const endpoint = document.getElementById("endpoints"); // Second dropdown for endpoints
  const loadingBar = document.getElementById("loadingBar");

  // Define the options for each API
  const options = {
    waifu_pics: [
      {
        value: "https://api.waifu.pics/sfw/waifu",
        text: "Sfw Waifu",
      },
      {
        value: "https://api.waifu.pics/sfw/neko",
        text: "Sfw Neko",
      },
      {
        value: "https://api.waifu.pics/nsfw/waifu",
        text: "Nsfw Waifu",
      },
      {
        value: "https://api.waifu.pics/nsfw/neko",
        text: "Nsfw Neko",
      },
      {
        value: "https://api.waifu.pics/nsfw/trap",
        text: "Nsfw Trap",
      },
      {
        value: "https://api.waifu.pics/nsfw/blowjob",
        text: "Nsfw Blowjob",
      },
    ],
    waifu_im: [
      {
        value: "https://api.waifu.im/search?included_tags=ass",
        text: "Ass",
      },
      {
        value: "https://api.waifu.im/search?included_tags=ero",
        text: "Ero",
      },
      {
        value: "https://api.waifu.im/search?included_tags=hentai",
        text: "Hentai",
      },
      {
        value: "https://api.waifu.im/search?included_tags=milf",
        text: "Milf",
      },
      {
        value: "https://api.waifu.im/search?included_tags=oral",
        text: "Oral",
      },
      {
        value: "https://api.waifu.im/search?included_tags=paizuri",
        text: "Paizuri",
      },
      {
        value: "https://api.waifu.im/search?included_tags=ecchi",
        text: "Ecchi",
      },
    ],
    nekos_api: [
      {
        value: "https://api.nekosapi.com/v3/images/random?limit=1&tag=17",
        text: "Pussy",
      },
      {
        value:
          "https://api.nekosapi.com/v3/images/random?limit=1&tag=8&rating=explicit",
        text: "Catgirl",
      },
    ],
  };

  function showEndpoints() {
    const selectedApi = apiSelector.value;
    const container = document.getElementById("endpointOptions");

    endpoint.innerHTML = ""; // Clear current options
    const selectedOptions = options[selectedApi] || [];

    if (selectedOptions.length > 0) {
      // Add placeholder option
      const placeholderOption = document.createElement("option");
      placeholderOption.value = "";
      placeholderOption.textContent = "Select an endpoint";
      placeholderOption.disabled = true;
      placeholderOption.selected = true;
      endpoint.appendChild(placeholderOption);

      // Add API-specific options
      selectedOptions.forEach((option) => {
        const optElement = document.createElement("option");
        optElement.value = option.value;
        optElement.textContent = option.text;
        endpoint.appendChild(optElement);
      });

      container.style.display = "block"; // Show the endpoint options
    } else {
      container.style.display = "none";
      actionButton.style.display = "none"; // Hide fetch button if no API selected
    }
  }

  // Show fetch button only when an endpoint is selected
  function toggleFetchButton() {
    const selectedEndpoint = endpoint.value;
    actionButton.style.display = selectedEndpoint ? "inline-block" : "none";

    // Save selections to localStorage
    localStorage.setItem("selectedApi", apiSelector.value);
    localStorage.setItem("selectedEndpoint", selectedEndpoint);
  }

  async function fetchImage() {
    const apiUrl = endpoint.value; // Use endpoint value instead of apiSelector.value
    if (!apiUrl) {
      console.error("No endpoint selected");
      return;
    }
    try {
      loadingBar.style.width = "50%";
      embeddedImage.style.opacity = "0"; // Hide image until loaded

      const response = await fetch(apiUrl);
      const data = await response.json();
      const imageUrl =
        data.url ||
        (data.images && data.images[0].url) ||
        (data.items && data.items[0].image_url);

      if (imageUrl) {
        embeddedImage.src = imageUrl;
      } else {
        console.error("Error: No valid image URL found in the response data.");
      }
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

  // Load saved selections and fetch image on page load
  const savedApi = localStorage.getItem("selectedApi");
  const savedEndpoint = localStorage.getItem("selectedEndpoint");

  if (savedApi && savedEndpoint) {
    apiSelector.value = savedApi;
    showEndpoints(); // Populate endpoint dropdown

    // Delay setting the endpoint and showing the button until after options are populated
    setTimeout(() => {
      endpoint.value = savedEndpoint;
      toggleFetchButton(); // Show fetch button if endpoint is set
      fetchImage(); // Fetch a new image on page load
    }, 100); // Short delay to ensure options are populated
  }
  // Event listeners
  apiSelector.addEventListener("change", showEndpoints);
  endpoint.addEventListener("change", toggleFetchButton);
  actionButton.addEventListener("click", fetchImage);
});
