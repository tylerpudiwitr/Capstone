// 'Import' the Express module instead of http
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const tunes = require("./routers/tunes");
const fetch = require("node-fetch");

require("dotenv").config();

dotenv.config();

// Initialize the Express application
const app = express();

mongoose.connect(process.env.MONGODB);
const db = mongoose.connection;

db.on("error", console.error.bind(console, "Connection Error:"));
db.once(
  "open",
  console.log.bind(console, "Successfully opened connection to Mongo!")
);

// CORS Middleware
const cors = (req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type, Accept,Authorization,Origin"
  );
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
};

const logging = (request, response, next) => {
  console.log(`${request.method} ${request.url} ${Date.now()}`);
  next();
};

app.use(cors);
app.use(express.json());
app.use(logging);

// Handle the request with HTTP GET method from http://localhost:4040/status
app.get("/status", (request, response) => {
  // Create the headers for response by default 200
  // Create the response body
  // End and return the response
  response.send(JSON.stringify({ message: "Service healthy" }));
});

app.get("/echo/:input", (request, response) => {
  const message = request.params.input;
  response.status(418).json({ echo: message });
});

// eslint-disable-next-line no-undef
app.post("/convert-mp3", async (req, res) => {
  const videoId = req.body.videoID;
  if (videoId === undefined || videoId === "" || videoId === null) {
    return res.render("Convert", {
      success: false,
      message: "Please enter the video ID"
    });
  } else {
    const fetchAPI = await fetch(
      `https://youtube-mp3-download1.p.rapidapi.com/dl?id=${videoId}`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-key": process.env.API_Key,
          "x-rapidapi-host": process.env.API_Host
        }
      }
    );
    const fetchResponse = await fetchAPI.json();

    if (fetchResponse.status === "ok")
      return res.render("Convert", {
        success: true,
        song_title: fetchResponse.title,
        song_link: fetchResponse.link
      });
    else
      return res.render("Convert", {
        success: false,
        message: fetchResponse.msg
      });
  }
});

const PORT = process.env.PORT || 4040; // we use || to provide a default value

// Tell the Express app to start listening
// Let the humans know I am running and listening on 4040
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
