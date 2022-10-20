import html from "html-literal";

export default state => html`
<body>

    <section id="jumbotron"></section>
    <p>
      The weather in ${state.weather.city} is ${state.weather.description}.
      Temperature is ${state.weather.temp}F, and it feels like
      ${state.weather.feelsLike}F.
    </p>
  </header>
</body>
`;
