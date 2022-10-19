import html from "html-literal";

export default state => html`
  <section id="recording">
    <h2>Actually Recording Your Vocals</h2>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam eu sagittis
      nulla. Etiam semper mauris a quam tempus, non feugiat massa posuere. Morbi
      vitae nisi aliquam, semper diam id, molestie leo. In hac habitasse platea
      dictumst. Nulla et enim vel elit dictum viverra. Nunc pharetra lacinia
      arcu sit amet dignissim. Pellentesque ut mi nulla.
    </p>
    <figure>
      <figcaption>You'll be able to make songs like this!</figcaption>
      <audio
        class="audio-player"
        src="./audiomp/MVP.mp3"
        controls
        bar-width="5"
        bar-gap="2"
      ></audio>
    </figure>
    <img
      src="https://miro.medium.com/max/1400/1*gcPA3G1_gWp5nD1VEo8n4g.png"
      alt="me"
    />
  </section>
`;
