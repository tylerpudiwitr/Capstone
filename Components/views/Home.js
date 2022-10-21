import html from "html-literal";

export default state => html`
<body>
  <nav class="navbar">
    <label class="navbar-toggler" for="toggle">
      <span class="bar"></span>
      <span class="bar"></span>
      <span class="bar"></span>
    </label>
    <ul class="nav_list">
      <li class="nav-item"><a href="Home">Home</a></li>
      <li class="nav-item"><a href="About">About Us</a></li>
      <li class="nav-item"><a href="Recording">Recording</a></li>
      <li class="nav-item"><a href="Direction">Direction</a></li>
    </ul>
  </nav>
    <section id="jumbotron"></section>
    <p>
      The weather in ${state.weather.city} is ${state.weather.description}.
      Temperature is ${state.weather.temp}F, and it feels like
      ${state.weather.feelsLike}F.
    </p>
  </header>
</body>
`;
