{
  class AudioPlayer extends HTMLElement {
    playing = false;
    currentTime = 0;
    duration = 0;

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

      this.audio.addEventListener(`loadedmetadata`, () => {
        this.duration = this.audio.duration;
        this.progressBar.max = this.duration;

        const secs = parseInt(`${this.duration % 60}`, 10);
        const mins = parseInt(`${(this.duration/60)% 60}`, 10);

        this.durationEl.textContent = `${mins}:${secs}`;

        console.log("duration", this.audio.duration);
        console.log("currentTime", this.audio.currentTime);
      })
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
        <div class="progress-indicator">
            <span class="current-time">0:00</span>
            <input type="range" max="100" value="0" class="progress-bar">
            <span class="duration">0:00</span>
        </div>
    `;

      this.audio = this.shadowRoot.querySelector("audio");
      this.playPauseBtn = this.shadowRoot.querySelector(".play-btn");
      this.progressIndicator = this.shadowRoot.querySelector(".progress-indicator");
      this.currentTimeEl = this.progressIndicator.children[0];
      this.progressBar = this.progressIndicator.children[1];
      this.durationEl = this.progressIndicator.children[2];

    }
  }

  customElements.define("audio-player", AudioPlayer);
}
