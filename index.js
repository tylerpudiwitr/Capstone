import { Header, Nav, Main, Footer } from "./Components";
import * as store from "./store";
import Navigo from "navigo";
import { capitalize } from "lodash";

import axios from "axios";

const router = new Navigo("/");

function render(state = store.Home) {
  document.querySelector("#root").innerHTML = `
    ${Header(state)}
    ${Nav(store.Links)}
    ${Main(state)}
    ${Footer()}`;

  afterRender(state);

  router.updatePageLinks();
}

function afterRender(state) {
  document.querySelector(".fa-bars").addEventListener("click", () => {
    document.querySelector("nav > ul").classList.toggle("hidden--mobile");
  });
  if (state.view === "Home") {
    // DO DOM stuff here
    console.log("Hello");
  }
  if (state.view === "Direction") {
    const formEntry = document.querySelector("form");
    const directionList = document.querySelector(".directions");

    formEntry.addEventListener("submit", async event => {
      event.preventDefault();

      console.log("matsinet-event:", event);

      // directionList.classList.toggle("directions");
      const inputList = event.target.elements;
      console.log("Input Element List", inputList);

      const from = {
        street: inputList.fromStreet.value,
        city: inputList.fromCity.value,
        state: inputList.fromStreet.value
      };

      store.Direction.from = from;
      store.Route.from = from;

      const to = {
        street: inputList.toStreet.value,
        city: inputList.toCity.value,
        state: inputList.toStreet.value
      };

      store.Direction.to = to;
      store.Route.to = to;

      if (event.submitter.name === "showDirections") {
        axios
          .get(
            `http://www.mapquestapi.com/directions/v2/route?key=${process.env.MAPQUEST_API_KEY}&from=${from.street},${from.city},${from.state}&to=${to.street},+${to.city},+${to.state}`
          )
          .then(response => {
            store.Direction.directions = response.data;
            store.Direction.directions.maneuvers =
              response.data.route.legs[0].maneuvers;
            router.navigate("/Direction");
          })
          .catch(error => {
            console.log("It puked", error);
          });
      }

      if (event.submitter.name === "showRoute") {
        router.navigate("/Route");
      }
    });
  }
}

router.hooks({
  before: (done, params) => {
    const view =
      params && params.data && params.data.view
        ? capitalize(params.data.view)
        : "Home";
    switch (view) {
      case "Home":
        axios
          .get(
            `https://api.openweathermap.org/data/2.5/weather?appid=${process.env.OPEN_WEATHER_MAP_API_KEY}&q=st%20louis`
          )
          .then(response => {
            const kelvinToFahrenheit = kelvinTemp =>
              Math.round((kelvinTemp - 273.15) * (9 / 5) + 32);

            store.Home.weather = {};
            store.Home.weather.city = response.data.name;
            store.Home.weather.temp = kelvinToFahrenheit(
              response.data.main.temp
            );
            store.Home.weather.feelsLike = kelvinToFahrenheit(
              response.data.main.feels_like
            );
            store.Home.weather.description = response.data.weather[0].main;
            done();
          })
          .catch(err => {
            console.log(err);
            done();
          });
        break;
      default:
        done();
    }
  }
});
router
  .on({
    "/": () => render(),
    ":view": params => {
      let view = capitalize(params.data.view);
      render(store[view]);
    }
  })
  .resolve();
