import html from "html-literal";

export default state => html`
<body>
  <header>
    <img
      class="logo"
      src="https://static.vecteezy.com/system/resources/thumbnails/007/655/372/small/animation-earphones-neon-light-isolate-on-green-background-video.jpg"
      alt="logo"
    />
</header>
    <section id="jumbotron"></section>
    <p>
      The weather in ${state.weather.city} is ${state.weather.description}.
      Temperature is ${state.weather.temp}F, and it feels like
      ${state.weather.feelsLike}F.
    </p>
  </header>
</body>
`;
