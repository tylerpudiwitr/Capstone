{
  class AudioPlayer extends HTMLElement {
    playing = false;

    constructor() {
      super();

      this.attachShadow({ mode: `open` });
      this.render();
      this.initializeAudio();
      this.attachEvents();
    }

    initializeAudio() {
      this.AudioContext = new AudioContext();

      this.track = this.AudioContext.createMediaElementSource(this.audio);

      this.track.connect(this.AudioContext.destination);
    }

    attachEvents() {
      this.playPauseBtn.addEventListener("click", this.togglePlay.bind(this))
    }

    async togglePlay() {
      if (this.AudioContext.state === "suspended") {
        await this.AudioContext.resume();
      this.playPauseBtn.textContent = "play";
      }

      if (this.playing) {
          await this.audio.pause();
          this.playing = false;
      } else {
          await this.audio.play();
          this.playing = true;
          this.playPauseBtn.textContent = "pause";
      }

    }

    render() {
      this.shadowRoot.innerHTML = `
    <audio src="MVP.mp3" controls></audio>
    <button class="play-btn" type="button">play</button>
    `;

      this.audio = this.shadowRoot.querySelector("audio");
      this.playPauseBtn = this.shadowRoot.querySelector(".play-btn");
    }
  }

  customElements.define("audio-player", AudioPlayer);
}
