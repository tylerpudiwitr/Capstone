/* eslint-disable no-unused-vars */
import html from "html-literal";

export default state => html`
  <body>
    < id="recording">
    <h2 class="vocals">Actually Recording Your Vocals</h2>
    <p class="record">
      First things first, you will need a microphone and and headphones, and
      either a computer or a smart phone.
    </p>
    <p class="record">
      Thanks to technology today, you can make an entire song on your phone with
      an app called BandLabs. Although if you want a more professional sound for
      your track, you will need to download an application on your
      computer/laptop. I recommend either FL Studios, Logic Pro, or Pro Tools.
    </p>
    <div class="top-container">
      <form action="convert-mp3" method="POST" id="form">
        <h3 class="youtube">
          <i class="fa-brands fa-youtube"></i>YouTube 2 MP3 Converter
        </h3>
        <h4 class="vid">Enter Video ID</h4>
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
          <a id="down" href="${state.data.link}" target="_blank">DOWNLOAD</a>
        `
      : ""}
    <div>
      <img
        class="levels"
        src="https://miro.medium.com/max/1400/1*gcPA3G1_gWp5nD1VEo8n4g.png"
        alt="me"
      />
      <img
        class="mic"
        src="https://openclipart.org/image/800px/168826"
        alt="microphone"
      />
      <img
        class="band"
        src="https://www.bandlab.com/web-app/images/open-graph-4fd21aa09f.png"
        alt="bandlab"
      />
      <a class="labs" href="https://www.bandlab.com/sign-up"
        >Click Here to Sign Up For BandLab</a
      >
    </div>
  </body>
`;
