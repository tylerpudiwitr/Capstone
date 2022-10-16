{
  class AudioPlayer extends HTMLElement {
    playing = false;
    volume = 0.4;
    prevVolume = 0.4;
    initialized = false;
    barWidth = 3;
    barGap = 1;
    bufferPercentage = 75;
    nonAudioAttributes = new Set(['title', 'bar-width', 'bar-gap', 'buffer-percentage']);

    constructor() {
      super();

      this.attachShadow({mode: 'open'});
      this.render();
    }

    static get observedAttributes() {
      return [
        'src', 'muted', 'crossorigin', 'loop', 'preload', 'autoplay',
        // the name of the audio
        'title',
        // the size of the frequency bar
        'bar-width',
        // the size of the gap between the bars
        'bar-gap',
        // the percentage of the frequency buffer data to represent
        // if the dataArray contains 1024 data points only a percentage of data will
        // be used to draw on the canvas
        'buffer-percentage'
      ];
    }

    async attributeChangedCallback(name, oldValue, newValue) {
      switch (name) {
        case 'src':
          this.initialized = false;
          this.render();
          this.initializeAudio();
          break;
        case 'muted':
          this.toggleMute(Boolean(this.audio?.getAttribute('muted')));
          break;
        case 'title':
          this.titleElement.textContent = newValue;
          break;
        case 'bar-width':
          this.barWidth = Number(newValue) || 3;
          break;
        case 'bar-gap':
          this.barGap = Number(newValue) || 1;
          break;
        case 'buffer-percentage':
          this.bufferPercentage = Number(newValue) || 75;
          break;
        default:
      }

      this.updateAudioAttributes(name, newValue);
    }

    updateAudioAttributes(name, value) {
      if (!this.audio || this.nonAudioAttributes.has(name)) return;

      if (this.attributes.getNamedItem(name)) {
        this.audio.setAttribute(name, value ?? '')
      } else {
        this.audio.removeAttribute(name);
      }
    }

    initializeAudio() {
      if (this.initialized) return;

      this.initialized = true;

      this.audioCtx = new AudioContext();
      this.gainNode = this.audioCtx.createGain();
      this.analyserNode = this.audioCtx.createAnalyser();
      this.track = this.audioCtx.createMediaElementSource(this.audio);

      this.analyserNode.fftSize = 2048;
      this.bufferLength = this.analyserNode.frequencyBinCount;
      this.dataArray = new Uint8Array(this.bufferLength);
      this.analyserNode.getByteFrequencyData(this.dataArray);

      this.track
        .connect(this.gainNode)
        .connect(this.analyserNode)
        .connect(this.audioCtx.destination);

      this.changeVolume();
    }

    updateFrequency() {
      if (!this.playing) return;

      this.analyserNode.getByteFrequencyData(this.dataArray);

      this.canvasCtx.clearRect(0, 0, this.canvas.width, this.canvas.height)
      this.canvasCtx.fillStyle = "rgba(0, 0, 0, 0)";
      this.canvasCtx.fillRect(0, 0, this.canvas.width, this.canvas.height);

      const barCount = (this.canvas.width / (this.barWidth + this.barGap)) - this.barGap;
      const bufferSize = (this.bufferLength * this.bufferPercentage) / 100;
      let x = 0;


      for (let i = 0; i < barCount; i++) {

        const iPerc = Math.round((i * 100) / barCount);

        const pos = Math.round((bufferSize * iPerc) / 100);
        const frequency = this.dataArray[pos];

        const frequencyPerc = (frequency * 100) / 255;

        const barHeight = (frequencyPerc * this.canvas.height) / 100;

        const y = this.canvas.height - barHeight;

        this.canvasCtx.fillStyle = `rgba(${frequency}, 255, 100)`;
        this.canvasCtx.fillRect(x, y, this.barWidth, barHeight);

        x += (this.barWidth + this.barGap);
      }

      requestAnimationFrame(this.updateFrequency.bind(this))
    }

    attachEvents() {
      this.volumeBar.parentNode.addEventListener('click', e => {
        if (e.target === this.volumeBar.parentNode) {
          this.toggleMute();
        }
      }, false);

      this.playPauseBtn.addEventListener('click', this.togglePlay.bind(this), false);

      this.volumeBar.addEventListener('input', this.changeVolume.bind(this), false);

      this.progressBar.addEventListener('input', (e) => this.seekTo(this.progressBar.value), false);

      this.audio.addEventListener('loadedmetadata', () => {
        this.progressBar.max = this.audio.duration;
        this.durationEl.textContent = this.getTimeString(this.audio.duration);
        this.updateAudioTime();
      })

      this.audio.addEventListener('error', (e) => {
        this.titleElement.textContent = this.audio.error.message;
        this.playPauseBtn.disabled = true;
      })

      this.audio.addEventListener('timeupdate', () => {
        this.updateAudioTime(this.audio.currentTime);
      })

      this.audio.addEventListener('ended', () => {
        this.playing = false;
        this.playPauseBtn.textContent = 'play';
        this.playPauseBtn.classList.remove('playing');
      }, false);

      this.audio.addEventListener('pause', () => {
        this.playing = false;
        this.playPauseBtn.textContent = 'play';
        this.playPauseBtn.classList.remove('playing');
      }, false);

      this.audio.addEventListener('play', () => {
        this.playing = true;
        this.playPauseBtn.textContent = 'pause';
        this.playPauseBtn.classList.add('playing');
        this.updateFrequency();
      }, false);
    }

    async togglePlay() {
      if (this.audioCtx.state === 'suspended') {
        await this.audioCtx.resume();
      }

      if (this.playing) {
        return this.audio.pause();
      }

      return this.audio.play();
    }

    getTimeString(time) {
      const secs = `${parseInt(`${time % 60}`, 10)}`.padStart(2, '0');
      const min = parseInt(`${(time / 60) % 60}`, 10);

      return `${min}:${secs}`;
    }

    changeVolume() {
      this.volume = Number(this.volumeBar.value);

      if (Number(this.volume) > 1) {
        this.volumeBar.parentNode.className = 'volume-bar over';
      } else if (Number(this.volume) > 0) {
        this.volumeBar.parentNode.className = 'volume-bar half';
      } else {
        this.volumeBar.parentNode.className = 'volume-bar';
      }

      if (this.gainNode) {
        this.gainNode.gain.value = this.volume;
      }
    }

    toggleMute(muted = null) {
      this.volumeBar.value = muted || this.volume === 0 ? this.prevVolume : 0;
      this.changeVolume();
    }

    seekTo(value) {
      this.audio.currentTime = value;
    }

    updateAudioTime() {
      this.progressBar.value = this.audio.currentTime;
      this.currentTimeEl.textContent = this.getTimeString(this.audio.currentTime);
    }


    render() {
      this.shadowRoot.innerHTML = `
        ${this.style()}
        <figure class="audio-player">
          <figcaption class="audio-name"></figcaption>
          <audio style="display: none"></audio>
          <button class="play-btn" type="button">play</button>
          <div class="progress-indicator">
              <span class="current-time">0:0</span>
              <input type="range" max="100" value="0" class="progress-bar">
              <span class="duration">0:00</span>
              <canvas class="visualizer" style="width: 100%; height: 20px"></canvas>
          </div>
          <div class="volume-bar">
              <input type="range" min="0" max="2" step="0.01" value="${this.volume}" class="volume-field">
          </div>
        </figure>
      `;

      this.audio = this.shadowRoot.querySelector('audio');
      this.playPauseBtn = this.shadowRoot.querySelector('.play-btn');
      this.titleElement = this.shadowRoot.querySelector('.audio-name');
      this.volumeBar = this.shadowRoot.querySelector('.volume-field');
      this.progressIndicator = this.shadowRoot.querySelector('.progress-indicator');
      this.currentTimeEl = this.progressIndicator.children[0];
      this.progressBar = this.progressIndicator.children[1];
      this.durationEl = this.progressIndicator.children[2];
      this.canvas = this.shadowRoot.querySelector('canvas');

      this.canvasCtx = this.canvas.getContext("2d");

      const scale = window.devicePixelRatio;
      this.canvas.width = Math.floor(this.canvas.width* scale);
      this.canvas.height = Math.floor(this.canvas.height * scale);
      this.titleElement.textContent = this.attributes.getNamedItem('src')
        ? this.attributes.getNamedItem('title').value ?? 'untitled'
        : 'No Audio Source Provided';
      this.volumeBar.value = this.volume;


      for (let i = 0; i < this.attributes.length; i++) {
        const attr = this.attributes[i];
        this.updateAudioAttributes(attr.name, attr.value);
      }

      this.attachEvents();
    }
  }

  customElements.define('audio-player', AudioPlayer);
}
