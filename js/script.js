const audioState = document.querySelector('.audioplayer-state');
const audioStateLine = document.querySelector('.audioplayer-line')
const audioplayer = document.querySelector('.audioplayer')
let audioTime = document.querySelector('.audioplayer-time>h1')
const file = document.querySelector('#audio-file')
const playImgAudio = document.querySelector('.audioplayer-play>img')
const volumeLine = document.querySelector('.audioplayer-volume')

const volume = document.querySelector('.audioplayer-volume-line')
const volumeState = document.querySelector('.audioplayer-volume-state')

const playAudio = document.querySelector('.audioplayer-play')
let stateBool = false;
let u = 0
let audio
let count = 0


let volumeBool = false
let volumePersent

volume.addEventListener('mousedown', () => {
    volumeBool = true;
})
volume.addEventListener('mousemove', (e) => {
    if (volumeBool) {
        volumeState.style.width = `${(e.clientX - volumeState.getBoundingClientRect().left) + 2}px`;
        volumePersent = ((parseInt(window.getComputedStyle(volumeState).getPropertyValue('width')) / 199) * 100) / 100
        audio.volume = volumePersent
    }
})
volumeLine.addEventListener('mouseup', () => {
    volumeBool = false
})
document.body.addEventListener('mouseup', () => {
    volumeBool = false
})
volume.addEventListener('mouseup', () => {
    volumeBool = false;
})







file.addEventListener('change', () => {
    const audioSrc = URL.createObjectURL(file.files[0]);
    audio = new Audio(audioSrc)
    document.querySelector('.audioplayer>h1').textContent = file.files[0].name;
    document.querySelector('.audioplayer>h1').style.color = 'black'
})

playAudio.addEventListener('click', () => {
    if (audio) {
        count++;
        if (count % 2 == 0) {
            audio.pause();
            playImgAudio.src = './images/play.png'
        }
        else {
            audio.play();
            let playInterval = setInterval(() => {
                let percentAudio = (audio.currentTime / audio.duration) * 100;
                audioState.style.width = `${percentAudio}%`
                if (parseInt(window.getComputedStyle(audioState).getPropertyValue('width')) >= 900) {
                    audio.pause();
                    playImgAudio.src = './images/play.png'
                }
            }, 100)
            playImgAudio.src = './images/icons8-pause-24.png'
        }
    }
    else {
        document.querySelector('.audioplayer>h1').textContent = 'Выберите файл для проигрывания';
        document.querySelector('.audioplayer>h1').style.color = 'black'
    }
})


audioStateLine.addEventListener('mousedown', () => {
    stateBool = true;
})

audioStateLine.addEventListener('mousemove', (e) => {
    if (stateBool) {
        let newState = Math.max(0, Math.min(e.clientX - audioState.getBoundingClientRect().left, 899))
        audioState.style.width = `${newState}px`;
        let percent = (newState / 899) * 100;
        audio.currentTime = audio.duration / (100 / percent);
    }
})

// События при отпускании мыши

audioplayer.addEventListener('mouseup', () => {
    stateBool = false;
})

audioStateLine.addEventListener('mouseup', () => {
    stateBool = false;
})


