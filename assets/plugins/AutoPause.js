function AutoPause() {
    this.threshold = 0.25;
    this.handleIntersection = this.handleIntersection.bind(this);
    this.handleVisibilityChange = this.handleVisibilityChange.bind(this);
}

AutoPause.prototype.run = function (player) {
    this.player = player;

    const observer = new IntersectionObserver(this.handleIntersection, {
        threshold: this.threshold,
    });

    observer.observe(this.player.media);

    document.addEventListener('visibilitychange', this.handleVisibilityChange);
}

AutoPause.prototype.handleIntersection = function (entries) {
    const entry = entries[0];
    const isVisible = entry.intersectionRatio >= this.threshold;

    if (isVisible) {
        this.player.play();
    } else {
        this.player.pause();
    }
}


AutoPause.prototype.handleVisibilityChange = function() {
    const isVisible = document.visibilityState === 'visible';
    if (isVisible) {
      this.player.play();
    } else {
      this.player.pause();
    }
  }

export default AutoPause;
