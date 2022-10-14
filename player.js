{
  class AudioPlayer extends HTMLElement {
  constructor() {
    super();

    this.attachShadow( init: {mode: `open`});
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
    <audio src="MVP.mp3" controls></audio>
    <button class="play-btn" type="button">play</button>
    `;
  }
}

customElements.define(name: `audio-player`, AudioPlayer)
}
