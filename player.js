{
  class AudioPlayer extends HTMLElement {
    constructor() {
      super();

      this.attachShadow({ mode: `open` });
      this.render();
    }

    render() {
      this.shadowRoot.innerHTML = `
    <audio src="MVP.mp3" controls></audio>
    <button class="play-btn" type="button">play</button>
    `;

      this.audio = this.shadowRoot.querySelector("audio");
    }
  }

  customElements.define(`audio-player`, AudioPlayer);
}
