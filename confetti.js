var count = 200;
var defaults = {
    origin: { y: 0.7 }
};

const AudioContext = window.AudioContext || window.webkitAudioContext;
//const audioCtx = new AudioContext();
//var snd = new Audio("airhorn.mp3")
//snd.preload = 'auto';
//snd.load();

const audioPlay = async url => {
    const context = new AudioContext();
    const source = context.createBufferSource();
    const audioBuffer = await fetch(url)
      .then(res => res.arrayBuffer())
      .then(ArrayBuffer => context.decodeAudioData(ArrayBuffer));
  
    source.buffer = audioBuffer;
    source.connect(context.destination);
    source.start();
};

function inner(particleRatio, opts) {
    confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio)
    });
}

function fire() {
    //var click = snd.cloneNode();
    //click.play();
    audioPlay("https://ineedthefetti.github.io/airhorn.mp3")

    inner(0.25, {
        spread: 26,
        startVelocity: 55,
    });

    inner(0.2, {
        spread: 60,
    });

    inner(0.35, {
        spread: 100,
        decay: 0.91,
        scalar: 0.8
    });

    inner(0.1, {
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
        scalar: 1.2
    });

    inner(0.1, {
        spread: 120,
        startVelocity: 45,
    });
}