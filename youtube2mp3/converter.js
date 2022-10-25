const axios = require("axios");

const options = {
  method: "GET",
  url: "https://t-one-youtube-converter.p.rapidapi.com/api/v1/createProcess",
  params: {
    url: "https://www.youtube.com/watch?v=6qeT4rvcak0",
    format: "mp3",
    responseFormat: "json",
    lang: "en"
  },
  headers: {
    "X-RapidAPI-Key": "a45de08d4cmsh3d2ce67140739c6p1c950ajsn00a6e7b6b5f6",
    "X-RapidAPI-Host": "t-one-youtube-converter.p.rapidapi.com"
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
