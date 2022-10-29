/* eslint-disable no-unused-vars */
import html from "html-literal";

export default state => html`
  <body>
    <section id="recording">
      <h2>Actually Recording Your Vocals</h2>
      <p>
        First things first, you will need a microphone and and headphones, and
        either a computer or a smart phone.
      </p>
      <p>
        Thanks to technology today, you can make an entire song on your phone
        with an app called BandLabs. Although if you want a more professional
        sound for your track, you will need to download an application on your
        computer/laptop. I recommend either FL Studios, Logic Pro, or Pro Tools.
      </p>
      <div class="top-container">
        <form action="convert-mp3" method="POST" id="form">
          <h3 class="youtube">
            <i class="fa-brands fa-youtube"></i>YouTube 2 MP3 Converter
          </h3>
          <h4>Enter Video ID</h4>
          <div>
            <input
              class="vidID"
              type="text"
              name="VideoID"
              placeholder="Video ID"
            />
            <button class="convert" type="submit">
              Convert
            </button>
          </div>
        </form>
      </div>
      ${state.data
        ? html`
            <a href="${state.data.link}" target="_blank">Download</a>
          `
        : ""}

      <img
        class="levels"
        src="https://miro.medium.com/max/1400/1*gcPA3G1_gWp5nD1VEo8n4g.png"
        alt="me"
      />
    </section>
  </body>
`;
