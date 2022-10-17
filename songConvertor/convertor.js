const axios = require("axios");

const options = {
  method: "GET",
  url: "https://soundcloud-scraper.p.rapidapi.com/v1/track/metadata",
  params: { track: "https://soundcloud.com/edsheeran/photograph" },
  headers: {
    "X-RapidAPI-Key": "a45de08d4cmsh3d2ce67140739c6p1c950ajsn00a6e7b6b5f6",
    "X-RapidAPI-Host": "soundcloud-scraper.p.rapidapi.com"
  }
};

axios
  .request(options)
  .then(function(response) {
    console.log(response.data);
  })
  .catch(function(error) {
    console.error(error);
  });
