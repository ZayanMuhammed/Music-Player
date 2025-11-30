let Playing = false;

window.addEventListener("DOMContentLoaded", () => {
    const pause = document.getElementById("pause");
    const next = document.getElementById("NextTrack");
    const before = document.getElementById("PreviousTrack");
    const titleEl = document.getElementById("Title");
    const artistEl = document.getElementById("Artist");
    const icon = document.getElementById("icon");
    const time = document.getElementById("time");
    const durationEL = document.getElementById("timeremaining");
    const playPause = document.getElementById("playPause");


    // Add click handlers
    pause.addEventListener("click", () => {
        window.music.pause();
    });

    next.addEventListener("click", () => {
        window.music.next();
    });

    before.addEventListener("click", () => {
        window.music.previous();
    });

    let percentage = 0;
    const progress = document.querySelector('.progress-width');

    function ProgressBar(duration, timeReached) {
        duration = duration.replace(":", "");
        timeReached = timeReached.replace(":", "");
        let totalDuration = parseInt(duration);
        let totalTimeReached = parseInt(timeReached);
        percentage = (totalTimeReached / totalDuration) * 100;
        progress.style.width = percentage + '%';
    }

    window.music.onNowPlaying(({ artist, title, isPlaying, thumbnail, timeremaining, duration }) => {
        ProgressBar(duration, timeremaining);
        artistEl.textContent = artist;
        Playing = isPlaying;
        if (Playing) {
            playPause.src = "../assets/pause.png";
        } else {
            playPause.src = "../assets/play.png";
        }
        titleEl.textContent = title;
        time.textContent = timeremaining;
        durationEL.textContent = duration;
        if (thumbnail) {
            icon.src = "data:image/png;base64," + thumbnail;
        } else {
            icon.src = "../assets/icon.png";
        }
    });
});
