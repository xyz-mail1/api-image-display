const apiUrl = "https://api.waifu.im/search?included_tags=ass";
const fetch = require("node-fetch");
require("dotenv").config();
const headers = new Headers();
headers.append("Accept-Version", "v5");
headers.append("Authorization", `Bearer ${process.env.token}`);

fetch(apiUrl, { headers })
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Request failed with status code: " + response.status);
    }
  })
  .then((data) => {
    // Process the response data as needed
    console.log(data.images[0].url);
  })
  .catch((error) => {
    console.error("An error occurred:", error.message);
  });
