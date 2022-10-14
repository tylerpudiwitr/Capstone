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
    }
  }

  customElements.define(`audio-player`, AudioPlayer);
}
