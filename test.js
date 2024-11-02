const fetch = require("node-fetch");
require("dotenv").config();
(async () => {
  const { url } = await (
    await fetch("https://api.waifu.pics/nsfw/waifu")
  ).json();
  console.log(url);
})();
