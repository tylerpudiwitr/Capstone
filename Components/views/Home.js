import html from "html-literal";

export default state => html`
<body>
  <div>
<ul class="nav_links">
  <li><a href="Home">Home</a></li>
  <li><a href="About">About Us</a></li>
  <li><a href="Recording">Recording Your Vocals</a></li>
</ul>
</div>
    <section id="jumbotron"></section>
    <p>
      The weather in ${state.weather.city} is ${state.weather.description}.
      Temperature is ${state.weather.temp}F, and it feels like
      ${state.weather.feelsLike}F.
    </p>
  </header>
</body>
`;
