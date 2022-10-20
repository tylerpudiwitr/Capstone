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
      <figure>
        <figcaption>You'll be able to make songs like this!</figcaption>
        <audio controls src="./audiomp/MVP.mp3"></audio>
      </figure>
      <img
        src="https://miro.medium.com/max/1400/1*gcPA3G1_gWp5nD1VEo8n4g.png"
        alt="me"
      />
    </section>
  </body>
`;
