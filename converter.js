const axios = require("axios");

const options = {
  method: "GET",
  url: "https://youtube-mp3-download1.p.rapidapi.com/dl",
  params: { id: "bHDWrnlIqfQ" },
  headers: {
    "X-RapidAPI-Key": "a45de08d4cmsh3d2ce67140739c6p1c950ajsn00a6e7b6b5f6",
    "X-RapidAPI-Host": "youtube-mp3-download1.p.rapidapi.com"
  }
};

axios
  .request(options)
  .then(response => response.json())
  .then(function(response) {
    console.log(response.data);
  })
  .catch(function(error) {
    console.error(error);
  });
