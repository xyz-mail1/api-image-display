const fetch = require("node-fetch");

(async () => {
  const { url } = await (
    await fetch("https://api.waifu.pics/nsfw/waifu")
  ).json();
  console.log(url);
})();
